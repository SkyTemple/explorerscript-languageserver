import {
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  TextDocumentSyncKind,
  InitializeResult,
  SignatureHelpParams,
  SignatureHelp,
  DocumentSymbolParams,
  SymbolInformation,
  WorkspaceSymbolParams,
  TextEdit,
  WorkDoneProgressReporter,
  CompletionParams,
  DidChangeConfigurationParams,
  WorkspaceFoldersChangeEvent,
  WorkspaceFolder,
  HoverParams,
  DefinitionParams,
  Location
} from 'vscode-languageserver';
import  { createConnection } from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { CharStream, CommonTokenStream } from 'antlr4';
import ExplorerScriptLexer from './antlr/ExplorerScriptLexer';
import ExplorerScriptParser, { Macro_callContext, Message_switch_blockContext, OperationContext, PrimitiveContext, StartContext } from './antlr/ExplorerScriptParser';
import { URI } from 'vscode-uri';
import { readFile } from 'fs/promises';
import { glob } from 'glob';

import { createWikiUrlForOpcode, getOpCodeSignatureInfo, getRegionalConstants, GLOBAL_OPCODE_COMPLETION_ITEMS_BY_NAME } from './data/staticData';
import { findContextAtOffset, findFunctionCallAtOffset, findParentRuleContext } from './parseHelpers';
import { applyConfigurationChange, DEFAULT_SETTINGS, deleteDocumentSettings, getDocumentSettings } from './settings';
import { SymbolVisitor } from './visitors/symbolVisitor';
import { buildMacroDetailString, CompositeSymbolStore, getMacroSignatureInfo, SymbolStore, toSymbolInformation } from './symbols';
import { buildCompletionItems } from './completion';
import chokidar, { FSWatcher } from 'chokidar';
import { Stats } from 'fs';
import { createCompositeSymbolStore, findScriptFolder, resolveDocumentImports } from './imports';
import { RomData } from './data/romData';
import * as path from 'path';

// Create a connection for the server
// This doesn't work with a normal import for some reason
import { StaticConstantStore } from './data/constantStore';
import { OpCode } from './data/types';
import { findDefinition } from './definitionProvider';
import { StatementVisitor } from './visitors/statement';

export let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Key: workspace folder URI
let loadedRoms: Map<string, RomData> = new Map();

export let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;
let rootPath: string | null;

connection.onInitialize((params: InitializeParams) => {
  let capabilities = params.capabilities;

  rootPath = params.rootUri; // Used if the client doesn't support workspace folders

  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: ['$', '~', '%', '"', '@'],
        allCommitCharacters: ['(', '<']
      },
      signatureHelpProvider: {
        triggerCharacters: ['(', ',']
      },
      hoverProvider: true,
      documentSymbolProvider: true,
      workspaceSymbolProvider: true,
      definitionProvider: true,
    }
  };
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true
      }
    };
  }
  return result;
});

const chokidarWatcherMap: Map<string, FSWatcher> = new Map();

connection.onInitialized(async () => {
  if (hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
    connection.workspace.getConfiguration({ section: 'explorerscript' });
  }
  
  if (hasWorkspaceFolderCapability) {
    // If workspace folder changes, handle it
    connection.workspace.onDidChangeWorkspaceFolders(async (event: WorkspaceFoldersChangeEvent) => {
      // Folders added
      for (const folder of event.added) {
        const folderUri = folder.uri;
        connection.console.log(`Workspace folder added: ${folderUri}`);
        await loadRom(folderUri, true);
        await parseWorkspaceFilesAndWatch(folderUri);
      }
      // Folders removed
      for (const folder of event.removed) {
        const folderUri = folder.uri;
        connection.console.log(`Workspace folder removed: ${folderUri}`);
        stopWatchingFolder(folderUri);
        // Potentially remove cached data for files in that folder
        removeFolderFilesFromCache(folderUri);
        loadedRoms.delete(folderUri);
      }
    });
  }

  const workspaceFolders = await getWorkspaceFolders();
  await parseAllExpsFilesOnStartup(workspaceFolders);
  documents.all().forEach(checkDocumentAndSendDiagnostics);
});

async function getWorkspaceFolders(): Promise<WorkspaceFolder[]> {
  if (hasWorkspaceFolderCapability) {
    return await connection.workspace.getWorkspaceFolders() ?? [];
  } else {
    return rootPath ? [{ uri: rootPath, name: '' }] : [];
  }
}

async function loadRom(workspaceFolderUri: string, showNotification: boolean) {
  const romPath = await getAbsoluteRomPath(workspaceFolderUri);
  if (!romPath) {
    return;
  }

  const progress = await connection.window.createWorkDoneProgress();
  progress.begin(`Loading ROM: "${romPath}"`, 0, 'Starting...', true);

  try {
    const rom = await RomData.load(romPath);
    loadedRoms.set(workspaceFolderUri, rom);
    if (showNotification) {
      connection.window.showInformationMessage(`Loaded ROM data from '${romPath}'.`);
      connection.console.log(`Loaded ROM data from '${romPath}'. Workspace folder: ${workspaceFolderUri}`);
    }

  } catch (err: any) {
    connection.window.showErrorMessage(`Error loading ROM data from '${romPath}': ${err}`);
  } finally {
    progress.done();
  }
}

async function getAbsoluteRomPath(workspaceFolderUri: string): Promise<string | undefined> {
  const settings = await getDocumentSettings(workspaceFolderUri);
  const romPath =  settings.romPath ?? DEFAULT_SETTINGS.romPath;

  if (romPath.trim() === '') {
    connection.window.showWarningMessage('No ROM path set in configuration');
    return undefined;
  }

  const absolutePath = path.isAbsolute(romPath)
    ? romPath
    : path.join(URI.parse(workspaceFolderUri).fsPath, romPath);

  return absolutePath;
}

async function parseAllExpsFilesOnStartup(workspaceFolders: WorkspaceFolder[]) {
  try {
    let fileCount = 0;
    for (const folder of workspaceFolders) {
      const folderUri = folder.uri;
      fileCount += await parseWorkspaceFilesAndWatch(folderUri);
    }

    connection.console.log(`Parsed ${fileCount} .exps files on startup.`);
  } catch (err: any) {
    connection.console.error(`Error parsing on startup: ${err.message}`);
  }
}

async function parseWorkspaceFilesAndWatch(folderUri: string): Promise<number> {
  const folderPath = URI.parse(folderUri).fsPath;

  const progress = await connection.window.createWorkDoneProgress();
  progress.begin('Parsing ExplorerScript files', 0, 'Starting...', true);

  if (chokidarWatcherMap.has(folderUri)) {
    // Already watching
    return 0;
  }
  // Watch all *.exps inside folder
  const watcher = chokidar.watch('.', {
    ignored: (path, stats) => (stats?.isFile() || false) && !path.endsWith('.exps') && !path.endsWith('.nds'),
    cwd: folderPath,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 100 }
  });

  watcher
    .on('add', (relPath, stats) => onFileAdded(folderPath, relPath, stats))
    .on('change', (relPath, stats) => onFileChanged(folderPath, relPath, stats))
    .on('unlink', (relPath) => onFileRemoved(folderPath, relPath));

  chokidarWatcherMap.set(folderUri, watcher);

  // Manually parse all existing .exps in that folder
  const files = glob.sync('**/*.exps', { cwd: folderPath, nodir: true });

  let count = 0;
  for (const relPath of files) {
    const absFilePath = path.join(folderPath, relPath);
    const fileUri = URI.file(absFilePath).toString();
    // If doc is open, a full parse is done in `parseDocument` anyway
    const isOpen = documents.all().some(d => d.uri === fileUri);
    if (!isOpen) {
      await parseSingleFileOnDisk(fileUri);
      count++;
    }

    updateProgress(progress, count, files.length);
  }

  progress.done();
  return count;
}

//
// 3) Stopping watchers for removed folders
//
function stopWatchingFolder(folderUri: string) {
  const watcher = chokidarWatcherMap.get(folderUri);
  if (watcher) {
    watcher.close().catch((err: Error) => {
      connection.console.error(`Error closing watcher for ${folderUri}: ${err}`);
    });
    chokidarWatcherMap.delete(folderUri);
  }
}

//
// 4) Remove from caches all files that belonged to a removed folder
//
function removeFolderFilesFromCache(folderUri: string) {
  const folderPath = URI.parse(folderUri).fsPath;
  // Clear parseCache
  for (const [uri, _parsed] of parseCache.entries()) {
    const fsPath = URI.parse(uri).fsPath;
    if (fsPath.startsWith(folderPath + path.sep)) {
      parseCache.delete(uri);
    }
  }
  // Clear symbolCache
  for (const [uri] of symbolCache.entries()) {
    const fsPath = URI.parse(uri).fsPath;
    if (fsPath.startsWith(folderPath + path.sep)) {
      symbolCache.delete(uri);
    }
  }
}

let firstConfigChange = true;

// Handle configuration changes
connection.onDidChangeConfiguration(async (change: DidChangeConfigurationParams) => {
  applyConfigurationChange(change);
  // Re-validate all open text documents
  documents.all().forEach(checkDocumentAndSendDiagnostics);

  const workspaceFolders = await getWorkspaceFolders();
  loadedRoms.clear();
  for (const folder of workspaceFolders) {
    await loadRom(folder.uri, !firstConfigChange);
  }

  firstConfigChange = false;
});

async function onFileAdded(folderPath: string, relPath: string, stats?: Stats) {
  try {
    // Construct full path => URI => parse
    const absPath = path.join(folderPath, relPath);
    const fileUri = URI.file(absPath).toString();

    if (fileUri.endsWith('.nds')) {
      const romPath = await getAbsoluteRomPath(folderPath);
      if (romPath === absPath) {
        await loadRom(URI.file(folderPath).toString(), true);
      }
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Wait before checking if the doc is open (VS Code takes a while)

    // Skip if doc is open in the editor
    const isOpen = documents.all().some(doc => doc.uri === fileUri);
    if (!isOpen && fileUri.endsWith('.exps')) {
      await parseSingleFileOnDisk(fileUri);
      connection.console.log(`File added: ${fileUri}, parsed symbols updated.`);
    }
  } catch (err) {
    connection.console.error(`Error parsing added file: ${err}`);
  }
}

async function onFileChanged(folderPath: string, relPath: string, stats?: Stats) {
  try {
    const absPath = path.join(folderPath, relPath);
    const fileUri = URI.file(absPath).toString();

    if (fileUri.endsWith('.nds')) {
      const romPath = await getAbsoluteRomPath(folderPath);
      if (romPath === absPath) {
        await loadRom(URI.file(folderPath).toString(), true);
      }
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Wait before checking if the doc is open (VS Code takes a while)

    const isOpen = documents.all().some(doc => doc.uri === fileUri);
    if (!isOpen && fileUri.endsWith('.exps')) {
      await parseSingleFileOnDisk(fileUri);
      connection.console.log(`File changed: ${fileUri}, parsed symbols updated.`);
    }
  } catch (err) {
    connection.console.error(`Error parsing changed file: ${err}`);
  }
}

async function onFileRemoved(folderPath: string, relPath: string) {
  const absPath = path.join(folderPath, relPath);
  const fileUri = URI.file(absPath).toString();

  await new Promise(resolve => setTimeout(resolve, 500));// Wait before checking if the doc is open (VS Code takes a while)

  const isOpen = documents.all().some(doc => doc.uri === fileUri);
  if (!isOpen && fileUri.endsWith('.exps')) {
    parseCache.delete(fileUri);
    symbolCache.delete(fileUri);
    connection.console.log(`File removed: ${fileUri}, caches updated.`);
  }
}

let parseTimeout: NodeJS.Timeout | undefined;

// Document events
documents.onDidChangeContent(change => {
  if (parseTimeout) {
    clearTimeout(parseTimeout);
  }
  parseTimeout = setTimeout(() => {
    checkDocumentAndSendDiagnostics(change.document);
  }, 300);
});

documents.onDidClose(async (e) => {
  parseCache.delete(e.document.uri);

  // Re-parse and store just the symbols
  const docText = e.document.getText();
  const parsed = await parse(e.document.uri, docText, false);

  symbolCache.set(e.document.uri, {
    uri: e.document.uri,
    symbols: parsed.localSymbols
  });
  deleteDocumentSettings(e.document.uri);
});

// Interface for parsed documents (open documents)
export interface ParsedDocument {
  uri: string;
  parseTree: StartContext | undefined;
  tokenStream: CommonTokenStream | undefined;
  localSymbols: SymbolStore;
  resolvedImports: URI[];
  allSymbols: CompositeSymbolStore;
  diagnostics: Diagnostic[];
  workspaceFolder: string | undefined;
  scriptFolder: URI | undefined; // The nearest "SCRIPT" folder in the workspace
}

// Interface for cached symbols (files on disk)
export interface CachedSymbols {
  uri: string;
  symbols: SymbolStore;
}

// Contains open documents
const parseCache: Map<string, ParsedDocument> = new Map();

// Lightweight cache for files on disk
const symbolCache: Map<string, CachedSymbols> = new Map();

// Used for documents in memory
export async function parseDocument(doc: TextDocument): Promise<ParsedDocument> {
  const text = doc.getText();
  const parsed = await parse(doc.uri, text, true);
  if (parsed.parseTree) {
    // Store full parse
    parseCache.set(doc.uri, parsed);
    // Remove from symbolCache if present
    symbolCache.delete(doc.uri);
  } else {
    parseCache.delete(doc.uri);
  }
  return parsed;
}

async function getCachedDocumentOrParse(doc: TextDocument): Promise<ParsedDocument> {
  const cached = parseCache.get(doc.uri);
  if (cached) {
    return cached;
  }
  return parseDocument(doc);
}

// Retrieve the symbols for a document either from symbol cache or parse cache
export function getDocumentSymbols(uri: URI): SymbolStore | undefined {
  const cached = parseCache.get(uri.toString());
  if (cached) {
    return cached.localSymbols;
  }

  const cachedSymbols = symbolCache.get(uri.toString());
  if (cachedSymbols) {
    return cachedSymbols.symbols;
  }

  return undefined;
}

async function checkDocumentAndSendDiagnostics(doc: TextDocument) {
  const parsed = await parseDocument(doc);
  const compileDiagnostics = compileCheck(parsed);
  const allDiagnostics = [...parsed.diagnostics, ...compileDiagnostics];
  connection.sendDiagnostics({ uri: doc.uri, diagnostics: allDiagnostics });
}

// Parse a single file on disk, not necessarily open in the editor
async function parseSingleFileOnDisk(fileUri: string): Promise<void> {
  const absPath = URI.parse(fileUri).fsPath;
  let fileContent: string;

  try {
    fileContent = await readFile(absPath, 'utf8');
  } catch (err) {
    connection.console.error(`Could not read file: ${absPath} - ${err}`);
    parseCache.delete(fileUri);
    symbolCache.delete(fileUri);
    return;
  }

  const parsedDoc = await parse(fileUri, fileContent, false);

  symbolCache.set(fileUri, {
    uri: fileUri,
    symbols: parsedDoc.localSymbols
  });
}

//
// The main parser routine
//
async function parse(uri: string, source: string, keepTree: boolean): Promise<ParsedDocument> {
  const diagnostics: Diagnostic[] = [];
  const workspaceFolder = await findDocumentWorkspaceFolder(uri);

  try {
    const inputStream = new CharStream(source);
    const lexer = new ExplorerScriptLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ExplorerScriptParser(tokenStream);

    parser.removeErrorListeners();
    parser.addErrorListener({
      syntaxError: (_recognizer, offendingSymbol, line, charPos, msg) => {
        let length = 1;
        if (offendingSymbol && offendingSymbol.text) {
          length = offendingSymbol.text.length;
        }

        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: line - 1, character: charPos },
            end: { line: line - 1, character: charPos + length }
          },
          message: msg,
          source: 'explorerscript-parser'
        });
      }
    });

    let parseTree = parser.start();
    const visitor = new SymbolVisitor(uri, false);
    visitor.visit(parseTree);
    const symbols = visitor.symbols;

    if (!keepTree) {
      symbols.removeParseTreeReferences();
    }

    diagnostics.push(...visitor.diagnostics);

    let resolvedImports: URI[];
    let allSymbols: CompositeSymbolStore;
    if (keepTree) {
      const { resolvedImports: resolved, diagnostics: importDiagnostics } = resolveDocumentImports(uri, symbols);
      resolvedImports = resolved;
      diagnostics.push(...importDiagnostics);

      allSymbols = createCompositeSymbolStore(symbols, resolvedImports)
    } else {
      resolvedImports = [];
      allSymbols = new CompositeSymbolStore([symbols]);
    }

    return {
      uri,
      parseTree: keepTree ? parseTree : undefined,
      tokenStream: keepTree ? tokenStream : undefined,
      localSymbols: symbols,
      resolvedImports,
      allSymbols,
      diagnostics,
      workspaceFolder,
      scriptFolder: findScriptFolder(uri)
    };
  } catch (err: any) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 80 } },
      message: `Internal error: ${err.message}`,
      source: 'explorerscript-parser'
    });

    return {
      uri,
      parseTree: undefined,
      tokenStream: undefined,
      localSymbols: new SymbolStore(uri),
      resolvedImports: [],
      allSymbols: new CompositeSymbolStore([]),
      diagnostics,
      workspaceFolder,
      scriptFolder: findScriptFolder(uri)
    };
  }
}

/// Runs additional compile checks on the parsed document
function compileCheck(doc: ParsedDocument): Diagnostic[] {
  if (!doc.parseTree) {
    return []; // Can't check without a parse tree
  }

  const visitor = new StatementVisitor(doc.localSymbols, doc.allSymbols, getDocumentConstants(doc));
  visitor.visit(doc.parseTree);
  return visitor.diagnostics;
}

async function findDocumentWorkspaceFolder(uri: string): Promise<string | undefined> {
  for (const folder of await getWorkspaceFolders()) {
    const folderPath = URI.parse(folder.uri).fsPath;
    const docPath = URI.parse(uri).fsPath;
    if (docPath.startsWith(folderPath + path.sep)) {
      return folder.uri;
    }
  }
  return undefined;
}

function updateProgress(
  progress: WorkDoneProgressReporter,
  filesParsed: number,
  filesTotal: number
) {
  const percentage = Math.floor((filesParsed / filesTotal) * 100);
  if (filesParsed >= filesTotal) {
    progress.done();
  } else {
    progress.report(percentage, `Parsed ${filesParsed} of ${filesTotal}`);
  }
}

function getDocumentConstants(doc: ParsedDocument): StaticConstantStore {
  return (doc.workspaceFolder ? loadedRoms.get(doc.workspaceFolder)?.constants : undefined)
    ?? getRegionalConstants('na');
}

//
// Provide completions
//
connection.onCompletion(async (params: CompletionParams) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;

  connection.console.log(`Completion requested for ${params.textDocument.uri}`);
  const parsedDoc = await parseDocument(doc);

  const constants = getDocumentConstants(parsedDoc);

  let items = await buildCompletionItems(parsedDoc, doc, params.position, constants);

  // If triggered by '$' or '~' etc., remove the trigger char from the inserted text
  if (items && params.context?.triggerCharacter) {
    items = items
      .filter(item => (item.insertText ?? item.label).startsWith(params.context?.triggerCharacter!))
      .map(item => {
        item.additionalTextEdits = [
          TextEdit.del({
            start: params.position,
            end: {
              line: params.position.line,
              character: params.position.character - 1
            }
          }),
        ];
        return item;
      });
  }

  return items;
});

connection.onSignatureHelp(async (params: SignatureHelpParams) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) {
    return null;
  }

  const text = doc.getText();
  const offset = doc.offsetAt(params.position);

  const funcCallInfo = findFunctionCallAtOffset(text, offset);
  if (!funcCallInfo) {
    return null;
  }

  // Signature help for static opcodes
  const signatures = getOpCodeSignatureInfo(funcCallInfo.name);
  if (signatures) {
    return {
      signatures,
      activeSignature: 0,
      activeParameter: funcCallInfo.paramIndex
    } as SignatureHelp;
  }

  connection.console.log(`Signature help requested for ${funcCallInfo.name}`);

  // Signature help for macros
  const cachedDoc = await getCachedDocumentOrParse(doc);
  const macro = cachedDoc.allSymbols.getMacroByName(funcCallInfo.name);
  if (macro) {
    return {
      signatures: [getMacroSignatureInfo(macro)],
      activeSignature: 0,
      activeParameter: funcCallInfo.paramIndex
    } as SignatureHelp;
  }

  return null;
});

connection.onHover(async (params: HoverParams) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) {
    return null;
  }

  const cachedDoc = await getCachedDocumentOrParse(doc);
  if (!cachedDoc.parseTree) {
    return null;
  }

  const offset = doc.offsetAt(params.position);
  const context = findContextAtOffset(cachedDoc.parseTree, offset);
  if (!context) {
    return null;
  }

  if (findParentRuleContext(context, PrimitiveContext)) {
    // Don't show hover information for primitives.
    // It would otherwise be confusing and too noisy because they'd be resolved as operations/macros below.
    return null;
  }

  // Hovering over a normal operation
  let operationName = undefined;
  const operationContext = findParentRuleContext(context, OperationContext) as OperationContext | null;
  if (operationContext) {
    operationName = operationContext.IDENTIFIER()?.getText();
  }

  // `Message_switch` blocks look like operations, but are technically not.
  // We can still show hover information for them.
  const messageSwitchBlockContext = findParentRuleContext(context, Message_switch_blockContext) as Message_switch_blockContext | null; 
  if (messageSwitchBlockContext) {
    operationName = messageSwitchBlockContext.MESSAGE_SWITCH_MONOLOGUE()?.getText() ?? messageSwitchBlockContext.MESSAGE_SWITCH_TALK()?.getText();
  }

  if (operationName) {    
    const item = GLOBAL_OPCODE_COMPLETION_ITEMS_BY_NAME.get(operationName)?.[0];
    if (!item) {
      return null;
    }

    const opcode = item.data as OpCode;
    const wikiUrl = createWikiUrlForOpcode(opcode);
    return {
      contents: {
        kind: 'markdown',
        value: `\`\`\`explorerscript\n${item.detail}\n\`\`\`\n\n${item.documentation}\n\n${wikiUrl}`
      }
    };
  } else {
    const macroCallContext = findParentRuleContext(context, Macro_callContext) as Macro_callContext | null;
    if (macroCallContext) {
      let macroName = macroCallContext.MACRO_CALL().getText();
      if (macroName.startsWith('~')) {
        macroName = macroName.substring(1);
      }

      const macro = cachedDoc.allSymbols.getMacroByName(macroName);
      if (macro) {
        return {
          contents: {
            value: 'macro ' + buildMacroDetailString(macro),
            language: 'explorerscript'
          },
        };
      }
    }
  }
});

connection.onDefinition(async (params: DefinitionParams): Promise<Location | null> => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) {
    return null;
  }

  const cachedDoc = await getCachedDocumentOrParse(doc);
  if (!cachedDoc.parseTree) {
    return null;
  }

  const offset = doc.offsetAt(params.position);
  const context = findContextAtOffset(cachedDoc.parseTree, offset);
  if (!context) {
    return null;
  }

  let unionallUri, unionallSymbols;
  let unionall = Array.from(parseCache.entries()).find(kv => kv[0].endsWith('unionall.exps'));
  if (unionall) {
    unionallUri = unionall[0];
    unionallSymbols = unionall[1].localSymbols;
  } else {
    let unionallCached = Array.from(symbolCache.entries()).find(kv => kv[0].endsWith('unionall.exps'));
    if (unionallCached) {
      unionallUri = unionallCached[0];
      unionallSymbols = unionallCached[1].symbols;
    }
  }

  return findDefinition(cachedDoc, context, unionallUri, unionallSymbols, cachedDoc.scriptFolder);
});

//
// Document Symbol Provider
//
connection.onDocumentSymbol(async (params: DocumentSymbolParams) => {
  const doc = documents.get(params.textDocument.uri);
  if (!doc) return null;

  const parsed = await getCachedDocumentOrParse(doc);
  if (!parsed.parseTree) return null;

  const symbols = toSymbolInformation(doc.uri, parsed.localSymbols, true);
  return symbols;
});

//
// Workspace Symbol Provider
//
connection.onWorkspaceSymbol(async (params: WorkspaceSymbolParams) => {
  function filterSymbols(symbols: SymbolInformation[], query?: string): SymbolInformation[] {
    if (!query) return symbols;
    const q = query.toLowerCase();
    return symbols.filter(s => s.name.toLowerCase().includes(q));
  }

  const allSymbols: SymbolInformation[] = [];

  // Open documents
  for (const [docUri, parsed] of parseCache.entries()) {
    if (!parsed.parseTree) continue;
    const docSymbols = toSymbolInformation(docUri, parsed.localSymbols, false);
    allSymbols.push(...docSymbols);
  }

  // Non-open documents
  for (const [docUri, cached] of symbolCache.entries()) {
    const docSymbols = toSymbolInformation(docUri, cached.symbols, false);
    allSymbols.push(...docSymbols);
  }

  // Filter
  const finalSymbols = filterSymbols(allSymbols, params.query);
  return finalSymbols;
});

// Make the text document manager listen on the connection
documents.listen(connection);
// Listen on the connection
connection.listen();