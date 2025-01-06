import { DidChangeConfigurationParams } from "vscode-languageserver";
import { connection, hasConfigurationCapability } from "./server.js";

interface Settings {
  romPath: string;
}

export const DEFAULT_SETTINGS: Readonly<Settings> = Object.freeze({ romPath: 'rom.nds' });
let globalSettings: Settings = DEFAULT_SETTINGS;
const documentSettings: Map<string, Thenable<Settings>> = new Map();

export function getDocumentSettings(resource: string): Thenable<Settings> {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: 'explorerscript'
    });
    documentSettings.set(resource, result!);
  }
  return result!;
}

export function deleteDocumentSettings(resource: string) {
  documentSettings.delete(resource);
}

export function applyConfigurationChange(change: DidChangeConfigurationParams) {
  if (hasConfigurationCapability) {
    // Reset all cached document settings
    documentSettings.clear();
  } else {
    globalSettings = <Settings>(
      (change.settings.explorerscript || DEFAULT_SETTINGS)
    );
    connection.console.log('Configuration changed: ' + JSON.stringify(globalSettings));
  }
}