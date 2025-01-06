import { ParserRuleContext } from "antlr4";
import { Diagnostic } from "vscode-languageserver";

export interface CompileHandler<T extends ParserRuleContext> {
	validate: (ctx: T) => Diagnostic[];
	add?: (ctx: CompileHandler<ParserRuleContext>) => void;
}