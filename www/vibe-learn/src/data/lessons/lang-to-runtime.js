/** 语言接到项目 */
export default `# 接到运行时 · 本仓库

> 选定语言族之后，工程问题变成：  
> **哪一个运行时版本 + 哪一种包管理 + 哪一个入口文件。**

## 知识串（从零走到这里）

\`\`\`mermaid
flowchart TB
  A[序章：进程跑在 OS 上] --> B[第一章：装好 Node 与 pnpm]
  B --> C[第二章：理解为何需要运行时]
  C --> D[本课：对齐本仓契约]
  D --> E[第四章：认 AgentRuntime / Core]
\`\`\`

## XRK-AGT 的坐标

| 项 | 选择 | 对应名词 |
|----|------|----------|
| 语言 | JavaScript（及仓库中的 TS/构建链路，若有） | 源码 |
| 运行时 | **Node.js ≥ 26** | runtime / engines |
| 包管理 | **仅 pnpm** | package.json / 锁文件 |
| 入口 | 常见 \`node app\`（见 README） | 进程入口 |

这不是审美偏好，而是 \`package.json\` 的 \`engines\` / \`packageManager\` **契约**。

## 若你来自编译型语言

| 你习惯的 | 在本仓对应 |
|----------|------------|
| 编译出二进制再运行 | \`pnpm install\` 拉齐模块 + \`node\` 加载执行 |
| 头文件 / 链接库 | \`package.json\` 依赖与 \`node_modules\` |
| 目标平台三元组 | Node 主版本 + OS（win/linux/mac） |

## 下一步

进入 **第四章 · 项目鸟瞰**：在已经能跑的进程里，看 Runtime 与 Core 如何分工。
`;
