/** Git 与工作区 */
export default `# Git 与工作区

> **Git** 管理源码历史；**克隆（clone）** 把远程仓库变成你磁盘上的工作区目录。  
> 开源协作的默认前提：你拿到的是「可检出的提交」，而不是邮件附件里的 zip（zip 发行版也存在，机制不同）。

## 本课分块

| 块 | 内容 |
|----|------|
| **三区模型** | 工作区 · 暂存区 · 本地仓库 |
| **远程与 clone** | 从托管平台落到磁盘 |
| **根目录判定** | 哪里执行 \`pnpm install\` |
| **和安装器的差别** | 源码树 vs 运行时安装包 |

托管平台（GitHub / Gitee）详见同章节点 **代码托管**。

---

## 1. 三区模型（本地）

\`\`\`mermaid
flowchart LR
  W[工作区\\n你改的文件] -- "git add" --> S[暂存区]
  S -- "git commit" --> L[本地仓库\\n.git]
  L -- "git push" --> R[远程仓库]
  R -- "git pull / fetch" --> L
  L -- "git checkout / restore" --> W
\`\`\`

| 区 | 直觉 |
|----|------|
| **工作区** | 编辑器里正在改的文件 |
| **暂存区** | 「下一次提交要带走哪些改动」的购物车 |
| **本地仓库** | \`.git\` 里的提交历史 |
| **远程** | GitHub / Gitee 上的那份（见 **代码托管**） |

入门阶段：先会 \`clone\` 与认根目录；\`add\` / \`commit\` 可在真正改代码时再加深。

---

## 2. 克隆之后磁盘上有什么

\`\`\`
远程仓库（GitHub / Gitee / …）
        │  git clone [--depth=1]
        ▼
本地目录/
  ├── .git/          ← 历史与配置（通常很大）
  ├── package.json   ← 项目契约（示例）
  ├── README.md
  └── …源码与文档
\`\`\`

- **浅克隆** \`--depth=1\`：只取最近历史，体积更小，适合「先跑起来」  
- **工作区根目录**：能看到根 \`package.json\`（以及本仓的 \`pnpm-lock.yaml\`）的那一层，才是执行 \`pnpm install\` 的正确位置  
- 误进子目录再 install，会装错树或报找不到清单

<details>
<summary>展开：clone 后建议立刻确认的三件事</summary>

1. \`pwd\` / \`cd\` 是否在仓库根  
2. \`git remote -v\` 远程 URL 是否是你以为的那个平台  
3. \`node -v\` 与文档 \`engines\` 是否匹配（下一课首次跑通）
</details>

---

## 3. 本仓库示例

\`\`\`bash
git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git
cd XRK-AGT
# 若文档提供 Gitee / GitCode 镜像，只换 URL，其余相同
\`\`\`

\`\`\`mermaid
flowchart TB
  A[clone 完成] --> B{在仓库根？}
  B -->|否| C[cd 到含根 package.json 的目录]
  B -->|是| D[pnpm install]
  C --> D
  D --> E[node app / 按 README]
\`\`\`

---

## 4. 和「安装器」的差别

| | Git clone | 安装 Node 的 MSI / pkg |
|--|-----------|------------------------|
| 产物 | 源码树 + 历史元数据 | 可执行运行时 |
| 更新方式 | \`git pull\` / 重新 clone | 升级安装包或换版本管理器 |
| 是否进 PATH | 一般否 | 通常是 |

两者都要：没有 Node，源码跑不动；没有工作区，\`pnpm install\` 没有对象。

## 下一步

- 弄清远程平台差异 → **代码托管（GitHub / Gitee）**  
- 工具链收束 → **首次跑通**
`;
