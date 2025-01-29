import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { PrimitiveContext } from "../../antlr/ExplorerScriptParser";
import { CompileHandler } from "./interface";
import { CompilerContext } from "../statement";
import { diagnosticForContext } from "../../diagnosticHelpers";
import { Coroutine, Macro, Routine } from "../../symbols";
import { ExplorerScriptStaticConstant } from "../../data/constantStore";
import { UserConstant } from "../symbols";

export class PrimitiveCompileHandler implements CompileHandler<PrimitiveContext> {
  constructor(private _compilerContext: CompilerContext, private _parent: Routine | Coroutine | Macro | undefined) {
  }
  
  validate(ctx: PrimitiveContext): Diagnostic[] {
	if (ctx.IDENTIFIER()) {
		const name = ctx.IDENTIFIER().getText();
		
		if (!this._findConstant(name)) {
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
		const text = ctx.VARIABLE().getText();
		const prefix = text[0];
		const name = text.slice(1);

		if (this._parent instanceof Macro) {
			// Find a match (excluding the `$`/`%` prefix)
			let variableExists = this._parent?.args.find(a => a.name.slice(1) === name);
			if (variableExists) {
				return [];
			} else if (prefix === '%') {
				return [diagnosticForContext(
					ctx,
					`Undefined macro argument \`${name}\``,
					DiagnosticSeverity.Error
				)];
			}
		} else if (prefix === '%') {
			return [diagnosticForContext(
				ctx,
				`Variables can only be used in macros`,
				DiagnosticSeverity.Error
			)];
		}

		// Find a matching game variable
		const gameVar = this._compilerContext.staticConstants.byName.get('$' + name);
		if (!gameVar || gameVar.type !== 'variable') {
			return [diagnosticForContext(
				ctx,
				`Unknown variable \`${name}\``,
				DiagnosticSeverity.Error
			)];
		}
	}

	return [];
  }

  private _findConstant(name: string): ExplorerScriptStaticConstant | UserConstant | undefined {
	return this._compilerContext.staticConstants.byName.get(name)
			?? this._compilerContext.allSymbols.getGlobalConstantByName(name)
			?? this._parent?.scopedConstants.find(c => c.name === name);
  }
}