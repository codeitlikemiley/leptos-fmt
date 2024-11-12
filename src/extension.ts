import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const channel = vscode.window.createOutputChannel('leptos-fmt');
  channel.show(true);
  context.subscriptions.push(channel);

  const rustAnalyzerInstalled = vscode.extensions.getExtension('rust-lang.rust-analyzer');
  if (rustAnalyzerInstalled) {
    let message =  'Rust Analyzer (rust-lang.rust-analyzer) is installed and active.';
    channel.appendLine(message);
  } else {
    let message =  'Rust Analyzer (rust-lang.rust-analyzer) is not installed.';
    vscode.window.showErrorMessage(message);
    channel.appendLine(message);
    return;
  }

  const rustConfig = vscode.workspace.getConfiguration('rust-analyzer');
  const leptosConfig = vscode.workspace.getConfiguration('leptos-fmt');

  const customLeptosfmtPath = leptosConfig.get<string>('path');
  if (customLeptosfmtPath) {
    channel.appendLine('Custom leptosfmt path is set to ' + customLeptosfmtPath);
  }

  const customCargoHome = leptosConfig.get<string>('cargoHome') || '';
  if (customCargoHome) {
    channel.appendLine('Custom cargo home is set to: ' + customCargoHome);
  }
  
  const defaultCargoHome = process.env.CARGO_HOME || path.resolve(os.homedir(), '.cargo');
  channel.appendLine('Default cargo home is set to: ' + defaultCargoHome);

  const cargoHome = customCargoHome || defaultCargoHome;
  channel.appendLine('Cargo home being used is: ' + cargoHome);
  const leptosfmtPath = customLeptosfmtPath || path.join(cargoHome, 'bin', 'leptosfmt');
  channel.appendLine('leptosfmt path being used is: ' + leptosfmtPath);

  if (!fs.existsSync(leptosfmtPath)) {
    let message = `Leptosfmt not found at ${leptosfmtPath}. Please install it or specify the correct path.`;
    channel.appendLine(message);
    vscode.window.showErrorMessage(message);
    return;
  }



  const formatter = vscode.commands.registerCommand('leptos-fmt.format', async (document?: vscode.TextDocument) => {
    const activeDocument = document || vscode.window.activeTextEditor?.document;
    if (!activeDocument) {
      let message = 'No active document found to format.';
      channel.appendLine(message);
      vscode.window.showErrorMessage(message);
      return;
    }

    const filePath = activeDocument.uri.fsPath;
    const isRustFile = activeDocument.languageId === 'rust' && activeDocument.uri.scheme === 'file';

    if (isRustFile) {
      try {
        exec(`${leptosfmtPath} "${filePath}"`, (error, stdout, stderr) => {
          if (error) {
            channel.appendLine(`Leptosfmt error: ${stderr || error.message}`);
            vscode.window.showErrorMessage(`Leptosfmt error: ${stderr || error.message}`);
          } else {
            channel.appendLine(stdout);
            vscode.window.showInformationMessage(`Formatted: ${filePath}`);
          }
        });
      } catch (err) {
        let message = `Error formatting document: ${err}`;
        channel.appendLine(message);
        vscode.window.showErrorMessage(message);
      }
    } else {
      let message = 'Only Rust files can be formatted with Leptosfmt.';
      channel.appendLine(message);
      vscode.window.showErrorMessage(message);
    }
  });

  const init = vscode.commands.registerCommand('leptos-fmt.init', async (document?: vscode.TextDocument) => {
    const defaultCommand = ['leptosfmt', '--stdin', '--rustfmt'];
    const currentCommand = rustConfig.get<string[]>('rustfmt.overrideCommand');
    channel.appendLine('Current rust-analyzer.rustfmt.overrideCommand is: ' + currentCommand);
    if (!currentCommand || currentCommand.toString() !== defaultCommand.toString()) {
      rustConfig.update('rustfmt.overrideCommand', defaultCommand, vscode.ConfigurationTarget.Workspace);
      channel.appendLine('rust-analyzer.rustfmt.overrideCommand has been set to the default value.');
    } else {
      channel.appendLine('rust-analyzer.rustfmt.overrideCommand is already set to the default value.');
    }
  });

  context.subscriptions.push(formatter, init);
}

export function deactivate() { }
