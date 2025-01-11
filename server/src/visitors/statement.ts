import { ParserRuleContext } from "antlr4";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { CallContext, Case_h_menu2Context, Case_h_menuContext, Case_h_opContext, Cntrl_stmtContext, Coro_defContext, Ctx_blockContext, DefaultContext, Else_blockContext, Elseif_blockContext, For_blockContext, For_target_defContext, Forever_blockContext, If_blockContext, If_h_bitContext, If_h_negatableContext, If_h_opContext, If_h_scnContext, If_headerContext, JumpContext, Macro_callContext, MacrodefContext, Message_switch_blockContext, OperationContext, PrimitiveContext, Simple_defContext, Single_case_blockContext, Switch_blockContext, Switch_headerContext, While_blockContext } from "../antlr/ExplorerScriptParser";
import ExplorerScriptVisitor from "../antlr/ExplorerScriptVisitor";
import { StaticConstantStore } from "../data/constantStore";
import { diagnosticForContext } from "../diagnosticHelpers";
import { CompositeSymbolStore, Coroutine, Macro, Routine, SymbolStore } from "../symbols";
import { CompileHandler } from "./compileHandlers/interface";
import { MacroCallCompileHandler } from "./compileHandlers/macroCall";
import { PrimitiveCompileHandler } from "./compileHandlers/primitive";
import { OperationCompileHandler } from "./compileHandlers/operation";

export interface CompilerContext {
  fileSymbols: SymbolStore;
  allSymbols: CompositeSymbolStore;
  staticConstants: StaticConstantStore;
}

// Partially reimplements https://github.com/SkyTemple/ExplorerScript/blob/80170a56a41309ce7dc9ec4798fbc5367b941c49/explorerscript/ssb_converting/compiler/compiler_visitor/statement_visitor.py#L131
export class StatementVisitor extends ExplorerScriptVisitor<void> {
  diagnostics: Diagnostic[] = [];
  private _compilerContext: CompilerContext;
  private _handlerStack: CompileHandler<ParserRuleContext>[] = [];

  private _currentConstantContext: Routine | Coroutine | Macro | undefined;
  private _isInWithBlock = false;

  constructor(fileSymbols: SymbolStore, allSymbols: CompositeSymbolStore, staticConstants: StaticConstantStore) {
    super();
    this._compilerContext = { fileSymbols, allSymbols, staticConstants };
  }

  visitMacrodef = (ctx: MacrodefContext): void => {
    this._currentConstantContext = this._compilerContext.fileSymbols.getItemByCtx(ctx) as Macro;
    this.visitChildren(ctx);
    this._currentConstantContext = undefined;
  }

  visitCoro_def = (ctx: Coro_defContext): void => {
    this._currentConstantContext = this._compilerContext.fileSymbols.getItemByCtx(ctx) as Coroutine;
    this.visitChildren(ctx);
    this._currentConstantContext = undefined;
  }

  visitSimple_def = (ctx: Simple_defContext): void => {
    this._currentConstantContext = this._compilerContext.fileSymbols.getItemByCtx(ctx) as Routine;
    this.visitChildren(ctx);
    this._currentConstantContext = undefined;
  }

  visitFor_target_def = (ctx: For_target_defContext): void => {
    this._currentConstantContext = this._compilerContext.fileSymbols.getItemByCtx(ctx) as Routine;
    this.visitChildren(ctx);
    this._currentConstantContext = undefined;
  }

  visitCntrl_stmt = (_ctx: Cntrl_stmtContext): void => {
    // Nothing to do here
  }

  visitJump = (ctx: JumpContext): void => {
    this._validateJumpTarget(ctx);
  }

  visitCall = (ctx: CallContext): void => {
    this._validateJumpTarget(ctx);
  }
  
  visitCtx_block = (ctx: Ctx_blockContext): void => {
    this._isInWithBlock = true;
    this.visitChildren(ctx);
    this._isInWithBlock = false;
  }

  visitIf_block = (ctx: If_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitElseif_block = (ctx: Elseif_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitElse_block = (ctx: Else_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitIf_header = (_ctx: If_headerContext): void => {
    // TODO
  }

  visitIf_h_negatable = (_ctx: If_h_negatableContext): void => {
    // TODO
  }

  visitIf_h_op = (_ctx: If_h_opContext): void => {
    // TODO
  }

  visitIf_h_bit = (_ctx: If_h_bitContext): void => {
    // TODO
  }

  visitIf_h_scn = (_ctx: If_h_scnContext): void => {
    // TODO
  }

  visitSwitch_block = (ctx: Switch_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitMessage_switch_block = (ctx: Message_switch_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitSingle_case_block = (ctx: Single_case_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitDefault = (ctx: DefaultContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitSwitch_header = (_ctx: Switch_headerContext): void => {
    // TODO
  }

  visitCase_h_menu = (_ctx: Case_h_menuContext): void => {
    // TODO
  }

  visitCase_h_menu2 = (_ctx: Case_h_menu2Context): void => {
    // TODO
  }

  visitCase_h_op = (_ctx: Case_h_opContext): void => {
    // TODO
  }

  visitForever_block = (ctx: Forever_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitFor_block = (ctx: For_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitWhile_Block = (ctx: While_blockContext): void => {
    // TODO
    this.visitChildren(ctx);
  }

  visitAssignment_regular = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitAssignment_clear = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitAssignment_initial = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitAssignment_reset = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitAssignment_adv_log = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitAssignment_dungeon_mode = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitAssignment_scn = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitValue_of = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitScn_var = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitConditional_operator = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitAssign_operator = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitPrimitive = (ctx: PrimitiveContext): void => {
    this._pushHandlerAndAdd(ctx, new PrimitiveCompileHandler(this._compilerContext, this._currentConstantContext));
  }

  visitOperation = (ctx: OperationContext): void => {
    this._pushHandlerAndAdd(ctx, new OperationCompileHandler(this._compilerContext, this._isInWithBlock));
  }

  visitPosition_marker = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitPosition_marker_arg = (_ctx: ParserRuleContext): void => {
    // TODO
  }

  visitLabel = (_ctx: ParserRuleContext): void => {
    // Nothing to do here
  }

  visitMacro_call = (ctx: Macro_callContext): void => {
    this._pushHandlerAndAdd(ctx, new MacroCallCompileHandler(this._compilerContext));
  }

  private _pushHandlerAndAdd<T extends ParserRuleContext>(ctx: T, handler: CompileHandler<T>): void {
    this._handlerStack.push(handler as CompileHandler<ParserRuleContext>);
    this.visitChildren(ctx);
    this.diagnostics.push(...handler.validate(ctx));
    this._handlerStack.pop();
    this._handlerStack[this._handlerStack.length - 1]?.add?.(handler as CompileHandler<ParserRuleContext>);
  }

  private _validateJumpTarget(context: JumpContext | CallContext): void {
    const target = context.IDENTIFIER()?.getText() ?? '';
    if (!this._compilerContext.fileSymbols.getLabelByName(target)) {
      this.diagnostics.push(diagnosticForContext(
        context,
        `Label \`${target}\` is not defined`,
        DiagnosticSeverity.Error
      ));
    }
  }
}
