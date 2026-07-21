/** 包管理器 */
export default `# 包管理器 · pnpm

> **包管理器**根据清单文件（\`package.json\`）解析依赖树，从**注册表（registry）**下载模块，并在项目里链接成可 \`import\` 的目录。  
> XRK-AGT **只支持 pnpm**（见根目录 \`packageManager\` / 文档约定）。

## 知识串：三种「装东西」别混

| 名字 | 装的是什么 | 例子 |
|------|------------|------|
| **系统包管理器** | 操作系统级软件 | apt、dnf（见 Linux 发行版） |
| **安装器 / PATH** | 运行时本尊 | Node 的 MSI |
| **pnpm（本课）** | 项目依赖库 | lodash、vue、本仓依赖 |

零基础最常见的混淆：用 npm 全局乱装，和「在仓库根执行 pnpm install」不是一回事。

## 本课分块

| 角色 | 做什么 |
|------|--------|
| **\`package.json\`** | 声明依赖与脚本，是契约 |
| **锁文件** | 钉死确切版本（\`pnpm-lock.yaml\`） |
| **\`node_modules\`** | 解析结果的落地；勿手改、勿提交 |
| **注册表** | 包的下载源（npmjs / 国内镜像） |
| **Corepack** | Node 自带助手，可启用项目声明的 pnpm 版本 |

\`\`\`mermaid
flowchart TB
  PJ[package.json 契约] --> PM[pnpm install]
  LK[pnpm-lock.yaml] --> PM
  PM --> REG[注册表下载]
  REG --> NM[node_modules]
  NM --> NODE[node 执行 import]
\`\`\`

---

## 为何不能「随便用 npm 装一下」

不同包管理器的依赖布局与 peer 解析策略不一致。  
项目若声明 \`packageManager: pnpm@…\`，混用会导致：

- **幽灵依赖**（能 import 却不在清单里）  
- CI 与本地结果漂移  
- 文档脚本（\`pnpm run …\`）对不上  

## 最小命令集

\`\`\`bash
# 若尚未安装 pnpm（需已有 Node，且 PATH 通）
corepack enable
corepack prepare pnpm@latest --activate

# 必须在仓库根目录（能看见根 package.json）
pnpm install
\`\`\`

## 和运行时的先后

先有可用的 **Node（版本达标 + PATH）** → 再启用 pnpm → 再在仓库根安装。  
顺序反了，报错会骗你去「重装系统」。

## 下一步

**Git 与工作区**（若还没有源码）→ **代码托管**（认清 GitHub/Gitee）→ **首次跑通**。
`;
