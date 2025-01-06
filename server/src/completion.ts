import { TextDocument } from "vscode-languageserver-textdocument";
import { CompletionItem, CompletionItemKind, InsertTextFormat, Position } from "vscode-languageserver";
import { GLOBAL_OPCODE_COMPLETION_ITEMS } from "./data/staticData.js";
import { connection, ParsedDocument } from "./server.js";
import { findContextAtOffset } from "./parseHelpers.js";
import { Ctx_blockContext, DefaultContext, Else_blockContext, Elseif_blockContext, For_blockContext, Forever_blockContext, Func_suiteContext, If_blockContext, Import_stmtContext, Single_case_blockContext, StartContext, Switch_blockContext, Switch_headerContext, While_blockContext } from "./antlr/ExplorerScriptParser.js";
import { createSymbolCompletionItems, createScopedCompletionItems } from "./symbols.js";
import { findMacrosFolder } from "./imports.js";
import { readdirSync } from "fs";
import { StaticConstantStore } from "./data/constantStore.js";

export async function buildCompletionItems(parsed: ParsedDocument | undefined, doc: TextDocument, position: Position, staticConstants: StaticConstantStore): Promise<CompletionItem[] | null> {
  let completionItems: CompletionItem[] = [
    ...getKeywords(),
    ...staticConstants.completionItems
  ];

  if (parsed?.parseTree) {
    const offset = doc.offsetAt(position);

    let context = findContextAtOffset(parsed.parseTree, offset);
    if (context) {
      connection.console.log(`Auto complete: ${context?.constructor?.name ?? 'null'}`);

      if (context instanceof StartContext) {
        return getStartContextSnippets();
      }

      if (context instanceof Import_stmtContext) {
        return getImportCompletionItems(parsed);
      }

      const rulesContainingOperations = [
        Func_suiteContext,
        Ctx_blockContext,
        If_blockContext,
        Elseif_blockContext,
        Else_blockContext,
        Switch_headerContext,
        Switch_blockContext,
        Single_case_blockContext,
        DefaultContext,
        Forever_blockContext,
        For_blockContext,
        While_blockContext,
      ];

      if (rulesContainingOperations.includes(context.constructor as any)) {
        completionItems.push(...GLOBAL_OPCODE_COMPLETION_ITEMS);
      }

      // Add completion items for symbols in the current scope
      completionItems.push(...createScopedCompletionItems(parsed.localSymbols, context));
    }

    // Completion items in current file
    completionItems.push(...createSymbolCompletionItems(parsed.allSymbols));
  }

  return completionItems;
}

const START_CONTEXT_KEYWORDS = ['import', 'const'];
const KEYWORDS = ['FALSE', 'TRUE', 'not', 'jump', 'call', 'const', 'if', 'elseif', 'else', 'for', 'forever', 'with', 'switch', 'return', 'end', 'hold', 'continue', 'break', 'break_loop', 'value', 'debug', 'edit', 'variation', 'random', 'sector', 'dungeon_mode', 'menu2', 'menu', 'case', 'default', 'clear', 'reset', 'init', 'scn', 'dungeon_result', 'adventure_log', 'while', 'previous', 'Position'];

function getKeywords(): CompletionItem[] {
  return KEYWORDS.map(keyword => ({
    label: keyword,
    kind: CompletionItemKind.Keyword,
  }));
}

function getStartContextSnippets(): CompletionItem[] {
  return [{
    label: 'coro',
    kind: CompletionItemKind.Snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    insertText: `coro \${1:name} {
\t\${2}
}`
  }, {
    label: 'def 0',
    kind: CompletionItemKind.Snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    insertText: `def 0 {
\t\${1}
}`
  }, {
    label: 'def for ...',
    kind: CompletionItemKind.Snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    insertText: `def \${1:id} for \${2|actor,object,performer|} \${3:target} {
\t\${4}
}`
  }, {
    label: 'macro',
    kind: CompletionItemKind.Snippet,
    insertTextFormat: InsertTextFormat.Snippet,
    insertText: `macro \${1:name}(\${2}) {
\t\${3}
}`
  }, ...START_CONTEXT_KEYWORDS.map(keyword => ({
    label: keyword,
    kind: CompletionItemKind.Keyword,
  }))];
}

function getImportCompletionItems(document: ParsedDocument) {
  const macrosFolder = findMacrosFolder(document.uri);
  if (!macrosFolder) {
    return [];
  }

  const completionItems: CompletionItem[] = [];
  try {
    const macroFiles = readdirSync(macrosFolder);
    for (const macroFile of macroFiles) {
      completionItems.push({
        label: macroFile,
        kind: CompletionItemKind.File,
        insertText: `"${macroFile}`,
      });
    }
  }
  catch (err) {
    connection.console.error(`Error reading macros folder: ${err}`);
  }

  return completionItems;
}