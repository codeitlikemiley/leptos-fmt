import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('leptos-fmt');
  outputChannel.show();

  outputChannel.appendLine('leptos-fmt extension is now active.');

  const cargoHome = process.env.CARGO_HOME || path.resolve(os.homedir(), '.cargo');
  const leptosfmtPath = path.join(cargoHome, 'bin', 'leptosfmt');

  if (!fs.existsSync(leptosfmtPath)) {
    vscode.window.showErrorMessage(`Leptosfmt not found. Please install it using: cargo install leptosfmt`);
    outputChannel.appendLine(`Leptosfmt not found. Please install it using: cargo install leptosfmt`);
    return;
  }

  let formatCommand = vscode.commands.registerCommand('extension.formatWithLeptosfmt', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found.');
      return;
    }

    const document = editor.document;
    const filePath = document.uri.fsPath;
    const fileContent = document.getText();

    const isRustFile = document.languageId === 'rust' && document.uri.scheme === 'file';
    const containsViewMacro = fileContent.includes('view!');
    const containsLeptosImport = fileContent.includes('use leptos::*;');
    const containsLeptosViewMacroImport = fileContent.includes('use leptos::view;');

    if (isRustFile && containsViewMacro && (containsLeptosImport || containsLeptosViewMacroImport)) {
      exec(`${leptosfmtPath} "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          outputChannel.appendLine(`Leptosfmt error: ${stderr || error.message}`);
        }
      });
    }
  });

  let disposable = vscode.workspace.onWillSaveTextDocument((event) => {
    if (event.reason === vscode.TextDocumentSaveReason.Manual) {
      const document = event.document;
      const filePath = document.uri.fsPath;
      const fileContent = document.getText();

      const isRustFile = document.languageId === 'rust' && document.uri.scheme === 'file';
      const containsViewMacro = fileContent.includes('view!');
      const containsLeptosImport = fileContent.includes('use leptos::*;');
      const containsLeptosViewMacroImport = fileContent.includes('use leptos::view;');

      if (isRustFile && containsViewMacro && (containsLeptosImport || containsLeptosViewMacroImport)) {
        exec(`${leptosfmtPath} "${filePath}"`, (error, stdout, stderr) => {
          if (error) {
            outputChannel.appendLine(`Leptosfmt error: ${stderr || error.message}`);
          }
        });
      }
    }
  });

  context.subscriptions.push(disposable, formatCommand);
}

export function deactivate() { }
