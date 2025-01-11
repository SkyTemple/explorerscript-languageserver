import { ExtensionContext, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  const serverCwd = context.asAbsolutePath(
    'server/'
  );
  const serverModule = context.asAbsolutePath(
    'server/out/server.mjs'
  );

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc, options: { cwd: serverCwd } },
    debug: { module: serverModule, transport: TransportKind.ipc, options: { execArgv: ['--nolazy', '--inspect=6009'], cwd: serverCwd } },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'explorerscript' }],
    synchronize: {
      // Notify the server about file changes to '.exps files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/*.exps')
    }
  };

  client = new LanguageClient('explorerScriptLS', 'ExplorerScript Language Server', serverOptions, clientOptions);
  client.start();
}

export function deactivate(): Promise<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}