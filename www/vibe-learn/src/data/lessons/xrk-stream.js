/** Stream / AiWorkflow · XRK 业务层 */
export default `# Stream 业务层 · AiWorkflow

> 对话型 AI 能力落在 **工作流（workflow，常称 stream）**：  
> 收消息 → 组上下文 → 调 LLM →（可选）执行工具 → 返回结果。

## 概念对应

| 已学 | 本课 |
|------|------|
| **AgentRuntime** | 进程已启动，可挂载扩展 |
| **Core 放码** | 业务位于 \`core/*/workflow/\` |
| **HTTP / www** | 聊天入口常经 \`/api/.../chat/completions\` |
| **配置归属** | \`ai-workflow.yaml\` 管理模型与 MCP |
| **插件架构** | workflow 为扩展点之一 |
| **语言栈** | 工作流运行于主服 Node；工具可经 \`callSubserver\` 调用各子服 runtime |
| **子服务端** | LLM 仅在主服；子服承担计算与语言生态能力 |

本课衔接第四章工程层与第五章 AI 概念时间线。

---

## 1. 术语

| 说法 | 含义 |
|------|------|
| **workflow** | \`core/*/workflow/*.js\` 中继承 \`AiWorkflow\` 的类，由 Loader 加载 |
| **stream / streams** | 对话请求中的工作流名白名单，限制本轮可用工具集 |
| **AiWorkflow** | 基类：组消息、调 \`LLMFactory\`、挂载 MCP 工具、可选记忆增强 |

Runtime 负责运行时舞台；具体对话编排由所选 workflow 完成。

\`\`\`mermaid
flowchart LR
  P[插件 / HTTP 入口] --> W["AiWorkflow.process"]
  W --> C[组 messages 上下文]
  C --> L[LLMFactory]
  L --> T["tool_calls 循环"]
  T --> M[MCP 工具]
  M --> Sub["可选 callSubserver · 多 runtime"]
  M --> L
  L --> Out[回复文本 / 流式 delta]
\`\`\`

---

## 2. 一次对话在底层走什么

对齐仓库文档 \`docs/ai-workflow.md\` 的现状：

1. **构建上下文**：\`buildChatContext\` / \`buildSystemPrompt\`（角色、风格、事件信息）  
2. **可选增强**：短期记忆、知识检索（RAG 类能力，按已加载工作流）  
3. **调用 LLM**：经工厂，走 **OpenAI 兼容形态**的消息数组（见下一课）  
4. **工具**：不再解析「文本里假装调用函数」；统一 **LLM tool calling + MCP**  
5. **流式**：边推 \`delta.content\`，边在需要时收集并执行工具，再继续生成  

\`streams\` 白名单的意义：前端选了哪些工作流，MCP 适配层就只暴露那些工作流注册过的工具——避免「一开口能调全库工具」。

---

## 3. 和「外面 AI 概念」的对照表

| 外面常听到的 | 在本仓落地 |
|--------------|------------|
| Chat Completions / messages | LLM 客户端组的请求形状 |
| Function / Tool Calling | 模型返回 \`tool_calls\`，客户端执行 |
| MCP | 工具发现与调用的标准通道 |
| System prompt / 人设 | \`buildSystemPrompt\`、工作区文件 |
| Agent 工作区 | \`ai-workflow.agentWorkspace\` 注入的 \`AGENTS.md\` 等 |

后面几课按时间线把这些词讲透；本课只要你能指着图说：**业务在 workflow，工具在 MCP，协议形状靠 LLM 工厂。**

## 下一步

进入 **第五章 · 人工智能**，从 **AI 学科诞生** 起按时间线一课一课往下读。
`;
