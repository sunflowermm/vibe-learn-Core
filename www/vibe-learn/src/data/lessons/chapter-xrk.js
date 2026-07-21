/** 第四章 XRK */
export default `# 第四章 · XRK-AGT（项目实践）

> 本框将进程、语言、网络、包管理等概念落到本仓库的工程实践。  
> 主服固定为 Node.js；子服提供 Python、Go、PHP、Java、.NET、Rust 六套 runtime。  
> 人工智能概念见 **第五章**；Stream 为桥接节点（LLM 仅在主服运行）。

## 知识结构

\`\`\`mermaid
flowchart TB
  subgraph pre["前几章"]
    OS[进程/OS]
    ENV[终端/pnpm/Git]
    LANG[语言版图]
    NET[端口/HTTP]
  end
  subgraph xrk["本框"]
    RT[Runtime]
    PL[插件架构]
    LS[语言栈]
    HTTP[HTTP/www]
    SUB[子服务端]
    ST[Stream]
  end
  OS --> RT
  ENV --> RT
  LANG --> LS
  NET --> HTTP
  NET --> SUB
  LS --> SUB
  RT --> PL
  PL --> HTTP
  HTTP --> ST
  SUB --> ST
  ST --> AI[第五章]
\`\`\`

## 节点速查

| 节点 | 摘要 | 主要回扣 |
|------|------|----------|
| 项目鸟瞰 | Runtime · Core · 子服族 | 总览 |
| AgentRuntime | 主服中枢与 \`callSubserver\` | 序章·进程 |
| Core 放码 | 业务目录约定 | 模块边界 |
| 插件架构 | Loader + 基类扩展点 | 可扩展性 |
| 语言栈 | 主服 Node；六子服语言与优势 | 第二章 |
| HTTP / www | 接口与静态挂载 | 第三章 |
| 子服务端 | 多进程 HTTP 契约；配置只读 | 进程 + 端口 + 语言 |
| 配置归属 | 框架模板与产品模板；含 \`subserver.runtimes\` | 契约 |
| Stream | 对话工作流（主服） | 第五章入口 |

## 建议读法

鸟瞰 → Runtime / Core → 插件 → **语言栈** → HTTP → **子服务端** → 配置 → Stream → 第五章。
`;
