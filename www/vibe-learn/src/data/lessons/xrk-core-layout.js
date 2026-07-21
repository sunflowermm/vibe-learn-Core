/** Core 放码 */
export default `# Core 放码位置

> 规则极短：**业务进 \`core/<名>/\`，基础设施留在 \`src/\`。**  
> 违反时，热加载、配置归属、多产品并存都会开始「打架」。

## 知识串

| 词 | 含义 |
|----|------|
| **Core** | 一个业务能力包（目录），不是「CPU 核心」那个 core |
| **plugin** | 挂到 Runtime 上的插件模块 |
| **www** | 静态前端；必须放在 \`www/<应用名>/\` 子目录 |
| **commonconfig** | 配置的 schema / 表单约定 |
| **system-Core** | 框架示例外设；与独立产品 Core 分工不同 |

你正在阅读的学习站，通常就来自某个 Core 的 **www**。

## 目录约定（记骨架即可）

| 子目录 | 放什么 |
|--------|--------|
| \`plugin/\` | 指令与插件 |
| \`http/\` | HTTP API |
| \`workflow/\` | AI 工作流 |
| \`tasker/\` | 协议适配 |
| \`events/\` | 事件监听 |
| \`commonconfig/\` | 配置 Schema |
| \`www/<应用>/\` | 静态前端（必须子目录） |

## 导入习惯

- 无 \`package.json\` 的 Core：可用根包 \`#infrastructure/*\` 等别名  
- 有自己 \`package.json\` 的 Core：用相对路径指回根 \`src/\`  

## 下一步

能力要通过 **HTTP** 或 **www** 暴露给外部时，看 **HTTP / www**；改配置看 **配置归属**。
`;
