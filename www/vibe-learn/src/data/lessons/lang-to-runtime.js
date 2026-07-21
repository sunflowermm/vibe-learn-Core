/** 语言接到项目 */
export default `# 接到运行时 · 本仓库

> 语言选型之后，工程问题收敛为：  
> **运行时版本、包管理工具、进程入口**。  
> 本仓另有一层：**主服固定 Node.js；子服按语言优势启用独立 runtime**（第四章「语言栈」）。

## 知识路径

\`\`\`mermaid
flowchart TB
  A["序章：进程跑在 OS 上"] --> B["第一章：Node 与 pnpm"]
  B --> C[第二章：运行时模型]
  C --> D[本课：对齐本仓契约]
  D --> E["第四章：Runtime / Core / 子服"]
\`\`\`

前置：终端中可执行 \`node -v\` 与 \`pnpm -v\`。

## 本仓坐标

| 项 | 选择 | 自检 |
|----|------|------|
| 主服语言 | JavaScript（及可选 TS 构建链） | 仓库内 \`.js\` 源码 |
| 主服运行时 | **Node.js ≥ 26** | \`node -v\`；\`package.json\` → \`engines\` |
| 主仓包管理 | **仅 pnpm** | 根目录 \`pnpm-lock.yaml\` |
| 主服入口 | 常见 \`node app\` | README「快速开始」 |
| 子服 | Python / Go / PHP / Java / .NET / Rust | \`subserver/<runtime>/\`；\`subserver/LANGUAGES.md\` |

主服契约由 \`engines\` / \`packageManager\` 约束。  
子服登记表：\`src/utils/subserver-runtimes.js\`。子服侧不提供 Node runtime（与主服职责重叠）。

## 来自编译型语言的对照

| 既有习惯 | 本仓对应 |
|----------|----------|
| 编译为二进制再运行 | 主服：\`pnpm install\` + \`node\`；Go/Rust 子服使用各自构建与启动命令 |
| 头文件 / 链接库 | 主服 \`node_modules\`；子服使用该语言依赖管理 |
| 目标平台 | Node 主版本 + OS；子服另计本语言工具链 |

## 来自浏览器 JS 的对照

| 浏览器 | 本仓 Node 主服 |
|--------|----------------|
| \`document\` / DOM | 无 DOM |
| 刷新页面观察效果 | 重启或热加载进程 |
| \`<script>\` 引入 | \`import\` / \`node_modules\` |

需要 Python、Go 等生态时，能力落在对应**子服 runtime**，由主服经 HTTP 调用。

## 下一步

- **语言栈** — 六 runtime 与各语言优势  
- **项目鸟瞰** — Runtime / Core / 子服分工  
`;
