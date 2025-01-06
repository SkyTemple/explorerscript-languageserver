// Generated from grammars/ExplorerScript.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { StartContext } from "./ExplorerScriptParser.js";
import { Import_stmtContext } from "./ExplorerScriptParser.js";
import { Constant_assignContext } from "./ExplorerScriptParser.js";
import { MacrodefContext } from "./ExplorerScriptParser.js";
import { StmtContext } from "./ExplorerScriptParser.js";
import { Simple_stmtContext } from "./ExplorerScriptParser.js";
import { Cntrl_stmtContext } from "./ExplorerScriptParser.js";
import { JumpContext } from "./ExplorerScriptParser.js";
import { CallContext } from "./ExplorerScriptParser.js";
import { Macro_callContext } from "./ExplorerScriptParser.js";
import { Ctx_blockContext } from "./ExplorerScriptParser.js";
import { If_blockContext } from "./ExplorerScriptParser.js";
import { Elseif_blockContext } from "./ExplorerScriptParser.js";
import { Else_blockContext } from "./ExplorerScriptParser.js";
import { If_headerContext } from "./ExplorerScriptParser.js";
import { If_h_negatableContext } from "./ExplorerScriptParser.js";
import { If_h_opContext } from "./ExplorerScriptParser.js";
import { If_h_bitContext } from "./ExplorerScriptParser.js";
import { If_h_scnContext } from "./ExplorerScriptParser.js";
import { Switch_blockContext } from "./ExplorerScriptParser.js";
import { Message_switch_blockContext } from "./ExplorerScriptParser.js";
import { Single_case_blockContext } from "./ExplorerScriptParser.js";
import { DefaultContext } from "./ExplorerScriptParser.js";
import { Switch_headerContext } from "./ExplorerScriptParser.js";
import { Switch_h_scnContext } from "./ExplorerScriptParser.js";
import { Switch_h_randomContext } from "./ExplorerScriptParser.js";
import { Switch_h_dungeon_modeContext } from "./ExplorerScriptParser.js";
import { Switch_h_sectorContext } from "./ExplorerScriptParser.js";
import { Case_headerContext } from "./ExplorerScriptParser.js";
import { Case_h_menuContext } from "./ExplorerScriptParser.js";
import { Case_h_menu2Context } from "./ExplorerScriptParser.js";
import { Case_h_opContext } from "./ExplorerScriptParser.js";
import { Forever_blockContext } from "./ExplorerScriptParser.js";
import { For_blockContext } from "./ExplorerScriptParser.js";
import { While_blockContext } from "./ExplorerScriptParser.js";
import { AssignmentContext } from "./ExplorerScriptParser.js";
import { Assignment_regularContext } from "./ExplorerScriptParser.js";
import { Assignment_clearContext } from "./ExplorerScriptParser.js";
import { Assignment_initialContext } from "./ExplorerScriptParser.js";
import { Assignment_resetContext } from "./ExplorerScriptParser.js";
import { Assignment_adv_logContext } from "./ExplorerScriptParser.js";
import { Assignment_dungeon_modeContext } from "./ExplorerScriptParser.js";
import { Assignment_scnContext } from "./ExplorerScriptParser.js";
import { Value_ofContext } from "./ExplorerScriptParser.js";
import { Scn_varContext } from "./ExplorerScriptParser.js";
import { Conditional_operatorContext } from "./ExplorerScriptParser.js";
import { Assign_operatorContext } from "./ExplorerScriptParser.js";
import { FuncdefContext } from "./ExplorerScriptParser.js";
import { Simple_defContext } from "./ExplorerScriptParser.js";
import { Coro_defContext } from "./ExplorerScriptParser.js";
import { For_target_defContext } from "./ExplorerScriptParser.js";
import { PrimitiveContext } from "./ExplorerScriptParser.js";
import { OperationContext } from "./ExplorerScriptParser.js";
import { Inline_ctxContext } from "./ExplorerScriptParser.js";
import { Func_suiteContext } from "./ExplorerScriptParser.js";
import { Func_aliasContext } from "./ExplorerScriptParser.js";
import { ArglistContext } from "./ExplorerScriptParser.js";
import { Pos_argumentContext } from "./ExplorerScriptParser.js";
import { Position_markerContext } from "./ExplorerScriptParser.js";
import { Position_marker_argContext } from "./ExplorerScriptParser.js";
import { LabelContext } from "./ExplorerScriptParser.js";
import { StringContext } from "./ExplorerScriptParser.js";
import { Lang_stringContext } from "./ExplorerScriptParser.js";
import { Lang_string_argumentContext } from "./ExplorerScriptParser.js";
import { String_valueContext } from "./ExplorerScriptParser.js";
import { Ctx_headerContext } from "./ExplorerScriptParser.js";
import { For_target_def_targetContext } from "./ExplorerScriptParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ExplorerScriptParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class ExplorerScriptVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.start`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStart?: (ctx: StartContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.import_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_stmt?: (ctx: Import_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.constant_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_assign?: (ctx: Constant_assignContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.macrodef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMacrodef?: (ctx: MacrodefContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.simple_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_stmt?: (ctx: Simple_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.cntrl_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCntrl_stmt?: (ctx: Cntrl_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.jump`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJump?: (ctx: JumpContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCall?: (ctx: CallContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.macro_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMacro_call?: (ctx: Macro_callContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.ctx_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCtx_block?: (ctx: Ctx_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.if_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_block?: (ctx: If_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.elseif_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElseif_block?: (ctx: Elseif_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.else_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElse_block?: (ctx: Else_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.if_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_header?: (ctx: If_headerContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.if_h_negatable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_h_negatable?: (ctx: If_h_negatableContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.if_h_op`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_h_op?: (ctx: If_h_opContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.if_h_bit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_h_bit?: (ctx: If_h_bitContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.if_h_scn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_h_scn?: (ctx: If_h_scnContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.switch_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_block?: (ctx: Switch_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.message_switch_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMessage_switch_block?: (ctx: Message_switch_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.single_case_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingle_case_block?: (ctx: Single_case_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.default`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefault?: (ctx: DefaultContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.switch_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_header?: (ctx: Switch_headerContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.switch_h_scn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_h_scn?: (ctx: Switch_h_scnContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.switch_h_random`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_h_random?: (ctx: Switch_h_randomContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.switch_h_dungeon_mode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_h_dungeon_mode?: (ctx: Switch_h_dungeon_modeContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.switch_h_sector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_h_sector?: (ctx: Switch_h_sectorContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.case_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_header?: (ctx: Case_headerContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.case_h_menu`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_h_menu?: (ctx: Case_h_menuContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.case_h_menu2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_h_menu2?: (ctx: Case_h_menu2Context) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.case_h_op`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_h_op?: (ctx: Case_h_opContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.forever_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForever_block?: (ctx: Forever_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.for_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_block?: (ctx: For_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.while_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhile_block?: (ctx: While_blockContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment_regular`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_regular?: (ctx: Assignment_regularContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment_clear`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_clear?: (ctx: Assignment_clearContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment_initial`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_initial?: (ctx: Assignment_initialContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment_reset`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_reset?: (ctx: Assignment_resetContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment_adv_log`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_adv_log?: (ctx: Assignment_adv_logContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment_dungeon_mode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_dungeon_mode?: (ctx: Assignment_dungeon_modeContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assignment_scn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_scn?: (ctx: Assignment_scnContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.value_of`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_of?: (ctx: Value_ofContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.scn_var`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScn_var?: (ctx: Scn_varContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.conditional_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_operator?: (ctx: Conditional_operatorContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.assign_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssign_operator?: (ctx: Assign_operatorContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.funcdef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncdef?: (ctx: FuncdefContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.simple_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_def?: (ctx: Simple_defContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.coro_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoro_def?: (ctx: Coro_defContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.for_target_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_target_def?: (ctx: For_target_defContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.primitive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitive?: (ctx: PrimitiveContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.operation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperation?: (ctx: OperationContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.inline_ctx`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInline_ctx?: (ctx: Inline_ctxContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.func_suite`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunc_suite?: (ctx: Func_suiteContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.func_alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunc_alias?: (ctx: Func_aliasContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.arglist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArglist?: (ctx: ArglistContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.pos_argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPos_argument?: (ctx: Pos_argumentContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.position_marker`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPosition_marker?: (ctx: Position_markerContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.position_marker_arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPosition_marker_arg?: (ctx: Position_marker_argContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.label`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabel?: (ctx: LabelContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString?: (ctx: StringContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.lang_string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLang_string?: (ctx: Lang_stringContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.lang_string_argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLang_string_argument?: (ctx: Lang_string_argumentContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.string_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_value?: (ctx: String_valueContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.ctx_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCtx_header?: (ctx: Ctx_headerContext) => Result;
	/**
	 * Visit a parse tree produced by `ExplorerScriptParser.for_target_def_target`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_target_def_target?: (ctx: For_target_def_targetContext) => Result;
}

