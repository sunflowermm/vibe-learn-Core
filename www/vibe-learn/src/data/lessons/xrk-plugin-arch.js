/** 插件式架构 · Loader 族与分工 */
export default `# 插件式架构

> 扩展方式为 **约定目录 + Loader 扫描 + 基类契约**（插件式 / 可插拔架构）。  
> 「插件」狭义常指 \`plugin/\`；广义上 http / workflow / tasker / events / commonconfig 都是同一套插座模型。

## 本课你要带走什么

1. Loader 族各自扫描哪、挂到哪  
2. **热更边界**：哪些宜热加载、哪些常需重启  
3. 与 **tasker / events** 的分工（通道 · 监听 · 业务）  
4. 基类文档入口，避免在 Core 里复制 \`src/\` 逻辑

---

## 1. 知识串

| 已学 | 在本课的落点 |
|------|--------------|
| **进程 / OS**（序章） | 同一主服进程挂载多套扩展 |
| **模块 / 包**（语言·包管理） | 每个 Core 为可加载能力包 |
| **接口契约**（API 课） | 继承基类，接口形状稳定 |
| **Core 放码** | 文件位于约定目录方可被发现 |
| **业务层全景** | 扩展点一张表 |

\`\`\`mermaid
flowchart TB
  RT[AgentRuntime] --> LD[各类 Loader]
  LD --> P[plugin]
  LD --> H[http]
  LD --> W[workflow]
  LD --> T[tasker]
  LD --> E[events]
  LD --> C[commonconfig]
  P --> Core["core/<名>-Core/"]
  H --> Core
  W --> Core
  T --> Core
  E --> Core
\`\`\`

---

## 2. Loader 族（本仓路径）

| Loader | 扫描 | 源码直觉 |
|--------|------|----------|
| PluginLoader | \`core/*/plugin\` | \`src/infrastructure/plugins/\` |
| HttpApiLoader | \`core/*/http\` | \`src/infrastructure/http/loader.js\` |
| AiWorkflowLoader | \`core/*/workflow\` | \`src/infrastructure/ai-workflow/\` |
| TaskerLoader | \`core/*/tasker\` | \`src/infrastructure/tasker/loader.js\` |
| ListenerLoader | \`core/*/events\` | \`src/infrastructure/listener/loader.js\` |
| CommonConfigRegistry | \`core/*/commonconfig\`（含子服 apis 侧） | \`src/infrastructure/commonconfig/\` |

共性模式见 \`docs/infrastructure-shared.md\`。Tasker 常在模块内自行 \`AgentRuntime.tasker.push\` / 注册 \`wsf\`。

---

## 3. 与 tasker / events 分工

| 扩展点 | 一句话 | 别越权 |
|--------|--------|--------|
| **tasker** | 协议 → 统一事件 | 不写产品指令逻辑 |
| **events** | 生命周期 / 常驻监听 | 不替代 plugin 规则引擎 |
| **plugin** | 规则匹配与业务 | 不直接解析私有 WS 帧（交给 tasker） |
| **workflow** | LLM 编排与 MCP 工具 | 不替代简单指令插件（除非确实要 AI） |

详细通道课：**Tasker 通道**；监听课：**events**。

---

## 4. 热更边界（实践用）

| 类别 | 建议 |
|------|------|
| plugin、多数 workflow、部分 http | 开发期可热加载；**以日志确认为准** |
| events、tasker 连接、DB 连接、auth 密钥文件 | **重启主服** |
| commonconfig schema 大变 | 重启并核对配置页 |

constructor 内禁止建易变缓存（\`Map\`/\`{}\` 当状态容器）——用类字段或 \`init()\`（\`xrk-dev-requirements\`）。

---

## 5. 为什么要插件化

| 痛点 | 插头模型如何解 |
|------|----------------|
| 业务与基建耦死 | 框架只提供基类 + Loader |
| 热更新困难 | 业务文件可替换重载 |
| 多产品并存 | 每 Core 一目录，互不侵入 |
| 可替换通道 | 换 Tasker 不改内核 |

典型基类：\`PluginBase\`、\`AiWorkflow\`、HttpApi 对象导出、\`ConfigBase\`、\`ListenerBase\`……  
见 \`docs/base-classes.md\`、\`docs/框架可扩展性指南.md\`。

---

## 6. 实践清单

1. 启动日志中标出至少三种 Loader 的成功行。  
2. 改一个 \`plugin\` 文件字符串，观察是否热更；再改 \`events\`，确认需否重启。  
3. 打开 \`docs/base-classes.md\`，把 Plugin / Http / Workflow 最小导出抄到笔记。  
4. 做 **实践·最小插件** 通关。

---

## 7. 文档链接

- \`docs/base-classes.md\` · \`docs/infrastructure-shared.md\`  
- \`docs/plugin-base.md\` · \`docs/tasker-loader.md\`  
- \`docs/框架可扩展性指南.md\` · \`docs/runtime-surface.md\`

## 下一步

插件对外暴露 → **HTTP / www** · **Auth**；  
按语言生态卸重活 → **子服务端**；  
对话能力 → **Stream** · **Factory** · **MCP**；  
动手 → **实践·最小插件**。
`;
