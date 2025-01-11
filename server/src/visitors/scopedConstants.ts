import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { Constant_assignContext, LabelContext } from "../antlr/ExplorerScriptParser";
import ExplorerScriptVisitor from "../antlr/ExplorerScriptVisitor";
import { diagnosticForContext } from "../diagnosticHelpers";
import { Label, UserConstant } from "../symbols";

export class ScopedSymbolVisitor extends ExplorerScriptVisitor<void> {
  scopeConstants: UserConstant[] = [];
  scopeLabels: Label[] = [];
  scopeConstantNames: Set<string> = new Set();
  diagnostics: Diagnostic[] = [];

  constructor(private _globalConstantsByName: Map<string, UserConstant>, private _labelsByName: Map<string, Label>) {
    super();
  }

  visitConstant_assign = (ctx: Constant_assignContext) => {
    const name = ctx.IDENTIFIER().getText();
    if (this._globalConstantsByName.has(name) || this.scopeConstantNames.has(name)) {
      this.diagnostics.push(diagnosticForContext(
        ctx,
        `Constant \`${name}\` is already defined`,
        DiagnosticSeverity.Warning
      ));
    }
    this.scopeConstantNames.add(name);
    this.scopeConstants.push(new UserConstant(ctx, name));
  }

  visitLabel = (ctx: LabelContext) => {
      if (!ctx.IDENTIFIER()) {
        return;
      }
  
      const name = ctx.IDENTIFIER().getText();
      if (this._labelsByName.has(name)) {
        this.diagnostics.push(diagnosticForContext(
          ctx,
          `Label \`${name}\` is already defined`,
          DiagnosticSeverity.Warning
        ));
      }
  
      if (ctx.PARAGRAPH()) {
        this.diagnostics.push(diagnosticForContext(
          ctx,
          `Labels should start with an at (@) instead of a paragraph symbol (§)`,
          DiagnosticSeverity.Warning
        ));
      }
  
      const label = new Label(ctx, name);
      this.scopeLabels.push(label);
    }
}