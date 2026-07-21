/** HTTP 与 www */
export default `# HTTP 与 www

> 第三章的 HTTP，在本仓库落成两件事：  
> **接口**（\`core/*/http\`）与 **页面**（\`core/*/www/<应用>\`）。

## 知识串

| 已有词 | 本课落点 |
|--------|----------|
| **HTTP / API** | \`HttpResponse\` 统一响应形状 |
| **前端 / 后端** | www = 前端静态；http = 后端接口 |
| **反向代理** | 主服可同端口挂载子前端（入口工程化） |
| **Core** | 业务 API 与页面都放在 Core 里，不进 \`src/\` |

零基础画面：浏览器打开 \`/vibe-learn/\` → 其实是主服把某个 Core 的 **www** 目录当静态站挂出去了。

## HTTP API

- Handler 优先 \`HttpResponse.success / error / …\`  
- 成功时：普通对象字段**拍平到顶层**；数组才进 \`data\`  
- 前端勿默认 \`json.data.xxx\`——先看形状再解包  

**HttpResponse**：框架封装的成功/失败 JSON 工具，避免每个接口自己发明字段。

<details>
<summary>展开：为什么前端常解包失败</summary>

底层约定：

- \`success(res, { a, b })\` → 响应里直接有 \`a\`、\`b\`（没有统一的 \`data\` 包一层）  
- \`success(res, 数组)\` → 才放进 \`data\`  

若前端写死 \`json.data.a\`，对象成功响应就会取空。解包时：有 \`data\` 用 \`data\`，否则去掉 \`success\`/\`message\` 后读剩余字段。
</details>

## www 静态挂载

| 约定 | 含义 |
|------|------|
| 路径 | \`core/<Core>/www/<应用名>/\` |
| 访问 | 主服挂成 \`/<应用名>/\` |
| 保留名 | 避开 \`api\`、\`core\`、\`shared\` 等根段 |

\`sign.json\` 可声明前端构建与反代，使 \`pnpm\` 子前端与主服同端口访问——直觉上接近「入口工程化 / 反代」。

## 练习视角（最小闭环）

1. 打开本页（你已在 www 上）  
2. 改 \`vibe-learn\` 课文或样式  
3. 构建 → 刷新  

这就是 Core www 的日常。

## 下一步

**配置归属** — 改一项配置时，模板 / schema / 消费代码要一起动。
`;
