package org.skytemple.explorerscriptsupport

import com.intellij.execution.configurations.GeneralCommandLine
import com.intellij.ide.plugins.PluginManager
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.platform.lsp.api.LspServerSupportProvider
import com.intellij.platform.lsp.api.ProjectWideLspServerDescriptor

public class LspServerProvider : LspServerSupportProvider {
    override fun fileOpened(project: Project, file: VirtualFile, serverStarter: LspServerSupportProvider.LspServerStarter) {
        if (file.extension == "exps") {
            serverStarter.ensureServerStarted(LspServerProviderDescriptor(project))
        }
    }
}

private class LspServerProviderDescriptor(project: Project) : ProjectWideLspServerDescriptor(project, "ExplorerScript") {
    override fun isSupportedFile(file: VirtualFile) = file.extension == "exps"
    override fun createCommandLine() = GeneralCommandLine("node", "out/server.js", "--stdio")
        .withWorkDirectory("/Users/admin/repos/explorerscript-vscode/server") // todo: ship server with the plugin
}