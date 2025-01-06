import { ParserRuleContext } from "antlr4";
import { Location } from "vscode-languageserver";
import { findParentRuleContext } from "./parseHelpers.js";
import { CallContext, Coro_defContext, For_target_defContext, Import_stmtContext, JumpContext, Macro_callContext, MacrodefContext, OperationContext, PrimitiveContext, Simple_defContext, String_valueContext } from "./antlr/ExplorerScriptParser.js";
import { Coroutine, Macro, resolveScopedConstant, Routine, Symbol, SymbolStore, UserConstant } from "./symbols.js";
import { ParsedDocument } from "./server.js";
import { findMacrosFolder, resolveImport } from "./imports.js";
import { singlelineStringLiteral, stringLiteral } from "./utils.js";
import { URI } from "vscode-uri";

// Note: The order of checks is important here
export function findDefinition(doc: ParsedDocument, context: ParserRuleContext, unionallUri?: string, unionallSymbols?: SymbolStore, scriptFolder?: URI): Location | null { 
  const itemsByCtx = new Map<ParserRuleContext, Symbol>();

  // Map items to their contexts
  for (let item of doc.allSymbols.allSymbols()) {
    itemsByCtx.set(item.ctx!, item);
  }

  const primitiveContext = findParentRuleContext(context, PrimitiveContext) as PrimitiveContext | null;

  // Macro arguments
  if (primitiveContext && primitiveContext.VARIABLE()) {
    const macroDefContext = findParentRuleContext(primitiveContext, MacrodefContext) as MacrodefContext | null;
    const variable = primitiveContext.VARIABLE().getText();
    if (variable && macroDefContext && macroDefContext.IDENTIFIER()) {
      const macro = doc.allSymbols.getMacroByName(macroDefContext.IDENTIFIER().getText());
      if (!macro) return null;
      const arg = macro.args.find(a => a.name.slice(1) === variable.slice(1));
      if (!arg) return null;
      return Location.create(macro.documentUri, arg.range);
    }
  }

  // Constants
  if (primitiveContext && primitiveContext.IDENTIFIER()) {
    const constantName = primitiveContext.IDENTIFIER().getText();
    const constant = resolveScopedConstant(primitiveContext, itemsByCtx, constantName);
    if (constant) {
      return Location.create(doc.uri, constant.range);
    }

    const globalConstant = doc.allSymbols.getGlobalConstantByName(constantName);
    if (globalConstant) {
      return Location.create(globalConstant.documentUri, globalConstant.range);
    }

    // Special handling for CORO_ constants
    if (constantName.startsWith('CORO_') && unionallSymbols) {
      const coro = unionallSymbols.getCoroutineByName(constantName.slice(5));
      if (coro) {
        return Location.create(unionallUri!, coro.range);
      }
    }

    // Special handling for LEVEL_ constants
    if (constantName.startsWith('LEVEL_') && scriptFolder) {
      const levelPath = `${scriptFolder.toString()}/${constantName.slice(6)}/enter00.exps`;
      if (levelPath) {
        return Location.create(levelPath, { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } });
      }
    }
  }

  // supervision_ExecuteActingSub file references
  const stringLiteralContext = findParentRuleContext(context, String_valueContext) as String_valueContext | null;
  const operation = findParentRuleContext(context, OperationContext) as OperationContext | null;
  if (stringLiteralContext && operation && operation.IDENTIFIER() && scriptFolder) {
    return resolveSpecialSub(operation, scriptFolder);
  }

  if (primitiveContext) {
    // We've encountered a value; there's no definition to find
    return null;
  }

  // Macros
  const macroCallContext = findParentRuleContext(context, Macro_callContext) as Macro_callContext | null;
  if (macroCallContext && macroCallContext.MACRO_CALL()) {
    let macroName = macroCallContext.MACRO_CALL().getText();
    if (macroName.startsWith('~')) {
      macroName = macroName.substring(1);
    }

    const macro = doc.allSymbols.getMacroByName(macroName);
    if (macro) {
      return Location.create(macro.documentUri, macro.range);
    }
  }

  // Imports
  const importContext = findParentRuleContext(context, Import_stmtContext) as Import_stmtContext | null;
  if (importContext && importContext.STRING_LITERAL()) {
    const importPath = singlelineStringLiteral(importContext.STRING_LITERAL().getText());
    const importsFolder = findMacrosFolder(doc.uri);
    if (!importsFolder) return null;
    const resolvedImport = resolveImport(importPath, importsFolder);

    if (resolvedImport) {
      return Location.create(resolvedImport.toString(), { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } });
    }
  }

  const jumpOrCall = findParentRuleContext(context, CallContext) as CallContext | null
    ?? findParentRuleContext(context, JumpContext) as JumpContext | null;
  if (jumpOrCall) {
    const labelName = jumpOrCall.IDENTIFIER()?.getText();
    if (labelName) {
      const label = doc.allSymbols.getLabelByName(labelName);
      if (label) {
        return Location.create(label.documentUri, label.range);
      }
    }
  }

  return null;
}

function resolveSpecialSub(operation: OperationContext, scriptFolder: URI): Location | null {
  const operationName = operation.IDENTIFIER().getText();
  let args = operation.arglist().pos_argument_list();
  if (operationName === 'supervision_ExecuteActingSub' && args.length >= 2) {
    const level = args[0].primitive()?.IDENTIFIER()?.getText();
    const file = args[1].primitive().string_()?.string_value();
    if (level && file) {
      const fileString = stringLiteral(file);
      const fileUri = `${scriptFolder.toString()}/${level.slice(6)}/${fileString.toLowerCase()}.exps`;
      if (fileUri) {
        return Location.create(fileUri, { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } });
      }
    }
  } else if (operationName === 'supervision_ExecuteStationSub' && args.length >= 2) {
    const level = args[0].primitive()?.IDENTIFIER()?.getText();
    const file = args[1].primitive().string_()?.string_value();
    if (level && file) {
      const fileString = stringLiteral(file);
      const fileUri = `${scriptFolder.toString()}/${level.slice(6)}/${fileString.toLowerCase()}00.exps`;
      if (fileUri) {
        return Location.create(fileUri, { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } });
      }
    }
  }

  return null;
}
