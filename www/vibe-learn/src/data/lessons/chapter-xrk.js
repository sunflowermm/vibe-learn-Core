/** 第四章 XRK */
export default `# 第四章 · XRK-AGT（项目实践）

> 通用课到此收束为本仓库：**Runtime、Core、HTTP、配置** 怎么干活。  
> 若第一章还没跑通，请先回到 **首次跑通**；本框默认你已能 \`node app\`。

## 前置检查（倒推表）

| 若你卡在… | 先回哪一章 |
|-----------|------------|
| 不会开终端 / 找不到命令 | 第一章 · 终端与 PATH |
| 不懂为何必须装 Node | 第二章 · 编译与运行时 |
| 不懂端口 / HTTP | 第三章 · TCP 端口与 HTTP |
| 进程能起来，不知代码放哪 | 本框继续往下 |

## 本框地图

\`\`\`mermaid
flowchart TB
  O[项目鸟瞰] --> R[AgentRuntime]
  O --> C[Core 放码]
  R --> H[HTTP / www]
  C --> H
  C --> CFG[配置归属]
  H --> CFG
\`\`\`

## 节点与关键词

| 节点 | 关键词 |
|------|--------|
| **项目鸟瞰** | 通用后端、Core、src/ 边界 |
| **AgentRuntime** | 运行时心脏、加载扩展点 |
| **Core 放码** | plugin / http / www / commonconfig |
| **HTTP / www** | API、静态前端、HttpResponse |
| **配置归属** | 模板、schema、消费代码对齐 |

## 和本学习站的关系

你正在看的页面，通常由某个 Core 的 **www** 挂载（如 \`/vibe-learn/\`）——正是「Runtime 提供舞台，Core 提供内容」的实例。
`;
