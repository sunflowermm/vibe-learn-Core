/** C# / .NET */
export default `# C# 与 .NET

> **C#** 跑在 **.NET（CLR）** 上：与 Java 同属「托管运行时」层次。  
> 在 Windows 企业、Office 自动化、系统 API 集成上优势明显。本仓子服 **\`netserver\`（:8004，.NET 8 + ASP.NET Core）**。

## 本课分块

| 块 | 目标 |
|----|------|
| **定位** | CLR 与 Windows 生态 |
| **执行模型** | IL + CLR / JIT |
| **工具链** | \`dotnet\` CLI |
| **本仓** | netserver |
| **八股 × 业务** | GC、async、值类型 |

---

## 1. 定位

| 特征 | 说明 |
|------|------|
| **现代 C#** | async/await、LINQ、可空引用类型等 |
| **跨平台 .NET** | 现今可在 Linux 跑；Windows 集成仍是强项 |
| **ASP.NET Core** | 高性能 Web / API 框架 |
| **短板** | 非 Windows 团队工具链熟悉度参差 |

适合：Office 自动化、Windows 企业场景、GUID/系统 API、已有 .NET 资产。

---

## 2. 执行模型

\`\`\`
.cs ──编译──► IL（中间语言）──► CLR JIT ──► 本地码
\`\`\`

与 Java 对照：CLR ≈ JVM；IL ≈ 字节码；GC 同样存在。

---

## 3. 工具链

| 项 | 说明 |
|----|------|
| **\`dotnet\` CLI** | new / build / run / publish |
| **\`*.csproj\`** | 项目与包引用 |
| **NuGet** | 包生态 |

---

## 4. 与本仓

| 项 | 落点 |
|----|------|
| Runtime | \`netserver\` |
| 端口 | 8004 |
| 典型 | Windows/.NET 企业能力、Office、系统 API |

## 八股 × 业务串联

| 常考词 | 一句话 | 业务里长什么样 |
|--------|--------|----------------|
| **值类型 / 引用类型** | struct vs class | 栈上拷贝 vs 堆上引用 |
| **\`async\` / \`await\`** | 异步状态机语法糖 | API 大量 I/O 等待 |
| **IDisposable** | 显式释放非托管资源 | \`using\` 关连接、文件 |
| **委托 / 事件** | 回调与发布订阅 | UI 与领域事件 |
| **依赖注入** | ASP.NET Core 一等公民 | 测试与模块化解耦 |

## 下一步

**Java**（JVM 对照）· **PHP**（轻量脚本对照）· 第四章 **语言栈**。
`;
