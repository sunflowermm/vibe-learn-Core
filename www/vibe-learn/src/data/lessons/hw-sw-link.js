/** 软硬件联动 */
export default `# 软硬件联动

> 一次点击，从手指到晶体管，中间隔着整座翻译塔。  
> 本课用「故事线 + 分层表 + 故障对照」把软硬件钉在同一条因果链上。

## 本课分块

| 块 | 内容 |
|----|------|
| **故事线** | 从点击到电信号 |
| **分层翻译** | 应用 → OS → 驱动 → 硬件 |
| **故障对照** | 你看到的现象卡在哪一层 |
| **出桥** | 连到处理单元 / 环境 / 语言 |

---

## 1. 一条故事线

\`\`\`mermaid
sequenceDiagram
  participant F as 手指 / 键盘
  participant UI as 图形界面
  participant App as 应用
  participant OS as 操作系统
  participant HW as 硬件
  F->>UI: 点击「打开」
  UI->>App: 输入事件
  App->>OS: 要内存 / 窗口 / 网络
  OS->>HW: 调度 CPU · 驱动设备
  HW-->>OS: 电平与中断
  OS-->>App: 系统调用返回
  App-->>UI: 画出窗口
\`\`\`

**软件**描述意图与步骤；**硬件**执行物理变化；**OS**是中间的包工头。

---

## 2. 分层翻译

| 层 | 在干什么 | 你平时接触的形态 |
|----|----------|------------------|
| 应用 | 业务逻辑与界面 | 浏览器、编辑器、\`node\` 进程 |
| 运行时 / 库 | 把高级 API 译成系统调用 | Node、libc、GUI 工具包 |
| 内核 | 调度、权限、驱动入口 | 「权限不够」「端口占用」 |
| 驱动 | 说某种硬件听得懂的话 | 网卡灯、显卡驱动崩溃 |
| 硬件 | 电平、磁盘扇区、射频 | 风扇、指示灯、发热 |

\`\`\`html5
<figure>
  <svg viewBox="0 0 480 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="软硬件分层">
    <rect x="40" y="16" width="400" height="32" rx="6" fill="none" stroke="currentColor" opacity="0.55"/>
    <text x="240" y="37" text-anchor="middle" fill="currentColor" font-size="12">应用 · 意图</text>
    <rect x="40" y="56" width="400" height="32" rx="6" fill="none" stroke="currentColor" opacity="0.55"/>
    <text x="240" y="77" text-anchor="middle" fill="currentColor" font-size="12">运行时 / 库</text>
    <rect x="40" y="96" width="400" height="32" rx="6" fill="none" stroke="currentColor" opacity="0.55"/>
    <text x="240" y="117" text-anchor="middle" fill="currentColor" font-size="12">操作系统内核</text>
    <rect x="40" y="136" width="400" height="32" rx="6" fill="none" stroke="currentColor" opacity="0.55"/>
    <text x="240" y="157" text-anchor="middle" fill="currentColor" font-size="12">驱动</text>
    <rect x="40" y="176" width="400" height="28" rx="6" fill="none" stroke="currentColor" opacity="0.7"/>
    <text x="240" y="195" text-anchor="middle" fill="currentColor" font-size="12">硬件 · 物理变化</text>
  </svg>
  <figcaption>每一层只翻译自己懂的语言，最终落到电与磁</figcaption>
</figure>
\`\`\`

---

## 3. 联动失败时你看到的现象

| 现象 | 常在哪一层卡住 |
|------|----------------|
| 风扇狂转、机器发烫 | CPU/GPU 忙，或散热跟不上 |
| 点击无响应 | 应用卡死，或主线程被堵 |
| 「磁盘已满」 | 存储硬件 + 文件系统配额 |
| 插上网线却上不了网 | 驱动 / 协议栈 / 链路 |
| 程序闪退 | 未捕获异常，或非法内存访问被 OS 杀掉 |

## 4. 和后面章节的桥

- **处理单元**：谁在「忙」——CPU 还是 GPU  
- **环境**：你通过 Shell 发起的，正是新的进程与系统调用  
- **语言**：编译/解释的结果，最终仍是让 CPU 执行指令  
`;
