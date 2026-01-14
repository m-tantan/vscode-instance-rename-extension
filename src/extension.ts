import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('vscode-instance-rename.rename', async () => {
		const config = vscode.workspace.getConfiguration('window');
		const currentTitle = config.get<string>('title') || '';
		
		const newTitle = await vscode.window.showInputBox({
			prompt: 'Enter a new title for this VS Code instance',
			value: currentTitle,
			placeHolder: 'My Custom Instance Title'
		});

		if (newTitle !== undefined) {
			await config.update('title', newTitle, vscode.ConfigurationTarget.Workspace);
			vscode.window.showInformationMessage(`Window title updated to: ${newTitle || '(default)'}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
