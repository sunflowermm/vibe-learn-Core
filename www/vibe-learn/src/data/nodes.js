/**
 * 图谱数据模型（可扩展底层）
 *
 * kind:
 *   chapter  — 章容器（大框）
 *   topic    — 章内知识点
 *   stub     — 框外延伸（第二章预留 / 番外支线）
 *
 * parentId   — 挂在哪个章框内（相对坐标）
 * branch     — 边的语义：main | next-chapter | side
 */
import computerSystem from './lessons/computer-system.js';
import apiFrontend from './lessons/api-frontend.js';
import networkBasics from './lessons/network-basics.js';
import protocolStack from './lessons/protocol-stack.js';
import ipAddressing from './lessons/ip-addressing.js';
import tcpUdp from './lessons/tcp-udp.js';
import routingNat from './lessons/routing-nat.js';
import httpWeb from './lessons/http-web.js';
import dnsHttps from './lessons/dns-https.js';
import reverseProxy from './lessons/reverse-proxy.js';
import chapterNetwork from './lessons/chapter-network.js';
import stubXrk from './lessons/stub-xrk-agt.js';
import clashLesson from './lessons/clash.js';
import clashPortLesson from './lessons/clash-port.js';
import clashSetupLesson from './lessons/clash-setup.js';
import { LAYOUT } from './layout.js';
import { toneOf } from './tones.js';

const CH_NET = 'chapter-computer-network';

/** 章与预留延伸（框 / stub） */
export const graphFrames = [
  {
    id: CH_NET,
    kind: 'chapter',
    label: '第一章 · 计算机网络',
    subtitle: '从主机到网关：协议、地址与 Web 通路',
    tag: 'Chapter 01',
    role: '本图当前主干。框内是网络本质；框外可接「下一章」或「番外」而不打乱主线。',
    position: { x: LAYOUT.frame.x, y: LAYOUT.frame.y },
    size: { width: LAYOUT.frame.width, height: LAYOUT.frame.height },
    markdown: chapterNetwork,
  },
];

/** 章内主题：position 相对父章左上角（错落布局见 layout.js） */
export const knowledgeNodes = [
  {
    id: 'computer-system',
    kind: 'topic',
    parentId: CH_NET,
    label: '计算机系统',
    subtitle: '硬件、软件与操作系统',
    tag: '01 底座',
    role: '先搞清程序跑在什么上面：没有主机与操作系统，后面的网络协议无处安放。',
    prereqs: [],
    next: ['network-basics', 'api-frontend'],
    position: LAYOUT.topics['computer-system'],
    markdown: computerSystem,
  },
  {
    id: 'network-basics',
    kind: 'topic',
    parentId: CH_NET,
    label: '网络是什么',
    subtitle: '为何要联网 · LAN / WAN · 拓扑',
    tag: '02 网络',
    role: '回答「多台计算机为什么、以什么形态连在一起」——协议栈之前的世界观。',
    prereqs: ['computer-system'],
    next: ['protocol-stack'],
    position: LAYOUT.topics['network-basics'],
    markdown: networkBasics,
    sideOut: ['clash'],
  },
  {
    id: 'api-frontend',
    kind: 'topic',
    parentId: CH_NET,
    label: 'API 与前后端',
    subtitle: '软件如何协作 · 客户端与服务器',
    tag: '02 应用',
    role: '从「写软件」视角看请求/响应；具体走路靠下层协议，Web 场景会汇入 HTTP。',
    prereqs: ['computer-system'],
    next: ['http-web'],
    position: LAYOUT.topics['api-frontend'],
    markdown: apiFrontend,
    chapterOut: ['stub-xrk-agt'],
  },
  {
    id: 'protocol-stack',
    kind: 'topic',
    parentId: CH_NET,
    label: '协议栈',
    subtitle: 'OSI · TCP/IP · 封装拆包',
    tag: '03 分层',
    role: '总地图：每一层解决一类问题。之后分支学「地址」和「怎么传」。',
    prereqs: ['network-basics'],
    next: ['ip-addressing', 'tcp-udp'],
    position: LAYOUT.topics['protocol-stack'],
    markdown: protocolStack,
    lab: 'osi',
  },
  {
    id: 'ip-addressing',
    kind: 'topic',
    parentId: CH_NET,
    label: 'IP 与子网',
    subtitle: '门牌、掩码、MAC、ARP',
    tag: '04 地址',
    role: '网络层怎么找主机：IP / 子网划分；同网段里 ARP 把门牌换成网卡 MAC。',
    prereqs: ['protocol-stack'],
    next: ['routing-nat', 'dns-https'],
    position: LAYOUT.topics['ip-addressing'],
    markdown: ipAddressing,
  },
  {
    id: 'tcp-udp',
    kind: 'topic',
    parentId: CH_NET,
    label: 'TCP 与 UDP',
    subtitle: '端口 · 可靠 vs 尽力而为',
    tag: '04 传输',
    role: '传输层：找到「哪个程序」，并选择可靠（TCP）还是求快（UDP）。',
    prereqs: ['protocol-stack'],
    next: ['http-web'],
    position: LAYOUT.topics['tcp-udp'],
    markdown: tcpUdp,
    sideOut: ['clash-port'],
  },
  {
    id: 'routing-nat',
    kind: 'topic',
    parentId: CH_NET,
    label: '路由与 NAT',
    subtitle: '跨网怎么走 · 内网如何出公网',
    tag: '05 转发',
    role: '有了地址之后：路由器按 IP 选路；NAT 让私有地址共享公网出口。',
    prereqs: ['ip-addressing'],
    next: ['reverse-proxy'],
    position: LAYOUT.topics['routing-nat'],
    markdown: routingNat,
    sideOut: ['clash'],
  },
  {
    id: 'dns-https',
    kind: 'topic',
    parentId: CH_NET,
    label: 'DNS 与 HTTPS',
    subtitle: '名字变 IP · 传输加密',
    tag: '05 命名安全',
    role: '人记域名、机器认 IP（DNS）；HTTPS 在 HTTP 外加 TLS，防窃听与假冒。',
    prereqs: ['ip-addressing'],
    next: ['http-web', 'reverse-proxy'],
    position: LAYOUT.topics['dns-https'],
    markdown: dnsHttps,
    sideOut: ['clash'],
  },
  {
    id: 'http-web',
    kind: 'topic',
    parentId: CH_NET,
    label: 'HTTP 与 Web',
    subtitle: '方法、状态码、缓存、会话、跨域',
    tag: '06 Web',
    role: '浏览器与网站对话的应用层协议；通常跑在 TCP（及 HTTPS 的 TLS）之上。',
    prereqs: ['tcp-udp', 'api-frontend'],
    next: ['reverse-proxy'],
    position: LAYOUT.topics['http-web'],
    markdown: httpWeb,
  },
  {
    id: 'reverse-proxy',
    kind: 'topic',
    parentId: CH_NET,
    label: '反向代理与限流',
    subtitle: '对外一张脸 · 保护与分流后端',
    tag: '07 网关',
    role: '把前面的 HTTP/DNS/路由知识收束到工程入口：门面、负载均衡、TLS 终止、限流。',
    prereqs: ['http-web', 'routing-nat'],
    next: [],
    position: LAYOUT.topics['reverse-proxy'],
    markdown: reverseProxy,
    sideOut: ['clash'],
  },
];

/** 框外延伸：第二章 stub + Clash 番外支线 */
export const extensionStubs = [
  {
    id: 'stub-xrk-agt',
    kind: 'stub',
    branch: 'next-chapter',
    label: '第二章 · XRK-AGT',
    subtitle: '从前后端长出的工程实践',
    tag: 'Next Chapter',
    role: '预留：运行时、Core、HTTP、配置与前后端联调——挂在「API 与前后端」上，不冲散网络主线。',
    prereqs: ['api-frontend'],
    next: [],
    position: LAYOUT.stubs['stub-xrk-agt'],
    markdown: stubXrk,
  },
  {
    id: 'clash',
    kind: 'stub',
    branch: 'side',
    label: '番外 · 代理引擎本质',
    subtitle: '本机正向代理 + 规则选路（对接第一章）',
    tag: 'Side Quest',
    role: '代理引擎 = 本机端口入口 + 规则表（像路由）+ 节点出口。用端口/路由/DNS/正反向代理对照 Clash；不只有 Clash 能当这台引擎。',
    prereqs: ['network-basics', 'tcp-udp', 'routing-nat', 'dns-https', 'reverse-proxy'],
    next: ['clash-port'],
    position: LAYOUT.stubs.clash,
    markdown: clashLesson,
  },
  {
    id: 'clash-port',
    kind: 'stub',
    branch: 'side',
    label: '端口与 Coding Agent',
    subtitle: '程序配置填的就是这类服务端口',
    tag: 'Side Quest',
    role: '系统代理只通知听话的软件；Agent/终端要手写 127.0.0.1:端口。TUN 是进阶，入门先会填端口。',
    prereqs: ['clash', 'tcp-udp'],
    next: ['clash-setup'],
    position: LAYOUT.stubs['clash-port'],
    markdown: clashPortLesson,
  },
  {
    id: 'clash-setup',
    kind: 'stub',
    branch: 'side',
    label: 'Verge / Android 配置',
    subtitle: '最简：订阅 → 全局选节点 → 系统代理',
    tag: 'Side Quest',
    role: 'Verge 侧边栏：订阅填链接并选中 → 代理里全局并点选节点 → 首页开系统代理。TUN/规则稍后学。',
    prereqs: ['clash-port', 'reverse-proxy'],
    next: [],
    position: LAYOUT.stubs['clash-setup'],
    markdown: clashSetupLesson,
  },
];

/**
 * 边：主线尽量左右邻接；番外只保留短距入口，概念对照走面板「建议先学」
 * （避免路由/DNS/反代同时竖直插向 clash 造成梳子线）
 */
export const knowledgeEdges = [
  { id: 'e-sys-api', source: 'computer-system', target: 'api-frontend', sourceHandle: 'top', targetHandle: 'left', label: '软件如何协作', branch: 'main', animated: true },
  { id: 'e-sys-net', source: 'computer-system', target: 'network-basics', sourceHandle: 'bottom', targetHandle: 'left', label: '主机要互联', branch: 'main', animated: true },
  { id: 'e-api-http', source: 'api-frontend', target: 'http-web', sourceHandle: 'right', targetHandle: 'top', label: 'Web API 用 HTTP', branch: 'main' },
  { id: 'e-net-stack', source: 'network-basics', target: 'protocol-stack', sourceHandle: 'right', targetHandle: 'left', label: '连通后怎么传', branch: 'main' },
  { id: 'e-stack-ip', source: 'protocol-stack', target: 'ip-addressing', sourceHandle: 'top', targetHandle: 'left', label: '网络层：找主机', branch: 'main' },
  { id: 'e-stack-tcp', source: 'protocol-stack', target: 'tcp-udp', sourceHandle: 'bottom', targetHandle: 'left', label: '传输层：找进程', branch: 'main' },
  { id: 'e-ip-route', source: 'ip-addressing', target: 'routing-nat', sourceHandle: 'right', targetHandle: 'left', label: '跨网转发', branch: 'main' },
  { id: 'e-ip-dns', source: 'ip-addressing', target: 'dns-https', sourceHandle: 'bottom', targetHandle: 'top', label: '域名映射到 IP', branch: 'main' },
  { id: 'e-tcp-http', source: 'tcp-udp', target: 'http-web', sourceHandle: 'right', targetHandle: 'bottom', label: 'HTTP 常跑在 TCP', branch: 'main' },
  { id: 'e-dns-http', source: 'dns-https', target: 'http-web', sourceHandle: 'right', targetHandle: 'bottom', label: '先解析再访问', branch: 'main' },
  { id: 'e-route-proxy', source: 'routing-nat', target: 'reverse-proxy', sourceHandle: 'right', targetHandle: 'top', label: '流量到门面', branch: 'main' },
  { id: 'e-http-proxy', source: 'http-web', target: 'reverse-proxy', sourceHandle: 'right', targetHandle: 'left', label: '入口工程化', branch: 'main' },
  { id: 'e-dns-proxy', source: 'dns-https', target: 'reverse-proxy', sourceHandle: 'right', targetHandle: 'bottom', label: 'HTTPS 常在入口终止', branch: 'main' },
  {
    id: 'e-api-xrk',
    source: 'api-frontend',
    target: 'stub-xrk-agt',
    sourceHandle: 'top',
    targetHandle: 'bottom',
    label: '伸出第二章',
    branch: 'next-chapter',
    animated: true,
  },
  {
    id: 'e-net-clash',
    source: 'network-basics',
    target: 'clash',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    label: '番外：代理引擎',
    branch: 'side',
  },
  {
    id: 'e-tcp-clash-port',
    source: 'tcp-udp',
    target: 'clash-port',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    label: '引擎入口=本机端口',
    branch: 'side',
  },
  {
    id: 'e-clash-port',
    source: 'clash',
    target: 'clash-port',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: '入口连上引擎',
    branch: 'side',
    animated: true,
  },
  {
    id: 'e-clash-setup',
    source: 'clash-port',
    target: 'clash-setup',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: '订阅喂饱引擎',
    branch: 'side',
    animated: true,
  },
];

/** 面板 / 查询用的扁平目录 */
export const allEntries = [...graphFrames, ...knowledgeNodes, ...extensionStubs];

export function getNodeById(id) {
  return allEntries.find((n) => n.id === id) ?? null;
}

export function resolveNodes(ids = []) {
  return ids.map((id) => getNodeById(id)).filter(Boolean);
}

export function countTopics() {
  return knowledgeNodes.length;
}

function frameById(id) {
  return graphFrames.find((f) => f.id === id);
}

/** 主题绝对坐标 = 章框原点 + 相对坐标（不用 Vue Flow parentNode，避免 expandParent 卷走番外） */
export function topicAbsPosition(topic) {
  const frame = frameById(topic.parentId);
  if (!frame) return { ...topic.position };
  return {
    x: frame.position.x + topic.position.x,
    y: frame.position.y + topic.position.y,
  };
}

/**
 * 编译为 Vue Flow 元素
 * - 章框只是背景装饰，不设 parentNode
 * - 番外 / 第二章是独立节点，绝不挂进章框
 */
export function buildFlowNodes() {
  const frames = graphFrames.map((f) => ({
    id: f.id,
    type: 'chapter',
    position: { ...f.position },
    data: {
      label: f.label,
      subtitle: f.subtitle,
      tag: f.tag,
      kind: 'chapter',
    },
    width: f.size.width,
    height: f.size.height,
    style: {
      width: `${f.size.width}px`,
      height: `${f.size.height}px`,
    },
    selectable: true,
    draggable: true,
    dragHandle: '.chapter__drag',
    zIndex: 0,
  }));

  const topics = knowledgeNodes.map((n) => {
    const tone = toneOf(n.id);
    return {
      id: n.id,
      type: 'knowledge',
      position: topicAbsPosition(n),
      data: {
        label: n.label,
        subtitle: n.subtitle,
        tag: n.tag,
        kind: 'topic',
        chapterId: n.parentId,
        tone,
      },
      selectable: true,
      draggable: true,
      zIndex: 10,
    };
  });

  const stubs = extensionStubs.map((n) => {
    const tone = toneOf(n.id);
    return {
      id: n.id,
      type: 'stub',
      position: { ...n.position },
      data: {
        label: n.label,
        subtitle: n.subtitle,
        tag: n.tag,
        kind: 'stub',
        branch: n.branch,
        tone,
      },
      selectable: true,
      draggable: true,
      zIndex: 10,
    };
  });

  return [...frames, ...topics, ...stubs];
}

export function buildFlowEdges() {
  return knowledgeEdges.map((e) => {
    const tone = toneOf(e.target);
    return {
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle,
      label: e.label,
      type: 'relation',
      animated: Boolean(e.animated),
      data: {
        branch: e.branch || 'main',
        color: tone.edge,
        toneId: tone.id,
      },
      interactive: false,
      focusable: false,
      zIndex: 2,
    };
  });
}

/** 复位布局用的原始绝对坐标 */
export function getOriginPositions() {
  const map = new Map();
  for (const f of graphFrames) map.set(f.id, { ...f.position });
  for (const n of knowledgeNodes) map.set(n.id, topicAbsPosition(n));
  for (const n of extensionStubs) map.set(n.id, { ...n.position });
  return map;
}
