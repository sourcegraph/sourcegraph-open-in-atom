# Open in Atom Sourcegraph extension

Adds a button to the Sourcegraph's extension panel and at the top of files in code hosts like GitHub (when the Sourcegraph browser extension is installed) that will open the current file in Sublime Text.

**This extension requires all git repos to be already cloned under the base path with their original names.**

<picture>
<source srcset="https://user-images.githubusercontent.com/37420160/96530024-856d0780-1254-11eb-968c-624aff1fd2e5.png" media="(prefers-color-scheme: dark)" />
<source srcset="https://user-images.githubusercontent.com/37420160/96607497-6b6c0d00-12c6-11eb-921b-6ac6af8e90eb.png" media="(prefers-color-scheme: light)" />
<img src="https://user-images.githubusercontent.com/37420160/96607497-6b6c0d00-12c6-11eb-921b-6ac6af8e90eb.png" alt="Screenshot" />
</picture>

## Settings

- `openInAtom.basePath`: [REQUIRED] The absolute path on your computer where your git repositories live. This extension requires all git repos to be already cloned under this path with their original names. `"/Users/yourusername/src"` is a valid absolute path, while `"~/src"` is not.

- `openInAtom.replacements`: [OPTIONAL] Set to an object that includes pairs of strings, where each key will be replaced by its value in the final url. The key can be a string or a RegExp, and the value must be a string. For example, using `"openInAtom.replacements": {"(?<=Documents\/)(.*[\\\/])": "sourcegraph-$1"}` will add `sourcegraph-` in front of the string that matches the `(?<=Documents\/)(.*[\\\/])` RegExp pattern, while `"openInAtom.replacements": {"sourcegraph-": ""}` will remove `sourcegraph-` from the final URL.

- `openInAtom.osPaths`: [OPTIONAL] Object. The extension uses the assigned path for the detected Operating System when available. If no platform is detected then we will keep using the basePath provided with `openInAtom.basePath`. Currently support `"windows"`, `"mac"`, and `"linux"` as keys.


## Examples

### Mac

To open repository files in your Documents directory:

```json
{
  "extensions": {
    "sourcegraph/open-in-atom": true,
  },
  // where the cloned git repositories are located
  "openInAtom.basePath": "/Users/USERNAME/Documents/"
}
```

### All OS

```json
{
  "extensions": {
    "sourcegraph/open-in-atom": true
  },
  "openInAtom.osPaths": {
    "windows": "/C:/Users/USERNAME/folder/",
    "mac": "/Users/USERNAME/folder/",
    "linux": "/home/USERNAME/folder/"
  },
  // required -set basePath as fallback path when no operation system is detected
  "openInAtom.basePath": "/Users/USERNAME/Documents/",
}
```

### Linux

If you're using Atom on Linux, you should [configure URI handling yourself](https://flight-manual.atom.io/hacking-atom/sections/handling-uris/#linux-support).

## Development

1. Run `yarn && yarn run serve` and keep the Parcel bundler process running
1. [Sideload the extension](https://docs.sourcegraph.com/extensions/authoring/local_development) (at the URL http://localhost:1234 by default) on your Sourcegraph instance or Sourcegraph.com

When you edit a source file in your editor, Parcel will recompile the extension. Reload the Sourcegraph web page to use the updated extension.