"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const webview_1 = __importDefault(require("./webview"));
function activate(context) {
    let helloWorld = vscode.commands.registerCommand('juejin.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from juejin!');
    });
    let article = vscode.commands.registerCommand("juejin.article", () => {
        // 创建webview
        const panel = vscode.window.createWebviewPanel("juejinArticle", // 标识
        "稀土掘金", //Webview 标题
        vscode.ViewColumn.One, //Webview 所在的编辑器位置
        {
            enableScripts: true, // // 启用脚本
            retainContextWhenHidden: true, ///// 保持 webview 状态即使在隐藏时
        });
        panel.iconPath = vscode.Uri.file(path.resolve(context.extensionPath, "./icon/juejin.svg"));
        panel.webview.html = "<div>功能正在开发中</div>";
    });
    let home = vscode.commands.registerCommand("juejin.home", () => {
        new webview_1.default(context.extensionPath, "home");
        // 这一行的作用是将 post 和 pins 命令添加到 context.subscriptions 数组中。这么做的目的是为了确保在扩展被禁用或卸载时，这些命令能够被自动清理。
        context.subscriptions.splice(context.subscriptions.length, 0, helloWorld, article, home);
    });
    context.subscriptions.push(helloWorld, article, home);
}
function deactivate() {
}
//# sourceMappingURL=extension.js.map