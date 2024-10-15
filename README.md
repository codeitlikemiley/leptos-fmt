# leptos-fmt

This extension automatically formats Rust files using `leptosfmt` when you save them, specifically targeting files that contain the `view!` macro and import statements for Leptos.

## Features

- **Automatic Formatting**: Automatically runs `leptosfmt` on Rust files containing the `view!` macro and the relevant Leptos import statements when saved.
- **User Notifications**: Provides helpful notifications if `leptosfmt` is not installed or if any errors occur during formatting.

## Animated Overview

[![Demo](https://media.giphy.com/media/q5Ajov98qGdrPRihRM/giphy.gif)](https://youtu.be/dS92U-yv7co)

## Requirements

- **Rust**: Ensure you have Rust installed on your machine.
- **Leptosfmt**: This extension requires `leptosfmt`. Install it using:

  ```bash
  cargo install leptosfmt
