import { URI } from "vscode-uri";
import { existsSync } from "fs";
import { getDocumentSymbols } from "./server.js";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { diagnosticForRange } from "./diagnosticHelpers.js";
import { CompositeSymbolStore, SymbolStore } from "./symbols.js";

// Searches for a folder named "Macros" in any of the parent directories of the current file
export function findMacrosFolder(currentFile: string): string | undefined {
	const currentFileUri = URI.parse(currentFile);
	const parts = currentFileUri.path.split('/');
	
	for (let i = parts.length - 1; i >= 0; i--) {
		const potentialPath = URI.file([...parts.slice(0, i), 'Macros'].join('/')).fsPath;
		if (existsSync(potentialPath)) {
			return potentialPath;
		}
	}
	return undefined;
}

export function findScriptFolder(currentFile: string): URI | undefined {
    const parts = URI.parse(currentFile).path.split('/');
    
    for (let i = parts.length - 1; i >= 0; i--) {
        const potentialPath = URI.file([...parts.slice(0, i), 'SCRIPT'].join('/'));
        if (existsSync(potentialPath.fsPath)) {
            return potentialPath;
        }
    }
    return undefined;
}

export function resolveImport(importPath: string, macrosPath: string): URI {
	return URI.file([macrosPath, importPath].join('/'));
}

function resolveDocumentImportsRecursive(
    uri: URI,
    macrosFolder: string,
    symbols: SymbolStore,
    processedUris: Set<string>,
    importChain: URI[] = []
): {
    resolvedImports: URI[],
    diagnostics: Diagnostic[],
} {
    processedUris.add(uri.toString());
    let resolvedImports: URI[] = [];
    let diagnostics: Diagnostic[] = [];

	let importedByCurrentFile: URI[] = [];
    for (const docImport of symbols.imports) {
        const resolvedUri = resolveImport(docImport.file, macrosFolder);

		if (resolvedUri.toString() === uri.toString()) {
            diagnostics.push(diagnosticForRange(
                docImport.range,
                `File cannot import itself`,
                DiagnosticSeverity.Error
            ));
            continue;
        }

        if (importedByCurrentFile.find(u => u.toString() === resolvedUri.toString())) {
            diagnostics.push(diagnosticForRange(
                docImport.range,
                `Duplicate import: "${resolvedUri}"`,
                DiagnosticSeverity.Warning
            ));
            continue;
        }

        // Check for circular imports
        const circularIndex = importChain.findIndex(chainUri => chainUri.toString() === resolvedUri.toString());
        if (circularIndex !== -1) {
            const cycle = [...importChain.slice(circularIndex), resolvedUri]
                .map(u => u.fsPath)
                .join(' -> ');
            diagnostics.push(diagnosticForRange(
                docImport.range,
                `Circular import detected: ${cycle}`,
                DiagnosticSeverity.Error
            ));
            continue;
        }

		importedByCurrentFile.push(resolvedUri);
        resolvedImports.push(resolvedUri);

        if (!processedUris.has(resolvedUri.toString())) {
            const importedDocSymbols = getDocumentSymbols(resolvedUri);
            if (importedDocSymbols) {
                const nested = resolveDocumentImportsRecursive(
                    resolvedUri,
                    macrosFolder,
                    importedDocSymbols,
                    processedUris,
                    [...importChain, uri]
                );
                resolvedImports.push(...nested.resolvedImports);
                diagnostics.push(...nested.diagnostics);
            } else {
                diagnostics.push(diagnosticForRange(
                    docImport.range,
                    `Failed to resolve symbols for import: "${resolvedUri}". The file might either not exist or contain syntax errors.`,
                    DiagnosticSeverity.Error
                ));
            }
        }
    }

    return { resolvedImports, diagnostics };
}

export function resolveDocumentImports(uri: string, symbols: SymbolStore): {
    resolvedImports: URI[],
    diagnostics: Diagnostic[],
} {
	if (symbols.imports.length === 0) {
		return { resolvedImports: [], diagnostics: [] };
	}

	const macrosFolder = findMacrosFolder(uri);
	if (!macrosFolder) {
		let diagnostic = {
			message: 'Could not find "Macros" folder in any parent directory. Imports will not be resolved.',
			range: symbols.imports[0].range,
			severity: DiagnosticSeverity.Warning,
		};
		return { resolvedImports: [], diagnostics: [diagnostic] };
    }

    return resolveDocumentImportsRecursive(URI.parse(uri), macrosFolder, symbols, new Set<string>());
}

export function createCompositeSymbolStore(localSymbols: SymbolStore, resolvedImports: URI[]): CompositeSymbolStore {
    const allStores = [localSymbols];
    
    // Add symbols from imported files if they exist in the parsed documents
    for (const importUri of resolvedImports) {
        const otherSymbols = getDocumentSymbols(importUri);
        if (otherSymbols) {
            allStores.push(otherSymbols);
        }
    }
    
    return new CompositeSymbolStore(allStores);
}