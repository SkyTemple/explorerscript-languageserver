import { ParserRuleContext, Token } from "antlr4";
import { String_valueContext } from "./antlr/ExplorerScriptParser.js";
import { Range } from "vscode-languageserver";

// Adapted from https://github.com/SkyTemple/ExplorerScript/blob/80170a56a41309ce7dc9ec4798fbc5367b941c49/explorerscript/ssb_converting/compiler/utils.py#L256
export function stringLiteral(string: String_valueContext): string {
	const singleLine = string.STRING_LITERAL();
	if (singleLine) {
		return singlelineStringLiteral(singleLine.getText());
	}
	return multilineStringLiteral(string.MULTILINE_STRING_LITERAL().getText());
}

export function singlelineStringLiteral(rawString: string): string {
	// This isn't the greatest escaping but it works for most cases. Changing it now would be backwards incompatible.
	return rawString.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, "\n");
}

export function multilineStringLiteral(string: string): string {
	string = string.slice(3, -3);
	const allLines = string.split('\n');
	let lines: string[] = [];
	let lastLine = "";

	let firstLine: string;
	if (allLines.length === 0) {
		firstLine = "";
	} else if (allLines.length === 1) {
		firstLine = allLines[0];
	} else if (allLines.length === 2) {
		[firstLine, lastLine] = allLines;
	} else {
		[firstLine, ...lines] = allLines;
		lastLine = lines.pop() || "";
	}

	const lastLineStripped = lastLine.trimStart();
	if (lastLineStripped.length !== 0) {
		// The last line contains characters, treat it as normal.
		lines.push(lastLine);
	}

	const whitespaceCount = (line: string): number => {
		return line.match(/^ */)?.[0].length || 0;
	};

	const whitespacesCounts: number[] = lines.map(whitespaceCount);
	const minWhitespaceCount = Math.min(...whitespacesCounts);

	const transformedLines = lines.map(line => line.slice(minWhitespaceCount));

	const nlIfLines = firstLine !== "" && transformedLines.length > 0 ? "\n" : "";

	return firstLine + nlIfLines + transformedLines.join("\n");
}

export function getTokenRange(token: Token): Range {
	return {
		start: {
			line: token.line - 1,
			character: token.column
		},
		end: {
			line: token.line - 1,
			character: token.column + token.text.length
		}
	};
}

export function getCtxRange(ctx: ParserRuleContext): Range {
	const startToken = ctx.start;
	const stopToken = ctx.stop || ctx.start;
	return {
		start: {
			line: startToken.line - 1,
			character: startToken.column
		},
		end: {
			line: stopToken.line - 1,
			character: stopToken.column + stopToken.text.length
		}
	};
}