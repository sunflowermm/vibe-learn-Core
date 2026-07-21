/** AgentRuntime */
export default `# AgentRuntime

> 启动之后，真正「活着」的是运行时实例：加载 Core、挂插件、接消息、跑工作流。  
> 可把它想成工坊总管请来的 **值班经理**——业务演员（Core）都向它报道。

## 知识串

| 已有词 | 在本课的落点 |
|--------|--------------|
| **进程**（序章） | \`node app\` 拉起的 OS 进程 |
| **运行时**（第一·二章） | 进程内部的 AgentRuntime 逻辑中枢 |
| **端口 / HTTP**（第三章） | Runtime 挂载的 HTTP 服务对外暴露 |
| **Core**（下一课） | 向 Runtime「报道」的业务包 |

## 记忆点

- 入口常见：\`node app\` → 引导 → Runtime 初始化  
- Core 的 plugin / http / workflow / tasker / events / commonconfig 由 **Loader（加载器）** 扫描挂载  
- 业务代码里用**裸名** \`AgentRuntime\`（不要 \`import\` 一份自己的单例）  

**Loader**：框架里负责扫描 \`core/*/\` 约定目录并挂上扩展点的机制。

## 和「进程」对照

序章说：Shell 里启动的是 OS 进程。  
本章说：该进程内部还有一张**逻辑运行时表**——多个通道、多套插件，共享同一套基础设施。

## 实践时你会碰到

- 控制台 / 健康检查：确认 Runtime 已 online  
- 热加载与配置：改 yaml / 插件后观察是否重新装载  
- 多端接入：OneBot、stdin、自定义 Tasker……都挂在 Runtime 外围  

细节文档：仓库 \`docs/runtime-surface.md\`、\`docs/startup.md\`。

## 下一步

**Core 放码** — 业务文件应该落在哪个目录。
`;
