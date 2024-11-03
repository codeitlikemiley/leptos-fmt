import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  console.log('Leptosfmt-on-save extension is now active.');

  // Construct the path to leptosfmt
  const cargoHome = process.env.CARGO_HOME || path.resolve(os.homedir(), '.cargo');
  const leptosfmtPath = path.join(cargoHome, 'bin', 'leptosfmt');

  // Check if leptosfmt exists on activation
  if (!fs.existsSync(leptosfmtPath)) {
    vscode.window.showErrorMessage(`Leptosfmt not found. Please install it using: cargo install leptosfmt`);
  }

  let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
    const filePath = document.uri.fsPath;
    const fileContent = document.getText();

    // Check if the document is a Rust file and contains the required elements
    const isRustFile = document.languageId === 'rust' && document.uri.scheme === 'file';
    const containsViewMacro = fileContent.includes('view!');
    const containsLeptosImport = fileContent.includes('use leptos::*;');
    const containsLeptosViewMacroImport = fileContent.includes('use leptos::view;');

    // Run leptosfmt if conditions are met
    if (isRustFile && containsViewMacro && (containsLeptosImport || containsLeptosViewMacroImport)) {

      exec(`${leptosfmtPath} "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(`Leptosfmt error: ${stderr || error.message}`);
          return;
        }
      });
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
