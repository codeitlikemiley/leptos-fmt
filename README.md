# leptos-fmt

Uses the built in Rust analyzer to auto-format your Leptos code. You can invoke command palette command with `Leptos Init` to generate the override command on your `.vscode/settings.json` file.

For Complex Project , and you dont want to override fmt on workspace level, and avoid pulluting override command on other projects.

You can invoke command palette command with `Format with Leptosfmt` or bind it to a key.

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
    "rust-analyzer.procMacro.ignored": {
        "leptos_macro": [
            "server"
        ]
    },
    "rust-analyzer.rustfmt.overrideCommand": [
        "leptosfmt",
        "--stdin",
        "--rustfmt"
    ],
    "rust-analyzer.cargo.features": [
        "ssr"
    ]
}
```
</details>



## Custom Key Bindings

<img width="1084" alt="Screenshot 2024-11-12 at 7 29 24 PM" src="https://github.com/user-attachments/assets/36e2a98f-f475-43d8-932e-a7567c68e8a1">

1. Press `Ctrl+Shift+P` to open the command palette.
2. Type `Keyboard Shortcuts` to open the keyboard shortcuts settings.
3. Search for `leptos-fmt.format` 
4. Bind it to a keybinding to your preference e.g. <kbd>OPT</kbd> + <kbd>SHIFT</kbd> + <kbd>F</kbd>

## Custom Paths

<img width="1084" alt="Screenshot 2024-11-12 at 7 28 03 PM" src="https://github.com/user-attachments/assets/b9a1b953-2e63-4996-81e4-55879f14cbb3">

1. Press <kbd>CMD or CTRL</kbd> + <kbd>,</kbd> to open the settings.
2. type `leptos`
3. find `leptos-fmt.path` and set it to the path of your `leptosfmt` binary 
4. find `leptos-fmt.cargoHome` and set it to the path of your `cargo` home directory