// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";
import webviewContent from "./webview"
export function activate(context: vscode.ExtensionContext) {
	let helloWorld = vscode.commands.registerCommand('juejin.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from juejin!');
	});
	let article = vscode.commands.registerCommand("juejin.article", () => {
		// 创建webview
		const panel = vscode.window.createWebviewPanel(
			"juejinArticle", // 标识
			"稀土掘金",//Webview 标题
			vscode.ViewColumn.One,//Webview 所在的编辑器位置
			{
				enableScripts: true,// // 启用脚本
				retainContextWhenHidden: true,///// 保持 webview 状态即使在隐藏时
			}
		);
		panel.iconPath = vscode.Uri.file(
			path.resolve(context.extensionPath, "./icon/juejin.svg")
		);
		panel.webview.html = "<div>功能正在开发中</div>";
	});

	let home = vscode.commands.registerCommand("juejin.home", () => {
		new webviewContent(context.extensionPath, "home");
		// 这一行的作用是将 post 和 pins 命令添加到 context.subscriptions 数组中。这么做的目的是为了确保在扩展被禁用或卸载时，这些命令能够被自动清理。
		context.subscriptions.splice(context.subscriptions.length, 0, helloWorld, article,home);
	});

	context.subscriptions.push(
		helloWorld,
		article,
		home
	);
}

export function deactivate() {

}
