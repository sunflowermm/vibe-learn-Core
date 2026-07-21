/** HTTP、状态码、缓存、Cookie/Session、CORS — 对齐课件 Web 相关页 */
export default `# HTTP 与 Web 基础

> **HTTP（超文本传输协议）** 是浏览器与 Web 服务器之间最常用的应用层协议，通常跑在 TCP 之上。

## 请求与响应长什么样

**请求示例：**

\`\`\`
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
\`\`\`

**响应示例：**

\`\`\`
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>...</html>
\`\`\`

### 常见方法

| 方法 | 直觉 | 常考点 |
|------|------|--------|
| GET | 获取资源 | 常幂等、可缓存 |
| POST | 提交数据（新建/提交表单等） | 默认非幂等；支付勿盲目重试 |
| PUT | 更新 / 替换 | 常幂等（整资源） |
| DELETE | 删除 | 常幂等 |
| PATCH | 部分更新 | 是否幂等看实现 |
| HEAD / OPTIONS | 取头 / 预检 | CORS 预检常用 OPTIONS |

## HTTP 状态码（五大类）

| 类 | 含义 | 例子 |
|----|------|------|
| **1xx** | 信息 | 较少直接关心 |
| **2xx** | 成功 | \`200 OK\`、\`201 Created\`、\`204 No Content\` |
| **3xx** | 重定向 / 缓存相关 | \`301\` 永久、\`302\` 临时、\`304 Not Modified\` |
| **4xx** | 客户端错误 | \`400\`、\`401\`、\`403\`、\`404\` |
| **5xx** | 服务器错误 | \`500\`、\`502 Bad Gateway\`、\`503\` |

> \`404\` = 你要的页面服务器说没有；\`502\` = 网关/代理后面的上游出问题——和「反代」场景很常一起出现。

## HTTP 缓存（强缓存 vs 协商缓存）

目的：少打网、加快打开速度。

### 强缓存（未过期可不打服务器）

- \`Cache-Control\`：如 \`max-age=3600\`、\`no-cache\`、\`no-store\`、\`private\`/\`public\`  
- \`Expires\`：绝对过期时间（老标准，优先级通常低于 Cache-Control）  

流程直觉：请求 → 本地缓存未过期 → 直接用（常显示 from cache）。

### 协商缓存（要问服务器「变了没」）

| 机制 | 依据 | 结果 |
|------|------|------|
| Last-Modified / If-Modified-Since | 修改时间 | 没变常回 \`304\` |
| ETag / If-None-Match | 内容指纹 | 更精确，常优先 |

流程：带验证头 → 服务器判断 → \`304\`（用缓存）或 \`200\`（新内容）。

> 记忆：强缓存直接用；协商缓存要验证；ETag 往往比时间戳更靠谱。

## Cookie vs Session

| | Cookie | Session |
|--|--------|---------|
| 存哪 | 浏览器（客户端） | 服务器 |
| 大小 | 很小（约 4KB 级） | 相对灵活 |
| 安全 | 可被脚本读（除非限制） | 内容在服务端，相对可控 |
| 寿命 | 可设过期 | 会话结束或超时 |

### Session 常见配合方式

1. 服务器创建 Session，生成 SessionID  
2. 通过 Cookie 把 SessionID 交给浏览器  
3. 之后请求带着这个 ID  
4. 服务器用 ID 找回 Session 数据  

**Cookie 重要属性（安全相关）：**

- \`HttpOnly\`：JS 读不到，降低 XSS 偷 Cookie 风险  
- \`Secure\`：仅 HTTPS 发送  
- \`SameSite\`：缓解 CSRF  
- \`Domain\` / \`Path\`：作用范围  

> 面试常记：Cookie 在客户端，Session 在服务器；SessionID 常靠 Cookie 传递。

## CORS 跨域

浏览器同源策略：协议、域名、端口**任一不同**，就算跨域。跨域时，浏览器会按规则限制前端读响应。

### 两类请求直觉

1. **简单请求**：如部分 GET/POST + 简单头；带 \`Origin\`，服务器用 \`Access-Control-Allow-Origin\` 等放行  
2. **预检（OPTIONS）**：复杂方法/自定义头等，先问服务器允不允许，再发真请求  

### 常见解决思路

- 服务端正确配置 CORS 响应头  
- 开发时用**同源代理**转发（本质常是反代）  
- JSONP（老方案，基本仅 GET）  
- \`postMessage\`（窗口间）等  

配置示例字段：

\`\`\`
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 3600
\`\`\`

（生产环境 \`*\` 与凭证组合有限制，入门先理解「服务器明确允许哪些来源」。）

---

## 八股 × 业务串联

| 常考词 | 一句话 | 业务里长什么样 |
|--------|--------|----------------|
| **幂等** | 同一请求做多次，效果一样 | GET/PUT/DELETE 常设计成幂等；支付回调必须防重 |
| **安全方法** | 不改变资源状态 | GET/HEAD/OPTIONS；爬虫、缓存更敢重试 |
| **Keep-Alive / 长连接** | 复用 TCP，少握手 | 高 QPS 接口、连接池；反代 \`proxy_http_version 1.1\` |
| **HTTP/1.1 · 2 · 3** | 队头阻塞改善 → 多路复用 → QUIC/UDP | HTTP/2 多路；HTTP/3 弱网更稳（名常考） |
| **短轮询 / 长轮询 / WS** | 问、挂起问、双向推 | 消息未读、IM、行情推送选型 |
| **401 vs 403** | 未认证 vs 已认证无权限 | 登录态失效 vs 角色不够 |
| **502 / 504** | 网关上游错 / 上游超时 | 反代后后端挂了或太慢 |
| **JWT vs Session** | 令牌自包含 vs 服务端存会话 | 无状态扩缩容 vs 可主动踢下线 |
| **CSRF / XSS** | 跨站伪请求 / 脚本偷数据 | Cookie \`SameSite\`、\`HttpOnly\`；勿信前端输入 |

业务一条链：浏览器跨域调 API → CORS 或同源反代 → Cookie/JWT 鉴权 → 缓存头影响「改了配置怎么还不生效」。

## 下一步

**反向代理与 CDN**（入口工程化）；第四章 **HTTP 与 www**。
`;

