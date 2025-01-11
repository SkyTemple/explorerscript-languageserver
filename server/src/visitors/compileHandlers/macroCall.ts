import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { Macro_callContext } from "../../antlr/ExplorerScriptParser";
import { CompileHandler } from "./interface";
import { CompilerContext } from "../statement";
import { diagnosticForContext } from "../../diagnosticHelpers";

export class MacroCallCompileHandler implements CompileHandler<Macro_callContext> {
  constructor(private _compilerContext: CompilerContext) {
  }
  
  validate(ctx: Macro_callContext): Diagnostic[] {
	if (!ctx.MACRO_CALL() || !ctx.arglist() || !ctx.arglist().pos_argument_list()) {
		// Incomplete parse
		return [];
	}

	const name = ctx.MACRO_CALL().getText().slice(1); // Remove the leading ~
	const macro = this._compilerContext.allSymbols.getMacroByName(name);
	if (!macro) {
		return [diagnosticForContext(
			ctx,
			`Macro \`${name}\` is not defined`,
			DiagnosticSeverity.Error
		)]
	}

	const arglist = ctx.arglist();
	if (arglist.pos_argument_list().length !== macro.args.length) {
		return [diagnosticForContext(
			ctx,
			`Macro \`${name}\` expects ${macro.args.length} arguments, but got ${arglist.pos_argument_list().length}`,
			DiagnosticSeverity.Error
		)]
	}

	return [];
  }
}