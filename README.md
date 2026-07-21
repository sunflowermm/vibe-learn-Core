# vibe-learn-Core

纯 `www` 学习 Core：知识节点图谱，练 vibe coding。

## 访问

启动 AGT 后打开主服路径：`/vibe-learn/`  
（`sign.json` 声明后由主服自动拉起前端并反代。）

## 图谱模型

| kind | 含义 |
|------|------|
| `chapter` | 章框装饰层（**不是** Vue Flow `parentNode`） |
| `topic` | 章内知识点（绝对坐标，`data.chapterId` 归属；拖章标题时一起平移） |
| `stub` | 框外延伸：第二章 / 番外（独立节点，不跟章框拖动） |

入口：`www/vibe-learn/src/data/nodes.js`。

## 技术栈

- Vue 3 + Vite · [Vue Flow](https://vueflow.dev/) · `marked`
- 协议栈节点含 OSI 交互实验室
