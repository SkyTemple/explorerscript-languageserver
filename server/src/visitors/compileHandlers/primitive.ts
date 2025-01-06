import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { PrimitiveContext } from "../../antlr/ExplorerScriptParser.js";
import { CompileHandler } from "./interface.js";
import { CompilerContext } from "../statement.js";
import { diagnosticForContext } from "../../diagnosticHelpers.js";
import { Coroutine, Macro, Routine } from "../../symbols.js";

export class PrimitiveCompileHandler implements CompileHandler<PrimitiveContext> {
  constructor(private _compilerContext: CompilerContext, private _parent: Routine | Coroutine | Macro | undefined) {
  }
  
  validate(ctx: PrimitiveContext): Diagnostic[] {
	if (ctx.IDENTIFIER()) {
		const name = ctx.IDENTIFIER().getText();

		let constantExists = this._compilerContext.staticConstants.byName.has(name)
			|| this._compilerContext.allSymbols.getGlobalConstantByName(name)
			|| this._parent?.scopedConstants.find(c => c.name === name);
		
		if (!constantExists) {
			return [diagnosticForContext(
				ctx,
				`Unknown constant \`${name}\``,
				DiagnosticSeverity.Error
			)];
		} else {
			return [];
		}
	}

	if (ctx.VARIABLE()) {
		const name = ctx.VARIABLE().getText();
		if (!(this._parent instanceof Macro)) {
			return [diagnosticForContext(
				ctx,
				`Variables can only be used in macros`,
				DiagnosticSeverity.Error
			)];
		}

		let variableExists = this._parent?.args.find(a => a.name === name);
		if (!variableExists) {
			return [diagnosticForContext(
				ctx,
				`Undefined macro variable \`${name}\``,
				DiagnosticSeverity.Error
			)];
		} else {
			return [];
		}
	}

	return [];
  }
}