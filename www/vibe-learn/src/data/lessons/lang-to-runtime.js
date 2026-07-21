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

如果你跳过第一章直接来：请先能在终端里敲出 \`node -v\` 与 \`pnpm -v\`，否则本课只是纸上谈兵。

## XRK-AGT 的坐标（请对照自己的机器）

| 项 | 选择 | 对应名词 | 你怎么自检 |
|----|------|----------|------------|
| 语言 | JavaScript（及 TS/构建链路，若有） | 源码 | 打开任意 \`.js\` |
| 运行时 | **Node.js ≥ 26** | runtime / engines | \`node -v\` |
| 包管理 | **仅 pnpm** | package.json / 锁文件 | 根目录有 \`pnpm-lock.yaml\` |
| 入口 | 常见 \`node app\` | 进程入口 | README「快速开始」 |

这不是审美偏好，而是 \`package.json\` 的 \`engines\` / \`packageManager\` **契约**——像电器铭牌上的电压。

## 若你来自编译型语言（C / Go / Rust…）

| 你习惯的 | 在本仓对应 |
|----------|------------|
| 编译出二进制再运行 | \`pnpm install\` 拉齐模块 + \`node\` 加载执行 |
| 头文件 / 链接库 | \`package.json\` 依赖与 \`node_modules\` |
| 目标平台三元组 | Node 主版本 + OS（win/linux/mac） |
| 「改完要重新编译」 | 多数情况改完就能再跑；依赖变了才重新 install |

## 若你只写过网页 JS

| 网页里 | 本仓 Node 里 |
|--------|----------------|
| 有 \`document\` / DOM | **没有**网页 DOM |
| 刷新浏览器看效果 | 重启或热加载 **进程** |
| 用 \`<script>\` 引入 | 用 \`import\` / \`require\` 从 \`node_modules\` |

同一种语言，**场地不同**；第一章的 PATH、端口问题仍然成立。

## 下一步

进入 **第四章 · 项目鸟瞰**：在已经能跑的进程里，看 Runtime 与 Core 如何分工。
`;
