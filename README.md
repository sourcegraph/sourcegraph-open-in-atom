# open-in-editor (Sourcegraph extension)

Adds a button at the top of files in both Sourcegraph app and code hosts like GitHub (when the Sourcegraph browser extension is installed) that will open the current file in Atom. 

<picture>
<source srcset="https://user-images.githubusercontent.com/37420160/96530024-856d0780-1254-11eb-968c-624aff1fd2e5.png" media="(prefers-color-scheme: dark)" />
<source srcset="https://user-images.githubusercontent.com/37420160/96607497-6b6c0d00-12c6-11eb-921b-6ac6af8e90eb.png" media="(prefers-color-scheme: light)" />
<img src="https://user-images.githubusercontent.com/37420160/96530024-856d0780-1254-11eb-968c-624aff1fd2e5.png" alt="Screenshot" />
</picture>

## Settings

- `openInAtom.basePath`: The absolute path on your computer where your git repositories live. This extension requires all git repos to be already cloned under this path with their original names. `"/Users/yourusername/src"` is a valid absolute path, while `"~/src"` is not.

If you're using Atom on Linux, you should [configure URI handling yourself](https://flight-manual.atom.io/hacking-atom/sections/handling-uris/#linux-support).
