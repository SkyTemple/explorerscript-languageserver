# ExplorerScript Language Server and IDE Extensions

This repository contains a [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) implementation for the [ExplorerScript](https://github.com/SkyTemple/ExplorerScript) language and IDE integration plugins.

## Features

- Syntax highlighting
- Auto-complete
- Hover hints
- Document symbol provider (e.g. "Outline" in VS Code)
- Workspace symbol provider (global symbol search, Ctrl/Cmd+T in VS Code)
- Go to definition (Ctrl/Cmd click to jump to a symbol)
- Signature help (show macro/operation signatures while typing)
- Reads actor, object and performer data from ROM

## VS Code Installation

1. Download the [latest VS Code extension release](https://github.com/SkyTemple/explorerscript-languageserver/releases) (.vsix file).
2. Open the "Extensions" tab in the primary sidebar and click the "…" button > *Install from VSIX...*.
3. Select your downloaded .vsix file and click *Install*.
4. Proceed with "Project Setup" below.

## IntelliJ/JetBrains IDE Installation

In order to use ExplorerScript language features in JetBrains IDEs, you will need to install syntax highlighting support and the language server plug-in separately.

### Syntax Highlighting

1. Download the **source code** of the [latest release](https://github.com/SkyTemple/explorerscript-languageserver/releases) as a .zip file.
2. Unpack the .zip file into a folder.
3. Open the Settings dialog by pressing Ctrl+Alt+S on Windows/Linux or Cmd+, on macOS.
4. Click *Editor > TextMate Bundles*.
5. Click the "+" button and select the downloaded folder. A new item `explorerscript-vscode-extension` should now be visible at the end of the list.
6. Click *Ok* to save and quit the Settings dialog. ExplorerScript files (`.exps`) should now have syntax highlighting.

### Language Server Plug-in

TBD

## Project Setup

1. Open a project containing ExplorerScript files (e.g. a `.skytemple` folder) and open any ExplorerScript (`.exps`) file.
2. Configure the path to your ROM in settings. The path can either be absolute or relative to the workspace directory (`{workspace folder}/rom.nds` is used by default).
    - In VS Code, navigate to *File > Preferences > Settings* (or *Code > Settings > Settings* on macOS), then configure the ROM path under *Extensions > ExplorerScript > Rom Path*.
    You can use the *Workspace* tab to configure a path specific to your current workspace.

## Referenced Sources
- https://github.com/SkyTemple/ExplorerScript
- https://github.com/SkyTemple/skytemple-files
- https://wiki.skytemple.org/index.php/List_of_Opcodes