import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const channel = vscode.window.createOutputChannel('leptos-fmt');
  channel.show(true);
  // Get the current configuration for rust-analyzer
  const config = vscode.workspace.getConfiguration('rust-analyzer');
  const currentCommand = config.get<string[]>('rustfmt.overrideCommand');

  // Check if the setting is already defined
  const defaultCommand = ['leptosfmt', '--stdin', '--rustfmt'];

  if (!currentCommand || currentCommand.toString() !== defaultCommand.toString()) {
    // Set the default value if not already set or if it's different
    config.update('rustfmt.overrideCommand', defaultCommand, vscode.ConfigurationTarget.Global);
    channel.appendLine('rust-analyzer.rustfmt.overrideCommand has been set to the default value.');
  } else {
    channel.appendLine('rust-analyzer.rustfmt.overrideCommand is already set to the default value.');
  }

  // Check if Rust Analyzer is active and ready
  const rustAnalyzerActive = vscode.workspace.getConfiguration('rust-analyzer').get<boolean>('enabled');
  if (rustAnalyzerActive) {
    channel.appendLine('Rust Analyzer is active');
  } else {
    channel.appendLine('Rust Analyzer is not active');
  }
}

export function deactivate() {}
