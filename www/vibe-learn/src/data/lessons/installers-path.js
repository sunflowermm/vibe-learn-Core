/** 安装器与 PATH */
export default `# 安装器与 PATH

> 软件要被 Shell 找到，通常不只是「有个文件夹」，还要进入 **PATH**（可执行文件搜索路径）。  
> Windows 的 **.msi**、Linux 的包管理器、macOS 的 .pkg，都是「写入磁盘 + 登记 PATH」的常见方式。

## 和前后课的关系

| 上一课 | 本课 | 下一课 |
|--------|------|--------|
| 知道需要 Node 运行时 | 如何让 \`node\` 命令找得到 | 用 pnpm 装项目依赖 |

没有 PATH，你在终端里敲 \`node\` 会得到「不是内部命令」——这是环境问题，不是代码写错。

## 本课名词对照

| 概念 | 一句话 |
|------|--------|
| **安装器** | 按平台惯例解压、写注册表/桌面项、改环境变量 |
| **MSI** | Windows Installer 包；双击走系统向导 |
| **PATH** | Shell 按列表依次查找 \`node\`、\`pnpm\`、\`git\` |
| **环境变量** | 给进程看的「全局配置项」；PATH 是其中最常用的一条 |
| **便携版** | 解压即用，但常需你手动把目录加进 PATH |

\`\`\`mermaid
flowchart LR
  I[安装器写入磁盘] --> P[登记到 PATH]
  P --> S[新开一个 Shell]
  S --> C["which / Get-Command node"]
  C --> OK[找得到可执行文件]
\`\`\`

---

## 为什么「装了却提示不是内部命令」

1. 勾选了「Add to PATH」，但**未重开终端**（旧会话仍用旧环境变量）  
2. 装到了用户目录，当前 Shell 看不到  
3. 装了多套 Node，PATH 顺序指向了另一套  

自检：

\`\`\`bash
# Windows PowerShell
Get-Command node

# macOS / Linux / WSL
which node
\`\`\`

## 和运行时卡片的关系

Node 安装器的核心产物是 \`node\`（以及常附带的包管理器入口）。  
版本对了、PATH 通了，才谈得上 \`pnpm install\`。

## 实践建议

- 优先用**官方或项目文档推荐**渠道，少混用多个互抢 PATH 的安装源  
- 企业若禁用 MSI，再考虑版本管理器或 Docker——进阶分支，本图先钉「本机工具链」

## 下一步

**包管理器 · pnpm**（交付依赖）→ **Git 与工作区**（交付源码）。
`;
