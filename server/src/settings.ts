import { DidChangeConfigurationParams } from "vscode-languageserver";
import { connection, hasConfigurationCapability } from "./server";

interface Settings {
  romPath: string;
}

export const DEFAULT_SETTINGS: Readonly<Settings> = Object.freeze({ romPath: 'rom.nds' });
let globalSettings: Settings = DEFAULT_SETTINGS;
const documentSettings: Map<string, Settings> = new Map();

export async function getDocumentSettings(resource: string): Promise<Settings> {
  if (!hasConfigurationCapability) {
    return globalSettings;
  }
  let settings = documentSettings.get(resource);
  if (settings) {
    return settings;
  }

  if (!settings) {
    settings = await connection.workspace.getConfiguration({
      scopeUri: resource,
      section: 'explorerscript'
    });
    if (!settings) {
      settings = structuredClone(DEFAULT_SETTINGS);
    }
    documentSettings.set(resource, {
      ...DEFAULT_SETTINGS,
      ...settings
    });
  }
  return settings!;
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