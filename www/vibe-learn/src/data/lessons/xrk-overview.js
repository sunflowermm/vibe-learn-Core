/** 项目鸟瞰 · 融合入口 */
export default `# 项目鸟瞰 · XRK-AGT

> XRK-AGT = **通用后端运行时** + **可插拔业务 Core** + **多语言子服务进程族**。  
> \`src/\` 提供运行时基础设施；\`core/*/\` 承载产品能力；\`subserver/<runtime>/\` 按语言优势实现专用能力。  
> 第四章将序章至第三章的概念收束到本仓库的工程坐标。

## 章节概念 → 本仓坐标

| 章节 | 关键概念 | 本仓落点 |
|------|----------|----------|
| **序章** | 进程、系统调用 | \`node app\` 启动主服；各子服为独立进程 |
| **第一章** | 终端、PATH、pnpm、Git | 仓库根安装与启动；子服各有启动命令 |
| **第二章** | 运行时、语言版图 | 主服 Node；子服 Python / Go / PHP / Java / .NET / Rust |
| **第三章** | 端口、HTTP、反代 | 主服对外端口；子服 8000–8005；\`callSubserver\` |
| **第五章** | LLM、MCP、Agent | 仅在主服 AiWorkflow 中运行 |

\`\`\`mermaid
flowchart TB
  C0[序章·进程] --> XRK[第四章·项目实践]
  C1[环境·工具链] --> XRK
  C2[语言·运行时] --> XRK
  C3[网络·HTTP] --> XRK
  XRK --> C5[第五章·AI 概念]
\`\`\`

---

## 三层分工

\`\`\`mermaid
flowchart TB
  subgraph main["主服 Node"]
    AR[AgentRuntime]
    Core["core/<名>-Core/"]
    WF[workflow / HTTP / www]
  end
  subgraph subs["子服族"]
    P[pyserver]
    G[goserver]
    O[其它 runtime]
  end
  Core --> AR
  WF --> AR
  AR -->|HTTP| subs
\`\`\`

| 目标 | 修改位置 |
|------|----------|
| 产品能力、页面、业务 API | 对应 **Core** |
| 框架加载与全局能力 | **\`src/\`**（框架维护） |
| 语言生态专用能力 | **\`subserver/<runtime>/apis/\`** |
| 子服地址与开关 | 主服 \`ai-workflow\` → \`subserver.runtimes\` |

- **AgentRuntime**：主服中枢，提供 \`callSubserver\`  
- **Core**：业务包目录约定  
- **子服**：多语言进程，共享 HTTP 契约；选型与优势见 **语言栈**

---

## 本框节点地图

| 节点 | 回扣 |
|------|------|
| AgentRuntime | 序章·进程 |
| Core 放码 / 插件架构 | 扩展点 |
| **语言栈** | 第二章 + 六 runtime 与语言优势 |
| HTTP / www | 第三章 |
| **子服务端** | 多进程、端口、配置读写边界 |
| 配置归属 | 模板与 schema 契约 |
| Stream | 通往第五章（LLM 在主服） |

## 建议阅读顺序

AgentRuntime → Core / 插件 → **语言栈** → HTTP → **子服务端** → 配置 → Stream。
`;
