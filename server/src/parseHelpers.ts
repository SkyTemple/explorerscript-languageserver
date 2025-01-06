import { CommonTokenStream, ErrorNode, ParserRuleContext, Token } from "antlr4";
import { connection } from "./server.js";

interface FuncCallInfo {
  name: string;
  paramIndex: number;
}

export function findFunctionCallAtOffset(text: string, offset: number): FuncCallInfo | null {
  // 1) Find any preceding function name & parentheses
  let i = offset - 1;
  // Move left until we find '(' or '<', start of text or a "terminator" character
  while (i >= 0 && text[i] !== '(' && text[i] !== ')' && text[i] !== '<') {
    if (text[i] === ';' || text[i] === '{' || text[i] === '\n') return null;
    i--;
  }
  if (i < 0 || text[i] === '\n') return null;

  // 'i' points at '(' or -1 if none found
  let nameRight = i;
  let j = i - 1;

  if (j > 0 && text[j] === '>') {
    // Skip over inline context
    j -= 1;
    while (j >= 0 && text[j] !== '<') {
      j--;
    }
    if (j < 0) return null;
    nameRight = j;
    j--;
  }

  // Move left to capture function name
  while (j >= 0 && /[a-zA-Z0-9_$]/.test(text[j])) {
    j--;
  }
  // Now text.slice(j+1, nameRight) should be the function name
  const name = text.slice(j + 1, nameRight).trim();
  if (!name) return null;

  // 2) Count how many commas from the '(' to the current offset
  let commaCount = 0;
  for (let k = i; k < offset; k++) {
    if (text[k] === ',') {
      commaCount++;
    }
  }

  return { name, paramIndex: commaCount };
}

export function getTokenBeforeOffset(tokenStream: CommonTokenStream, offset: number): Token | null {
  const tokens = tokenStream.tokens;
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    if (!t) continue;

    const stopIdx = t.stop;
    if (stopIdx < offset) {
      return t;
    }
  }
  return null;
}

export function findContextAtOffset(
  root: ParserRuleContext,
  offset: number,
): ParserRuleContext | null {
  // Depth-first search for the context that covers token’s range
  function dfs(ctx: ParserRuleContext): ParserRuleContext | null {
    if (!ctx.children || ctx.children.length === 0) return null;
    
    const startIndex = ctx.start?.start ?? -1;
    const stopIndex = ctx.stop?.stop ?? -1;
    if (startIndex <= offset && stopIndex >= offset) {
      // Try to find a more specific context
      for (const child of ctx.children) {
        if (child instanceof ParserRuleContext) {
          const found = dfs(child);
          if (found) return found;
        }
      }
      return ctx;
    }
    return null;
  }

  return dfs(root);
}

export function findParentRuleContext(
  ctx: ParserRuleContext,
  parentType: any,
): ParserRuleContext | null {
  if (ctx instanceof parentType) {
    return ctx;
  }

  let parent = ctx.parentCtx;
  while (parent) {
    if (parent instanceof parentType) {
      return parent;
    }
    parent = parent.parentCtx;
  }
  return null;
}