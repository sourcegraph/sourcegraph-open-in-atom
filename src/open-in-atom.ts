import * as sourcegraph from 'sourcegraph'
import * as path from 'path'

interface Settings {
    'openInAtom.basePath'?: string
    'openInAtom.replacements'?: Record<string, string>
    'openInAtom.osPaths'?: Record<string, string>
}

function getOpenUrl(textDocumentUri: URL): URL {
    let basePath = sourcegraph.configuration.get<Settings>().value['openInAtom.basePath']
    const replacements = sourcegraph.configuration.get().value['openInAtom.replacements'] as Record<string, string>
    const osPaths: Record<string, string> = sourcegraph.configuration.get().value['openInAtom.osPaths'] as Record<string, string>
    const learnMorePath = new URL('/extensions/sourcegraph/open-in-atom', sourcegraph.internal.sourcegraphURL.href).href
    const userSettingsPath = new URL('/user/settings', sourcegraph.internal.sourcegraphURL.href).href

    // check platform and use assigned path when available;
    if(osPaths){
        if (navigator.userAgent.includes('Win') && osPaths.windows) {
            basePath = osPaths.windows;
        } else if (navigator.userAgent.includes('Mac') && osPaths.mac) {
            basePath = osPaths.mac;
        } else if (navigator.userAgent.includes('Linux') && osPaths.linux) {
            basePath = osPaths.linux;
        }
    }

    if (typeof basePath !== 'string') {
        throw new TypeError(
            `Add \`openInAtom.basePath\` to your [user settings](${userSettingsPath}) to open files in the editor. [Learn more](${learnMorePath})`
        )
    }
    if (!path.isAbsolute(basePath)) {
        throw new Error(
            `\`openInAtom.basePath\` value \`${basePath}\` is not an absolute path. Please correct the error in your [user settings](${userSettingsPath}).`
        )
    }

    const rawRepoName = decodeURIComponent(textDocumentUri.hostname + textDocumentUri.pathname)
    const repoBaseName = rawRepoName.split('/').pop() ?? ''
    const relativePath = decodeURIComponent(textDocumentUri.hash.slice('#'.length))
    const absolutePath = path.join(basePath, repoBaseName, relativePath)
    let openUrl = 'atom://core/open/file?filename=' + absolutePath

    // This should always be true, since atom only supports file URIs
    if (sourcegraph.app.activeWindow?.activeViewComponent?.type === 'CodeEditor') {
        const selection = sourcegraph.app.activeWindow?.activeViewComponent?.selection
        if (selection) {
            openUrl += `:${selection.start.line + 1}`

            if (selection && selection.start.character !== 0) {
                openUrl += `:${selection.start.character + 1}`
            }
        }
    }

    // If configured, run replacements before returning final URL
    if(replacements) {
        for (const replacement in replacements) {
            if (typeof replacement === 'string') {
                const POST_REGEX = new RegExp(replacement);
                openUrl = openUrl.replace(POST_REGEX, replacements[replacement])
            }
        }
    }

    return new URL(openUrl)
}

export function activate(context: sourcegraph.ExtensionContext): void {
    /**
     * This doesn't seem to be documented, so here's where to find the URI pattern:
     *
     * Implementation ("core" URI handlers. Implements `openFile`, but not an equivalent `openFolder`):
     * https://sourcegraph.com/github.com/atom/atom@320c879/-/blob/src/core-uri-handlers.js
     *
     * Tests ("core" host, only tests opening files):
     * https://sourcegraph.com/github.com/atom/atom@320c879/-/blob/spec/main-process/atom-application.test.js#L677
     */

    context.subscriptions.add(
        sourcegraph.commands.registerCommand('openInAtom.open.file', async (uri?: string) => {
            if (!uri) {
                const viewer = sourcegraph.app.activeWindow?.activeViewComponent
                uri = viewerUri(viewer)
            }
            if (!uri) {
                throw new Error('No file currently open')
            }
            const openUrl = getOpenUrl(new URL(uri))
            await sourcegraph.commands.executeCommand('open', openUrl.href)
        })
    )
}

function viewerUri(viewer: sourcegraph.ViewComponent | undefined): string | undefined {
    return viewer?.type === 'CodeEditor' ? viewer.document.uri : undefined
}
