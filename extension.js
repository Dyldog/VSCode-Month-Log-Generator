// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "monthgenerator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('monthgenerator.generateMonth', function () {
		// The code you place here will be executed every time your command is executed

		var f = async () => {

			function pad(n, width, z) {
				z = z || '0';
				n = n + '';
				return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
			  }

			// Display a message box to the user
			var months = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			var selectedMonth = await vscode.window.showQuickPick(months)
			var selectedMonthIdx = months.indexOf(selectedMonth)

			var year = await vscode.window.showInputBox({
				prompt: `Year?`,
				value: new Date().getFullYear()
			});

			var numDays = new Date(year, selectedMonthIdx, 0).getDate();

			var lines = ["# " + selectedMonth + "\n"]

			for (var i = 0; i < numDays; i++) { 
				lines.push("[[" + year + "-" + pad((selectedMonthIdx + 1), 2) + "-" + pad((i + 1), 2) + "]]")
			}

			let snippet = new vscode.SnippetString(lines.join("\n"))
			await vscode.window.activeTextEditor.insertSnippet(snippet)
		};

		f();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
