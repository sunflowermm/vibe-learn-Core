/** CPU GPU 等处理单元 */
export default `# 处理单元：CPU / GPU / 其它「U」

> 名字里的 **U** 多半是 Unit（单元）。  
> 不同单元擅长不同形状的计算——不是「谁替代谁」，而是 **分工**。

## 本课分块

| 块 | 内容 |
|----|------|
| **分工表** | CPU / GPU / NPU… 各擅长什么 |
| **数据流直觉** | 程序指令如何落到单元上 |
| **和 OS 的关系** | 调度与驱动 |
| **选型误区** | 后端入门真正吃什么 |

---

## 1. 对照表

| 单元 | 擅长 | 直觉 |
|------|------|------|
| **CPU** | 通用、分支多、延迟敏感的逻辑 | 全能工头，事事管一点 |
| **GPU** | 海量相似运算并行（图形、部分 AI） | 千手工人，同一动作做很多遍 |
| **NPU / TPU 等** | 特定 AI 张量运算（视芯片而定） | 专用流水线 |
| **内存控制器等** | 搬数据，不是「算题」 | 后勤 |

\`\`\`mermaid
flowchart LR
  P[程序 / 进程] --> OS[操作系统调度]
  OS --> CPU[CPU 核心]
  P -. 显式 API .-> DRV[GPU / NPU 驱动]
  DRV --> GPU[加速器]
  CPU <--> RAM[内存]
  GPU <--> VRAM[显存等]
\`\`\`

日常开发 XRK-AGT：主要吃 **CPU + 内存 + 磁盘 + 网卡**。  
训练大模型、跑本地扩散模型时，才会强烈感到 **GPU** 是否在场。

---

## 2. 一张图建立直觉

\`\`\`html5
<figure>
  <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CPU 与 GPU 分工">
    <rect x="30" y="40" width="140" height="120" rx="12" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.7"/>
    <text x="100" y="75" text-anchor="middle" fill="currentColor" font-size="14">CPU</text>
    <text x="100" y="100" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.7">少量强大核心</text>
    <text x="100" y="122" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.7">分支 · 系统 · API</text>
    <rect x="210" y="40" width="280" height="120" rx="12" fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.7"/>
    <text x="350" y="75" text-anchor="middle" fill="currentColor" font-size="14">GPU</text>
    <text x="350" y="105" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.7">海量简易核心 · 同质并行</text>
    <text x="350" y="128" text-anchor="middle" fill="currentColor" font-size="11" opacity="0.7">图形 · 矩阵 · 部分推理</text>
    <path d="M170 100 H210" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
  </svg>
  <figcaption>CPU 管「怎么决策」；GPU 管「同样的算式做一万遍」</figcaption>
</figure>
\`\`\`

---

## 3. 和 OS 的关系

- OS 把进程调度到 **CPU** 核心上（时间片、优先级、亲和性……）  
- **GPU** 常通过驱动与专用 API（CUDA、Vulkan、WebGPU…）暴露  
- 对入门：先保证 CPU 路径上的 Node 进程能跑；GPU 是能力扩展，不是启动门槛

## 4. 选型误区

| 误区 | 更准确的说法 |
|------|----------------|
| 「有 GPU 就不需要好 CPU」 | 网页、API、数据库、OS 本身仍大量吃 CPU |
| 「服务器一定要显卡」 | 多数后端 API 机器可以没有独显 |
| 「芯片越新越能跑项目」 | 缺运行时、缺依赖、缺权限时，换芯片也救不了 |

## 下一步

- 出序章 → **计算机语言**（源码如何变成 CPU 上的动作）  
- 或进 → **计算机网络**（多机如何对话）
`;
