/** HTTP 与 www · 回扣网络章 */
export default `# HTTP 与 www

> 第三章的 HTTP / 反代 / 前后端，在本仓库落成两件事：  
> **接口**（\`core/*/http\`）与 **页面**（\`core/*/www/<应用>\`）。  
> 本课是 **网络知识在项目里的汇合点**——建议对照图谱连回「HTTP 与 Web」「反向代理」。

## 知识串（接第三章）

| 第三章词 | 本仓落点 |
|----------|----------|
| **HTTP 方法 / 状态码** | Handler 返回 \`HttpResponse\`；前端按约定解包 |
| **API · 前端 · 后端** | www = 静态前端；http = 后端接口 |
| **TCP 端口** | 主服 listen；浏览器打到同一入口 |
| **反向代理 / 入口工程化** | 主服同端口挂多个 \`/<应用名>/\`；\`sign.json\` 可声明构建与反代 |
| **HTTPS / TLS** | 生产常在网关终止；本地学习站多为 http |

示例：访问 \`/vibe-learn/\` 时，主服将对应 Core 的 \`www\` 作为静态站点挂载。

\`\`\`mermaid
flowchart LR
  Browser[浏览器] -->|HTTP| Main[主服端口]
  Main --> API["core/*/http"]
  Main --> WWW["core/*/www/应用"]
\`\`\`

---

## HTTP API（契约）

- Handler 优先 \`HttpResponse.success / error / …\`  
- 成功时：普通对象字段**拍平到顶层**；数组才进 \`data\`  
- 前端勿默认 \`json.data.xxx\`  

**HttpResponse**：统一成功/失败 JSON，避免每个接口私创字段（像第三章「协议要有共同词表」）。

<details>
<summary>展开：为何前端常解包失败</summary>

- \`success(res, { a, b })\` → 顶层直接有 \`a\`、\`b\`  
- \`success(res, 数组)\` → 才进 \`data\`  

写死 \`json.data.a\` 会在对象成功响应上取空。
</details>

---

## www 静态挂载

| 约定 | 含义 | 网络直觉 |
|------|------|----------|
| \`www/<应用名>/\` | 静态根 | 像一台「虚拟站点」 |
| 访问 \`/<应用名>/\` | 主服路由挂载 | 像反代按路径分流 |
| 避开保留根名 | \`api\` \`core\` \`shared\`… | 避免与框架路由撞车 |

## 最小闭环

1. 你已在 www 上读本页  
2. 改课文 → 构建 → 刷新  
3. 需要接口时在同 Core 加 \`http/\`  

## 下一步

配置与契约 → **配置归属**；  
对话入口 → **Stream**；  
子服能力调用 → **子服务端**（\`callSubserver\` 指定 runtime；通常经主服对外门面）。
`;
