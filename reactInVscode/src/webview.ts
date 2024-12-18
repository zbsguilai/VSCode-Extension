import * as vscode from "vscode";
import * as path from "path";
// import { PageName } from "./type"
export type PageName = "home";
function getConfiguration() {
  let defaultCategory =
    // 获取当前工作区的配置，从配置中读取 juejin.post.default-category 的值。
    vscode.workspace.getConfiguration().get("juejin.post.default-category") ||
    ""; // 增加未配置分类时设置前端为默认分类
  return { defaultCategory };
}

export default class ViewLoader {
  private readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;

  constructor(extensionPath: string, pageName: PageName) {
    this._extensionPath = extensionPath;

    this._panel = vscode.window.createWebviewPanel(
      'juejin',//面板的唯一标识符
      '稀土掘金',//面板的标题。
      vscode.ViewColumn.One,//面板展示的位置
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        // 指定 Webview 中允许加载的本地资源路径，
        localResourceRoots: [
          // vscode.Uri.file(path.join(extensionPath, "views")),
          vscode.Uri.file(path.join(extensionPath, 'views')) // 如果有 views 文件夹
        ],
       
        
      }
    );
    //设置面板图标
    this._panel.iconPath = vscode.Uri.file(
      path.resolve(extensionPath, "./icon/juejin.svg")
    );

    const config = getConfiguration();
    //设置 Webview 内容
    this._panel.webview.html = this.getWebviewContent(pageName,this._panel);


    const panel = this._panel;
    // 处理 Webview 消息：
    // 事件监听器用于接收来自 Webview 的消息
    this._panel.webview.onDidReceiveMessage((message) => {
      // dispatch() 会通过 Redux 更新状态
      console.log(message, 'message')

      // TODO: open url in browser
      // vscode.env.openExternal(vscode.Uri.parse("https://www.stackoverflow.com/"));
    });
  }
  // 生成 Webview 内容
  private getWebviewContent(pageName: PageName, panel: any): string {
    //  获取 React 应用的路径
    // vscode.Uri.file 将文件路径转换为 VSCode URI。
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "views", `${pageName}.js`)
    );
    // 将 URI 转换为 vscode-resource 方案，表示这是一个本地资源。
    const reactAppUri = panel.webview.asWebviewUri(reactAppPathOnDisk)

    return `  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Webview</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
      </body>
    </html>`;
  }
}