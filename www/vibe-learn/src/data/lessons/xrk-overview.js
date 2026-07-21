/** 第二章 · 项目鸟瞰 */
export default `# 项目鸟瞰 · XRK-AGT

> XRK-AGT = **通用后端运行时** + **可插拔业务 Core**。  
> 一句话：\`src/\` 提供舞台，\`core/*/\` 上演具体能力。

## 从零走到这里，你已经有的词

| 词 | 在本项目里的落点 |
|----|------------------|
| **进程** | \`node app\` 拉起的主服进程 |
| **端口** | 主服监听的 HTTP 端口（见 README） |
| **运行时 Node** | 执行本仓库 JS 的引擎 |
| **pnpm** | 唯一包管理契约 |
| **HTTP / API** | \`core/*/http\` 对外接口 |
| **反向代理直觉** | 主服挂载 www；本页常在 \`/vibe-learn/\` |

## 两层分工

\`\`\`mermaid
flowchart TB
  subgraph core["core/<名>-Core/ · 业务"]
    P[plugin]
    H[http]
    W[www]
    CFG[commonconfig]
  end
  subgraph src["src/ · 基础设施"]
    AR[AgentRuntime]
    LD[加载器 / 工厂]
  end
  core --> src
\`\`\`

| 你想做的事 | 优先改哪里 |
|------------|------------|
| 加产品能力、页面、业务 API | 对应 **Core** |
| 改框架加载方式、全局能力 | **src/**（框架维护者） |

**AgentRuntime**：运行时心脏，负责拉起并挂载各类扩展点。  
**Core**：业务包目录约定（plugin/http/www/…），不要把业务逻辑塞进 Runtime 内核。

## 下一步

1. **AgentRuntime** — 进程里「总调度」是谁  
2. **Core 放码** — 文件应该落在哪  
3. **HTTP / www** — 对外怎么暴露  
4. **配置归属** — 改配置改哪三处  
`;
