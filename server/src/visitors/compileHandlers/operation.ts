import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { OperationContext } from "../../antlr/ExplorerScriptParser.js";
import { CompileHandler } from "./interface.js";
import { CompilerContext } from "../statement.js";
import { GLOBAL_OPCODE_COMPLETION_ITEMS_BY_NAME } from "../../data/staticData.js";
import { diagnosticForContext } from "../../diagnosticHelpers.js";
import { OpCode } from "../../data/types.js";

export class OperationCompileHandler implements CompileHandler<OperationContext> {
  constructor(private _compilerContext: CompilerContext, private _isInWithBlock: boolean) {
  }

  validate(ctx: OperationContext): Diagnostic[] {
    const opcodeIdent = ctx.IDENTIFIER();
    if (!opcodeIdent) {
      return []; // Incomplete parse
    }

    // Validate if the operation exists
    let opcodeCandidates: OpCode[] = (GLOBAL_OPCODE_COMPLETION_ITEMS_BY_NAME.get(opcodeIdent.getText()) ?? []).map(d => d.data);
    if (opcodeCandidates.length === 0) {
      return [diagnosticForContext(
        ctx,
        `Unknown operation \`${opcodeIdent.getText()}\``,
        DiagnosticSeverity.Error
      )];
    }

    // Validate inline context
    const inlineCtx = ctx.inline_ctx();
    if (inlineCtx && this._isInWithBlock) {
      return [diagnosticForContext(
        inlineCtx,
        'Operations inside `with` blocks cannot contain an inline `actor`, `object` or `performer` context',
        DiagnosticSeverity.Error
      )];
    }

    // Validate arg count
    let argCount = ctx.arglist()?.pos_argument_list()?.length ?? 0;
    if (opcodeCandidates.length == 1) {
      let opcodeData = opcodeCandidates[0];

      if (opcodeData.params === -1) {
        // Variable number of arguments, we can't validate this
      } else {
        if (argCount !== opcodeData.params) {
          return [diagnosticForContext(
            ctx,
            `Operation \`${opcodeIdent.getText()}\` expects ${opcodeData.params} arguments, but got ${argCount}`,
            DiagnosticSeverity.Error
          )];
        }
      }
    } else {
      // If there's a normal and variable length op code, apparently the number of arguments has to be >= the normal one
      // https://github.com/SkyTemple/skytemple-files/blob/0aefaaa4390ce1a838a7d5bef4c3a2fc73f879f8/skytemple_files/script/ssb/script_compiler.py#L245
      let normalOpCode = opcodeCandidates.find(op => op.params !== -1);
      if (normalOpCode && argCount < normalOpCode.params) {
        return [diagnosticForContext(
          ctx,
          `Operation \`${opcodeIdent.getText()}\` expects at least ${normalOpCode.params} arguments, but got ${argCount}`,
          DiagnosticSeverity.Error
        )];
      }
    }

    return [];
  }
}