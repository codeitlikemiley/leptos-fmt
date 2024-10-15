import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

// Replace with the actual import for your extension
// import * as myExtension from '../../extension'; 

suite('Leptosfmt Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    // Sample test for checking the import statement and view macro detection
    test('Detect view! macro and Leptos imports', async () => {
        // Create a temporary Rust file with the required content
        const testFilePath = path.join(__dirname, 'test.rs');
        const fileContent = `
            use leptos::*;
            
            fn main() {
                view! {
                    <div>Hello, world!</div>
                }
            }
        `;

        // Write the file content
        await vscode.workspace.fs.writeFile(vscode.Uri.file(testFilePath), Buffer.from(fileContent));

        // Open the document
        const document = await vscode.workspace.openTextDocument(testFilePath);
        await vscode.window.showTextDocument(document);

        // Check the language and scheme
        assert.strictEqual(document.languageId, 'rust', 'Document should be a Rust file.');
        assert.strictEqual(document.uri.scheme, 'file', 'Document should be a file.');

        // Check for the 'view!' macro and Leptos imports
        const fileText = document.getText();
        const containsViewMacro = fileText.includes('view!');
        const containsLeptosImport = fileText.includes('use leptos::*;');

        assert.strictEqual(containsViewMacro, true, "The file should contain 'view!' macro.");
        assert.strictEqual(containsLeptosImport, true, "The file should contain 'use leptos::*;' import.");

        // Clean up by deleting the temporary file
        await vscode.workspace.fs.delete(vscode.Uri.file(testFilePath));
    });

    // Test for checking the presence of leptosfmt
    test('Check for leptosfmt installation', async () => {
        const leptosfmtPath = path.join(process.env.HOME || '', '.cargo', 'bin', 'leptosfmt');

        // Execute the command to check if leptosfmt exists
        exec(`ls ${leptosfmtPath}`, (error, stdout, stderr) => {
            if (error) {
                assert.fail(`Leptosfmt not found. Please install it using: cargo install leptosfmt. Error: ${stderr || error.message}`);
            } else {
                assert.ok(stdout.includes('leptosfmt'), 'Leptosfmt should be installed.');
            }
        });
    });
});
