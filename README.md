# leptos-fmt

This extension automatically formats Rust files using `leptosfmt` when you save them, specifically targeting files that contain the `view!` macro and import statements for Leptos.

## Demo
[![Demo](https://raw.githubusercontent.com/codeitlikemiley/leptos-fmt/yt/images/demo.gif)](https://youtu.be/dS92U-yv7co)


## Requirements

- **Rust**: Ensure you have Rust installed on your machine.
- **Leptosfmt**: This extension requires `leptosfmt`. Install it using:

```bash
cargo install leptosfmt
```

## Using built in Rust Analyzer (rust-lang.rust-analyzer)

1. Press `Ctrl+Shift+P` to open the command palette.
2. Type `Leptos Init` to any Leptos project.

<details> 
<summary>Note: it would generate this on `.vscode/settings.json`</summary>

```json
{
    "rust-analyzer.rustfmt.overrideCommand": [
        "leptosfmt",
        "--stdin",
        "--rustfmt"
    ]
}
```
</details>



## Custom Key Bindings

1. Press `Ctrl+Shift+P` to open the command palette.
2. Type `Keyboard Shortcuts` to open the keyboard shortcuts settings.
3. Search for `leptos-fmt.format` 
4. Bind it to a keybinding to your preference e.g. `OPTION + SHIFT + F` or `CTRL + SHIFT + F`