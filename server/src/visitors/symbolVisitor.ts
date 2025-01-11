import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import ExplorerScriptVisitor from "../antlr/ExplorerScriptVisitor";
import { ContextTargetType, Coroutine, Import, Label, Macro, MacroArg, Routine, SymbolStore, UserConstant } from "../symbols";
import { Constant_assignContext, Coro_defContext, For_target_defContext, Import_stmtContext, MacrodefContext, Simple_defContext } from "../antlr/ExplorerScriptParser";
import { singlelineStringLiteral } from "../utils";
import { diagnosticForContext, diagnosticForToken } from "../diagnosticHelpers";
import { ParserRuleContext } from "antlr4";
import { ScopedSymbolVisitor } from "./scopedConstants";

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
    const import_ = new Import(ctx, file);
    this.symbols.imports.push(import_);
    this.symbols._itemsByCtx.set(ctx, import_);
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
    this.symbols._itemsByCtx.set(ctx, macro);

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
    this.symbols._itemsByCtx.set(ctx, constant);
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
    this.symbols._itemsByCtx.set(ctx, coro);

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
    this.symbols._itemsByCtx.set(ctx, routine);

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
    this.symbols._itemsByCtx.set(ctx, routine);

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