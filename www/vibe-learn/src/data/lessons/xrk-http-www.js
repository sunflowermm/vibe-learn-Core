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

## HTTP API

- Handler 优先 \`HttpResponse.success / error / …\`  
- 成功时：普通对象字段**拍平到顶层**；数组才进 \`data\`  
- 前端勿默认 \`json.data.xxx\`——先看形状再解包  

**HttpResponse**：框架封装的成功/失败 JSON 工具，避免每个接口自己发明字段。

## www 静态挂载

- 路径形如 \`core/<Core>/www/<应用名>/\`  
- 主服挂成 \`/<应用名>/\`（本学习页即 \`/vibe-learn/\`）  
- 应用名避开保留段（如 \`api\`、\`core\`、\`shared\`…）  

\`sign.json\` 可声明前端构建与反代，使 \`pnpm\` 子前端与主服同端口访问——直觉上接近「入口工程化 / 反代」。

## 练习视角

打开本页时，你已经走在「Runtime 挂载的 www」上。  
改 \`vibe-learn\` 源码 → 构建 → 刷新，就是最小的 Core www 闭环。

## 下一步

**配置归属** — 改一项配置时，模板 / schema / 消费代码要一起动。
`;
