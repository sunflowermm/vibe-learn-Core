/** 数据库 · Redis / SQLite / 可选 Core */
export default `# 数据库 · Redis / SQLite / 可选 Core

> Runtime **必需**：Redis（热数据）+ SQLite（\`node:sqlite\` 嵌入落盘）。  
> Mongo / Postgres / 向量（Qdrant 等）由可选业务 Core 引入，**soft-skip**，不进 DatabaseManager 的 fail-fast。

## 本课你要带走什么

1. 四种存储各自干什么、归属谁  
2. \`src/infrastructure/database\` 与 \`docs/database.md\` 的权威约定  
3. \`mongodb-Core\` / \`postgres-Core\` / \`vector-Core\` 与 Runtime 库的边界  
4. 实践：启动日志确认 Redis（与 SQLite）OK

---

## 1. 用途分工

| 存储 | 归属 | 典型用途 | 业务访问 |
|------|------|----------|----------|
| **Redis** | Runtime | 会话热缓存、插件计数、\`AGT:restart:\`、HTTP 控制面 | 裸名 \`redis\` / \`getRedis()\` |
| **SQLite** | Runtime | 本地持久、单机查询；**不替代** Redis | 裸名 \`sqlite\` / \`getSqlite()\` |
| **Mongo** | \`mongodb-Core\` | 文档型业务数据 | Core 自管连接 |
| **Postgres** | \`postgres-Core\` | 关系型业务数据 | Core 自管连接 |
| **Vector** | \`vector-Core\` | 向量检索 / RAG 后端之一 | Core 自管连接 |

\`\`\`mermaid
flowchart TB
  Start[启动] --> Ensure[ensure-redis]
  Ensure --> DM[DatabaseManager.initDatabases]
  DM --> R[redisInit fail-fast]
  DM --> S[sqliteInit fail-fast]
  R --> G1["setRuntimeGlobal redis"]
  S --> G2["setRuntimeGlobal sqlite"]
  Opt[mongodb / postgres / vector Core] -.->|registerPersistenceProvider| Health["/api/health.services.persistence"]
\`\`\`

跨引擎：**仅最终一致**，无跨库统一事务（见 \`docs/database.md\` · \`PERSISTENCE_POLICY\`）。

---

## 2. 本仓路径

| 项 | 路径 |
|----|------|
| 总文档 | \`docs/database.md\` |
| 入口 | \`src/infrastructure/database/index.js\` |
| Redis / SQLite 实现 | \`src/infrastructure/redis.js\` · \`sqlite.js\` |
| 模板 | \`config/default_config/redis.yaml\` · \`sqlite.yaml\` |
| 运行时配置 | \`data/server_bots/redis.yaml\` 等 |
| Schema | \`core/system-Core/commonconfig/\`（含 redis / sqlite 段） |
| 可选 Core | \`core/mongodb-Core/\` · \`postgres-Core/\` · \`vector-Core/\` |
| 健康检查 | \`GET /api/health\` → \`services.redis\` / \`services.sqlite\` |

禁止：再为 Runtime 引入 npm \`sqlite3\` / \`sequelize\` 等替代 \`node:sqlite\`。

---

## 3. 业务写法直觉

\`\`\`javascript
// Redis（启动完成后）
if (redis?.isOpen) await redis.set('my:key', 'value')

// SQLite（同步 API）
sqlite.prepare('SELECT 1 AS ok').get()
\`\`\`

配置变更（连接参数）通常要**重启**才重建连接。测试可用 \`XRK_SQLITE_MEMORY=1\`、\`XRK_FAST_START=1\`（见文档）。

可选 DB Core 探活可出现在 health 的 \`persistence\`；**单独挂掉一般不把整个 Runtime 打成 unhealthy**（与 Redis/SQLite 不同）——以 \`docs/database.md\` 为准。

---

## 4. 与可选 Core 的边界（勿发明 API）

| 问题 | 答案骨架 |
|------|----------|
| 不装 Redis 行吗？ | **不行**（Runtime 必需，见 database.md FAQ） |
| 关 SQLite 行吗？ | **不建议**；与 Redis 同级初始化 |
| Mongo 挂了主服会挂吗？ | 可选 Core soft-skip；探活进 \`persistence\`，一般不单独打成 unhealthy |
| 配置改了？ | 连接多在启动期建立 → **重启** |
| 跨 Redis+SQLite 事务？ | **无**统一 UoW；仅最终一致 |

Docker / 本机拉起 Redis：见 \`docs/docker.md\`、\`scripts/ensure-redis.mjs\` 行为说明（database.md）。

### 可选数据 Core 仓库

| Core | 作用 | 仓库 |
|------|------|------|
| mongodb-Core | Mongo 文档库 SPI | [sunflowermm/mongodb-Core](https://github.com/sunflowermm/mongodb-Core) |
| postgres-Core | PostgreSQL SPI | [sunflowermm/postgres-Core](https://github.com/sunflowermm/postgres-Core) |
| vector-Core | Qdrant 向量 / RAG | [sunflowermm/vector-Core](https://github.com/sunflowermm/vector-Core) |

名录总表 → **业务层全景** §4。

---

## 5. 实践清单

1. 用常规方式启动主服，在日志中确认 Redis 探测/连接成功（\`ensure-redis\` / redisInit 相关 OK）。  
2. 调 \`GET /api/health\`（本机 loopback 通常可免 Key，见 Auth 课），查看 \`services.redis\` 与 \`services.sqlite\`。  
3. 打开 \`docs/database.md\`「用途分工」表，对照本机是否启用了任一 \`*-Core\` 数据库。  
4. 口述：为什么「会话热数据」优先 Redis，而不是只写 SQLite。  
5. （可选）在测试环境设 \`XRK_SQLITE_MEMORY=1\` 理解内存库用途后改回。

---

## 6. 文档链接

- \`docs/database.md\`（本课真源）  
- \`docs/startup.md\` · \`docs/docker.md\`  
- \`docs/config-base.md\` · \`docs/app-dev.md\`  
- 插件内访问提示：\`docs/plugin-base.md\`

## 下一步

**Auth**（保护 API）· **Stream / RAG 相关**（向量 Core 与工作流增强）· **配置归属**（redis/sqlite yaml 三件套）。  
存储就绪后，再谈 MCP 与子服调用更踏实。
`;
