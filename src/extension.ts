import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('leptos-fmt');
  outputChannel.show();
  outputChannel.appendLine('leptos-fmt extension is now active.');


  const config = vscode.workspace.getConfiguration('leptosfmt');
  const customCargoHome = config.get<string>('cargoHome') || '';
  const defaultCargoHome = process.env.CARGO_HOME || path.resolve(os.homedir(), '.cargo');
  const cargoHome = customCargoHome || defaultCargoHome;
  const leptosfmtPath = path.join(cargoHome, 'bin', 'leptosfmt');

  if (!fs.existsSync(leptosfmtPath)) {
    vscode.window.showErrorMessage(`Leptosfmt not found at ${leptosfmtPath}. Please install it using: cargo install leptosfmt`);
    outputChannel.appendLine(`Leptosfmt not found at ${leptosfmtPath}. Please install it using: cargo install leptosfmt`);
    return;
  }

 
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider('rust', {
      provideCodeActions(document, range, context, token) {
        const actions: vscode.CodeAction[] = [];
        const formatAction = new vscode.CodeAction('Format with Leptosfmt', vscode.CodeActionKind.SourceFixAll.append('leptosfmt'));
        formatAction.command = { command: 'extension.formatWithLeptosfmt', title: 'Format with Leptosfmt', arguments: [document] };
        actions.push(formatAction);
        return actions;
      }
    })
  );

  const formatCommand = vscode.commands.registerCommand('extension.formatWithLeptosfmt', async (document?: vscode.TextDocument) => {
    const activeDocument = document || vscode.window.activeTextEditor?.document;
    if (!activeDocument) {
        outputChannel.appendLine('No active document found to format.');
        vscode.window.showErrorMessage('No active document found to format.');
        return;
    }

    const filePath = activeDocument.uri.fsPath;
    const isRustFile = activeDocument.languageId === 'rust' && activeDocument.uri.scheme === 'file';

    if (isRustFile) {
        try {
            await activeDocument.save();

            exec(`${leptosfmtPath} "${filePath}"`, async (error, stdout, stderr) => {
                if (error) {
                    outputChannel.appendLine(`Leptosfmt error: ${stderr || error.message}`);
                } else {
                    outputChannel.appendLine(stdout);
                    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
                    const updatedDoc = await vscode.workspace.openTextDocument(filePath);
                    await vscode.window.showTextDocument(updatedDoc, { preview: false });
                    await updatedDoc.save();
                }
            });
        } catch (err) {
            outputChannel.appendLine(`Error saving or formatting document: ${err}`);
            vscode.window.showErrorMessage(`Error saving or formatting document: ${err}`);
        }
    } else {
        outputChannel.appendLine('Only Rust files can be formatted with Leptosfmt.');
        vscode.window.showErrorMessage('Only Rust files can be formatted with Leptosfmt.');
    }
});


  context.subscriptions.push(formatCommand, outputChannel);
}

export function deactivate() { }
