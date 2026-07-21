/** OSI 七层实验室（自顶向下）——每层用零基础能懂的说法 */
export const osiLayers = [
  {
    id: 7,
    name: '应用层',
    en: 'Application',
    protocols: ['HTTP', 'DNS', 'SMTP', 'HTTPS'],
    color: '#5eead4',
    analogy:
      '最靠近你的一层：浏览器要网页（HTTP/HTTPS）、查域名（DNS）、发邮件等。你感知到的「上网」，多半从这里开始。',
    wrap: 'HTTP 请求',
    packetHint: 'GET /index.html HTTP/1.1',
  },
  {
    id: 6,
    name: '表示层',
    en: 'Presentation',
    protocols: ['编码', '压缩', '加密语义'],
    color: '#67e8f9',
    analogy:
      '让双方「看得懂同一种写法」：字符怎么编码、要不要压缩、加密如何理解。现在常由程序库悄悄做掉，OSI 仍单独画出来方便对照。',
    wrap: '编码 / 压缩',
    packetHint: 'UTF-8 · JSON · gzip',
  },
  {
    id: 5,
    name: '会话层',
    en: 'Session',
    protocols: ['会话', '连接上下文'],
    color: '#7dd3fc',
    analogy:
      '管一次「对话」的开始、保持与结束（像点餐先开单）。现实里常并进应用协议或登录状态，教学上仍单独一层。',
    wrap: '会话上下文',
    packetHint: 'session · keep-alive',
  },
  {
    id: 4,
    name: '传输层',
    en: 'Transport',
    protocols: ['TCP', 'UDP', 'QUIC'],
    color: '#fbbf24',
    analogy:
      '把数据交给「正确的程序」：用端口区分浏览器/音乐等。TCP 像挂号信（可靠、可重传）；UDP 像明信片（快、可不保证）。',
    wrap: 'TCP 段 + 端口',
    packetHint: 'TCP :443 → segment',
  },
  {
    id: 3,
    name: '网络层',
    en: 'Network',
    protocols: ['IP', 'ICMP', '路由'],
    color: '#fb923c',
    analogy:
      '写上 IP「门牌」，让路由器决定下一跳往哪走。路由器一般不拆开看你网页写了啥，只负责把包朝目的地送。',
    wrap: 'IP 头',
    packetHint: 'src/dst IP · TTL',
  },
  {
    id: 2,
    name: '数据链路层',
    en: 'Data Link',
    protocols: ['Ethernet', 'Wi-Fi', 'MAC'],
    color: '#f472b6',
    analogy:
      '同一网段内的投递：用 MAC 认出下一台设备的网卡。交换机主要在这一层工作；出网段时路由器会换新的一跳帧信封。',
    wrap: '以太网帧 + MAC',
    packetHint: 'Eth frame · FCS',
  },
  {
    id: 1,
    name: '物理层',
    en: 'Physical',
    protocols: ['光纤', '双绞线', '射频'],
    color: '#a78bfa',
    analogy:
      '真正变成世界里的信号：网线里的电压、光纤里的光、Wi‑Fi 的无线电波。这里传的是 0/1，不再是「协议字段」。',
    wrap: '比特流',
    packetHint: '0/1 on the wire',
  },
];

export const topologyPath = [
  { id: 'host-a', label: '主机 A', role: '你的电脑', kind: 'host', x: 10, y: 48 },
  { id: 'switch', label: '交换机', role: '同网段 · 看 MAC', kind: 'switch', x: 34, y: 48 },
  { id: 'router', label: '路由器', role: '跨网 · 看 IP', kind: 'router', x: 58, y: 48 },
  { id: 'host-b', label: '主机 B', role: '网站服务器', kind: 'host', x: 86, y: 48 },
];

export const phaseCopy = {
  idle: '点左侧每一层看解释，或点「发送报文」看打包与飞行',
  down: '封装下行：从上到下，每层再套一层信封',
  wire: '在链路上前进：交换机看 MAC，路由器看 IP',
  up: '解封装上行：对端从下到上剥开信封',
  done: '数据到达对方应用层 · 一次端到端完成',
};
