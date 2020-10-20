# open-in-editor (Sourcegraph extension)

Adds a button at the top of files in both Sourcegraph app and code hosts like GitHub (when the Sourcegraph browser extension is installed) that will open the current file in Atom. 

![Screenshot](https://user-images.githubusercontent.com/37420160/96530024-856d0780-1254-11eb-968c-624aff1fd2e5.png)

## Installing

For Sourcegraph.com, it can be enabled here: https://sourcegraph.com/extensions/sourcegraph/open-in-atom

Otherwise, follow instructions here to publish it privately: https://docs.sourcegraph.com/extensions/authoring/publishing

## Settings

- `openinatom.basePath`: The absolute path on your computer where your git repositories live. This extension requires all git repos to be already cloned under this path with their original names. `"/Users/yourusername/src"` is a valid absolute path, while `"~/src"` is not.

If you're using Atom on Linux, you should [configure URI handling yourself](https://flight-manual.atom.io/hacking-atom/sections/handling-uris/#linux-support).
