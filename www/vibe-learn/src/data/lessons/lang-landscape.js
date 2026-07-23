/** 语言版图 — 只收语言；框架见库与框架轨 */
export default `# 语言版图

> 按**层次**理解**语言**：靠近硬件还是靠近业务应用。  
> **本课只索引语言。** Vue / React / Spring 等是**框架或库**，挂在 **库与框架** 轨，不进本图。  
> 先建立概念：**什么是语言** → **库与框架** → **技术栈** → **技术选型**。  
> 本仓坐标：主服 **Node.js（JavaScript 语言）**；子服 **Python、Go、PHP、Java、.NET、Rust**。

## 与上一课的关系

上一课说明翻译发生在编译期还是运行期。  
本课把**语言**放进同一张层次图；框架实例去点 **Vue** / **React**。

## 语言 vs 框架（再钉一次）

| 进本图（语言） | 不进本图（框架/库） |
|----------------|---------------------|
| JavaScript、TypeScript、Python、Go… | Vue、React、Spring、Django、Express… |
| HTML / CSS（标记/样式语言） | Element Plus、Ant Design（组件库） |
| Shell、PowerShell（脚本语言） | 某公司内部脚手架 |

## 三层结构（语言）

| 层次 | 本框分课 | 常见用途 | 交付形态 |
|------|----------|----------|----------|
| **系统 / 近金属** | **C**、**Rust**、**Go** | 系统组件、高并发、工具链 | 多编译为可执行文件 |
| **托管运行时** | **Java**、**C#** | 大型后端与企业中间件 | 字节码/IL + VM |
| **脚本与胶水** | **JavaScript**、**TypeScript**、**Python**、**PHP**、**Shell**、**PowerShell** | Web、自动化、数据分析、运维脚本 | 依赖已安装的运行时/壳 |
| **Web 标记与样式** | **HTML / CSS** | 页面结构与外观 | 浏览器解析 |

\`\`\`mermaid
flowchart TB
  H["硬件 / OS"] --> S[系统级语言]
  S --> M[托管运行时语言]
  M --> G[脚本与胶水语言]
  G --> WEB[HTML/CSS]
  G --> APP[业务应用]
  WEB --> APP
  FW["框架轨: Vue / React 等"] -.->|建立在 JS+HTML/CSS 上| APP
\`\`\`

## 分课导航（一门语言一块）

| 语言 | 本仓角色 | 先看什么 |
|------|----------|----------|
| **JavaScript** | **主服语言** | 事件循环、双宿主 |
| **TypeScript** | 可选类型层 | 与 JS 超集关系 |
| **HTML / CSS** | www 与前端地基 | 语义化、盒模型、布局 |
| **Python** | 默认子服 pyserver | GIL、AI/数据生态 |
| **Go** | goserver | goroutine、单二进制 |
| **Rust** | rustserver | 所有权、无 GC 性能 |
| **Java** | jserver | JVM；其上才有 Spring 等**框架** |
| **C# / .NET** | netserver | CLR |
| **PHP** | phpserver | 轻量 Web/脚本 |
| **C** | 无独立 runtime | 近金属与 FFI |
| **Shell** | CI / 服务器脚本 | 管道、退出码、\`set -e\` |
| **PowerShell** | Windows 本机自动化 | 对象管道、Cmdlet |

## 框架分课（另一轨，不在表内当「语言」）

| 节点 | 分类 | 宿主语言 |
|------|------|----------|
| **Vue** | 渐进式前端框架 | JavaScript / TypeScript |
| **React** | UI 库（生态常当框架） | JavaScript / TypeScript |
| **Angular** | 全家桶前端框架 | TypeScript |
| **Next.js** | React 元框架 | JavaScript / TypeScript |
| **Spring** | Java 后端框架 | Java |
| **Express / Nest** | Node 后端框架 | JavaScript / TypeScript |
| **Django / FastAPI** | Python Web 框架 | Python |
| **Gin** | Go Web 框架 | Go |
| **ASP.NET Core** | .NET Web 框架 | C# |
| **Laravel** | PHP Web 框架 | PHP |

从图谱 **库与框架** 进入；边会标「宿主语言」。

## 运行时边界

| | 浏览器 | Node.js（主服） | 子服各语言 |
|--|--------|-----------------|------------|
| 能力域 | DOM、页面 | 文件、进程、HTTP | 该语言生态专长 |
| 进程 | 标签页 | \`node app\` | \`subserver/<runtime>/\` |

完整端口与选型表：第四章 **语言栈**（\`subserver/LANGUAGES.md\`）。

## 下一步

任选一门**语言**课深挖 →（前端再补）**Vue / React** 框架课 → **接到本仓运行时** → 第四章 **语言栈**。
`;
