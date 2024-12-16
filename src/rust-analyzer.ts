import * as vscode from 'vscode';
import { DEFAULT_LEPTOSFMT_COMMAND, DEFAULT_PROC_MACRO_IGNORED, SSR_FEATURE } from './constants';

export async function updateProcMacroIgnored(rustConfig: vscode.WorkspaceConfiguration, channel: vscode.OutputChannel) {
    const currentProcMacro = rustConfig.get<Record<string, string[]>>('procMacro.ignored') || {};

    // Use the DEFAULT_PROC_MACRO_IGNORED as the baseline configuration
    if (!currentProcMacro['leptos_macro'] || !currentProcMacro['leptos_macro'].includes('server')) {
        await rustConfig.update('procMacro.ignored', {
            ...currentProcMacro,
            ...DEFAULT_PROC_MACRO_IGNORED
        }, vscode.ConfigurationTarget.Workspace);

        channel.appendLine('Updated rust-analyzer.procMacro.ignored for leptos_macro.');
    } else {
        channel.appendLine('leptos_macro is already correctly configured in procMacro.ignored.');
    }
}

export async function updateRustfmtCommand(rustConfig: vscode.WorkspaceConfiguration, channel: vscode.OutputChannel) {
    const currentCommand = rustConfig.get<string[]>('rustfmt.overrideCommand');

    if (!currentCommand || JSON.stringify(currentCommand) !== JSON.stringify(DEFAULT_LEPTOSFMT_COMMAND)) {
        await rustConfig.update('rustfmt.overrideCommand', DEFAULT_LEPTOSFMT_COMMAND, vscode.ConfigurationTarget.Workspace);
        channel.appendLine('Updated rust-analyzer.rustfmt.overrideCommand to default value.');
    } else {
        channel.appendLine('rust-analyzer.rustfmt.overrideCommand is already set correctly.');
    }
}

export async function updateCargoFeatures(rustConfig: vscode.WorkspaceConfiguration, channel: vscode.OutputChannel) {
    const currentFeatures = rustConfig.get<string[]>('cargo.features') || [];

    if (!currentFeatures.includes(SSR_FEATURE)) {
        const updatedFeatures = [...new Set([...currentFeatures, SSR_FEATURE])];
        await rustConfig.update('cargo.features', updatedFeatures, vscode.ConfigurationTarget.Workspace);
        channel.appendLine('Added "ssr" feature to rust-analyzer.cargo.features.');
    } else {
        channel.appendLine('rust-analyzer.cargo.features already contains "ssr".');
    }
}
