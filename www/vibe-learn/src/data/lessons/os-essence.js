/** 系统的本质 */
export default `# 系统的本质

> 操作系统不是「桌面壁纸供应商」，而是 **资源与抽象的立法者**：  
> 谁能用 CPU、谁能碰磁盘、谁能开网卡——都经它批准。

## 本课分块

| 块 | 你要带走的 |
|----|------------|
| **为何需要 OS** | 没有它，每个程序都要自己抢硬件 |
| **四大抽象** | 进程、虚拟内存、文件、套接字 |
| **内核 / 用户态** | 特权边界与系统调用 |
| **和后文的关系** | 终端、权限、端口占用都踩在这层上 |

---

## 1. 为何需要操作系统

没有 OS 的世界（早期裸机 / 单片机手写固件）里，每个程序都要：

- 自己驱动键盘、屏幕、磁盘  
- 自己决定「别的程序能不能占着 CPU」  
- 自己防止互相踩内存  

多程序一并存，就会变成一团互相踩脚的混乱。  
OS 的第一职责：**把硬件收成规则，再把规则借给所有应用。**

\`\`\`mermaid
flowchart TB
  subgraph apps["用户态 · 应用"]
    A[浏览器]
    B[终端 / Shell]
    C[Node 进程]
  end
  subgraph kernel["内核 · 特权世界"]
    S[调度器]
    M[内存管理]
    F[文件系统]
    N[网络栈]
  end
  subgraph hw["硬件"]
    CPU[CPU]
    RAM[内存]
    DISK[磁盘]
    NIC[网卡]
  end
  A --> S
  B --> S
  C --> S
  S --> CPU
  M --> RAM
  F --> DISK
  N --> NIC
\`\`\`

---

## 2. 四大抽象（对照表）

程序 **看不见** 原始硬件细节，只看见 OS 提供的接口：

| 抽象 | 程序以为自己拥有 | 实际由谁协调 |
|------|------------------|--------------|
| **进程 / 线程** | 一条（或多条）执行流 | 调度器轮流占用 CPU 时间片 |
| **虚拟内存** | 连续、独占的地址空间 | 页表映射到物理 RAM / 交换区 |
| **文件** | 字节流 + 路径树 | 文件系统 + 块设备驱动 |
| **套接字** | 通向「网络另一端」的把手 | 协议栈 + 网卡驱动 |

<details>
<summary>展开：一次「打开文件」大概发生什么</summary>

1. 应用调用 \`open\` / \`fopen\`（高级库最终落到系统调用）  
2. 陷入内核，核对权限与路径  
3. 内核找到 inode / 句柄，返回 **文件描述符**  
4. 之后的 \`read\` / \`write\` 都带着这个描述符找内核代劳  

你在资源管理器里双击、在终端里 \`cat\`，底层都在走同一类通道。
</details>

---

## 3. 内核与用户态

\`\`\`html5
<figure>
  <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="用户态与内核态示意">
    <rect x="16" y="16" width="488" height="88" rx="12" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="2"/>
    <text x="36" y="48" fill="currentColor" font-size="14" font-family="ui-sans-serif,system-ui">用户态 · 普通应用（浏览器 / Node / 编辑器）</text>
    <text x="36" y="78" fill="currentColor" font-size="12" opacity="0.7" font-family="ui-sans-serif,system-ui">不能直接碰硬件 · 只能通过系统调用「请内核帮忙」</text>
    <path d="M260 104 v28" stroke="currentColor" stroke-width="2" stroke-opacity="0.5" marker-end="url(#arrow)"/>
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" fill-opacity="0.55"/>
      </marker>
    </defs>
    <text x="272" y="124" fill="currentColor" font-size="11" opacity="0.65">系统调用</text>
    <rect x="16" y="136" width="488" height="68" rx="12" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="2"/>
    <text x="36" y="168" fill="currentColor" font-size="14" font-family="ui-sans-serif,system-ui">内核态 · 调度 / 内存 / 驱动 / 安全策略</text>
    <text x="36" y="192" fill="currentColor" font-size="12" opacity="0.7" font-family="ui-sans-serif,system-ui">唯一真正碰 CPU、磁盘、网卡的特权世界</text>
  </svg>
  <figcaption>用户态提出请求 → 内核代劳 → 再把结果交回应用</figcaption>
</figure>
\`\`\`

- **内核**：能直接操作硬件与关键表的特权世界  
- **用户态**：普通应用所在；要做事就走 **系统调用**  

终端里敲的每一条命令，多半是：

\`\`\`mermaid
sequenceDiagram
  participant U as 你
  participant Sh as Shell
  participant OS as 内核
  participant HW as 硬件
  U->>Sh: 输入命令
  Sh->>OS: fork / exec 等系统调用
  OS->>HW: 调度 CPU / 读写设备
  HW-->>OS: 完成
  OS-->>Sh: 进程退出码 / 输出
  Sh-->>U: 显示结果
\`\`\`

---

## 4. 为何先学这个

后面这些场景，全是 OS 抽象上的症状：

| 你看到的报错 / 现象 | 更底层在说什么 |
|--------------------|----------------|
| Permission denied | 权限位 / 用户身份不允许 |
| Address already in use | 端口被另一进程占用 |
| No space left | 文件系统或配额满了 |
| Kill / OOM | 调度与内存压力 |

认不清本质，就只会背命令；认清了，才能从「权限 / 资源 / 抽象边界」倒推。

## 下一步

- 同章：**软硬件联动**、**处理单元**  
- 出章：**不同终端环境**（人如何对 OS 发令）
`;
