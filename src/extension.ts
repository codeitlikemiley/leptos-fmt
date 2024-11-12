{
  "name": "leptos-fmt",
  "displayName": "leptos-fmt",
  "publisher": "masterustacean",
  "description": "format your leptos code with leptosfmt inside vscode",
  "icon": "images/icon.webp",
  "repository": {
    "type": "git",
    "url": "https://github.com/codeitlikemiley/leptos-fmt.git"
  },
  "version": "0.0.8",
  "engines": {
    "vscode": "^1.94.0"
  },
  "categories": [
    "Other"
  ],
  "activationEvents": [
    "onLanguage:rust"
  ],
  "main": "./dist/extension.js",
  "contributes": {
    "configuration": {
      "type": "object",
      "title": "Leptosfmt Configuration",
      "properties": {
        "leptos-fmt.cargoHome": {
          "type": "string",
          "default": "",
          "description": "(Optional) - Only modify this if $CARGO_HOME is not set on your env or if you want to use a different cargo home location"
        },
        "leptos-fmt.path": {
          "type": "string",
          "default": "",
          "description": "(Optional) - Only modify this if leptosfmt is not in your $CARGO_HOME/bin folder or if you want to use a different path"
        }
      }
    },
    "commands": [
      {
        "command": "leptos-fmt.format",
        "title": "Format with Leptosfmt"
      },
      {
        "command": "leptos-fmt.init",
        "title": "Leptos Init"
      }
    ],
    "languages": [
      {
        "id": "rust",
        "extensions": [
          ".rs"
        ],
        "aliases": [
          "Rust"
        ]
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "npm run check-types && npm run lint && node esbuild.js",
    "watch": "npm-run-all -p watch:*",
    "watch:esbuild": "node esbuild.js --watch",
    "watch:tsc": "tsc --noEmit --watch --project tsconfig.json",
    "package": "npm run check-types && npm run lint && node esbuild.js --production",
    "compile-tests": "tsc -p . --outDir out",
    "watch-tests": "tsc -p . -w --outDir out",
    "pretest": "npm run compile-tests && npm run compile && npm run lint",
    "check-types": "tsc --noEmit",
    "lint": "eslint src",
    "test": "vscode-test"
  },
  "devDependencies": {
    "@types/vscode": "^1.94.0",
    "@types/mocha": "^10.0.8",
    "@types/node": "20.x",
    "@typescript-eslint/eslint-plugin": "^8.7.0",
    "@typescript-eslint/parser": "^8.7.0",
    "eslint": "^9.11.1",
    "esbuild": "^0.24.0",
    "npm-run-all": "^4.1.5",
    "typescript": "^5.6.2",
    "@vscode/test-cli": "^0.0.10",
    "@vscode/test-electron": "^2.4.1"
  }
}