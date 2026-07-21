# 用户数据与框架 build

书签、笔记、浏览进度存在**浏览器本机**，不在 Vite 打包产物里。

| 存储 | 名称 | 说明 |
|------|------|------|
| IndexedDB | `vibe-learn-user` | 主库（bookmarks / notes / progress） |
| localStorage | `vibe-learn-user-backup` | 镜像备份，IDB 异常时可回落 |
| localStorage | `vibe-learn-theme` 等 | 主题、面板宽度等 UI 偏好 |

约定：

1. **框架 / Core 重新 build、换 JS hash、清静态缓存，都不会删除上述键。**
2. 应用代码**禁止**在启动或版本号变化时 `localStorage.clear()`、`indexedDB.deleteDatabase('vibe-learn-user')`。
3. schema 升级只递增 `DB_VERSION` 并做**保留数据**的 migration。
4. 换电脑或清站点数据会丢库；请用顶栏「书架 → 导出备份」保存 JSON。

实现：`src/utils/user-store.js`、`src/composables/useUserLibrary.js`。
