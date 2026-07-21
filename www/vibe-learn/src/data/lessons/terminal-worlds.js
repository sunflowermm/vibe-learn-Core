/** 不同终端环境 */
export default `# 不同终端环境

> **终端**是窗口；**Shell**是窗口里的语言解释器；**OS**才真正创建进程。  
> 换操作系统，默认「终端环境」就不一样——命令相似度高，路径与习惯不同。

## 本课分块

| 块 | 内容 |
|----|------|
| **三件套** | 终端仿真器 · Shell · OS |
| **平台对照** | Windows / macOS / Linux / SSH |
| **WSL** | Windows 上的 Linux 用户态 |
| **提示符陷阱** | \`$\` 与 \`PS>\` 只是化妆 |

---

## 1. 必须分清的三件事

\`\`\`mermaid
flowchart TB
  subgraph you["你看见的"]
    TE[终端仿真器\\n黑窗口 / Windows Terminal]
  end
  subgraph talk["你说的话"]
    SH[Shell\\nbash / zsh / PowerShell]
  end
  subgraph real["真正干活"]
    OS[操作系统\\n创建进程 · 管文件 · 管权限]
  end
  TE --> SH
  SH -->|系统调用| OS
\`\`\`

1. **终端仿真器** — 负责显示与输入（窗口本身）  
2. **Shell** — 解析你敲的文字（PowerShell ≠ bash）  
3. **操作系统** — 真正创建进程的那一层  

把文档里的命令「翻译」进你的 Shell 方言，而不是逐字符照抄提示符。

---

## 2. 常见组合

| 系统 | 常见终端 App | 默认 / 常用 Shell | 路径直觉 |
|------|----------------|-------------------|----------|
| **Windows** | Windows Terminal、PowerShell、cmd | **PowerShell**、cmd；可选 Git Bash / WSL | \`C:\\Users\\...\`；WSL 里变 Linux 路径 |
| **macOS** | 终端.app、iTerm2 | **zsh**（近年默认） | \`/Users/...\` |
| **Linux 桌面** | GNOME Terminal、Konsole… | **bash** 或 zsh | \`/home/...\` |
| **远程服务器** | SSH 进远程 Shell | 多为 bash | 无图形，一切靠命令 |

\`\`\`html5
<figure>
  <svg viewBox="0 0 540 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="本机与 SSH 远程">
    <rect x="20" y="30" width="160" height="90" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.65"/>
    <text x="100" y="70" text-anchor="middle" fill="currentColor" font-size="13">本机终端</text>
    <text x="100" y="95" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.65">窗口在你眼前</text>
    <path d="M180 75 H250" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5"/>
    <text x="215" y="65" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.6">SSH</text>
    <rect x="250" y="30" width="160" height="90" rx="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.65"/>
    <text x="330" y="70" text-anchor="middle" fill="currentColor" font-size="13">远程 Shell</text>
    <text x="330" y="95" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.65">进程跑在服务器</text>
    <rect x="430" y="45" width="90" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.45"/>
    <text x="475" y="80" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.7">机房 OS</text>
  </svg>
  <figcaption>SSH：键盘在本地，进程与文件在远端</figcaption>
</figure>
\`\`\`

---

## 3. WSL：Windows 上的 Linux 环境

WSL 让你在 Windows 里跑一套 Linux 用户态，对开源教程友好。

| 注意点 | 为什么 |
|--------|--------|
| \`/mnt/c\` vs Linux 家目录 | 跨界复制多时性能与权限易踩坑 |
| 发行版选择 | 其实是在装一个 **Linux 发行版**（见下一节点） |
| 路径混用 | 同一文件不要在 Windows 工具与 WSL 里轮流锁死编辑 |

## 4. 提示符只是化妆

| 你看到的 | 含义 |
|----------|------|
| \`$\` | 常见于 bash/zsh 文档 |
| \`#\` | 常表示 root（也不绝对） |
| \`PS>\` | PowerShell |
| \`>\` | 依 Shell 配置而变 |

## 下一步

- **Linux 发行版** — 同内核，不同包装与包管理  
- **Linux 基础指令** — 在目录与进程之间建立空间感  
- **运行时 Node.js** — 另一条支柱：代码用什么引擎跑
`;
