import { CompletionItem, CompletionItemKind, Diagnostic, DiagnosticSeverity, ParameterInformation, Range, SignatureInformation, SymbolInformation, SymbolKind } from "vscode-languageserver";
import { Constant_assignContext, Coro_defContext, For_target_defContext, Import_stmtContext, LabelContext, MacrodefContext, PrimitiveContext, Simple_defContext } from "../antlr/ExplorerScriptParser.js";
import ExplorerScriptVisitor from "../antlr/ExplorerScriptVisitor.js";
import { getCtxRange, getTokenRange, singlelineStringLiteral } from "../utils.js";
import { diagnosticForContext, diagnosticForToken } from "../diagnosticHelpers.js";
import { ParserRuleContext, TerminalNode } from "antlr4";
import { ScopedSymbolVisitor } from "./scopedConstants.js";
import { findParentRuleContext } from "../parseHelpers.js";

export type Symbol = Import | UserConstant | Macro | Routine | Coroutine | Label;
type ContextTargetType = 'actor' | 'object' | 'performer';

export class SymbolStore {
  imports: Import[] = [];
  macros: Macro[] = [];
  _macrosByName: Map<string, Macro> = new Map();
  constants: UserConstant[] = [];
  _constantsByName: Map<string, UserConstant> = new Map();
  routines: Routine[] = [];
  coroutines: Coroutine[] = [];
  _coroutinesByName: Map<string, Coroutine> = new Map();
  labels: Label[] = [];
  _labelsByName: Map<string, Label> = new Map();

  constructor(public documentUri: string) { }

  allSymbols(): Symbol[] {
    return [
      ...this.imports,
      ...this.macros,
      ...this.constants,
      ...this.routines,
      ...this.coroutines,
      ...this.labels
    ];
  }

  getMacroByName(name: string): Macro | undefined {
    return this._macrosByName.get(name);
  }

  getGlobalConstantByName(name: string): UserConstant | undefined {
    return this._constantsByName.get(name);
  }

  getCoroutineByName(name: string): Coroutine | undefined {
    return this._coroutinesByName.get(name);
  }

  getLabelByName(name: string): Label | undefined {
    return this._labelsByName.get(name);
  }

  // Remove references to the ANTLR parse tree to allow GC to clean up
  removeParseTreeReferences() {
    for (let symbol of this.allSymbols()) {
      symbol.ctx = undefined;
    }
  }
}

export class Import {
  ctx?: Import_stmtContext;
  range: Range;
  file: string;

  constructor(ctx: Import_stmtContext, file: string) {
    this.ctx = ctx;
    this.range = getCtxRange(ctx);
    this.file = file;
  }
}

export class UserConstant {
  ctx?: Constant_assignContext;
  range: Range;
  name: string;

  constructor(ctx: Constant_assignContext, name: string) {
    this.ctx = ctx;
    this.range = getCtxRange(ctx);
    this.name = name;
  }
}

export class Macro {
  ctx?: MacrodefContext;
  range: Range;
  name: string;
  args: MacroArg[];
  scopedConstants: UserConstant[];

  constructor(ctx: MacrodefContext, name: string, args: MacroArg[], scopedConstants: UserConstant[]) {
    this.ctx = ctx;
    this.range = getCtxRange(ctx);
    this.name = name;
    this.args = args;
    this.scopedConstants = scopedConstants;
  }
}

export class MacroArg {
  ctx?: TerminalNode;
  range: Range;
  name: string;

  constructor(ctx: TerminalNode, name: string) {
    this.ctx = ctx;
    this.range = getTokenRange(ctx.symbol);
    this.name = name;
  }
}

export class Routine {
  ctx?: Simple_defContext | For_target_defContext;
  range: Range;
  id: number;
  contextTy?: ContextTargetType;
  context?: PrimitiveContext
  scopedConstants: UserConstant[];

  constructor(ctx: Simple_defContext | For_target_defContext, id: number, scopedConstants: UserConstant[], contextTy?: ContextTargetType, context?: PrimitiveContext) {
    this.ctx = ctx;
    this.range = getCtxRange(ctx);
    this.id = id;
    this.contextTy = contextTy;
    this.context = context;
    this.scopedConstants = scopedConstants
  }
}

export class Coroutine {
  ctx?: Coro_defContext;
  range: Range;
  name: string;
  scopedConstants: UserConstant[];

  constructor(ctx: Coro_defContext, name: string, scopedConstants: UserConstant[]) {
    this.ctx = ctx;
    this.range = getCtxRange(ctx);
    this.name = name;
    this.scopedConstants = scopedConstants;
  }
}

export class Label {
  ctx?: LabelContext;
  range: Range;
  name: string;
  parent?: Routine | Macro | Coroutine;

  constructor(ctx: LabelContext, name: string) {
    this.ctx = ctx;
    this.range = getCtxRange(ctx);
    this.name = name;
  }
}

export class SymbolVisitor extends ExplorerScriptVisitor<void> {
  macroAndConstantsOnly: boolean;

  diagnostics: Diagnostic[] = [];

  symbols: SymbolStore;
  routineIds: Set<number> = new Set();

  constructor(documentUri: string, macrosAndConstantsOnly: boolean) {
    super();
    this.symbols = new SymbolStore(documentUri);
    this.macroAndConstantsOnly = macrosAndConstantsOnly;
  }

  visitImport_stmt = (ctx: Import_stmtContext) => {
    if (!ctx.STRING_LITERAL()) {
      return;
    }

    const file = singlelineStringLiteral(ctx.STRING_LITERAL().getText());
    this.symbols.imports.push(new Import(ctx, file));
  }

  visitMacrodef = (ctx: MacrodefContext) => {
    if (!ctx.IDENTIFIER()) {
      return;
    }

    const ident = ctx.IDENTIFIER().getText();
    if (this.symbols._macrosByName.has(ident)) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Macro \`${ident}\` is already defined`,
        DiagnosticSeverity.Warning
      ));
    }

    const args: MacroArg[] = [];
    for (const ident of ctx.VARIABLE_list()) {
      const name = ident.getText();
      args.push(new MacroArg(ident, name));

      if (name.startsWith('$')) {
        this.diagnostics.push(diagnosticForToken(
          ident.symbol,
          `Macro argument names should start with '%' instead of '$'`,
          DiagnosticSeverity.Warning
        ));
      }
    }

    const { constants: scopedConstants, labels, diagnostics } = collectScopedSymbols(ctx, this.symbols._constantsByName, this.symbols._labelsByName);
    this.diagnostics.push(...diagnostics);

    const macro = new Macro(ctx, ident, args, scopedConstants);
    this.symbols.macros.push(macro);
    this.symbols._macrosByName.set(ident, macro);

    for (let label of labels) {
      // Turns out that Skemple is understandably weird about labels in macros.
      // They technically compile, but they're useless in Macro-only scripts because they can apparently only be referenced in their own file.
      // TODO: consider adding a warning in the future?
      label.parent = macro;
      this.symbols.labels.push(label);
    }
  }

  visitConstant_assign = (ctx: Constant_assignContext) => {
    if (!ctx.IDENTIFIER()) {
      return;
    }
    const name = ctx.IDENTIFIER().getText();

    if (this.symbols._constantsByName.has(name)) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Constant \`${name}\` is already defined`,
        DiagnosticSeverity.Warning
      ));
    }

    const constant = new UserConstant(ctx, name);
    this.symbols.constants.push(constant);
    this.symbols._constantsByName.set(name, constant);
  }

  visitCoro_def = (ctx: Coro_defContext) => {
    if (this.macroAndConstantsOnly) {
      this.diagnostics.push(routinesInMacroScriptError(ctx));
    }

    if (this.symbols.routines.length > 0) {
      this.diagnostics.push(mixedRoutinesError(ctx));
    }

    if (!ctx.IDENTIFIER()) {
      return;
    }

    const name = ctx.IDENTIFIER().getText();
    if (this.symbols._coroutinesByName.has(name)) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Coroutine \`${name}\` is already defined`,
        DiagnosticSeverity.Warning
      ));
    }

    const { constants: scopedConstants, labels, diagnostics } = collectScopedSymbols(ctx, this.symbols._constantsByName, this.symbols._labelsByName);
    this.diagnostics.push(...diagnostics);
    const coro = new Coroutine(ctx, name, scopedConstants);
    this.symbols.coroutines.push(coro);
    this.symbols._coroutinesByName.set(name, coro);

    for (let label of labels) {
      label.parent = coro;
      this.symbols.labels.push(label);
    }
  }

  visitSimple_def = (ctx: Simple_defContext) => {
    if (this.macroAndConstantsOnly) {
      this.diagnostics.push(routinesInMacroScriptError(ctx));
    }

    if (this.symbols.coroutines.length > 0) {
      this.diagnostics.push(mixedRoutinesError(ctx));
    }

    if (!ctx.INTEGER()) {
      return;
    }

    const id = parseInt(ctx.INTEGER().getText(), 10);
    if (this.routineIds.has(id)) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Routine ID ${id} is already defined`,
        DiagnosticSeverity.Warning
      ));
    } else if (id !== 0) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Non-targeted routine ID ${id} is not the main routine (ID 0)`,
        DiagnosticSeverity.Warning
      ));
    }

    this.routineIds.add(id);

    const { constants: scopedConstants, labels, diagnostics } = collectScopedSymbols(ctx, this.symbols._constantsByName, this.symbols._labelsByName);
    this.diagnostics.push(...diagnostics);
    const routine = new Routine(ctx, id, scopedConstants);
    this.symbols.routines.push(routine);

    for (let label of labels) {
      label.parent = routine;
      this.symbols.labels.push(label);
    }
  }

  visitFor_target_def = (ctx: For_target_defContext) => {
    if (this.macroAndConstantsOnly) {
      this.diagnostics.push(routinesInMacroScriptError(ctx));
    }

    if (this.symbols.coroutines.length > 0) {
      this.diagnostics.push(mixedRoutinesError(ctx));
    }

    if (!ctx.INTEGER()) {
      return;
    }

    const id = parseInt(ctx.INTEGER().getText(), 10);
    if (this.routineIds.has(id)) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Routine ID ${id} is already defined`,
        DiagnosticSeverity.Warning
      ));
    } else if (id === 0) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Routine ID 0 should not be used for a targeted routine`,
        DiagnosticSeverity.Warning
      ));
    }
    this.routineIds.add(id);

    let target: ContextTargetType;
    let def_target = ctx.for_target_def_target();
    if (def_target.FOR_TARGET()) {
      target = def_target.FOR_TARGET().getText().slice(4) as ContextTargetType;
    } else {
      target = def_target.IDENTIFIER()!.getText() as ContextTargetType;
    }

    let context = ctx.primitive();
    if (!context) {
      return;
    }

    const { constants: scopedConstants, labels, diagnostics } = collectScopedSymbols(ctx, this.symbols._constantsByName, this.symbols._labelsByName);
    this.diagnostics.push(...diagnostics);
    let routine = new Routine(ctx, id, scopedConstants, target, context);
    this.symbols.routines.push(routine);
    for (let label of labels) {
      label.parent = routine;
      this.symbols.labels.push(label);
    }
  }
}

function collectScopedSymbols(ctx: ParserRuleContext, globalConstantsByName: Map<string, UserConstant>, labelsByName: Map<string, Label>): { constants: UserConstant[], labels: Label[], diagnostics: Diagnostic[] } {
  const scopedConstantVisitor = new ScopedSymbolVisitor(globalConstantsByName, labelsByName);
  scopedConstantVisitor.visit(ctx);
  const labels = scopedConstantVisitor.scopeLabels;
  for (let label of labels) {
    labelsByName.set(label.name, label);
  }
  return {
    constants: scopedConstantVisitor.scopeConstants,
    labels,
    diagnostics: scopedConstantVisitor.diagnostics
  };
}

function routinesInMacroScriptError(ctx: ParserRuleContext): Diagnostic {
  return diagnosticForContext(
    ctx,
    `Macro scripts must not contain any routines`,
    DiagnosticSeverity.Error
  );
}

function mixedRoutinesError(ctx: ParserRuleContext): Diagnostic {
  return diagnosticForContext(
    ctx,
    `Coroutines and routines must not be mixed in the same script`,
    DiagnosticSeverity.Error
  );
}

export function toSymbolInformation(documentUri: string, store: SymbolStore, includeLabels: boolean): SymbolInformation[] {
  let symbols: SymbolInformation[] = [];

  const addScopedConstants = (scopedConstants: UserConstant[], containerName?: string) => {
    for (let constant of scopedConstants) {
      symbols.push({
        name: constant.name,
        kind: SymbolKind.Constant,
        location: {
          uri: documentUri,
          range: constant.range
        },
        containerName
      });
    }
  }

  // Handle constants
  for (let constant of store.constants) {
    symbols.push({
      name: constant.name,
      kind: SymbolKind.Constant,
      location: {
        uri: documentUri,
        range: constant.range
      }
    });
  }

  // Handle macros
  for (let macro of store.macros) {
    const name = `macro ${macro.name}`;
    symbols.push({
      name,
      kind: SymbolKind.Function,
      location: {
        uri: documentUri,
        range: macro.range
      }
    });

    for (let arg of macro.args) {
      symbols.push({
        name: arg.name,
        kind: SymbolKind.Variable,
        location: {
          uri: documentUri,
          range: arg.range
        },
        containerName: name
      });
    }

    addScopedConstants(macro.scopedConstants, name);
  }

  // Handle routines
  for (let routine of store.routines) {
    let name = `def ${routine.id}`;
    if (routine.context) {
      name += ` (${routine.context.getText()})`;
    }

    symbols.push({
      name,
      kind: SymbolKind.Event,
      location: {
        uri: documentUri,
        range: routine.range
      }
    });

    addScopedConstants(routine.scopedConstants, name);
  }

  // Handle coroutines
  for (let coro of store.coroutines) {
    let name = `coro ${coro.name}`;
    symbols.push({
      name,
      kind: SymbolKind.Event,
      location: {
        uri: documentUri,
        range: coro.range
      }
    });

    addScopedConstants(coro.scopedConstants, name);
  }

  // Labels
  if (includeLabels) {
    for (let label of store.labels) {
      let name = label.name;
      if (label.parent) {
        name = '@' + name;
      }

      let containerName: string | undefined;
      if (label.parent instanceof Macro) {
        containerName = `macro ${label.parent.name}`;
      } else if (label.parent instanceof Routine) {
        if (label.parent.context) {
          containerName = `def ${label.parent.id} (${label.parent.context.getText()})`;
        } else {
          containerName = `def ${label.parent.id}`;
        }
      } else if (label.parent instanceof Coroutine) {
        containerName = `coro ${label.parent.name}`;
      }

      symbols.push({
        name,
        kind: SymbolKind.String,
        location: {
          uri: documentUri,
          range: label.range,
        },
        containerName
      });
    }
  }

  return symbols;
}
export function createCurrentFileCompletionItems(store: SymbolStore | CompositeSymbolStore): CompletionItem[] {
  const completions: CompletionItem[] = [];

  for (let macro of store.macros) {
    completions.push({
      label: macro.name,
      kind: CompletionItemKind.Function,
      detail: buildMacroDetailString(macro),
      insertText: buildMacroInsertText(macro)
    });
  }

  for (let constant of store.constants) {
    completions.push({
      label: constant.name,
      kind: CompletionItemKind.Constant
    });
  }

  // Labels have to exist in a scope, but they're actually global in the script
  for (let label of store.labels) {
    completions.push({
      label: label.name,
      kind: CompletionItemKind.Reference,
      insertText: '@' + label.name
    });
  }

  return completions;
}

export function createScopedCompletionItems(store: SymbolStore, context: ParserRuleContext): CompletionItem[] {
  const completions: CompletionItem[] = [];
  const itemsByCtx = new Map<ParserRuleContext, Symbol>();

  // Map items to their contexts
  for (let item of store.allSymbols()) {
    itemsByCtx.set(item.ctx!, item);
  }

  const addScopedConstants = (constants: UserConstant[]) => {
    for (let constant of constants) {
      completions.push({
        label: constant.name,
        kind: CompletionItemKind.Constant
      });
    }
  };

  // Handle macro scope
  const macroDef = findParentRuleContext(context, MacrodefContext);
  if (macroDef) {
    const macro = itemsByCtx.get(macroDef) as Macro | undefined;
    if (macro) {
      for (let arg of macro.args) {
        completions.push({
          label: arg.name,
          kind: CompletionItemKind.Variable
        });
      }
      addScopedConstants(macro.scopedConstants);
    }
  }

  // Handle routine scope
  const routineDef = findParentRuleContext(context, Simple_defContext) ||
    findParentRuleContext(context, For_target_defContext);
  if (routineDef) {
    const routine = itemsByCtx.get(routineDef) as Routine | undefined;
    if (routine) {
      addScopedConstants(routine.scopedConstants);
    }
  }

  // Handle coroutine scope
  const coroDef = findParentRuleContext(context, Coro_defContext);
  if (coroDef) {
    const coro = itemsByCtx.get(coroDef) as Coroutine | undefined;
    if (coro) {
      addScopedConstants(coro.scopedConstants);
    }
  }

  return completions;
}

function buildMacroInsertText(macro: Macro): string {
  return macro.args.length > 0 ? `${macro.name}` : `${macro.name}();`;
}

export function buildMacroDetailString(macro: Macro): string {
  const args = macro.args.map(arg => arg.name).join(', ');
  return `${macro.name}(${args})`;
}

export function getMacroSignatureInfo(macro: Macro): SignatureInformation {
  const args: ParameterInformation[] = macro.args.map(arg => ({
    label: arg.name
  }));
  return {
    label: buildMacroDetailString(macro),
    parameters: args
  };
}

interface SymbolSource {
  documentUri: string;
}

// A symbol store that combines multiple symbol stores.
export class CompositeSymbolStore {
  private _imports?: readonly (Import & SymbolSource)[];
  private _macros?: readonly (Macro & SymbolSource)[];
  private _constants?: readonly (UserConstant & SymbolSource)[];
  private _routines?: readonly (Routine & SymbolSource)[];
  private _coroutines?: readonly (Coroutine & SymbolSource)[];
  private _labels?: readonly (Label & SymbolSource)[];
  private _allSymbols?: readonly (Symbol & SymbolSource)[];

  constructor(public stores: SymbolStore[]) { }

  get imports(): readonly (Import & SymbolSource)[] {
    if (!this._imports) {
      this._imports = this.stores.flatMap(store => store.imports.map(i => ({ ...i, documentUri: store.documentUri })));
    }
    return this._imports;
  }

  get macros(): readonly (Macro & SymbolSource)[] {
    if (!this._macros) {
      this._macros = this.stores.flatMap(store => store.macros.map(m => ({ ...m, documentUri: store.documentUri })));
    }
    return this._macros;
  }

  get constants(): readonly (UserConstant & SymbolSource)[] {
    if (!this._constants) {
      this._constants = this.stores.flatMap(store => store.constants.map(c => ({ ...c, documentUri: store.documentUri })));
    }
    return this._constants;
  }

  get routines(): readonly (Routine & SymbolSource)[] {
    if (!this._routines) {
      this._routines = this.stores.flatMap(store => store.routines.map(r => ({ ...r, documentUri: store.documentUri })));
    }
    return this._routines;
  }

  get coroutines(): readonly (Coroutine & SymbolSource)[] {
    if (!this._coroutines) {
      this._coroutines = this.stores.flatMap(store => store.coroutines.map(c => ({ ...c, documentUri: store.documentUri })));
    }
    return this._coroutines;
  }

  get labels(): readonly (Label & SymbolSource)[] {
    if (!this._labels) {
      this._labels = this.stores.flatMap(store => store.labels.map(l => ({ ...l, documentUri: store.documentUri })));
    }
    return this._labels;
  }

  allSymbols(): readonly (Symbol & SymbolSource)[] {
    if (!this._allSymbols) {
      this._allSymbols = [
        ...this.imports,
        ...this.macros,
        ...this.constants,
        ...this.routines,
        ...this.coroutines,
        ...this.labels
      ];
    }
    return this._allSymbols;
  }

  getMacroByName(name: string): (Macro & SymbolSource) | undefined {
    for (let store of this.stores) {
      const macro = store.getMacroByName(name);
      if (macro) {
        return { ...macro, documentUri: store.documentUri };
      }
    }
    return undefined;
  }

  getGlobalConstantByName(name: string): (UserConstant & SymbolSource) | undefined {
    for (let store of this.stores) {
      const constant = store.getGlobalConstantByName(name);
      if (constant) {
        return { ...constant, documentUri: store.documentUri };
      }
    }
    return undefined;
  }

  getLabelByName(name: string): (Label & SymbolSource) | undefined {
    for (let store of this.stores) {
      const label = store.getLabelByName(name);
      if (label) {
        return { ...label, documentUri: store.documentUri };
      }
    }
    return undefined;
  }
}
