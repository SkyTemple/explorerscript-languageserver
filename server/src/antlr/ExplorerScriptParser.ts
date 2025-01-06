// Generated from grammars/ExplorerScript.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException,
	Parser, ParserATNSimulator,
	ParserRuleContext, PredictionContextCache,
	TerminalNode,
	Token, TokenStream,
} from 'antlr4';
import ExplorerScriptVisitor from "./ExplorerScriptVisitor.js";

export default class ExplorerScriptParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly OP_FALSE = 2;
	public static readonly OP_TRUE = 3;
	public static readonly ASSIGN = 4;
	public static readonly OPEN_SHARP = 5;
	public static readonly CLOSE_SHARP = 6;
	public static readonly OP_EQ = 7;
	public static readonly OP_LE = 8;
	public static readonly OP_GE = 9;
	public static readonly OP_NEQ = 10;
	public static readonly OP_AND = 11;
	public static readonly OP_XOR = 12;
	public static readonly OP_BICH = 13;
	public static readonly OP_MINUS = 14;
	public static readonly OP_PLUS = 15;
	public static readonly OP_MULTIPLY = 16;
	public static readonly OP_DIVIDE = 17;
	public static readonly OR = 18;
	public static readonly NOT = 19;
	public static readonly JUMP = 20;
	public static readonly CALL = 21;
	public static readonly IMPORT = 22;
	public static readonly CONST = 23;
	public static readonly MACRO = 24;
	public static readonly IF = 25;
	public static readonly ELSEIF = 26;
	public static readonly ELSE = 27;
	public static readonly FOREVER = 28;
	public static readonly WITH = 29;
	public static readonly SWITCH = 30;
	public static readonly RETURN = 31;
	public static readonly END = 32;
	public static readonly HOLD = 33;
	public static readonly CONTINUE = 34;
	public static readonly BREAK = 35;
	public static readonly BREAK_LOOP = 36;
	public static readonly VALUE = 37;
	public static readonly DEBUG = 38;
	public static readonly EDIT = 39;
	public static readonly VARIATION = 40;
	public static readonly RANDOM = 41;
	public static readonly SECTOR = 42;
	public static readonly DUNGEON_MODE = 43;
	public static readonly MENU2 = 44;
	public static readonly MENU = 45;
	public static readonly CASE = 46;
	public static readonly DEFAULT = 47;
	public static readonly CLEAR = 48;
	public static readonly RESET = 49;
	public static readonly INIT = 50;
	public static readonly SCN = 51;
	public static readonly DUNGEON_RESULT = 52;
	public static readonly ADVENTURE_LOG = 53;
	public static readonly MESSAGE_SWITCH_TALK = 54;
	public static readonly MESSAGE_SWITCH_MONOLOGUE = 55;
	public static readonly WHILE = 56;
	public static readonly OPEN_BRACKET = 57;
	public static readonly CLOSE_BRACKET = 58;
	public static readonly STRING_LITERAL = 59;
	public static readonly MULTILINE_STRING_LITERAL = 60;
	public static readonly FOR_TARGET = 61;
	public static readonly CORO = 62;
	public static readonly DEF = 63;
	public static readonly FOR_ACTOR = 64;
	public static readonly FOR_OBJECT = 65;
	public static readonly FOR_PERFORMER = 66;
	public static readonly ALIAS = 67;
	public static readonly FOR = 68;
	public static readonly PREVIOUS = 69;
	public static readonly POSITION = 70;
	public static readonly IDENTIFIER = 71;
	public static readonly VARIABLE = 72;
	public static readonly MACRO_CALL = 73;
	public static readonly INTEGER = 74;
	public static readonly DECIMAL_INTEGER = 75;
	public static readonly OCT_INTEGER = 76;
	public static readonly HEX_INTEGER = 77;
	public static readonly BIN_INTEGER = 78;
	public static readonly OPEN_PAREN = 79;
	public static readonly CLOSE_PAREN = 80;
	public static readonly COMMA = 81;
	public static readonly COLON = 82;
	public static readonly PLUS = 83;
	public static readonly AT = 84;
	public static readonly PARAGRAPH = 85;
	public static readonly OPEN_BRACE = 86;
	public static readonly CLOSE_BRACE = 87;
	public static readonly DECIMAL = 88;
	public static readonly SKIP_ = 89;
	public static readonly UNKNOWN_CHAR = 90;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_start = 0;
	public static readonly RULE_import_stmt = 1;
	public static readonly RULE_constant_assign = 2;
	public static readonly RULE_macrodef = 3;
	public static readonly RULE_stmt = 4;
	public static readonly RULE_simple_stmt = 5;
	public static readonly RULE_cntrl_stmt = 6;
	public static readonly RULE_jump = 7;
	public static readonly RULE_call = 8;
	public static readonly RULE_macro_call = 9;
	public static readonly RULE_ctx_block = 10;
	public static readonly RULE_if_block = 11;
	public static readonly RULE_elseif_block = 12;
	public static readonly RULE_else_block = 13;
	public static readonly RULE_if_header = 14;
	public static readonly RULE_if_h_negatable = 15;
	public static readonly RULE_if_h_op = 16;
	public static readonly RULE_if_h_bit = 17;
	public static readonly RULE_if_h_scn = 18;
	public static readonly RULE_switch_block = 19;
	public static readonly RULE_message_switch_block = 20;
	public static readonly RULE_single_case_block = 21;
	public static readonly RULE_default = 22;
	public static readonly RULE_switch_header = 23;
	public static readonly RULE_switch_h_scn = 24;
	public static readonly RULE_switch_h_random = 25;
	public static readonly RULE_switch_h_dungeon_mode = 26;
	public static readonly RULE_switch_h_sector = 27;
	public static readonly RULE_case_header = 28;
	public static readonly RULE_case_h_menu = 29;
	public static readonly RULE_case_h_menu2 = 30;
	public static readonly RULE_case_h_op = 31;
	public static readonly RULE_forever_block = 32;
	public static readonly RULE_for_block = 33;
	public static readonly RULE_while_block = 34;
	public static readonly RULE_assignment = 35;
	public static readonly RULE_assignment_regular = 36;
	public static readonly RULE_assignment_clear = 37;
	public static readonly RULE_assignment_initial = 38;
	public static readonly RULE_assignment_reset = 39;
	public static readonly RULE_assignment_adv_log = 40;
	public static readonly RULE_assignment_dungeon_mode = 41;
	public static readonly RULE_assignment_scn = 42;
	public static readonly RULE_value_of = 43;
	public static readonly RULE_scn_var = 44;
	public static readonly RULE_conditional_operator = 45;
	public static readonly RULE_assign_operator = 46;
	public static readonly RULE_funcdef = 47;
	public static readonly RULE_simple_def = 48;
	public static readonly RULE_coro_def = 49;
	public static readonly RULE_for_target_def = 50;
	public static readonly RULE_primitive = 51;
	public static readonly RULE_operation = 52;
	public static readonly RULE_inline_ctx = 53;
	public static readonly RULE_func_suite = 54;
	public static readonly RULE_func_alias = 55;
	public static readonly RULE_arglist = 56;
	public static readonly RULE_pos_argument = 57;
	public static readonly RULE_position_marker = 58;
	public static readonly RULE_position_marker_arg = 59;
	public static readonly RULE_label = 60;
	public static readonly RULE_string = 61;
	public static readonly RULE_lang_string = 62;
	public static readonly RULE_lang_string_argument = 63;
	public static readonly RULE_string_value = 64;
	public static readonly RULE_ctx_header = 65;
	public static readonly RULE_for_target_def_target = 66;
	public static readonly literalNames: (string | null)[] = [ null, "';'", 
                                                            "'FALSE'", "'TRUE'", 
                                                            "'='", "'<'", 
                                                            "'>'", "'=='", 
                                                            "'<='", "'>='", 
                                                            "'!='", "'&'", 
                                                            "'^'", "'&<<'", 
                                                            "'-='", "'+='", 
                                                            "'*='", "'/='", 
                                                            "'||'", "'not'", 
                                                            "'jump'", "'call'", 
                                                            "'import'", 
                                                            "'const'", "'macro'", 
                                                            "'if'", "'elseif'", 
                                                            "'else'", "'forever'", 
                                                            "'with'", "'switch'", 
                                                            "'return'", 
                                                            "'end'", "'hold'", 
                                                            "'continue'", 
                                                            "'break'", "'break_loop'", 
                                                            "'value'", "'debug'", 
                                                            "'edit'", "'variation'", 
                                                            "'random'", 
                                                            "'sector'", 
                                                            "'dungeon_mode'", 
                                                            "'menu2'", "'menu'", 
                                                            "'case'", "'default'", 
                                                            "'clear'", "'reset'", 
                                                            "'init'", "'scn'", 
                                                            "'dungeon_result'", 
                                                            "'adventure_log'", 
                                                            "'message_SwitchTalk'", 
                                                            "'message_SwitchMonologue'", 
                                                            "'while'", "'['", 
                                                            "']'", null, 
                                                            null, null, 
                                                            "'coro'", "'def'", 
                                                            "'for_actor'", 
                                                            "'for_object'", 
                                                            "'for_performer'", 
                                                            "'alias'", "'for'", 
                                                            "'previous'", 
                                                            "'Position'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'('", "')'", 
                                                            "','", "':'", 
                                                            "'+'", "'@'", 
                                                            "'\\u00A7'", 
                                                            "'{'", "'}'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             "OP_FALSE", 
                                                             "OP_TRUE", 
                                                             "ASSIGN", "OPEN_SHARP", 
                                                             "CLOSE_SHARP", 
                                                             "OP_EQ", "OP_LE", 
                                                             "OP_GE", "OP_NEQ", 
                                                             "OP_AND", "OP_XOR", 
                                                             "OP_BICH", 
                                                             "OP_MINUS", 
                                                             "OP_PLUS", 
                                                             "OP_MULTIPLY", 
                                                             "OP_DIVIDE", 
                                                             "OR", "NOT", 
                                                             "JUMP", "CALL", 
                                                             "IMPORT", "CONST", 
                                                             "MACRO", "IF", 
                                                             "ELSEIF", "ELSE", 
                                                             "FOREVER", 
                                                             "WITH", "SWITCH", 
                                                             "RETURN", "END", 
                                                             "HOLD", "CONTINUE", 
                                                             "BREAK", "BREAK_LOOP", 
                                                             "VALUE", "DEBUG", 
                                                             "EDIT", "VARIATION", 
                                                             "RANDOM", "SECTOR", 
                                                             "DUNGEON_MODE", 
                                                             "MENU2", "MENU", 
                                                             "CASE", "DEFAULT", 
                                                             "CLEAR", "RESET", 
                                                             "INIT", "SCN", 
                                                             "DUNGEON_RESULT", 
                                                             "ADVENTURE_LOG", 
                                                             "MESSAGE_SWITCH_TALK", 
                                                             "MESSAGE_SWITCH_MONOLOGUE", 
                                                             "WHILE", "OPEN_BRACKET", 
                                                             "CLOSE_BRACKET", 
                                                             "STRING_LITERAL", 
                                                             "MULTILINE_STRING_LITERAL", 
                                                             "FOR_TARGET", 
                                                             "CORO", "DEF", 
                                                             "FOR_ACTOR", 
                                                             "FOR_OBJECT", 
                                                             "FOR_PERFORMER", 
                                                             "ALIAS", "FOR", 
                                                             "PREVIOUS", 
                                                             "POSITION", 
                                                             "IDENTIFIER", 
                                                             "VARIABLE", 
                                                             "MACRO_CALL", 
                                                             "INTEGER", 
                                                             "DECIMAL_INTEGER", 
                                                             "OCT_INTEGER", 
                                                             "HEX_INTEGER", 
                                                             "BIN_INTEGER", 
                                                             "OPEN_PAREN", 
                                                             "CLOSE_PAREN", 
                                                             "COMMA", "COLON", 
                                                             "PLUS", "AT", 
                                                             "PARAGRAPH", 
                                                             "OPEN_BRACE", 
                                                             "CLOSE_BRACE", 
                                                             "DECIMAL", 
                                                             "SKIP_", "UNKNOWN_CHAR" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"start", "import_stmt", "constant_assign", "macrodef", "stmt", "simple_stmt", 
		"cntrl_stmt", "jump", "call", "macro_call", "ctx_block", "if_block", "elseif_block", 
		"else_block", "if_header", "if_h_negatable", "if_h_op", "if_h_bit", "if_h_scn", 
		"switch_block", "message_switch_block", "single_case_block", "default", 
		"switch_header", "switch_h_scn", "switch_h_random", "switch_h_dungeon_mode", 
		"switch_h_sector", "case_header", "case_h_menu", "case_h_menu2", "case_h_op", 
		"forever_block", "for_block", "while_block", "assignment", "assignment_regular", 
		"assignment_clear", "assignment_initial", "assignment_reset", "assignment_adv_log", 
		"assignment_dungeon_mode", "assignment_scn", "value_of", "scn_var", "conditional_operator", 
		"assign_operator", "funcdef", "simple_def", "coro_def", "for_target_def", 
		"primitive", "operation", "inline_ctx", "func_suite", "func_alias", "arglist", 
		"pos_argument", "position_marker", "position_marker_arg", "label", "string", 
		"lang_string", "lang_string_argument", "string_value", "ctx_header", "for_target_def_target",
	];
	public get grammarFileName(): string { return "ExplorerScript.g4"; }
	public get literalNames(): (string | null)[] { return ExplorerScriptParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return ExplorerScriptParser.symbolicNames; }
	public get ruleNames(): string[] { return ExplorerScriptParser.ruleNames; }
	public get serializedATN(): number[] { return ExplorerScriptParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, ExplorerScriptParser._ATN, ExplorerScriptParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public start(): StartContext {
		let localctx: StartContext = new StartContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, ExplorerScriptParser.RULE_start);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 134;
				this.import_stmt();
				}
				}
				this.state = 139;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===23 || _la===24 || _la===62 || _la===63) {
				{
				this.state = 143;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 24:
					{
					this.state = 140;
					this.macrodef();
					}
					break;
				case 62:
				case 63:
					{
					this.state = 141;
					this.funcdef();
					}
					break;
				case 23:
					{
					this.state = 142;
					this.constant_assign();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 147;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 148;
			this.match(ExplorerScriptParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public import_stmt(): Import_stmtContext {
		let localctx: Import_stmtContext = new Import_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, ExplorerScriptParser.RULE_import_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 150;
			this.match(ExplorerScriptParser.IMPORT);
			this.state = 151;
			this.match(ExplorerScriptParser.STRING_LITERAL);
			this.state = 152;
			this.match(ExplorerScriptParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constant_assign(): Constant_assignContext {
		let localctx: Constant_assignContext = new Constant_assignContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, ExplorerScriptParser.RULE_constant_assign);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 154;
			this.match(ExplorerScriptParser.CONST);
			this.state = 155;
			this.match(ExplorerScriptParser.IDENTIFIER);
			this.state = 156;
			this.match(ExplorerScriptParser.ASSIGN);
			this.state = 157;
			this.primitive();
			this.state = 158;
			this.match(ExplorerScriptParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public macrodef(): MacrodefContext {
		let localctx: MacrodefContext = new MacrodefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, ExplorerScriptParser.RULE_macrodef);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 160;
			this.match(ExplorerScriptParser.MACRO);
			this.state = 161;
			this.match(ExplorerScriptParser.IDENTIFIER);
			this.state = 162;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 164;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===72) {
				{
				this.state = 163;
				this.match(ExplorerScriptParser.VARIABLE);
				}
			}

			this.state = 170;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===81) {
				{
				{
				this.state = 166;
				this.match(ExplorerScriptParser.COMMA);
				this.state = 167;
				this.match(ExplorerScriptParser.VARIABLE);
				}
				}
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 173;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 174;
			this.func_suite();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stmt(): StmtContext {
		let localctx: StmtContext = new StmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, ExplorerScriptParser.RULE_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 23:
				{
				this.state = 176;
				this.constant_assign();
				}
				break;
			case 20:
			case 21:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 43:
			case 48:
			case 49:
			case 50:
			case 53:
			case 59:
			case 60:
			case 71:
			case 72:
			case 74:
			case 84:
			case 85:
			case 86:
			case 88:
				{
				this.state = 177;
				this.simple_stmt();
				}
				break;
			case 29:
				{
				this.state = 178;
				this.ctx_block();
				}
				break;
			case 25:
				{
				this.state = 179;
				this.if_block();
				}
				break;
			case 30:
				{
				this.state = 180;
				this.switch_block();
				}
				break;
			case 54:
			case 55:
				{
				this.state = 181;
				this.message_switch_block();
				}
				break;
			case 28:
				{
				this.state = 182;
				this.forever_block();
				}
				break;
			case 68:
				{
				this.state = 183;
				this.for_block();
				}
				break;
			case 56:
				{
				this.state = 184;
				this.while_block();
				}
				break;
			case 73:
				{
				this.state = 185;
				this.macro_call();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simple_stmt(): Simple_stmtContext {
		let localctx: Simple_stmtContext = new Simple_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, ExplorerScriptParser.RULE_simple_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 194;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 188;
				this.operation();
				}
				break;
			case 2:
				{
				this.state = 189;
				this.label();
				}
				break;
			case 3:
				{
				this.state = 190;
				this.cntrl_stmt();
				}
				break;
			case 4:
				{
				this.state = 191;
				this.jump();
				}
				break;
			case 5:
				{
				this.state = 192;
				this.call();
				}
				break;
			case 6:
				{
				this.state = 193;
				this.assignment();
				}
				break;
			}
			this.state = 196;
			this.match(ExplorerScriptParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public cntrl_stmt(): Cntrl_stmtContext {
		let localctx: Cntrl_stmtContext = new Cntrl_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, ExplorerScriptParser.RULE_cntrl_stmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 198;
			_la = this._input.LA(1);
			if(!(((((_la - 31)) & ~0x1F) === 0 && ((1 << (_la - 31)) & 63) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public jump(): JumpContext {
		let localctx: JumpContext = new JumpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, ExplorerScriptParser.RULE_jump);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 200;
			this.match(ExplorerScriptParser.JUMP);
			this.state = 201;
			this.match(ExplorerScriptParser.AT);
			this.state = 202;
			this.match(ExplorerScriptParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public call(): CallContext {
		let localctx: CallContext = new CallContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, ExplorerScriptParser.RULE_call);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 204;
			this.match(ExplorerScriptParser.CALL);
			this.state = 205;
			this.match(ExplorerScriptParser.AT);
			this.state = 206;
			this.match(ExplorerScriptParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public macro_call(): Macro_callContext {
		let localctx: Macro_callContext = new Macro_callContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, ExplorerScriptParser.RULE_macro_call);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 208;
			this.match(ExplorerScriptParser.MACRO_CALL);
			this.state = 209;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 211;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 671135747) !== 0)) {
				{
				this.state = 210;
				this.arglist();
				}
			}

			this.state = 213;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 214;
			this.match(ExplorerScriptParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ctx_block(): Ctx_blockContext {
		let localctx: Ctx_blockContext = new Ctx_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, ExplorerScriptParser.RULE_ctx_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 216;
			this.match(ExplorerScriptParser.WITH);
			this.state = 217;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 218;
			this.ctx_header();
			this.state = 219;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 220;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2150629376) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 405211167) !== 0) || ((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 188427) !== 0)) {
				{
				{
				this.state = 221;
				this.simple_stmt();
				}
				}
				this.state = 226;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 227;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public if_block(): If_blockContext {
		let localctx: If_blockContext = new If_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, ExplorerScriptParser.RULE_if_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 229;
			this.match(ExplorerScriptParser.IF);
			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 230;
				this.match(ExplorerScriptParser.NOT);
				}
			}

			this.state = 233;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 234;
			this.if_header();
			this.state = 239;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===18) {
				{
				{
				this.state = 235;
				this.match(ExplorerScriptParser.OR);
				this.state = 236;
				this.if_header();
				}
				}
				this.state = 241;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 242;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 243;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 247;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
				{
				{
				this.state = 244;
				this.stmt();
				}
				}
				this.state = 249;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 250;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			this.state = 254;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===26) {
				{
				{
				this.state = 251;
				this.elseif_block();
				}
				}
				this.state = 256;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 258;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 257;
				this.else_block();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elseif_block(): Elseif_blockContext {
		let localctx: Elseif_blockContext = new Elseif_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, ExplorerScriptParser.RULE_elseif_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 260;
			this.match(ExplorerScriptParser.ELSEIF);
			this.state = 262;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 261;
				this.match(ExplorerScriptParser.NOT);
				}
			}

			this.state = 264;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 265;
			this.if_header();
			this.state = 270;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===18) {
				{
				{
				this.state = 266;
				this.match(ExplorerScriptParser.OR);
				this.state = 267;
				this.if_header();
				}
				}
				this.state = 272;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 273;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 274;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 278;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
				{
				{
				this.state = 275;
				this.stmt();
				}
				}
				this.state = 280;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 281;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public else_block(): Else_blockContext {
		let localctx: Else_blockContext = new Else_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, ExplorerScriptParser.RULE_else_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 283;
			this.match(ExplorerScriptParser.ELSE);
			this.state = 284;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 288;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
				{
				{
				this.state = 285;
				this.stmt();
				}
				}
				this.state = 290;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 291;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public if_header(): If_headerContext {
		let localctx: If_headerContext = new If_headerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, ExplorerScriptParser.RULE_if_header);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 298;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				this.state = 293;
				this.if_h_op();
				}
				break;
			case 2:
				{
				this.state = 294;
				this.if_h_bit();
				}
				break;
			case 3:
				{
				this.state = 295;
				this.if_h_negatable();
				}
				break;
			case 4:
				{
				this.state = 296;
				this.if_h_scn();
				}
				break;
			case 5:
				{
				this.state = 297;
				this.operation();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public if_h_negatable(): If_h_negatableContext {
		let localctx: If_h_negatableContext = new If_h_negatableContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, ExplorerScriptParser.RULE_if_h_negatable);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 300;
				this.match(ExplorerScriptParser.NOT);
				}
			}

			this.state = 303;
			_la = this._input.LA(1);
			if(!(((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public if_h_op(): If_h_opContext {
		let localctx: If_h_opContext = new If_h_opContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, ExplorerScriptParser.RULE_if_h_op);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 305;
			this.primitive();
			this.state = 306;
			this.conditional_operator();
			this.state = 309;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 37:
				{
				this.state = 307;
				this.value_of();
				}
				break;
			case 59:
			case 60:
			case 71:
			case 72:
			case 74:
			case 86:
			case 88:
				{
				this.state = 308;
				this.primitive();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public if_h_bit(): If_h_bitContext {
		let localctx: If_h_bitContext = new If_h_bitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, ExplorerScriptParser.RULE_if_h_bit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 312;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 311;
				this.match(ExplorerScriptParser.NOT);
				}
			}

			this.state = 314;
			this.primitive();
			this.state = 315;
			this.match(ExplorerScriptParser.OPEN_BRACKET);
			this.state = 316;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 317;
			this.match(ExplorerScriptParser.CLOSE_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public if_h_scn(): If_h_scnContext {
		let localctx: If_h_scnContext = new If_h_scnContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, ExplorerScriptParser.RULE_if_h_scn);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 319;
			this.scn_var();
			this.state = 320;
			this.conditional_operator();
			this.state = 321;
			this.match(ExplorerScriptParser.OPEN_BRACKET);
			this.state = 322;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 323;
			this.match(ExplorerScriptParser.COMMA);
			this.state = 324;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 325;
			this.match(ExplorerScriptParser.CLOSE_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public switch_block(): Switch_blockContext {
		let localctx: Switch_blockContext = new Switch_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, ExplorerScriptParser.RULE_switch_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 327;
			this.match(ExplorerScriptParser.SWITCH);
			this.state = 328;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 329;
			this.switch_header();
			this.state = 330;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 331;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 336;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===46 || _la===47) {
				{
				this.state = 334;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 47:
					{
					this.state = 332;
					this.default_();
					}
					break;
				case 46:
					{
					this.state = 333;
					this.single_case_block();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 338;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 339;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public message_switch_block(): Message_switch_blockContext {
		let localctx: Message_switch_blockContext = new Message_switch_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, ExplorerScriptParser.RULE_message_switch_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 341;
			_la = this._input.LA(1);
			if(!(_la===54 || _la===55)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 342;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 343;
			this.primitive();
			this.state = 344;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 345;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===46 || _la===47) {
				{
				this.state = 348;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 47:
					{
					this.state = 346;
					this.default_();
					}
					break;
				case 46:
					{
					this.state = 347;
					this.single_case_block();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 352;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 353;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public single_case_block(): Single_case_blockContext {
		let localctx: Single_case_blockContext = new Single_case_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, ExplorerScriptParser.RULE_single_case_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 355;
			this.match(ExplorerScriptParser.CASE);
			this.state = 356;
			this.case_header();
			this.state = 357;
			this.match(ExplorerScriptParser.COLON);
			this.state = 365;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				{
				this.state = 361;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
					{
					{
					this.state = 358;
					this.stmt();
					}
					}
					this.state = 363;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 2:
				{
				this.state = 364;
				this.primitive();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public default_(): DefaultContext {
		let localctx: DefaultContext = new DefaultContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, ExplorerScriptParser.RULE_default);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 367;
			this.match(ExplorerScriptParser.DEFAULT);
			this.state = 368;
			this.match(ExplorerScriptParser.COLON);
			this.state = 376;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				{
				this.state = 372;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
					{
					{
					this.state = 369;
					this.stmt();
					}
					}
					this.state = 374;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 2:
				{
				this.state = 375;
				this.primitive();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public switch_header(): Switch_headerContext {
		let localctx: Switch_headerContext = new Switch_headerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, ExplorerScriptParser.RULE_switch_header);
		try {
			this.state = 384;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 378;
				this.primitive();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 379;
				this.operation();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 380;
				this.switch_h_scn();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 381;
				this.switch_h_random();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 382;
				this.switch_h_dungeon_mode();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 383;
				this.switch_h_sector();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public switch_h_scn(): Switch_h_scnContext {
		let localctx: Switch_h_scnContext = new Switch_h_scnContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, ExplorerScriptParser.RULE_switch_h_scn);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 386;
			this.scn_var();
			this.state = 387;
			this.match(ExplorerScriptParser.OPEN_BRACKET);
			this.state = 388;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 389;
			this.match(ExplorerScriptParser.CLOSE_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public switch_h_random(): Switch_h_randomContext {
		let localctx: Switch_h_randomContext = new Switch_h_randomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, ExplorerScriptParser.RULE_switch_h_random);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 391;
			this.match(ExplorerScriptParser.RANDOM);
			this.state = 392;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 393;
			this.primitive();
			this.state = 394;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public switch_h_dungeon_mode(): Switch_h_dungeon_modeContext {
		let localctx: Switch_h_dungeon_modeContext = new Switch_h_dungeon_modeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, ExplorerScriptParser.RULE_switch_h_dungeon_mode);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 396;
			this.match(ExplorerScriptParser.DUNGEON_MODE);
			this.state = 397;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 398;
			this.primitive();
			this.state = 399;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public switch_h_sector(): Switch_h_sectorContext {
		let localctx: Switch_h_sectorContext = new Switch_h_sectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, ExplorerScriptParser.RULE_switch_h_sector);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 401;
			this.match(ExplorerScriptParser.SECTOR);
			this.state = 402;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 403;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public case_header(): Case_headerContext {
		let localctx: Case_headerContext = new Case_headerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, ExplorerScriptParser.RULE_case_header);
		try {
			this.state = 409;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 59:
			case 60:
			case 71:
			case 72:
			case 74:
			case 86:
			case 88:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 405;
				this.primitive();
				}
				break;
			case 45:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 406;
				this.case_h_menu();
				}
				break;
			case 44:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 407;
				this.case_h_menu2();
				}
				break;
			case 2:
			case 3:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 408;
				this.case_h_op();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public case_h_menu(): Case_h_menuContext {
		let localctx: Case_h_menuContext = new Case_h_menuContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, ExplorerScriptParser.RULE_case_h_menu);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 411;
			this.match(ExplorerScriptParser.MENU);
			this.state = 412;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 413;
			this.primitive();
			this.state = 414;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public case_h_menu2(): Case_h_menu2Context {
		let localctx: Case_h_menu2Context = new Case_h_menu2Context(this, this._ctx, this.state);
		this.enterRule(localctx, 60, ExplorerScriptParser.RULE_case_h_menu2);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 416;
			this.match(ExplorerScriptParser.MENU2);
			this.state = 417;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 418;
			this.primitive();
			this.state = 419;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public case_h_op(): Case_h_opContext {
		let localctx: Case_h_opContext = new Case_h_opContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, ExplorerScriptParser.RULE_case_h_op);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 421;
			this.conditional_operator();
			this.state = 424;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 37:
				{
				this.state = 422;
				this.value_of();
				}
				break;
			case 59:
			case 60:
			case 71:
			case 72:
			case 74:
			case 86:
			case 88:
				{
				this.state = 423;
				this.primitive();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forever_block(): Forever_blockContext {
		let localctx: Forever_blockContext = new Forever_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, ExplorerScriptParser.RULE_forever_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 426;
			this.match(ExplorerScriptParser.FOREVER);
			this.state = 427;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 431;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
				{
				{
				this.state = 428;
				this.stmt();
				}
				}
				this.state = 433;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 434;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public for_block(): For_blockContext {
		let localctx: For_blockContext = new For_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, ExplorerScriptParser.RULE_for_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 436;
			this.match(ExplorerScriptParser.FOR);
			this.state = 437;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 438;
			this.simple_stmt();
			this.state = 439;
			this.if_header();
			this.state = 440;
			this.match(ExplorerScriptParser.T__0);
			this.state = 441;
			this.simple_stmt();
			this.state = 442;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 443;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 447;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
				{
				{
				this.state = 444;
				this.stmt();
				}
				}
				this.state = 449;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 450;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public while_block(): While_blockContext {
		let localctx: While_blockContext = new While_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, ExplorerScriptParser.RULE_while_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 452;
			this.match(ExplorerScriptParser.WHILE);
			this.state = 454;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===19) {
				{
				this.state = 453;
				this.match(ExplorerScriptParser.NOT);
				}
			}

			this.state = 456;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 457;
			this.if_header();
			this.state = 458;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 459;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 463;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0)) {
				{
				{
				this.state = 460;
				this.stmt();
				}
				}
				this.state = 465;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 466;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, ExplorerScriptParser.RULE_assignment);
		try {
			this.state = 475;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 468;
				this.assignment_regular();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 469;
				this.assignment_clear();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 470;
				this.assignment_initial();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 471;
				this.assignment_reset();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 472;
				this.assignment_adv_log();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 473;
				this.assignment_dungeon_mode();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 474;
				this.assignment_scn();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_regular(): Assignment_regularContext {
		let localctx: Assignment_regularContext = new Assignment_regularContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, ExplorerScriptParser.RULE_assignment_regular);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 477;
			this.primitive();
			this.state = 481;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===57) {
				{
				this.state = 478;
				this.match(ExplorerScriptParser.OPEN_BRACKET);
				this.state = 479;
				this.match(ExplorerScriptParser.INTEGER);
				this.state = 480;
				this.match(ExplorerScriptParser.CLOSE_BRACKET);
				}
			}

			this.state = 483;
			this.assign_operator();
			this.state = 486;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 59:
			case 60:
			case 71:
			case 72:
			case 74:
			case 86:
			case 88:
				{
				this.state = 484;
				this.primitive();
				}
				break;
			case 37:
				{
				this.state = 485;
				this.value_of();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_clear(): Assignment_clearContext {
		let localctx: Assignment_clearContext = new Assignment_clearContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, ExplorerScriptParser.RULE_assignment_clear);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 488;
			this.match(ExplorerScriptParser.CLEAR);
			this.state = 489;
			this.primitive();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_initial(): Assignment_initialContext {
		let localctx: Assignment_initialContext = new Assignment_initialContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, ExplorerScriptParser.RULE_assignment_initial);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 491;
			this.match(ExplorerScriptParser.INIT);
			this.state = 492;
			this.primitive();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_reset(): Assignment_resetContext {
		let localctx: Assignment_resetContext = new Assignment_resetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, ExplorerScriptParser.RULE_assignment_reset);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 494;
			this.match(ExplorerScriptParser.RESET);
			this.state = 497;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 52:
				{
				this.state = 495;
				this.match(ExplorerScriptParser.DUNGEON_RESULT);
				}
				break;
			case 51:
				{
				this.state = 496;
				this.scn_var();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_adv_log(): Assignment_adv_logContext {
		let localctx: Assignment_adv_logContext = new Assignment_adv_logContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, ExplorerScriptParser.RULE_assignment_adv_log);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 499;
			this.match(ExplorerScriptParser.ADVENTURE_LOG);
			this.state = 500;
			this.match(ExplorerScriptParser.ASSIGN);
			this.state = 501;
			this.primitive();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_dungeon_mode(): Assignment_dungeon_modeContext {
		let localctx: Assignment_dungeon_modeContext = new Assignment_dungeon_modeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, ExplorerScriptParser.RULE_assignment_dungeon_mode);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 503;
			this.match(ExplorerScriptParser.DUNGEON_MODE);
			this.state = 504;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 505;
			this.primitive();
			this.state = 506;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			this.state = 507;
			this.match(ExplorerScriptParser.ASSIGN);
			this.state = 508;
			this.primitive();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment_scn(): Assignment_scnContext {
		let localctx: Assignment_scnContext = new Assignment_scnContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, ExplorerScriptParser.RULE_assignment_scn);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 510;
			this.primitive();
			this.state = 511;
			this.match(ExplorerScriptParser.ASSIGN);
			this.state = 512;
			this.match(ExplorerScriptParser.SCN);
			this.state = 513;
			this.match(ExplorerScriptParser.OPEN_BRACKET);
			this.state = 514;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 515;
			this.match(ExplorerScriptParser.COMMA);
			this.state = 516;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 517;
			this.match(ExplorerScriptParser.CLOSE_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public value_of(): Value_ofContext {
		let localctx: Value_ofContext = new Value_ofContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, ExplorerScriptParser.RULE_value_of);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 519;
			this.match(ExplorerScriptParser.VALUE);
			this.state = 520;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 521;
			this.primitive();
			this.state = 522;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public scn_var(): Scn_varContext {
		let localctx: Scn_varContext = new Scn_varContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, ExplorerScriptParser.RULE_scn_var);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 524;
			this.match(ExplorerScriptParser.SCN);
			this.state = 525;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 526;
			this.primitive();
			this.state = 527;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public conditional_operator(): Conditional_operatorContext {
		let localctx: Conditional_operatorContext = new Conditional_operatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, ExplorerScriptParser.RULE_conditional_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 529;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 16364) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assign_operator(): Assign_operatorContext {
		let localctx: Assign_operatorContext = new Assign_operatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, ExplorerScriptParser.RULE_assign_operator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 531;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 245776) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public funcdef(): FuncdefContext {
		let localctx: FuncdefContext = new FuncdefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, ExplorerScriptParser.RULE_funcdef);
		try {
			this.state = 536;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 533;
				this.coro_def();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 534;
				this.simple_def();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 535;
				this.for_target_def();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simple_def(): Simple_defContext {
		let localctx: Simple_defContext = new Simple_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, ExplorerScriptParser.RULE_simple_def);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 538;
			this.match(ExplorerScriptParser.DEF);
			this.state = 539;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 540;
			this.func_suite();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public coro_def(): Coro_defContext {
		let localctx: Coro_defContext = new Coro_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, ExplorerScriptParser.RULE_coro_def);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 542;
			this.match(ExplorerScriptParser.CORO);
			this.state = 543;
			this.match(ExplorerScriptParser.IDENTIFIER);
			this.state = 544;
			this.func_suite();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public for_target_def(): For_target_defContext {
		let localctx: For_target_defContext = new For_target_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, ExplorerScriptParser.RULE_for_target_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 546;
			this.match(ExplorerScriptParser.DEF);
			this.state = 547;
			this.match(ExplorerScriptParser.INTEGER);
			this.state = 548;
			this.for_target_def_target();
			this.state = 550;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===79) {
				{
				this.state = 549;
				this.match(ExplorerScriptParser.OPEN_PAREN);
				}
			}

			this.state = 552;
			this.primitive();
			this.state = 554;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===80) {
				{
				this.state = 553;
				this.match(ExplorerScriptParser.CLOSE_PAREN);
				}
			}

			this.state = 556;
			this.func_suite();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public primitive(): PrimitiveContext {
		let localctx: PrimitiveContext = new PrimitiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, ExplorerScriptParser.RULE_primitive);
		try {
			this.state = 563;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 88:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 558;
				this.match(ExplorerScriptParser.DECIMAL);
				}
				break;
			case 74:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 559;
				this.match(ExplorerScriptParser.INTEGER);
				}
				break;
			case 71:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 560;
				this.match(ExplorerScriptParser.IDENTIFIER);
				}
				break;
			case 72:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 561;
				this.match(ExplorerScriptParser.VARIABLE);
				}
				break;
			case 59:
			case 60:
			case 86:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 562;
				this.string_();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operation(): OperationContext {
		let localctx: OperationContext = new OperationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, ExplorerScriptParser.RULE_operation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 565;
			this.match(ExplorerScriptParser.IDENTIFIER);
			this.state = 567;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 566;
				this.inline_ctx();
				}
			}

			this.state = 569;
			this.match(ExplorerScriptParser.OPEN_PAREN);
			this.state = 571;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 59)) & ~0x1F) === 0 && ((1 << (_la - 59)) & 671135747) !== 0)) {
				{
				this.state = 570;
				this.arglist();
				}
			}

			this.state = 573;
			this.match(ExplorerScriptParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public inline_ctx(): Inline_ctxContext {
		let localctx: Inline_ctxContext = new Inline_ctxContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, ExplorerScriptParser.RULE_inline_ctx);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 575;
			this.match(ExplorerScriptParser.OPEN_SHARP);
			this.state = 576;
			this.ctx_header();
			this.state = 577;
			this.match(ExplorerScriptParser.CLOSE_SHARP);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public func_suite(): Func_suiteContext {
		let localctx: Func_suiteContext = new Func_suiteContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, ExplorerScriptParser.RULE_func_suite);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 579;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 586;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
			case 21:
			case 23:
			case 25:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 43:
			case 48:
			case 49:
			case 50:
			case 53:
			case 54:
			case 55:
			case 56:
			case 59:
			case 60:
			case 68:
			case 71:
			case 72:
			case 73:
			case 74:
			case 84:
			case 85:
			case 86:
			case 88:
				{
				this.state = 581;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 580;
					this.stmt();
					}
					}
					this.state = 583;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4071620608) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 434571295) !== 0) || ((((_la - 68)) & ~0x1F) === 0 && ((1 << (_la - 68)) & 1507449) !== 0));
				}
				break;
			case 67:
				{
				this.state = 585;
				this.func_alias();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 588;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public func_alias(): Func_aliasContext {
		let localctx: Func_aliasContext = new Func_aliasContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, ExplorerScriptParser.RULE_func_alias);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 590;
			this.match(ExplorerScriptParser.ALIAS);
			this.state = 591;
			this.match(ExplorerScriptParser.PREVIOUS);
			this.state = 592;
			this.match(ExplorerScriptParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arglist(): ArglistContext {
		let localctx: ArglistContext = new ArglistContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, ExplorerScriptParser.RULE_arglist);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 594;
			this.pos_argument();
			this.state = 599;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 595;
					this.match(ExplorerScriptParser.COMMA);
					this.state = 596;
					this.pos_argument();
					}
					}
				}
				this.state = 601;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
			}
			this.state = 603;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===81) {
				{
				this.state = 602;
				this.match(ExplorerScriptParser.COMMA);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pos_argument(): Pos_argumentContext {
		let localctx: Pos_argumentContext = new Pos_argumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, ExplorerScriptParser.RULE_pos_argument);
		try {
			this.state = 607;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 59:
			case 60:
			case 71:
			case 72:
			case 74:
			case 86:
			case 88:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 605;
				this.primitive();
				}
				break;
			case 70:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 606;
				this.position_marker();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public position_marker(): Position_markerContext {
		let localctx: Position_markerContext = new Position_markerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, ExplorerScriptParser.RULE_position_marker);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 609;
			this.match(ExplorerScriptParser.POSITION);
			this.state = 610;
			this.match(ExplorerScriptParser.OPEN_SHARP);
			this.state = 611;
			this.match(ExplorerScriptParser.STRING_LITERAL);
			this.state = 612;
			this.match(ExplorerScriptParser.COMMA);
			this.state = 613;
			this.position_marker_arg();
			this.state = 614;
			this.match(ExplorerScriptParser.COMMA);
			this.state = 615;
			this.position_marker_arg();
			this.state = 616;
			this.match(ExplorerScriptParser.CLOSE_SHARP);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public position_marker_arg(): Position_marker_argContext {
		let localctx: Position_marker_argContext = new Position_marker_argContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, ExplorerScriptParser.RULE_position_marker_arg);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 618;
			_la = this._input.LA(1);
			if(!(_la===74 || _la===88)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public label(): LabelContext {
		let localctx: LabelContext = new LabelContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, ExplorerScriptParser.RULE_label);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 620;
			_la = this._input.LA(1);
			if(!(_la===84 || _la===85)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 621;
			this.match(ExplorerScriptParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public string_(): StringContext {
		let localctx: StringContext = new StringContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, ExplorerScriptParser.RULE_string);
		try {
			this.state = 625;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 59:
			case 60:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 623;
				this.string_value();
				}
				break;
			case 86:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 624;
				this.lang_string();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lang_string(): Lang_stringContext {
		let localctx: Lang_stringContext = new Lang_stringContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, ExplorerScriptParser.RULE_lang_string);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 627;
			this.match(ExplorerScriptParser.OPEN_BRACE);
			this.state = 628;
			this.lang_string_argument();
			this.state = 633;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 53, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 629;
					this.match(ExplorerScriptParser.COMMA);
					this.state = 630;
					this.lang_string_argument();
					}
					}
				}
				this.state = 635;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 53, this._ctx);
			}
			this.state = 637;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===81) {
				{
				this.state = 636;
				this.match(ExplorerScriptParser.COMMA);
				}
			}

			this.state = 639;
			this.match(ExplorerScriptParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lang_string_argument(): Lang_string_argumentContext {
		let localctx: Lang_string_argumentContext = new Lang_string_argumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, ExplorerScriptParser.RULE_lang_string_argument);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 641;
			this.match(ExplorerScriptParser.IDENTIFIER);
			this.state = 642;
			this.match(ExplorerScriptParser.ASSIGN);
			this.state = 643;
			this.string_value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public string_value(): String_valueContext {
		let localctx: String_valueContext = new String_valueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, ExplorerScriptParser.RULE_string_value);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 645;
			_la = this._input.LA(1);
			if(!(_la===59 || _la===60)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ctx_header(): Ctx_headerContext {
		let localctx: Ctx_headerContext = new Ctx_headerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, ExplorerScriptParser.RULE_ctx_header);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 647;
			this.match(ExplorerScriptParser.IDENTIFIER);
			this.state = 648;
			this.primitive();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public for_target_def_target(): For_target_def_targetContext {
		let localctx: For_target_def_targetContext = new For_target_def_targetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, ExplorerScriptParser.RULE_for_target_def_target);
		try {
			this.state = 653;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 68:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 650;
				this.match(ExplorerScriptParser.FOR);
				this.state = 651;
				this.match(ExplorerScriptParser.IDENTIFIER);
				}
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 652;
				this.match(ExplorerScriptParser.FOR_TARGET);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,90,656,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
	7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,
	53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,60,
	2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,1,0,5,0,136,
	8,0,10,0,12,0,139,9,0,1,0,1,0,1,0,5,0,144,8,0,10,0,12,0,147,9,0,1,0,1,0,
	1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,3,3,165,8,3,1,3,
	1,3,5,3,169,8,3,10,3,12,3,172,9,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,
	4,1,4,1,4,1,4,3,4,187,8,4,1,5,1,5,1,5,1,5,1,5,1,5,3,5,195,8,5,1,5,1,5,1,
	6,1,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,9,1,9,1,9,3,9,212,8,9,1,9,1,9,1,
	9,1,10,1,10,1,10,1,10,1,10,1,10,5,10,223,8,10,10,10,12,10,226,9,10,1,10,
	1,10,1,11,1,11,3,11,232,8,11,1,11,1,11,1,11,1,11,5,11,238,8,11,10,11,12,
	11,241,9,11,1,11,1,11,1,11,5,11,246,8,11,10,11,12,11,249,9,11,1,11,1,11,
	5,11,253,8,11,10,11,12,11,256,9,11,1,11,3,11,259,8,11,1,12,1,12,3,12,263,
	8,12,1,12,1,12,1,12,1,12,5,12,269,8,12,10,12,12,12,272,9,12,1,12,1,12,1,
	12,5,12,277,8,12,10,12,12,12,280,9,12,1,12,1,12,1,13,1,13,1,13,5,13,287,
	8,13,10,13,12,13,290,9,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,3,14,299,8,
	14,1,15,3,15,302,8,15,1,15,1,15,1,16,1,16,1,16,1,16,3,16,310,8,16,1,17,
	3,17,313,8,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,
	18,1,18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,5,19,335,8,19,10,19,12,19,338,
	9,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,20,5,20,349,8,20,10,20,12,
	20,352,9,20,1,20,1,20,1,21,1,21,1,21,1,21,5,21,360,8,21,10,21,12,21,363,
	9,21,1,21,3,21,366,8,21,1,22,1,22,1,22,5,22,371,8,22,10,22,12,22,374,9,
	22,1,22,3,22,377,8,22,1,23,1,23,1,23,1,23,1,23,1,23,3,23,385,8,23,1,24,
	1,24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,1,
	27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,3,28,410,8,28,1,29,1,29,1,29,1,29,
	1,29,1,30,1,30,1,30,1,30,1,30,1,31,1,31,1,31,3,31,425,8,31,1,32,1,32,1,
	32,5,32,430,8,32,10,32,12,32,433,9,32,1,32,1,32,1,33,1,33,1,33,1,33,1,33,
	1,33,1,33,1,33,1,33,5,33,446,8,33,10,33,12,33,449,9,33,1,33,1,33,1,34,1,
	34,3,34,455,8,34,1,34,1,34,1,34,1,34,1,34,5,34,462,8,34,10,34,12,34,465,
	9,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,476,8,35,1,36,1,
	36,1,36,1,36,3,36,482,8,36,1,36,1,36,1,36,3,36,487,8,36,1,37,1,37,1,37,
	1,38,1,38,1,38,1,39,1,39,1,39,3,39,498,8,39,1,40,1,40,1,40,1,40,1,41,1,
	41,1,41,1,41,1,41,1,41,1,41,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,
	1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,46,1,46,1,
	47,1,47,1,47,3,47,537,8,47,1,48,1,48,1,48,1,48,1,49,1,49,1,49,1,49,1,50,
	1,50,1,50,1,50,3,50,551,8,50,1,50,1,50,3,50,555,8,50,1,50,1,50,1,51,1,51,
	1,51,1,51,1,51,3,51,564,8,51,1,52,1,52,3,52,568,8,52,1,52,1,52,3,52,572,
	8,52,1,52,1,52,1,53,1,53,1,53,1,53,1,54,1,54,4,54,582,8,54,11,54,12,54,
	583,1,54,3,54,587,8,54,1,54,1,54,1,55,1,55,1,55,1,55,1,56,1,56,1,56,5,56,
	598,8,56,10,56,12,56,601,9,56,1,56,3,56,604,8,56,1,57,1,57,3,57,608,8,57,
	1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,59,1,59,1,60,1,60,1,60,1,
	61,1,61,3,61,626,8,61,1,62,1,62,1,62,1,62,5,62,632,8,62,10,62,12,62,635,
	9,62,1,62,3,62,638,8,62,1,62,1,62,1,63,1,63,1,63,1,63,1,64,1,64,1,65,1,
	65,1,65,1,66,1,66,1,66,3,66,654,8,66,1,66,0,0,67,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,
	66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
	110,112,114,116,118,120,122,124,126,128,130,132,0,8,1,0,31,36,1,0,38,40,
	1,0,54,55,2,0,2,3,5,13,2,0,4,4,14,17,2,0,74,74,88,88,1,0,84,85,1,0,59,60,
	675,0,137,1,0,0,0,2,150,1,0,0,0,4,154,1,0,0,0,6,160,1,0,0,0,8,186,1,0,0,
	0,10,194,1,0,0,0,12,198,1,0,0,0,14,200,1,0,0,0,16,204,1,0,0,0,18,208,1,
	0,0,0,20,216,1,0,0,0,22,229,1,0,0,0,24,260,1,0,0,0,26,283,1,0,0,0,28,298,
	1,0,0,0,30,301,1,0,0,0,32,305,1,0,0,0,34,312,1,0,0,0,36,319,1,0,0,0,38,
	327,1,0,0,0,40,341,1,0,0,0,42,355,1,0,0,0,44,367,1,0,0,0,46,384,1,0,0,0,
	48,386,1,0,0,0,50,391,1,0,0,0,52,396,1,0,0,0,54,401,1,0,0,0,56,409,1,0,
	0,0,58,411,1,0,0,0,60,416,1,0,0,0,62,421,1,0,0,0,64,426,1,0,0,0,66,436,
	1,0,0,0,68,452,1,0,0,0,70,475,1,0,0,0,72,477,1,0,0,0,74,488,1,0,0,0,76,
	491,1,0,0,0,78,494,1,0,0,0,80,499,1,0,0,0,82,503,1,0,0,0,84,510,1,0,0,0,
	86,519,1,0,0,0,88,524,1,0,0,0,90,529,1,0,0,0,92,531,1,0,0,0,94,536,1,0,
	0,0,96,538,1,0,0,0,98,542,1,0,0,0,100,546,1,0,0,0,102,563,1,0,0,0,104,565,
	1,0,0,0,106,575,1,0,0,0,108,579,1,0,0,0,110,590,1,0,0,0,112,594,1,0,0,0,
	114,607,1,0,0,0,116,609,1,0,0,0,118,618,1,0,0,0,120,620,1,0,0,0,122,625,
	1,0,0,0,124,627,1,0,0,0,126,641,1,0,0,0,128,645,1,0,0,0,130,647,1,0,0,0,
	132,653,1,0,0,0,134,136,3,2,1,0,135,134,1,0,0,0,136,139,1,0,0,0,137,135,
	1,0,0,0,137,138,1,0,0,0,138,145,1,0,0,0,139,137,1,0,0,0,140,144,3,6,3,0,
	141,144,3,94,47,0,142,144,3,4,2,0,143,140,1,0,0,0,143,141,1,0,0,0,143,142,
	1,0,0,0,144,147,1,0,0,0,145,143,1,0,0,0,145,146,1,0,0,0,146,148,1,0,0,0,
	147,145,1,0,0,0,148,149,5,0,0,1,149,1,1,0,0,0,150,151,5,22,0,0,151,152,
	5,59,0,0,152,153,5,1,0,0,153,3,1,0,0,0,154,155,5,23,0,0,155,156,5,71,0,
	0,156,157,5,4,0,0,157,158,3,102,51,0,158,159,5,1,0,0,159,5,1,0,0,0,160,
	161,5,24,0,0,161,162,5,71,0,0,162,164,5,79,0,0,163,165,5,72,0,0,164,163,
	1,0,0,0,164,165,1,0,0,0,165,170,1,0,0,0,166,167,5,81,0,0,167,169,5,72,0,
	0,168,166,1,0,0,0,169,172,1,0,0,0,170,168,1,0,0,0,170,171,1,0,0,0,171,173,
	1,0,0,0,172,170,1,0,0,0,173,174,5,80,0,0,174,175,3,108,54,0,175,7,1,0,0,
	0,176,187,3,4,2,0,177,187,3,10,5,0,178,187,3,20,10,0,179,187,3,22,11,0,
	180,187,3,38,19,0,181,187,3,40,20,0,182,187,3,64,32,0,183,187,3,66,33,0,
	184,187,3,68,34,0,185,187,3,18,9,0,186,176,1,0,0,0,186,177,1,0,0,0,186,
	178,1,0,0,0,186,179,1,0,0,0,186,180,1,0,0,0,186,181,1,0,0,0,186,182,1,0,
	0,0,186,183,1,0,0,0,186,184,1,0,0,0,186,185,1,0,0,0,187,9,1,0,0,0,188,195,
	3,104,52,0,189,195,3,120,60,0,190,195,3,12,6,0,191,195,3,14,7,0,192,195,
	3,16,8,0,193,195,3,70,35,0,194,188,1,0,0,0,194,189,1,0,0,0,194,190,1,0,
	0,0,194,191,1,0,0,0,194,192,1,0,0,0,194,193,1,0,0,0,195,196,1,0,0,0,196,
	197,5,1,0,0,197,11,1,0,0,0,198,199,7,0,0,0,199,13,1,0,0,0,200,201,5,20,
	0,0,201,202,5,84,0,0,202,203,5,71,0,0,203,15,1,0,0,0,204,205,5,21,0,0,205,
	206,5,84,0,0,206,207,5,71,0,0,207,17,1,0,0,0,208,209,5,73,0,0,209,211,5,
	79,0,0,210,212,3,112,56,0,211,210,1,0,0,0,211,212,1,0,0,0,212,213,1,0,0,
	0,213,214,5,80,0,0,214,215,5,1,0,0,215,19,1,0,0,0,216,217,5,29,0,0,217,
	218,5,79,0,0,218,219,3,130,65,0,219,220,5,80,0,0,220,224,5,86,0,0,221,223,
	3,10,5,0,222,221,1,0,0,0,223,226,1,0,0,0,224,222,1,0,0,0,224,225,1,0,0,
	0,225,227,1,0,0,0,226,224,1,0,0,0,227,228,5,87,0,0,228,21,1,0,0,0,229,231,
	5,25,0,0,230,232,5,19,0,0,231,230,1,0,0,0,231,232,1,0,0,0,232,233,1,0,0,
	0,233,234,5,79,0,0,234,239,3,28,14,0,235,236,5,18,0,0,236,238,3,28,14,0,
	237,235,1,0,0,0,238,241,1,0,0,0,239,237,1,0,0,0,239,240,1,0,0,0,240,242,
	1,0,0,0,241,239,1,0,0,0,242,243,5,80,0,0,243,247,5,86,0,0,244,246,3,8,4,
	0,245,244,1,0,0,0,246,249,1,0,0,0,247,245,1,0,0,0,247,248,1,0,0,0,248,250,
	1,0,0,0,249,247,1,0,0,0,250,254,5,87,0,0,251,253,3,24,12,0,252,251,1,0,
	0,0,253,256,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,0,255,258,1,0,0,0,256,
	254,1,0,0,0,257,259,3,26,13,0,258,257,1,0,0,0,258,259,1,0,0,0,259,23,1,
	0,0,0,260,262,5,26,0,0,261,263,5,19,0,0,262,261,1,0,0,0,262,263,1,0,0,0,
	263,264,1,0,0,0,264,265,5,79,0,0,265,270,3,28,14,0,266,267,5,18,0,0,267,
	269,3,28,14,0,268,266,1,0,0,0,269,272,1,0,0,0,270,268,1,0,0,0,270,271,1,
	0,0,0,271,273,1,0,0,0,272,270,1,0,0,0,273,274,5,80,0,0,274,278,5,86,0,0,
	275,277,3,8,4,0,276,275,1,0,0,0,277,280,1,0,0,0,278,276,1,0,0,0,278,279,
	1,0,0,0,279,281,1,0,0,0,280,278,1,0,0,0,281,282,5,87,0,0,282,25,1,0,0,0,
	283,284,5,27,0,0,284,288,5,86,0,0,285,287,3,8,4,0,286,285,1,0,0,0,287,290,
	1,0,0,0,288,286,1,0,0,0,288,289,1,0,0,0,289,291,1,0,0,0,290,288,1,0,0,0,
	291,292,5,87,0,0,292,27,1,0,0,0,293,299,3,32,16,0,294,299,3,34,17,0,295,
	299,3,30,15,0,296,299,3,36,18,0,297,299,3,104,52,0,298,293,1,0,0,0,298,
	294,1,0,0,0,298,295,1,0,0,0,298,296,1,0,0,0,298,297,1,0,0,0,299,29,1,0,
	0,0,300,302,5,19,0,0,301,300,1,0,0,0,301,302,1,0,0,0,302,303,1,0,0,0,303,
	304,7,1,0,0,304,31,1,0,0,0,305,306,3,102,51,0,306,309,3,90,45,0,307,310,
	3,86,43,0,308,310,3,102,51,0,309,307,1,0,0,0,309,308,1,0,0,0,310,33,1,0,
	0,0,311,313,5,19,0,0,312,311,1,0,0,0,312,313,1,0,0,0,313,314,1,0,0,0,314,
	315,3,102,51,0,315,316,5,57,0,0,316,317,5,74,0,0,317,318,5,58,0,0,318,35,
	1,0,0,0,319,320,3,88,44,0,320,321,3,90,45,0,321,322,5,57,0,0,322,323,5,
	74,0,0,323,324,5,81,0,0,324,325,5,74,0,0,325,326,5,58,0,0,326,37,1,0,0,
	0,327,328,5,30,0,0,328,329,5,79,0,0,329,330,3,46,23,0,330,331,5,80,0,0,
	331,336,5,86,0,0,332,335,3,44,22,0,333,335,3,42,21,0,334,332,1,0,0,0,334,
	333,1,0,0,0,335,338,1,0,0,0,336,334,1,0,0,0,336,337,1,0,0,0,337,339,1,0,
	0,0,338,336,1,0,0,0,339,340,5,87,0,0,340,39,1,0,0,0,341,342,7,2,0,0,342,
	343,5,79,0,0,343,344,3,102,51,0,344,345,5,80,0,0,345,350,5,86,0,0,346,349,
	3,44,22,0,347,349,3,42,21,0,348,346,1,0,0,0,348,347,1,0,0,0,349,352,1,0,
	0,0,350,348,1,0,0,0,350,351,1,0,0,0,351,353,1,0,0,0,352,350,1,0,0,0,353,
	354,5,87,0,0,354,41,1,0,0,0,355,356,5,46,0,0,356,357,3,56,28,0,357,365,
	5,82,0,0,358,360,3,8,4,0,359,358,1,0,0,0,360,363,1,0,0,0,361,359,1,0,0,
	0,361,362,1,0,0,0,362,366,1,0,0,0,363,361,1,0,0,0,364,366,3,102,51,0,365,
	361,1,0,0,0,365,364,1,0,0,0,366,43,1,0,0,0,367,368,5,47,0,0,368,376,5,82,
	0,0,369,371,3,8,4,0,370,369,1,0,0,0,371,374,1,0,0,0,372,370,1,0,0,0,372,
	373,1,0,0,0,373,377,1,0,0,0,374,372,1,0,0,0,375,377,3,102,51,0,376,372,
	1,0,0,0,376,375,1,0,0,0,377,45,1,0,0,0,378,385,3,102,51,0,379,385,3,104,
	52,0,380,385,3,48,24,0,381,385,3,50,25,0,382,385,3,52,26,0,383,385,3,54,
	27,0,384,378,1,0,0,0,384,379,1,0,0,0,384,380,1,0,0,0,384,381,1,0,0,0,384,
	382,1,0,0,0,384,383,1,0,0,0,385,47,1,0,0,0,386,387,3,88,44,0,387,388,5,
	57,0,0,388,389,5,74,0,0,389,390,5,58,0,0,390,49,1,0,0,0,391,392,5,41,0,
	0,392,393,5,79,0,0,393,394,3,102,51,0,394,395,5,80,0,0,395,51,1,0,0,0,396,
	397,5,43,0,0,397,398,5,79,0,0,398,399,3,102,51,0,399,400,5,80,0,0,400,53,
	1,0,0,0,401,402,5,42,0,0,402,403,5,79,0,0,403,404,5,80,0,0,404,55,1,0,0,
	0,405,410,3,102,51,0,406,410,3,58,29,0,407,410,3,60,30,0,408,410,3,62,31,
	0,409,405,1,0,0,0,409,406,1,0,0,0,409,407,1,0,0,0,409,408,1,0,0,0,410,57,
	1,0,0,0,411,412,5,45,0,0,412,413,5,79,0,0,413,414,3,102,51,0,414,415,5,
	80,0,0,415,59,1,0,0,0,416,417,5,44,0,0,417,418,5,79,0,0,418,419,3,102,51,
	0,419,420,5,80,0,0,420,61,1,0,0,0,421,424,3,90,45,0,422,425,3,86,43,0,423,
	425,3,102,51,0,424,422,1,0,0,0,424,423,1,0,0,0,425,63,1,0,0,0,426,427,5,
	28,0,0,427,431,5,86,0,0,428,430,3,8,4,0,429,428,1,0,0,0,430,433,1,0,0,0,
	431,429,1,0,0,0,431,432,1,0,0,0,432,434,1,0,0,0,433,431,1,0,0,0,434,435,
	5,87,0,0,435,65,1,0,0,0,436,437,5,68,0,0,437,438,5,79,0,0,438,439,3,10,
	5,0,439,440,3,28,14,0,440,441,5,1,0,0,441,442,3,10,5,0,442,443,5,80,0,0,
	443,447,5,86,0,0,444,446,3,8,4,0,445,444,1,0,0,0,446,449,1,0,0,0,447,445,
	1,0,0,0,447,448,1,0,0,0,448,450,1,0,0,0,449,447,1,0,0,0,450,451,5,87,0,
	0,451,67,1,0,0,0,452,454,5,56,0,0,453,455,5,19,0,0,454,453,1,0,0,0,454,
	455,1,0,0,0,455,456,1,0,0,0,456,457,5,79,0,0,457,458,3,28,14,0,458,459,
	5,80,0,0,459,463,5,86,0,0,460,462,3,8,4,0,461,460,1,0,0,0,462,465,1,0,0,
	0,463,461,1,0,0,0,463,464,1,0,0,0,464,466,1,0,0,0,465,463,1,0,0,0,466,467,
	5,87,0,0,467,69,1,0,0,0,468,476,3,72,36,0,469,476,3,74,37,0,470,476,3,76,
	38,0,471,476,3,78,39,0,472,476,3,80,40,0,473,476,3,82,41,0,474,476,3,84,
	42,0,475,468,1,0,0,0,475,469,1,0,0,0,475,470,1,0,0,0,475,471,1,0,0,0,475,
	472,1,0,0,0,475,473,1,0,0,0,475,474,1,0,0,0,476,71,1,0,0,0,477,481,3,102,
	51,0,478,479,5,57,0,0,479,480,5,74,0,0,480,482,5,58,0,0,481,478,1,0,0,0,
	481,482,1,0,0,0,482,483,1,0,0,0,483,486,3,92,46,0,484,487,3,102,51,0,485,
	487,3,86,43,0,486,484,1,0,0,0,486,485,1,0,0,0,487,73,1,0,0,0,488,489,5,
	48,0,0,489,490,3,102,51,0,490,75,1,0,0,0,491,492,5,50,0,0,492,493,3,102,
	51,0,493,77,1,0,0,0,494,497,5,49,0,0,495,498,5,52,0,0,496,498,3,88,44,0,
	497,495,1,0,0,0,497,496,1,0,0,0,498,79,1,0,0,0,499,500,5,53,0,0,500,501,
	5,4,0,0,501,502,3,102,51,0,502,81,1,0,0,0,503,504,5,43,0,0,504,505,5,79,
	0,0,505,506,3,102,51,0,506,507,5,80,0,0,507,508,5,4,0,0,508,509,3,102,51,
	0,509,83,1,0,0,0,510,511,3,102,51,0,511,512,5,4,0,0,512,513,5,51,0,0,513,
	514,5,57,0,0,514,515,5,74,0,0,515,516,5,81,0,0,516,517,5,74,0,0,517,518,
	5,58,0,0,518,85,1,0,0,0,519,520,5,37,0,0,520,521,5,79,0,0,521,522,3,102,
	51,0,522,523,5,80,0,0,523,87,1,0,0,0,524,525,5,51,0,0,525,526,5,79,0,0,
	526,527,3,102,51,0,527,528,5,80,0,0,528,89,1,0,0,0,529,530,7,3,0,0,530,
	91,1,0,0,0,531,532,7,4,0,0,532,93,1,0,0,0,533,537,3,98,49,0,534,537,3,96,
	48,0,535,537,3,100,50,0,536,533,1,0,0,0,536,534,1,0,0,0,536,535,1,0,0,0,
	537,95,1,0,0,0,538,539,5,63,0,0,539,540,5,74,0,0,540,541,3,108,54,0,541,
	97,1,0,0,0,542,543,5,62,0,0,543,544,5,71,0,0,544,545,3,108,54,0,545,99,
	1,0,0,0,546,547,5,63,0,0,547,548,5,74,0,0,548,550,3,132,66,0,549,551,5,
	79,0,0,550,549,1,0,0,0,550,551,1,0,0,0,551,552,1,0,0,0,552,554,3,102,51,
	0,553,555,5,80,0,0,554,553,1,0,0,0,554,555,1,0,0,0,555,556,1,0,0,0,556,
	557,3,108,54,0,557,101,1,0,0,0,558,564,5,88,0,0,559,564,5,74,0,0,560,564,
	5,71,0,0,561,564,5,72,0,0,562,564,3,122,61,0,563,558,1,0,0,0,563,559,1,
	0,0,0,563,560,1,0,0,0,563,561,1,0,0,0,563,562,1,0,0,0,564,103,1,0,0,0,565,
	567,5,71,0,0,566,568,3,106,53,0,567,566,1,0,0,0,567,568,1,0,0,0,568,569,
	1,0,0,0,569,571,5,79,0,0,570,572,3,112,56,0,571,570,1,0,0,0,571,572,1,0,
	0,0,572,573,1,0,0,0,573,574,5,80,0,0,574,105,1,0,0,0,575,576,5,5,0,0,576,
	577,3,130,65,0,577,578,5,6,0,0,578,107,1,0,0,0,579,586,5,86,0,0,580,582,
	3,8,4,0,581,580,1,0,0,0,582,583,1,0,0,0,583,581,1,0,0,0,583,584,1,0,0,0,
	584,587,1,0,0,0,585,587,3,110,55,0,586,581,1,0,0,0,586,585,1,0,0,0,587,
	588,1,0,0,0,588,589,5,87,0,0,589,109,1,0,0,0,590,591,5,67,0,0,591,592,5,
	69,0,0,592,593,5,1,0,0,593,111,1,0,0,0,594,599,3,114,57,0,595,596,5,81,
	0,0,596,598,3,114,57,0,597,595,1,0,0,0,598,601,1,0,0,0,599,597,1,0,0,0,
	599,600,1,0,0,0,600,603,1,0,0,0,601,599,1,0,0,0,602,604,5,81,0,0,603,602,
	1,0,0,0,603,604,1,0,0,0,604,113,1,0,0,0,605,608,3,102,51,0,606,608,3,116,
	58,0,607,605,1,0,0,0,607,606,1,0,0,0,608,115,1,0,0,0,609,610,5,70,0,0,610,
	611,5,5,0,0,611,612,5,59,0,0,612,613,5,81,0,0,613,614,3,118,59,0,614,615,
	5,81,0,0,615,616,3,118,59,0,616,617,5,6,0,0,617,117,1,0,0,0,618,619,7,5,
	0,0,619,119,1,0,0,0,620,621,7,6,0,0,621,622,5,71,0,0,622,121,1,0,0,0,623,
	626,3,128,64,0,624,626,3,124,62,0,625,623,1,0,0,0,625,624,1,0,0,0,626,123,
	1,0,0,0,627,628,5,86,0,0,628,633,3,126,63,0,629,630,5,81,0,0,630,632,3,
	126,63,0,631,629,1,0,0,0,632,635,1,0,0,0,633,631,1,0,0,0,633,634,1,0,0,
	0,634,637,1,0,0,0,635,633,1,0,0,0,636,638,5,81,0,0,637,636,1,0,0,0,637,
	638,1,0,0,0,638,639,1,0,0,0,639,640,5,87,0,0,640,125,1,0,0,0,641,642,5,
	71,0,0,642,643,5,4,0,0,643,644,3,128,64,0,644,127,1,0,0,0,645,646,7,7,0,
	0,646,129,1,0,0,0,647,648,5,71,0,0,648,649,3,102,51,0,649,131,1,0,0,0,650,
	651,5,68,0,0,651,654,5,71,0,0,652,654,5,61,0,0,653,650,1,0,0,0,653,652,
	1,0,0,0,654,133,1,0,0,0,56,137,143,145,164,170,186,194,211,224,231,239,
	247,254,258,262,270,278,288,298,301,309,312,334,336,348,350,361,365,372,
	376,384,409,424,431,447,454,463,475,481,486,497,536,550,554,563,567,571,
	583,586,599,603,607,625,633,637,653];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ExplorerScriptParser.__ATN) {
			ExplorerScriptParser.__ATN = new ATNDeserializer().deserialize(ExplorerScriptParser._serializedATN);
		}

		return ExplorerScriptParser.__ATN;
	}


	static DecisionsToDFA = ExplorerScriptParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class StartContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(ExplorerScriptParser.EOF, 0);
	}
	public import_stmt_list(): Import_stmtContext[] {
		return this.getTypedRuleContexts(Import_stmtContext) as Import_stmtContext[];
	}
	public import_stmt(i: number): Import_stmtContext {
		return this.getTypedRuleContext(Import_stmtContext, i) as Import_stmtContext;
	}
	public macrodef_list(): MacrodefContext[] {
		return this.getTypedRuleContexts(MacrodefContext) as MacrodefContext[];
	}
	public macrodef(i: number): MacrodefContext {
		return this.getTypedRuleContext(MacrodefContext, i) as MacrodefContext;
	}
	public funcdef_list(): FuncdefContext[] {
		return this.getTypedRuleContexts(FuncdefContext) as FuncdefContext[];
	}
	public funcdef(i: number): FuncdefContext {
		return this.getTypedRuleContext(FuncdefContext, i) as FuncdefContext;
	}
	public constant_assign_list(): Constant_assignContext[] {
		return this.getTypedRuleContexts(Constant_assignContext) as Constant_assignContext[];
	}
	public constant_assign(i: number): Constant_assignContext {
		return this.getTypedRuleContext(Constant_assignContext, i) as Constant_assignContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_start;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitStart) {
			return visitor.visitStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Import_stmtContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IMPORT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IMPORT, 0);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.STRING_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_import_stmt;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitImport_stmt) {
			return visitor.visitImport_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Constant_assignContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONST(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CONST, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ASSIGN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_constant_assign;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitConstant_assign) {
			return visitor.visitConstant_assign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MacrodefContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MACRO(): TerminalNode {
		return this.getToken(ExplorerScriptParser.MACRO, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public func_suite(): Func_suiteContext {
		return this.getTypedRuleContext(Func_suiteContext, 0) as Func_suiteContext;
	}
	public VARIABLE_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.VARIABLE);
	}
	public VARIABLE(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.VARIABLE, i);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_macrodef;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitMacrodef) {
			return visitor.visitMacrodef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public constant_assign(): Constant_assignContext {
		return this.getTypedRuleContext(Constant_assignContext, 0) as Constant_assignContext;
	}
	public simple_stmt(): Simple_stmtContext {
		return this.getTypedRuleContext(Simple_stmtContext, 0) as Simple_stmtContext;
	}
	public ctx_block(): Ctx_blockContext {
		return this.getTypedRuleContext(Ctx_blockContext, 0) as Ctx_blockContext;
	}
	public if_block(): If_blockContext {
		return this.getTypedRuleContext(If_blockContext, 0) as If_blockContext;
	}
	public switch_block(): Switch_blockContext {
		return this.getTypedRuleContext(Switch_blockContext, 0) as Switch_blockContext;
	}
	public message_switch_block(): Message_switch_blockContext {
		return this.getTypedRuleContext(Message_switch_blockContext, 0) as Message_switch_blockContext;
	}
	public forever_block(): Forever_blockContext {
		return this.getTypedRuleContext(Forever_blockContext, 0) as Forever_blockContext;
	}
	public for_block(): For_blockContext {
		return this.getTypedRuleContext(For_blockContext, 0) as For_blockContext;
	}
	public while_block(): While_blockContext {
		return this.getTypedRuleContext(While_blockContext, 0) as While_blockContext;
	}
	public macro_call(): Macro_callContext {
		return this.getTypedRuleContext(Macro_callContext, 0) as Macro_callContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_stmt;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitStmt) {
			return visitor.visitStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_stmtContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public operation(): OperationContext {
		return this.getTypedRuleContext(OperationContext, 0) as OperationContext;
	}
	public label(): LabelContext {
		return this.getTypedRuleContext(LabelContext, 0) as LabelContext;
	}
	public cntrl_stmt(): Cntrl_stmtContext {
		return this.getTypedRuleContext(Cntrl_stmtContext, 0) as Cntrl_stmtContext;
	}
	public jump(): JumpContext {
		return this.getTypedRuleContext(JumpContext, 0) as JumpContext;
	}
	public call(): CallContext {
		return this.getTypedRuleContext(CallContext, 0) as CallContext;
	}
	public assignment(): AssignmentContext {
		return this.getTypedRuleContext(AssignmentContext, 0) as AssignmentContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_simple_stmt;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSimple_stmt) {
			return visitor.visitSimple_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Cntrl_stmtContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RETURN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.RETURN, 0);
	}
	public END(): TerminalNode {
		return this.getToken(ExplorerScriptParser.END, 0);
	}
	public HOLD(): TerminalNode {
		return this.getToken(ExplorerScriptParser.HOLD, 0);
	}
	public CONTINUE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CONTINUE, 0);
	}
	public BREAK(): TerminalNode {
		return this.getToken(ExplorerScriptParser.BREAK, 0);
	}
	public BREAK_LOOP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.BREAK_LOOP, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_cntrl_stmt;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCntrl_stmt) {
			return visitor.visitCntrl_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JumpContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public JUMP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.JUMP, 0);
	}
	public AT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.AT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_jump;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitJump) {
			return visitor.visitJump(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CallContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CALL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CALL, 0);
	}
	public AT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.AT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_call;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCall) {
			return visitor.visitCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Macro_callContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MACRO_CALL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.MACRO_CALL, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public arglist(): ArglistContext {
		return this.getTypedRuleContext(ArglistContext, 0) as ArglistContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_macro_call;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitMacro_call) {
			return visitor.visitMacro_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ctx_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public WITH(): TerminalNode {
		return this.getToken(ExplorerScriptParser.WITH, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public ctx_header(): Ctx_headerContext {
		return this.getTypedRuleContext(Ctx_headerContext, 0) as Ctx_headerContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public simple_stmt_list(): Simple_stmtContext[] {
		return this.getTypedRuleContexts(Simple_stmtContext) as Simple_stmtContext[];
	}
	public simple_stmt(i: number): Simple_stmtContext {
		return this.getTypedRuleContext(Simple_stmtContext, i) as Simple_stmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_ctx_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCtx_block) {
			return visitor.visitCtx_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IF(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IF, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public if_header_list(): If_headerContext[] {
		return this.getTypedRuleContexts(If_headerContext) as If_headerContext[];
	}
	public if_header(i: number): If_headerContext {
		return this.getTypedRuleContext(If_headerContext, i) as If_headerContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public NOT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.NOT, 0);
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.OR, i);
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
	public elseif_block_list(): Elseif_blockContext[] {
		return this.getTypedRuleContexts(Elseif_blockContext) as Elseif_blockContext[];
	}
	public elseif_block(i: number): Elseif_blockContext {
		return this.getTypedRuleContext(Elseif_blockContext, i) as Elseif_blockContext;
	}
	public else_block(): Else_blockContext {
		return this.getTypedRuleContext(Else_blockContext, 0) as Else_blockContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_if_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitIf_block) {
			return visitor.visitIf_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Elseif_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ELSEIF(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ELSEIF, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public if_header_list(): If_headerContext[] {
		return this.getTypedRuleContexts(If_headerContext) as If_headerContext[];
	}
	public if_header(i: number): If_headerContext {
		return this.getTypedRuleContext(If_headerContext, i) as If_headerContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public NOT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.NOT, 0);
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.OR, i);
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_elseif_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitElseif_block) {
			return visitor.visitElseif_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Else_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ELSE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ELSE, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_else_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitElse_block) {
			return visitor.visitElse_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_headerContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public if_h_op(): If_h_opContext {
		return this.getTypedRuleContext(If_h_opContext, 0) as If_h_opContext;
	}
	public if_h_bit(): If_h_bitContext {
		return this.getTypedRuleContext(If_h_bitContext, 0) as If_h_bitContext;
	}
	public if_h_negatable(): If_h_negatableContext {
		return this.getTypedRuleContext(If_h_negatableContext, 0) as If_h_negatableContext;
	}
	public if_h_scn(): If_h_scnContext {
		return this.getTypedRuleContext(If_h_scnContext, 0) as If_h_scnContext;
	}
	public operation(): OperationContext {
		return this.getTypedRuleContext(OperationContext, 0) as OperationContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_if_header;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitIf_header) {
			return visitor.visitIf_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_h_negatableContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEBUG(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DEBUG, 0);
	}
	public EDIT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.EDIT, 0);
	}
	public VARIATION(): TerminalNode {
		return this.getToken(ExplorerScriptParser.VARIATION, 0);
	}
	public NOT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.NOT, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_if_h_negatable;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitIf_h_negatable) {
			return visitor.visitIf_h_negatable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_h_opContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitive_list(): PrimitiveContext[] {
		return this.getTypedRuleContexts(PrimitiveContext) as PrimitiveContext[];
	}
	public primitive(i: number): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, i) as PrimitiveContext;
	}
	public conditional_operator(): Conditional_operatorContext {
		return this.getTypedRuleContext(Conditional_operatorContext, 0) as Conditional_operatorContext;
	}
	public value_of(): Value_ofContext {
		return this.getTypedRuleContext(Value_ofContext, 0) as Value_ofContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_if_h_op;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitIf_h_op) {
			return visitor.visitIf_h_op(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_h_bitContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public OPEN_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACKET, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, 0);
	}
	public CLOSE_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACKET, 0);
	}
	public NOT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.NOT, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_if_h_bit;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitIf_h_bit) {
			return visitor.visitIf_h_bit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_h_scnContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public scn_var(): Scn_varContext {
		return this.getTypedRuleContext(Scn_varContext, 0) as Scn_varContext;
	}
	public conditional_operator(): Conditional_operatorContext {
		return this.getTypedRuleContext(Conditional_operatorContext, 0) as Conditional_operatorContext;
	}
	public OPEN_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACKET, 0);
	}
	public INTEGER_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.INTEGER);
	}
	public INTEGER(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, i);
	}
	public COMMA(): TerminalNode {
		return this.getToken(ExplorerScriptParser.COMMA, 0);
	}
	public CLOSE_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACKET, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_if_h_scn;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitIf_h_scn) {
			return visitor.visitIf_h_scn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SWITCH(): TerminalNode {
		return this.getToken(ExplorerScriptParser.SWITCH, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public switch_header(): Switch_headerContext {
		return this.getTypedRuleContext(Switch_headerContext, 0) as Switch_headerContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public default__list(): DefaultContext[] {
		return this.getTypedRuleContexts(DefaultContext) as DefaultContext[];
	}
	public default_(i: number): DefaultContext {
		return this.getTypedRuleContext(DefaultContext, i) as DefaultContext;
	}
	public single_case_block_list(): Single_case_blockContext[] {
		return this.getTypedRuleContexts(Single_case_blockContext) as Single_case_blockContext[];
	}
	public single_case_block(i: number): Single_case_blockContext {
		return this.getTypedRuleContext(Single_case_blockContext, i) as Single_case_blockContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_switch_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSwitch_block) {
			return visitor.visitSwitch_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Message_switch_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public MESSAGE_SWITCH_TALK(): TerminalNode {
		return this.getToken(ExplorerScriptParser.MESSAGE_SWITCH_TALK, 0);
	}
	public MESSAGE_SWITCH_MONOLOGUE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.MESSAGE_SWITCH_MONOLOGUE, 0);
	}
	public default__list(): DefaultContext[] {
		return this.getTypedRuleContexts(DefaultContext) as DefaultContext[];
	}
	public default_(i: number): DefaultContext {
		return this.getTypedRuleContext(DefaultContext, i) as DefaultContext;
	}
	public single_case_block_list(): Single_case_blockContext[] {
		return this.getTypedRuleContexts(Single_case_blockContext) as Single_case_blockContext[];
	}
	public single_case_block(i: number): Single_case_blockContext {
		return this.getTypedRuleContext(Single_case_blockContext, i) as Single_case_blockContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_message_switch_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitMessage_switch_block) {
			return visitor.visitMessage_switch_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Single_case_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CASE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CASE, 0);
	}
	public case_header(): Case_headerContext {
		return this.getTypedRuleContext(Case_headerContext, 0) as Case_headerContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(ExplorerScriptParser.COLON, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_single_case_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSingle_case_block) {
			return visitor.visitSingle_case_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefaultContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DEFAULT, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(ExplorerScriptParser.COLON, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_default;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitDefault) {
			return visitor.visitDefault(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_headerContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public operation(): OperationContext {
		return this.getTypedRuleContext(OperationContext, 0) as OperationContext;
	}
	public switch_h_scn(): Switch_h_scnContext {
		return this.getTypedRuleContext(Switch_h_scnContext, 0) as Switch_h_scnContext;
	}
	public switch_h_random(): Switch_h_randomContext {
		return this.getTypedRuleContext(Switch_h_randomContext, 0) as Switch_h_randomContext;
	}
	public switch_h_dungeon_mode(): Switch_h_dungeon_modeContext {
		return this.getTypedRuleContext(Switch_h_dungeon_modeContext, 0) as Switch_h_dungeon_modeContext;
	}
	public switch_h_sector(): Switch_h_sectorContext {
		return this.getTypedRuleContext(Switch_h_sectorContext, 0) as Switch_h_sectorContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_switch_header;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSwitch_header) {
			return visitor.visitSwitch_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_h_scnContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public scn_var(): Scn_varContext {
		return this.getTypedRuleContext(Scn_varContext, 0) as Scn_varContext;
	}
	public OPEN_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACKET, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, 0);
	}
	public CLOSE_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACKET, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_switch_h_scn;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSwitch_h_scn) {
			return visitor.visitSwitch_h_scn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_h_randomContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RANDOM(): TerminalNode {
		return this.getToken(ExplorerScriptParser.RANDOM, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_switch_h_random;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSwitch_h_random) {
			return visitor.visitSwitch_h_random(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_h_dungeon_modeContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DUNGEON_MODE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DUNGEON_MODE, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_switch_h_dungeon_mode;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSwitch_h_dungeon_mode) {
			return visitor.visitSwitch_h_dungeon_mode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Switch_h_sectorContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SECTOR(): TerminalNode {
		return this.getToken(ExplorerScriptParser.SECTOR, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_switch_h_sector;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSwitch_h_sector) {
			return visitor.visitSwitch_h_sector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_headerContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public case_h_menu(): Case_h_menuContext {
		return this.getTypedRuleContext(Case_h_menuContext, 0) as Case_h_menuContext;
	}
	public case_h_menu2(): Case_h_menu2Context {
		return this.getTypedRuleContext(Case_h_menu2Context, 0) as Case_h_menu2Context;
	}
	public case_h_op(): Case_h_opContext {
		return this.getTypedRuleContext(Case_h_opContext, 0) as Case_h_opContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_case_header;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCase_header) {
			return visitor.visitCase_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_h_menuContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MENU(): TerminalNode {
		return this.getToken(ExplorerScriptParser.MENU, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_case_h_menu;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCase_h_menu) {
			return visitor.visitCase_h_menu(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_h_menu2Context extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MENU2(): TerminalNode {
		return this.getToken(ExplorerScriptParser.MENU2, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_case_h_menu2;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCase_h_menu2) {
			return visitor.visitCase_h_menu2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Case_h_opContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public conditional_operator(): Conditional_operatorContext {
		return this.getTypedRuleContext(Conditional_operatorContext, 0) as Conditional_operatorContext;
	}
	public value_of(): Value_ofContext {
		return this.getTypedRuleContext(Value_ofContext, 0) as Value_ofContext;
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_case_h_op;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCase_h_op) {
			return visitor.visitCase_h_op(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Forever_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOREVER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.FOREVER, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_forever_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitForever_block) {
			return visitor.visitForever_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class For_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOR(): TerminalNode {
		return this.getToken(ExplorerScriptParser.FOR, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public simple_stmt_list(): Simple_stmtContext[] {
		return this.getTypedRuleContexts(Simple_stmtContext) as Simple_stmtContext[];
	}
	public simple_stmt(i: number): Simple_stmtContext {
		return this.getTypedRuleContext(Simple_stmtContext, i) as Simple_stmtContext;
	}
	public if_header(): If_headerContext {
		return this.getTypedRuleContext(If_headerContext, 0) as If_headerContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_for_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitFor_block) {
			return visitor.visitFor_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class While_blockContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public WHILE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.WHILE, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public if_header(): If_headerContext {
		return this.getTypedRuleContext(If_headerContext, 0) as If_headerContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public NOT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.NOT, 0);
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_while_block;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitWhile_block) {
			return visitor.visitWhile_block(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignment_regular(): Assignment_regularContext {
		return this.getTypedRuleContext(Assignment_regularContext, 0) as Assignment_regularContext;
	}
	public assignment_clear(): Assignment_clearContext {
		return this.getTypedRuleContext(Assignment_clearContext, 0) as Assignment_clearContext;
	}
	public assignment_initial(): Assignment_initialContext {
		return this.getTypedRuleContext(Assignment_initialContext, 0) as Assignment_initialContext;
	}
	public assignment_reset(): Assignment_resetContext {
		return this.getTypedRuleContext(Assignment_resetContext, 0) as Assignment_resetContext;
	}
	public assignment_adv_log(): Assignment_adv_logContext {
		return this.getTypedRuleContext(Assignment_adv_logContext, 0) as Assignment_adv_logContext;
	}
	public assignment_dungeon_mode(): Assignment_dungeon_modeContext {
		return this.getTypedRuleContext(Assignment_dungeon_modeContext, 0) as Assignment_dungeon_modeContext;
	}
	public assignment_scn(): Assignment_scnContext {
		return this.getTypedRuleContext(Assignment_scnContext, 0) as Assignment_scnContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_regularContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitive_list(): PrimitiveContext[] {
		return this.getTypedRuleContexts(PrimitiveContext) as PrimitiveContext[];
	}
	public primitive(i: number): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, i) as PrimitiveContext;
	}
	public assign_operator(): Assign_operatorContext {
		return this.getTypedRuleContext(Assign_operatorContext, 0) as Assign_operatorContext;
	}
	public value_of(): Value_ofContext {
		return this.getTypedRuleContext(Value_ofContext, 0) as Value_ofContext;
	}
	public OPEN_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACKET, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, 0);
	}
	public CLOSE_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACKET, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment_regular;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_regular) {
			return visitor.visitAssignment_regular(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_clearContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CLEAR(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLEAR, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment_clear;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_clear) {
			return visitor.visitAssignment_clear(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_initialContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INIT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INIT, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment_initial;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_initial) {
			return visitor.visitAssignment_initial(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_resetContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RESET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.RESET, 0);
	}
	public DUNGEON_RESULT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DUNGEON_RESULT, 0);
	}
	public scn_var(): Scn_varContext {
		return this.getTypedRuleContext(Scn_varContext, 0) as Scn_varContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment_reset;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_reset) {
			return visitor.visitAssignment_reset(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_adv_logContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ADVENTURE_LOG(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ADVENTURE_LOG, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ASSIGN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment_adv_log;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_adv_log) {
			return visitor.visitAssignment_adv_log(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_dungeon_modeContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DUNGEON_MODE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DUNGEON_MODE, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive_list(): PrimitiveContext[] {
		return this.getTypedRuleContexts(PrimitiveContext) as PrimitiveContext[];
	}
	public primitive(i: number): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, i) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment_dungeon_mode;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_dungeon_mode) {
			return visitor.visitAssignment_dungeon_mode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_scnContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ASSIGN, 0);
	}
	public SCN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.SCN, 0);
	}
	public OPEN_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACKET, 0);
	}
	public INTEGER_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.INTEGER);
	}
	public INTEGER(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, i);
	}
	public COMMA(): TerminalNode {
		return this.getToken(ExplorerScriptParser.COMMA, 0);
	}
	public CLOSE_BRACKET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACKET, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assignment_scn;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssignment_scn) {
			return visitor.visitAssignment_scn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Value_ofContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VALUE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.VALUE, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_value_of;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitValue_of) {
			return visitor.visitValue_of(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Scn_varContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SCN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.SCN, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_scn_var;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitScn_var) {
			return visitor.visitScn_var(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Conditional_operatorContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OP_FALSE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_FALSE, 0);
	}
	public OP_TRUE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_TRUE, 0);
	}
	public OP_EQ(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_EQ, 0);
	}
	public OP_GE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_GE, 0);
	}
	public OP_LE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_LE, 0);
	}
	public OPEN_SHARP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_SHARP, 0);
	}
	public CLOSE_SHARP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_SHARP, 0);
	}
	public OP_NEQ(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_NEQ, 0);
	}
	public OP_AND(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_AND, 0);
	}
	public OP_XOR(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_XOR, 0);
	}
	public OP_BICH(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_BICH, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_conditional_operator;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitConditional_operator) {
			return visitor.visitConditional_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assign_operatorContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OP_MINUS(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_MINUS, 0);
	}
	public OP_PLUS(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_PLUS, 0);
	}
	public OP_MULTIPLY(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_MULTIPLY, 0);
	}
	public OP_DIVIDE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OP_DIVIDE, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_assign_operator;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitAssign_operator) {
			return visitor.visitAssign_operator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FuncdefContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public coro_def(): Coro_defContext {
		return this.getTypedRuleContext(Coro_defContext, 0) as Coro_defContext;
	}
	public simple_def(): Simple_defContext {
		return this.getTypedRuleContext(Simple_defContext, 0) as Simple_defContext;
	}
	public for_target_def(): For_target_defContext {
		return this.getTypedRuleContext(For_target_defContext, 0) as For_target_defContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_funcdef;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitFuncdef) {
			return visitor.visitFuncdef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Simple_defContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEF(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DEF, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, 0);
	}
	public func_suite(): Func_suiteContext {
		return this.getTypedRuleContext(Func_suiteContext, 0) as Func_suiteContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_simple_def;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitSimple_def) {
			return visitor.visitSimple_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Coro_defContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CORO(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CORO, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public func_suite(): Func_suiteContext {
		return this.getTypedRuleContext(Func_suiteContext, 0) as Func_suiteContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_coro_def;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCoro_def) {
			return visitor.visitCoro_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class For_target_defContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEF(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DEF, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, 0);
	}
	public for_target_def_target(): For_target_def_targetContext {
		return this.getTypedRuleContext(For_target_def_targetContext, 0) as For_target_def_targetContext;
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public func_suite(): Func_suiteContext {
		return this.getTypedRuleContext(Func_suiteContext, 0) as Func_suiteContext;
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_for_target_def;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitFor_target_def) {
			return visitor.visitFor_target_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimitiveContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DECIMAL, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public VARIABLE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.VARIABLE, 0);
	}
	public string_(): StringContext {
		return this.getTypedRuleContext(StringContext, 0) as StringContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_primitive;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitPrimitive) {
			return visitor.visitPrimitive(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperationContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public OPEN_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_PAREN, 0);
	}
	public CLOSE_PAREN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_PAREN, 0);
	}
	public inline_ctx(): Inline_ctxContext {
		return this.getTypedRuleContext(Inline_ctxContext, 0) as Inline_ctxContext;
	}
	public arglist(): ArglistContext {
		return this.getTypedRuleContext(ArglistContext, 0) as ArglistContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_operation;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitOperation) {
			return visitor.visitOperation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Inline_ctxContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_SHARP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_SHARP, 0);
	}
	public ctx_header(): Ctx_headerContext {
		return this.getTypedRuleContext(Ctx_headerContext, 0) as Ctx_headerContext;
	}
	public CLOSE_SHARP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_SHARP, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_inline_ctx;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitInline_ctx) {
			return visitor.visitInline_ctx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Func_suiteContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public func_alias(): Func_aliasContext {
		return this.getTypedRuleContext(Func_aliasContext, 0) as Func_aliasContext;
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_func_suite;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitFunc_suite) {
			return visitor.visitFunc_suite(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Func_aliasContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ALIAS(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ALIAS, 0);
	}
	public PREVIOUS(): TerminalNode {
		return this.getToken(ExplorerScriptParser.PREVIOUS, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_func_alias;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitFunc_alias) {
			return visitor.visitFunc_alias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArglistContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pos_argument_list(): Pos_argumentContext[] {
		return this.getTypedRuleContexts(Pos_argumentContext) as Pos_argumentContext[];
	}
	public pos_argument(i: number): Pos_argumentContext {
		return this.getTypedRuleContext(Pos_argumentContext, i) as Pos_argumentContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_arglist;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitArglist) {
			return visitor.visitArglist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pos_argumentContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
	public position_marker(): Position_markerContext {
		return this.getTypedRuleContext(Position_markerContext, 0) as Position_markerContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_pos_argument;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitPos_argument) {
			return visitor.visitPos_argument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Position_markerContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public POSITION(): TerminalNode {
		return this.getToken(ExplorerScriptParser.POSITION, 0);
	}
	public OPEN_SHARP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_SHARP, 0);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.STRING_LITERAL, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.COMMA, i);
	}
	public position_marker_arg_list(): Position_marker_argContext[] {
		return this.getTypedRuleContexts(Position_marker_argContext) as Position_marker_argContext[];
	}
	public position_marker_arg(i: number): Position_marker_argContext {
		return this.getTypedRuleContext(Position_marker_argContext, i) as Position_marker_argContext;
	}
	public CLOSE_SHARP(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_SHARP, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_position_marker;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitPosition_marker) {
			return visitor.visitPosition_marker(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Position_marker_argContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.DECIMAL, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_position_marker_arg;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitPosition_marker_arg) {
			return visitor.visitPosition_marker_arg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabelContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public PARAGRAPH(): TerminalNode {
		return this.getToken(ExplorerScriptParser.PARAGRAPH, 0);
	}
	public AT(): TerminalNode {
		return this.getToken(ExplorerScriptParser.AT, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_label;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitLabel) {
			return visitor.visitLabel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public string_value(): String_valueContext {
		return this.getTypedRuleContext(String_valueContext, 0) as String_valueContext;
	}
	public lang_string(): Lang_stringContext {
		return this.getTypedRuleContext(Lang_stringContext, 0) as Lang_stringContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_string;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitString) {
			return visitor.visitString(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Lang_stringContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.OPEN_BRACE, 0);
	}
	public lang_string_argument_list(): Lang_string_argumentContext[] {
		return this.getTypedRuleContexts(Lang_string_argumentContext) as Lang_string_argumentContext[];
	}
	public lang_string_argument(i: number): Lang_string_argumentContext {
		return this.getTypedRuleContext(Lang_string_argumentContext, i) as Lang_string_argumentContext;
	}
	public CLOSE_BRACE(): TerminalNode {
		return this.getToken(ExplorerScriptParser.CLOSE_BRACE, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ExplorerScriptParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ExplorerScriptParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_lang_string;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitLang_string) {
			return visitor.visitLang_string(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Lang_string_argumentContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ExplorerScriptParser.ASSIGN, 0);
	}
	public string_value(): String_valueContext {
		return this.getTypedRuleContext(String_valueContext, 0) as String_valueContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_lang_string_argument;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitLang_string_argument) {
			return visitor.visitLang_string_argument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_valueContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MULTILINE_STRING_LITERAL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.MULTILINE_STRING_LITERAL, 0);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ExplorerScriptParser.STRING_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_string_value;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitString_value) {
			return visitor.visitString_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ctx_headerContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public primitive(): PrimitiveContext {
		return this.getTypedRuleContext(PrimitiveContext, 0) as PrimitiveContext;
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_ctx_header;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitCtx_header) {
			return visitor.visitCtx_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class For_target_def_targetContext extends ParserRuleContext {
	constructor(parser?: ExplorerScriptParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOR(): TerminalNode {
		return this.getToken(ExplorerScriptParser.FOR, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ExplorerScriptParser.IDENTIFIER, 0);
	}
	public FOR_TARGET(): TerminalNode {
		return this.getToken(ExplorerScriptParser.FOR_TARGET, 0);
	}
    public get ruleIndex(): number {
    	return ExplorerScriptParser.RULE_for_target_def_target;
	}
	// @Override
	public accept<Result>(visitor: ExplorerScriptVisitor<Result>): Result {
		if (visitor.visitFor_target_def_target) {
			return visitor.visitFor_target_def_target(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
