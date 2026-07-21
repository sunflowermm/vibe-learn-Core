/** AgentRuntime */
export default `# AgentRuntime

> 进程启动后，核心逻辑由 **AgentRuntime** 实例承担：加载 Core、挂载扩展、接入消息与工作流。  
> 业务包（Core）向该运行时报到并使用其提供的能力。

## 概念对应

| 已有概念 | 本课落点 |
|----------|----------|
| **进程**（序章） | \`node app\` 启动的 OS 进程 |
| **运行时**（第一·二章） | 进程内的 AgentRuntime 逻辑中枢 |
| **端口 / HTTP**（第三章） | Runtime 挂载的 HTTP 服务 |
| **Core**（下一课） | 向 Runtime 挂载的业务包 |

## 要点

- 入口：\`node app\` → 引导 → Runtime 初始化  
- Core 的 plugin / http / workflow / tasker / events / commonconfig 由 **Loader** 扫描挂载  
- 业务代码使用裸名 \`AgentRuntime\`（与全局单例一致，勿自行 \`import\` 另建实例）  

**Loader**：扫描 \`core/*/\` 约定目录并将扩展点挂到 Runtime。

## 与进程模型

Shell 启动的是 OS 进程；进程内部由 AgentRuntime 维护逻辑运行时：多通道、多插件共享同一套基础设施。

## 常见操作面

- 控制台 / 健康检查：确认 Runtime online  
- 热加载与配置：变更 yaml / 插件后观察装载结果  
- 多端接入：OneBot、stdin、自定义 Tasker 等挂在 Runtime 外围  
- 调用子服：\`AgentRuntime.callSubserver({ path, runtime })\`，按 HTTP JSON 路由到目标 runtime（默认 \`pyserver\`，亦可 \`goserver\` 等）

文档：\`docs/runtime-surface.md\`、\`docs/startup.md\`、\`docs/subserver-api.md\`。

## 下一步

**Core 放码** — 业务文件归属；  
**插件架构** — Loader 挂载机制；  
**语言栈 / 子服务端** — 多语言进程族与调用方式。
`;
