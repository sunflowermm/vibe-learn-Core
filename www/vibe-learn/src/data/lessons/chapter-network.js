/** 第三章网络章说明 */
export default `# 第三章 · 计算机网络

> 单机具备算与存之后，多机经网络协作。  
> 主线：为何联网 → 协议栈 → IP/TCP → 路由/NAT/防火墙 → DNS/HTTPS → HTTP → 反向代理 / CDN → **边缘与出口实务**。

## 与前面章节的咬合

| 已学 | 本框落点 |
|------|----------|
| 进程 / 套接字（序章） | 端口区分同一主机上的进程 |
| 网卡作为 I/O（序章） | 帧与包进出主机 |
| 终端能启动服务（第一章） | 本机监听后可被访问 |
| API / 前后端（本框） | 多数 Web API 跑在 HTTP 上 |

\`\`\`mermaid
flowchart LR
  API[API 与前后端] --> HTTP[HTTP]
  NET[网络是什么] --> STACK[协议栈]
  STACK --> IP[IP / DHCP]
  STACK --> TCP[TCP/UDP]
  IP --> ROUTE[路由 / NAT / 防火墙]
  IP --> DNS[DNS / HTTPS]
  TCP --> HTTP
  HTTP --> PROXY[反向代理 / CDN]
  PROXY --> EDGE[边缘实务]
  ROUTE --> EDGE
  DNS --> EDGE
\`\`\`

## 建议阅读顺序

1. **网络是什么** — LAN/WAN、设备角色、拓扑  
2. **协议栈** — OSI / TCP/IP、封装、ICMP  
3. **IP（含 DHCP）→ TCP/UDP → 路由/NAT/防火墙**（含 IP 池直觉）  
4. **DNS/HTTPS → HTTP**  
5. **API 与前后端** 可与 HTTP 对照  
6. **反向代理与 CDN**  
7. **边缘与出口实务** — IP 池产品化、Cloudflare、地域、路径过滤症状、正向代理  
8. **番外 Clash** — 本机代理引擎选路  

## 记忆钩

> IP 找主机，DHCP 领地址，端口找进程，DNS 找名字，HTTPS 加密，HTTP 说话，反代管门口，CDN 把副本放到近处；上线再认清 **入口 IP / 源站 / 出口池**，以及客户端代理改的是哪一侧路径。
`;
