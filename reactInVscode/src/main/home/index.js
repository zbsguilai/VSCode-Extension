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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ReactDOM = __importStar(require("react-dom/client"));
class App extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            articles: [], // 初始化为空数组
            loading: true, // 初始加载状态为 true
        };
    }
    // 模拟获取数据
    componentDidMount() {
        // 模拟API请求
        setTimeout(() => {
            const fetchedArticles = [
                {
                    id: 1,
                    title: 'React 18 新特性',
                    body: 'React 18带来了许多新特性，比如自动批处理、并发渲染等。',
                    author: '张三',
                    date: '2024-12-17',
                },
                {
                    id: 2,
                    title: 'TypeScript 入门教程',
                    body: 'TypeScript 是 JavaScript 的超集，提供了类型系统，提升开发体验。',
                    author: '李四',
                    date: '2024-12-15',
                },
                {
                    id: 3,
                    title: '如何使用 React Hooks',
                    body: 'Hooks 是 React 16.8 新增的特性，极大简化了函数组件的写法。',
                    author: '王五',
                    date: '2024-12-14',
                },
            ];
            // 更新状态
            this.setState({ articles: fetchedArticles, loading: false });
        }, 1000); // 模拟请求延迟
    }
    render() {
        const { articles, loading } = this.state;
        return ((0, jsx_runtime_1.jsx)("div", { className: "article-list", children: loading ? ((0, jsx_runtime_1.jsx)("p", { children: "\u52A0\u8F7D\u4E2D..." })) : ((0, jsx_runtime_1.jsx)("ul", { children: articles.map((article) => ((0, jsx_runtime_1.jsxs)("li", { className: "article-item", children: [(0, jsx_runtime_1.jsx)("h2", { children: article.title }), (0, jsx_runtime_1.jsx)("p", { children: article.body }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u4F5C\u8005\uFF1A", article.author] }), (0, jsx_runtime_1.jsx)("span", { children: " | " }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u53D1\u5E03\u65F6\u95F4\uFF1A", article.date] })] })] }, article.id))) })) }));
    }
}
// React 18
const container = document.getElementById("root");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render((0, jsx_runtime_1.jsx)(App, {}));
}
//# sourceMappingURL=index.js.map