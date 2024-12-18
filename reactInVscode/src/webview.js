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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
function getConfiguration() {
    let defaultCategory = 
    // 获取当前工作区的配置，从配置中读取 juejin.post.default-category 的值。
    vscode.workspace.getConfiguration().get("juejin.post.default-category") ||
        ""; // 增加未配置分类时设置前端为默认分类
    return { defaultCategory };
}
console.error(getConfiguration(), 'sss');
class ViewLoader {
    constructor(extensionPath, pageName) {
        this._extensionPath = extensionPath;
        this._panel = vscode.window.createWebviewPanel('juejin', //面板的唯一标识符
        '稀土掘金', //面板的标题。
        vscode.ViewColumn.One, //面板展示的位置
        {
            enableScripts: true,
            retainContextWhenHidden: true,
            // 指定 Webview 中允许加载的本地资源路径，
            // 确保 Webview 可以加载扩展包中的资源（比如 views 和 assets 目录）。
            localResourceRoots: [
                vscode.Uri.file(path.join(extensionPath, "views")),
                // vscode.Uri.file(path.join(extensionPath, "assets")),
            ],
        });
        console.error(vscode.Uri.file(path.join(extensionPath, "views")));
        //设置面板图标
        this._panel.iconPath = vscode.Uri.file(path.resolve(extensionPath, "./icon/juejin.svg"));
        const config = getConfiguration();
        //设置 Webview 内容
        this._panel.webview.html = this.getWebviewContent(pageName, {
            // getConfiguration 函数中获取的配置信息。
            ...config,
            // path 是扩展的根路径，可能用于加载 Webview 中的其他资源。
            path: vscode.Uri.file(path.join(this._extensionPath)),
        });
        const panel = this._panel;
        // 处理 Webview 消息：
        // 事件监听器用于接收来自 Webview 的消息
        this._panel.webview.onDidReceiveMessage((message) => {
            // dispatch() 会通过 Redux 更新状态
            console.log(message, 'message');
            // TODO: open url in browser
            // vscode.env.openExternal(vscode.Uri.parse("https://www.stackoverflow.com/"));
        });
    }
    // 生成 Webview 内容
    getWebviewContent(pageName, config) {
        //  获取 React 应用的路径
        // vscode.Uri.file 将文件路径转换为 VSCode URI。
        const reactAppPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, "views", `${pageName}.js`));
        // 将 URI 转换为 vscode-resource 方案，表示这是一个本地资源。
        const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });
        console.error(reactAppUri, 'reactAppUri');
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>掘金</title>
        <script>

          window.acquireVsCodeApi = acquireVsCodeApi;
         
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
    }
}
exports.default = ViewLoader;
//# sourceMappingURL=webview.js.map