# leptos-fmt

This extension automatically formats Rust files using `leptosfmt` when you save them, specifically targeting files that contain the `view!` macro and import statements for Leptos.

## Features

- **Automatic Formatting**: Automatically runs `leptosfmt` on Rust files containing the `view!` macro and the relevant Leptos import statements when saved.
- **User Notifications**: Provides helpful notifications if `leptosfmt` is not installed or if any errors occur during formatting.

![Auto Formatting Example](images/auto-formatting.png)  <!-- Replace with an actual screenshot -->

## Requirements

- **Rust**: Ensure you have Rust installed on your machine.
- **Leptosfmt**: This extension requires `leptosfmt`. Install it using:
  ```bash
  cargo install leptosfmt