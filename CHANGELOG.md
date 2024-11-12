# Change Log

All notable changes to the "leptos-fmt" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.7] 2024-11-11
- change command name to leptos-fmt.format
- update `"source.fixAll.leptos-fmt": "explicit"` on default configuration

## [0.0.6] 2024-11-11
- Remove onWillSaveTextDocument event listener
- replace with vscodeAction to trigger the format command
- added custom leptos fmt path on settings

## [0.0.5] 2024-11-11
- Only trigger format when manually saving rust files
- Added command palette command `Format with Leptosfmt`
- Added `extension.formatWithLeptosfmt` command that can be binded to a keybinding

## [0.0.4] 2024-11-03
- read $CARGO_HOME from path instead of hardcoding it

## [0.0.3] 2024-10-15

- Initial Release