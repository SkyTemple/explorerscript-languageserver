import { ParserRuleContext, Token } from "antlr4";
import { Diagnostic, DiagnosticSeverity, Range } from "vscode-languageserver";

export function diagnosticForContext(
  context: ParserRuleContext,
  message: string,
  severity: DiagnosticSeverity = DiagnosticSeverity.Error
): Diagnostic {
  return {
	severity,
	range: {
	  start: {
		line: context.start.line - 1,
		character: context.start.column
	  },
	  end: {
		line: (context.stop?.line ?? context.start.line) - 1,
		character: (context.stop?.column ?? context.start.column) + (context.stop?.text.length ?? context.start.text.length)
	  }
	},
	message,
	source: 'explorerscript'
  };
}

export function diagnosticForToken(
  token: Token,
  message: string,
  severity: DiagnosticSeverity = DiagnosticSeverity.Error
): Diagnostic {
  return {
	severity,
	range: {
	  start: {
		line: token.line - 1,
		character: token.column
	  },
	  end: {
		line: token.line - 1,
		character: token.column + token.text.length
	  }
	},
	message,
	source: 'explorerscript'
  };
}

export function diagnosticForRange(range: Range, message: string, severity: DiagnosticSeverity = DiagnosticSeverity.Error): Diagnostic {
  return {
	severity,
	range,
	message,
	source: 'explorerscript'
  };
}