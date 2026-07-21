/**
 * 图谱数据模型
 *
 * 序章 认识计算机 → 第一章 环境与终端 → 第二章 计算机语言
 * → 第三章 计算机网络 → 第四章 XRK 实践 · 番外 Clash
 */
import computerSystem from './lessons/computer-system.js';
import osEssence from './lessons/os-essence.js';
import hwSwLink from './lessons/hw-sw-link.js';
import chipUnits from './lessons/chip-units.js';
import terminalWorlds from './lessons/terminal-worlds.js';
import linuxDistros from './lessons/linux-distros.js';
import linuxCli from './lessons/linux-cli.js';
import runtimeNodejs from './lessons/runtime-nodejs.js';
import installersPath from './lessons/installers-path.js';
import packageManagers from './lessons/package-managers.js';
import gitWorkspace from './lessons/git-workspace.js';
import gitForges from './lessons/git-forges.js';
import xrkFirstRun from './lessons/xrk-first-run.js';
import langCompiledRuntime from './lessons/lang-compiled-runtime.js';
import langLandscape from './lessons/lang-landscape.js';
import langToRuntime from './lessons/lang-to-runtime.js';
import apiFrontend from './lessons/api-frontend.js';
import networkBasics from './lessons/network-basics.js';
import protocolStack from './lessons/protocol-stack.js';
import ipAddressing from './lessons/ip-addressing.js';
import tcpUdp from './lessons/tcp-udp.js';
import routingNat from './lessons/routing-nat.js';
import httpWeb from './lessons/http-web.js';
import dnsHttps from './lessons/dns-https.js';
import reverseProxy from './lessons/reverse-proxy.js';
import xrkOverview from './lessons/xrk-overview.js';
import xrkRuntime from './lessons/xrk-runtime.js';
import xrkCoreLayout from './lessons/xrk-core-layout.js';
import xrkHttpWww from './lessons/xrk-http-www.js';
import xrkConfig from './lessons/xrk-config.js';
import clashLesson from './lessons/clash.js';
import clashPortLesson from './lessons/clash-port.js';
import clashSetupLesson from './lessons/clash-setup.js';
import chapterMachine from './lessons/chapter-machine.js';
import chapterEnv from './lessons/chapter-env.js';
import chapterLanguages from './lessons/chapter-languages.js';
import chapterNetwork from './lessons/chapter-network.js';
import chapterXrk from './lessons/chapter-xrk.js';
import chapterClash from './lessons/chapter-clash.js';
import { LAYOUT } from './layout.js';
import { toneOf } from './tones.js';
import {
  assignBundleOffsets,
  assignFanoutOffsets,
  inferHandles,
  pathKindFor,
} from '../utils/edge-routing.js';

const CH_MACHINE = 'chapter-machine';
const CH_ENV = 'chapter-env';
const CH_LANG = 'chapter-languages';
const CH_NET = 'chapter-computer-network';
const CH_XRK = 'chapter-xrk-agt';
const CH_CLASH = 'chapter-clash';

/** source 手柄 id → target 手柄 id（GraphCard 上 type=target） */
const TARGET_HANDLE = {
  left: 'left-t',
  right: 'right-t',
  top: 'top-t',
  bottom: 'bottom-t',
};

export const graphFrames = [
  {
    id: CH_MACHINE,
    kind: 'chapter',
    label: '序章 · 认识计算机',
    subtitle: '系统本质 · 软硬件联动 · 处理单元',
    tag: 'Chapter 00',
    role: '起源：机器与操作系统本身。',
    position: { x: LAYOUT.frameMachine.x, y: LAYOUT.frameMachine.y },
    size: { width: LAYOUT.frameMachine.width, height: LAYOUT.frameMachine.height },
    markdown: chapterMachine,
  },
  {
    id: CH_ENV,
    kind: 'chapter',
    label: '第一章 · 环境与终端',
    subtitle: '终端 · Linux · 工具链 · GitHub/Gitee · 首次跑通',
    tag: 'Chapter 01',
    role: '人如何发令、软件如何进驻、源码如何托管、项目如何第一次跑起来。',
    position: { x: LAYOUT.frameEnv.x, y: LAYOUT.frameEnv.y },
    size: { width: LAYOUT.frameEnv.width, height: LAYOUT.frameEnv.height },
    markdown: chapterEnv,
  },
  {
    id: CH_LANG,
    kind: 'chapter',
    label: '第二章 · 计算机语言',
    subtitle: '编译与运行时 · 版图 · 接到本仓',
    tag: 'Chapter 02',
    role: '源码如何变成进程里的动作，以及为何是 Node。',
    position: { x: LAYOUT.frameLang.x, y: LAYOUT.frameLang.y },
    size: { width: LAYOUT.frameLang.width, height: LAYOUT.frameLang.height },
    markdown: chapterLanguages,
  },
  {
    id: CH_NET,
    kind: 'chapter',
    label: '第三章 · 计算机网络',
    subtitle: '从主机到网关',
    tag: 'Chapter 03',
    role: '多机如何对话；番外用本框概念对照代理引擎。',
    position: { x: LAYOUT.frameNet.x, y: LAYOUT.frameNet.y },
    size: { width: LAYOUT.frameNet.width, height: LAYOUT.frameNet.height },
    markdown: chapterNetwork,
  },
  {
    id: CH_XRK,
    kind: 'chapter',
    label: '第四章 · XRK-AGT',
    subtitle: '项目实践：Runtime · Core · HTTP · 配置',
    tag: 'Chapter 04',
    role: '本仓库怎么干活。',
    position: { x: LAYOUT.frameXrk.x, y: LAYOUT.frameXrk.y },
    size: { width: LAYOUT.frameXrk.width, height: LAYOUT.frameXrk.height },
    markdown: chapterXrk,
  },
  {
    id: CH_CLASH,
    kind: 'chapter',
    label: '番外 · 代理引擎',
    subtitle: 'Clash 线：本质 · 端口 · 配置',
    tag: 'Side Quest',
    role: '对照第三章网络概念的本机引擎实践。',
    position: { x: LAYOUT.frameClash.x, y: LAYOUT.frameClash.y },
    size: { width: LAYOUT.frameClash.width, height: LAYOUT.frameClash.height },
    markdown: chapterClash,
  },
];

export const knowledgeNodes = [
  /* 序章 */
  {
    id: 'computer-system',
    kind: 'topic',
    parentId: CH_MACHINE,
    label: '计算机系统',
    subtitle: '工坊总览与分叉',
    tag: '00 总览',
    role: '起源入口：后面系统本质、联动、处理单元都从这里展开。',
    prereqs: [],
    next: ['os-essence', 'hw-sw-link', 'terminal-worlds', 'network-basics'],
    position: LAYOUT.topics['computer-system'],
    markdown: computerSystem,
  },
  {
    id: 'os-essence',
    kind: 'topic',
    parentId: CH_MACHINE,
    label: '系统的本质',
    subtitle: '内核 · 抽象 · 系统调用',
    tag: '00 系统',
    role: 'OS 立法管什么：进程、内存、文件、套接字。',
    prereqs: ['computer-system'],
    next: ['chip-units', 'terminal-worlds'],
    position: LAYOUT.topics['os-essence'],
    markdown: osEssence,
  },
  {
    id: 'hw-sw-link',
    kind: 'topic',
    parentId: CH_MACHINE,
    label: '软硬件联动',
    subtitle: '从点击到电信号',
    tag: '00 联动',
    role: '一次用户动作如何穿过应用 → OS → 硬件。',
    prereqs: ['computer-system'],
    next: ['chip-units'],
    position: LAYOUT.topics['hw-sw-link'],
    markdown: hwSwLink,
  },
  {
    id: 'chip-units',
    kind: 'topic',
    parentId: CH_MACHINE,
    label: 'CPU / GPU / 其它 U',
    subtitle: '处理单元分工',
    tag: '00 芯片',
    role: '各类 Unit 擅长什么；入门后端主要吃 CPU。',
    prereqs: ['os-essence', 'hw-sw-link'],
    next: ['lang-compiled-runtime', 'network-basics'],
    position: LAYOUT.topics['chip-units'],
    markdown: chipUnits,
    chapterOut: ['lang-compiled-runtime'],
  },

  /* 第一章 · 环境 */
  {
    id: 'terminal-worlds',
    kind: 'topic',
    parentId: CH_ENV,
    label: '不同终端环境',
    subtitle: 'Win / macOS / Linux / SSH / WSL',
    tag: '01 终端',
    role: '终端、Shell、OS 三件套；各平台默认组合不同。',
    prereqs: ['computer-system', 'os-essence'],
    next: ['linux-distros', 'linux-cli', 'runtime-nodejs', 'installers-path'],
    position: LAYOUT.topics['terminal-worlds'],
    markdown: terminalWorlds,
  },
  {
    id: 'linux-distros',
    kind: 'topic',
    parentId: CH_ENV,
    label: 'Linux 发行版',
    subtitle: 'Debian 系 · Fedora 系 · …',
    tag: '01 发行版',
    role: '内核相同，包装与包管理不同——装软件前先认家族。',
    prereqs: ['terminal-worlds'],
    next: ['linux-cli'],
    position: LAYOUT.topics['linux-distros'],
    markdown: linuxDistros,
  },
  {
    id: 'linux-cli',
    kind: 'topic',
    parentId: CH_ENV,
    label: 'Linux 基础指令',
    subtitle: '导航 · 文件 · 进程 · 权限',
    tag: '01 指令',
    role: '建立空间感的最小命令集（bash/zsh）。',
    prereqs: ['terminal-worlds', 'linux-distros'],
    next: ['git-workspace', 'xrk-first-run'],
    position: LAYOUT.topics['linux-cli'],
    markdown: linuxCli,
  },
  {
    id: 'runtime-nodejs',
    kind: 'topic',
    parentId: CH_ENV,
    label: '运行时 · Node.js',
    subtitle: '引擎、版本与 engines',
    tag: '01 运行时',
    role: 'JS 在本机执行的引擎；本仓 ≥ 26。',
    prereqs: ['terminal-worlds'],
    next: ['installers-path', 'package-managers', 'lang-compiled-runtime'],
    position: LAYOUT.topics['runtime-nodejs'],
    markdown: runtimeNodejs,
    chapterOut: ['lang-compiled-runtime'],
  },
  {
    id: 'installers-path',
    kind: 'topic',
    parentId: CH_ENV,
    label: '安装器与 PATH',
    subtitle: 'MSI · 包管理 · 找得到命令',
    tag: '01 交付',
    role: '软件进磁盘与 Shell 如何找到可执行文件。',
    prereqs: ['terminal-worlds', 'runtime-nodejs'],
    next: ['package-managers', 'git-workspace'],
    position: LAYOUT.topics['installers-path'],
    markdown: installersPath,
  },
  {
    id: 'package-managers',
    kind: 'topic',
    parentId: CH_ENV,
    label: '包管理器 · pnpm',
    subtitle: '清单、锁文件、只认 pnpm',
    tag: '01 依赖',
    role: '按 package.json 解析依赖树。',
    prereqs: ['runtime-nodejs', 'installers-path'],
    next: ['git-workspace'],
    position: LAYOUT.topics['package-managers'],
    markdown: packageManagers,
  },
  {
    id: 'git-workspace',
    kind: 'topic',
    parentId: CH_ENV,
    label: 'Git 与工作区',
    subtitle: '三区 · clone · 根目录',
    tag: '01 源码',
    role: '远程仓库变成可安装依赖的本地目录。',
    prereqs: ['installers-path', 'package-managers', 'linux-cli'],
    next: ['git-forges', 'xrk-first-run'],
    position: LAYOUT.topics['git-workspace'],
    markdown: gitWorkspace,
  },
  {
    id: 'git-forges',
    kind: 'topic',
    parentId: CH_ENV,
    label: '代码托管',
    subtitle: 'GitHub · Gitee · 协作名词',
    tag: '01 托管',
    role: '远程住在哪：平台差异、克隆 URL、PR/Issue 最小环。',
    prereqs: ['git-workspace'],
    next: ['xrk-first-run'],
    position: LAYOUT.topics['git-forges'],
    markdown: gitForges,
  },
  {
    id: 'xrk-first-run',
    kind: 'topic',
    parentId: CH_ENV,
    label: '首次跑通',
    subtitle: 'install → node app → 检查点',
    tag: '01 实战',
    role: '工具链收束；下一棒交给第四章项目实践。',
    prereqs: ['git-workspace', 'git-forges'],
    next: ['xrk-overview'],
    position: LAYOUT.topics['xrk-first-run'],
    markdown: xrkFirstRun,
    chapterOut: ['xrk-overview'],
  },

  /* 第二章 · 语言 */
  {
    id: 'lang-compiled-runtime',
    kind: 'topic',
    parentId: CH_LANG,
    label: '编译与运行时',
    subtitle: '翻译发生在何时',
    tag: '02 模型',
    role: '编译型 / 解释与 VM 型如何把源码变成进程动作。',
    prereqs: ['chip-units', 'runtime-nodejs'],
    next: ['lang-landscape'],
    position: LAYOUT.topics['lang-compiled-runtime'],
    markdown: langCompiledRuntime,
  },
  {
    id: 'lang-landscape',
    kind: 'topic',
    parentId: CH_LANG,
    label: '语言版图',
    subtitle: '系统级 · 托管 · 脚本',
    tag: '02 版图',
    role: '按层次认语言，不背排行榜。',
    prereqs: ['lang-compiled-runtime'],
    next: ['lang-to-runtime'],
    position: LAYOUT.topics['lang-landscape'],
    markdown: langLandscape,
  },
  {
    id: 'lang-to-runtime',
    kind: 'topic',
    parentId: CH_LANG,
    label: '接到本仓运行时',
    subtitle: 'JS · Node · pnpm 契约',
    tag: '02 落地',
    role: '为何 XRK-AGT 站在 Node 这一支，以及如何接到第四章。',
    prereqs: ['lang-landscape', 'runtime-nodejs'],
    next: ['xrk-overview'],
    position: LAYOUT.topics['lang-to-runtime'],
    markdown: langToRuntime,
    chapterOut: ['xrk-overview'],
  },

  /* 第三章 · 网络 */
  {
    id: 'network-basics',
    kind: 'topic',
    parentId: CH_NET,
    label: '网络是什么',
    subtitle: '为何要联网 · LAN / WAN · 拓扑',
    tag: '03 网络',
    role: '多台计算机为什么、以什么形态连在一起。',
    prereqs: ['computer-system', 'chip-units'],
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
    subtitle: '软件如何协作',
    tag: '03 应用',
    role: '请求/响应视角；可伸向第四章工程实践。',
    prereqs: ['computer-system'],
    next: ['http-web'],
    position: LAYOUT.topics['api-frontend'],
    markdown: apiFrontend,
    chapterOut: ['xrk-overview'],
  },
  {
    id: 'protocol-stack',
    kind: 'topic',
    parentId: CH_NET,
    label: '协议栈',
    subtitle: 'OSI · TCP/IP · 封装拆包',
    tag: '03 分层',
    role: '总地图：每一层解决一类问题。',
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
    tag: '03 地址',
    role: '网络层怎么找主机。',
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
    tag: '03 传输',
    role: '找到进程并选择可靠或求快。',
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
    subtitle: '跨网与出公网',
    tag: '03 转发',
    role: '选路与地址转换。',
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
    subtitle: '名字与加密',
    tag: '03 命名安全',
    role: '域名映射与传输保护。',
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
    subtitle: '方法、状态码、缓存、跨域',
    tag: '03 Web',
    role: '应用层对话协议。',
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
    subtitle: '入口工程化',
    tag: '03 网关',
    role: '门面、负载、TLS、限流。',
    prereqs: ['http-web', 'routing-nat'],
    next: [],
    position: LAYOUT.topics['reverse-proxy'],
    markdown: reverseProxy,
    sideOut: ['clash'],
  },

  /* 第四章 · XRK */
  {
    id: 'xrk-overview',
    kind: 'topic',
    parentId: CH_XRK,
    label: '项目鸟瞰',
    subtitle: 'Runtime 舞台 · Core 演员',
    tag: '04 总览',
    role: 'XRK-AGT 项目实践入口——不是网络课。',
    prereqs: ['xrk-first-run', 'lang-to-runtime', 'api-frontend'],
    next: ['xrk-runtime', 'xrk-core-layout'],
    position: LAYOUT.topics['xrk-overview'],
    markdown: xrkOverview,
  },
  {
    id: 'xrk-runtime',
    kind: 'topic',
    parentId: CH_XRK,
    label: 'AgentRuntime',
    subtitle: '进程里的值班经理',
    tag: '04 运行时',
    role: '加载 Core、挂插件、接消息。',
    prereqs: ['xrk-overview'],
    next: ['xrk-http-www'],
    position: LAYOUT.topics['xrk-runtime'],
    markdown: xrkRuntime,
  },
  {
    id: 'xrk-core-layout',
    kind: 'topic',
    parentId: CH_XRK,
    label: 'Core 放码',
    subtitle: '业务进 core/，基建留 src/',
    tag: '04 结构',
    role: '目录约定与导入习惯。',
    prereqs: ['xrk-overview'],
    next: ['xrk-http-www', 'xrk-config'],
    position: LAYOUT.topics['xrk-core-layout'],
    markdown: xrkCoreLayout,
  },
  {
    id: 'xrk-http-www',
    kind: 'topic',
    parentId: CH_XRK,
    label: 'HTTP 与 www',
    subtitle: '接口契约 · 静态挂载',
    tag: '04 暴露',
    role: 'HttpResponse 与 /应用名/ 挂载。',
    prereqs: ['xrk-runtime', 'xrk-core-layout'],
    next: ['xrk-config'],
    position: LAYOUT.topics['xrk-http-www'],
    markdown: xrkHttpWww,
  },
  {
    id: 'xrk-config',
    kind: 'topic',
    parentId: CH_XRK,
    label: '配置归属',
    subtitle: '框架模板 vs 产品模板',
    tag: '04 配置',
    role: '配错地方比写错代码更难查。',
    prereqs: ['xrk-core-layout'],
    next: [],
    position: LAYOUT.topics['xrk-config'],
    markdown: xrkConfig,
  },

  /* 番外 */
  {
    id: 'clash',
    kind: 'topic',
    parentId: CH_CLASH,
    label: '代理引擎本质',
    subtitle: '本机正向代理 + 规则选路',
    tag: '番外',
    role: '对照第三章端口/路由/DNS/正反向代理。',
    prereqs: ['network-basics', 'tcp-udp', 'routing-nat', 'dns-https', 'reverse-proxy'],
    next: ['clash-port'],
    position: LAYOUT.topics.clash,
    markdown: clashLesson,
  },
  {
    id: 'clash-port',
    kind: 'topic',
    parentId: CH_CLASH,
    label: '端口与 Coding Agent',
    subtitle: '127.0.0.1:端口',
    tag: '番外',
    role: '系统代理与手写本地端口。',
    prereqs: ['clash', 'tcp-udp'],
    next: ['clash-setup'],
    position: LAYOUT.topics['clash-port'],
    markdown: clashPortLesson,
  },
  {
    id: 'clash-setup',
    kind: 'topic',
    parentId: CH_CLASH,
    label: 'Verge / Android 配置',
    subtitle: '订阅 → 节点 → 系统代理',
    tag: '番外',
    role: '最简客户端路径。',
    prereqs: ['clash-port', 'reverse-proxy'],
    next: [],
    position: LAYOUT.topics['clash-setup'],
    markdown: clashSetupLesson,
  },
];

export const knowledgeEdges = [
  /* 序章 */
  { id: 'e-sys-os', source: 'computer-system', target: 'os-essence', sourceHandle: 'right', targetHandle: 'left', label: '总管是谁', branch: 'c0', animated: true },
  { id: 'e-sys-link', source: 'computer-system', target: 'hw-sw-link', sourceHandle: 'right', targetHandle: 'left', label: '一次点击', branch: 'c0' },
  { id: 'e-os-chip', source: 'os-essence', target: 'chip-units', sourceHandle: 'right', targetHandle: 'left', label: '谁在计算', branch: 'c0' },
  { id: 'e-link-chip', source: 'hw-sw-link', target: 'chip-units', sourceHandle: 'right', targetHandle: 'left', label: '算力形态', branch: 'c0' },

  /* 序章 → 环境 / 网络 / 语言 */
  { id: 'e-sys-term', source: 'computer-system', target: 'terminal-worlds', sourceHandle: 'bottom', targetHandle: 'top', label: '如何发令', branch: 'c1', animated: true },
  { id: 'e-os-term', source: 'os-essence', target: 'terminal-worlds', sourceHandle: 'bottom', targetHandle: 'top', label: '系统调用入口', branch: 'c1' },
  { id: 'e-chip-lang', source: 'chip-units', target: 'lang-compiled-runtime', sourceHandle: 'right', targetHandle: 'left', label: '指令从哪来', branch: 'c2', animated: true },
  { id: 'e-sys-net', source: 'computer-system', target: 'network-basics', sourceHandle: 'bottom', targetHandle: 'left', label: '主机要互联', branch: 'c3', animated: true },
  { id: 'e-sys-api', source: 'computer-system', target: 'api-frontend', sourceHandle: 'bottom', targetHandle: 'left', label: '软件如何协作', branch: 'c3', animated: true },
  { id: 'e-chip-net', source: 'chip-units', target: 'network-basics', sourceHandle: 'bottom', targetHandle: 'top', label: '进程要出网', branch: 'c3' },

  /* 第一章内 */
  { id: 'e-term-distro', source: 'terminal-worlds', target: 'linux-distros', sourceHandle: 'right', targetHandle: 'left', label: 'Linux 哪一种', branch: 'c1' },
  { id: 'e-term-cli', source: 'terminal-worlds', target: 'linux-cli', sourceHandle: 'right', targetHandle: 'left', label: '最小命令集', branch: 'c1' },
  { id: 'e-distro-cli', source: 'linux-distros', target: 'linux-cli', sourceHandle: 'bottom', targetHandle: 'top', label: '包管理不同', branch: 'c1' },
  { id: 'e-term-node', source: 'terminal-worlds', target: 'runtime-nodejs', sourceHandle: 'right', targetHandle: 'left', label: '跑 JS 的引擎', branch: 'c1' },
  { id: 'e-term-install', source: 'terminal-worlds', target: 'installers-path', sourceHandle: 'right', targetHandle: 'left', label: '命令从哪来', branch: 'c1' },
  { id: 'e-node-install', source: 'runtime-nodejs', target: 'installers-path', sourceHandle: 'bottom', targetHandle: 'top', label: '装上 PATH', branch: 'c1' },
  { id: 'e-node-pnpm', source: 'runtime-nodejs', target: 'package-managers', sourceHandle: 'right', targetHandle: 'left', label: '依赖怎么来', branch: 'c1' },
  { id: 'e-install-pnpm', source: 'installers-path', target: 'package-managers', sourceHandle: 'right', targetHandle: 'left', label: '可执行齐了', branch: 'c1' },
  { id: 'e-pnpm-git', source: 'package-managers', target: 'git-workspace', sourceHandle: 'right', targetHandle: 'left', label: '在仓库根装', branch: 'c1' },
  { id: 'e-cli-git', source: 'linux-cli', target: 'git-workspace', sourceHandle: 'right', targetHandle: 'left', label: 'cd 进项目', branch: 'c1' },
  { id: 'e-git-forge', source: 'git-workspace', target: 'git-forges', sourceHandle: 'bottom', targetHandle: 'top', label: '远程住哪', branch: 'c1' },
  { id: 'e-git-run', source: 'git-workspace', target: 'xrk-first-run', sourceHandle: 'right', targetHandle: 'left', label: '收束启动', branch: 'c1', animated: true },
  { id: 'e-forge-run', source: 'git-forges', target: 'xrk-first-run', sourceHandle: 'right', targetHandle: 'left', label: '认清远程再跑', branch: 'c1' },
  { id: 'e-node-lang', source: 'runtime-nodejs', target: 'lang-compiled-runtime', sourceHandle: 'right', targetHandle: 'left', label: '运行时模型', branch: 'c2' },

  /* 第二章内 */
  { id: 'e-lang-map', source: 'lang-compiled-runtime', target: 'lang-landscape', sourceHandle: 'bottom', targetHandle: 'top', label: '放进版图', branch: 'c2' },
  { id: 'e-lang-land', source: 'lang-landscape', target: 'lang-to-runtime', sourceHandle: 'right', targetHandle: 'left', label: '落到本仓', branch: 'c2', animated: true },

  /* → 第四章 */
  { id: 'e-run-xrk', source: 'xrk-first-run', target: 'xrk-overview', sourceHandle: 'right', targetHandle: 'left', label: '进入项目实践', branch: 'c4', animated: true },
  { id: 'e-lang-xrk', source: 'lang-to-runtime', target: 'xrk-overview', sourceHandle: 'right', targetHandle: 'left', label: '语言契约对齐', branch: 'c4', animated: true },
  { id: 'e-api-xrk', source: 'api-frontend', target: 'xrk-overview', sourceHandle: 'right', targetHandle: 'left', label: '前后端落到本仓', branch: 'c4' },

  /* 第三章 */
  { id: 'e-api-http', source: 'api-frontend', target: 'http-web', sourceHandle: 'right', targetHandle: 'top', label: 'Web API 用 HTTP', branch: 'c3' },
  { id: 'e-net-stack', source: 'network-basics', target: 'protocol-stack', sourceHandle: 'right', targetHandle: 'left', label: '连通后怎么传', branch: 'c3' },
  { id: 'e-stack-ip', source: 'protocol-stack', target: 'ip-addressing', sourceHandle: 'top', targetHandle: 'left', label: '网络层：找主机', branch: 'c3' },
  { id: 'e-stack-tcp', source: 'protocol-stack', target: 'tcp-udp', sourceHandle: 'bottom', targetHandle: 'left', label: '传输层：找进程', branch: 'c3' },
  { id: 'e-ip-route', source: 'ip-addressing', target: 'routing-nat', sourceHandle: 'right', targetHandle: 'left', label: '跨网转发', branch: 'c3' },
  { id: 'e-ip-dns', source: 'ip-addressing', target: 'dns-https', sourceHandle: 'bottom', targetHandle: 'top', label: '域名映射到 IP', branch: 'c3' },
  { id: 'e-tcp-http', source: 'tcp-udp', target: 'http-web', sourceHandle: 'right', targetHandle: 'bottom', label: 'HTTP 常跑在 TCP', branch: 'c3' },
  { id: 'e-dns-http', source: 'dns-https', target: 'http-web', sourceHandle: 'right', targetHandle: 'bottom', label: '先解析再访问', branch: 'c3' },
  { id: 'e-route-proxy', source: 'routing-nat', target: 'reverse-proxy', sourceHandle: 'right', targetHandle: 'top', label: '流量到门面', branch: 'c3' },
  { id: 'e-http-proxy', source: 'http-web', target: 'reverse-proxy', sourceHandle: 'right', targetHandle: 'left', label: '入口工程化', branch: 'c3' },
  { id: 'e-dns-proxy', source: 'dns-https', target: 'reverse-proxy', sourceHandle: 'right', targetHandle: 'bottom', label: 'HTTPS 常在入口终止', branch: 'c3' },

  /* 第四章 */
  { id: 'e-xrk-rt', source: 'xrk-overview', target: 'xrk-runtime', sourceHandle: 'bottom', targetHandle: 'top', label: '进程心脏', branch: 'c4' },
  { id: 'e-xrk-core', source: 'xrk-overview', target: 'xrk-core-layout', sourceHandle: 'right', targetHandle: 'left', label: '业务往哪放', branch: 'c4' },
  { id: 'e-xrk-http', source: 'xrk-runtime', target: 'xrk-http-www', sourceHandle: 'right', targetHandle: 'left', label: '对外暴露', branch: 'c4' },
  { id: 'e-xrk-core-http', source: 'xrk-core-layout', target: 'xrk-http-www', sourceHandle: 'bottom', targetHandle: 'top', label: 'http / www', branch: 'c4' },
  { id: 'e-xrk-cfg', source: 'xrk-core-layout', target: 'xrk-config', sourceHandle: 'right', targetHandle: 'left', label: '配置契约', branch: 'c4' },
  { id: 'e-xrk-http-cfg', source: 'xrk-http-www', target: 'xrk-config', sourceHandle: 'right', targetHandle: 'bottom', label: '配与码对齐', branch: 'c4' },

  /* 番外 */
  { id: 'e-net-clash', source: 'network-basics', target: 'clash', sourceHandle: 'bottom', targetHandle: 'top', label: '番外：代理引擎', branch: 'side' },
  { id: 'e-tcp-clash-port', source: 'tcp-udp', target: 'clash-port', sourceHandle: 'bottom', targetHandle: 'top', label: '引擎入口=端口', branch: 'side' },
  { id: 'e-clash-port', source: 'clash', target: 'clash-port', sourceHandle: 'right', targetHandle: 'left', label: '入口连上引擎', branch: 'side', animated: true },
  { id: 'e-clash-setup', source: 'clash-port', target: 'clash-setup', sourceHandle: 'right', targetHandle: 'left', label: '订阅喂饱引擎', branch: 'side', animated: true },
];

export const allEntries = [...graphFrames, ...knowledgeNodes];

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

export function topicAbsPosition(topic) {
  const frame = frameById(topic.parentId);
  if (!frame) return { ...topic.position };
  return {
    x: frame.position.x + topic.position.x,
    y: frame.position.y + topic.position.y,
  };
}

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

  return [...frames, ...topics];
}

export function buildFlowEdges() {
  const posMap = getOriginPositions();
  const chapterOf = new Map(knowledgeNodes.map((n) => [n.id, n.parentId]));

  const edges = knowledgeEdges.map((e) => {
    const sp = posMap.get(e.source);
    const tp = posMap.get(e.target);
    const inferred =
      sp && tp
        ? inferHandles(sp, tp)
        : { sourceHandle: e.sourceHandle || 'right', targetHandle: e.targetHandle || 'left' };

    /* 同章：完全按几何选边；跨章：保留人工上下出边意图，否则也按几何 */
    const sameChapter = chapterOf.get(e.source) === chapterOf.get(e.target);
    let sourceHandle = inferred.sourceHandle;
    let targetHandle = inferred.targetHandle;
    if (
      !sameChapter &&
      e.sourceHandle &&
      e.targetHandle &&
      (e.sourceHandle === 'bottom' || e.sourceHandle === 'top')
    ) {
      sourceHandle = e.sourceHandle;
      targetHandle = e.targetHandle;
    }

    const branch = e.branch || 'main';
    const tone = toneOf(e.target);

    return {
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle,
      targetHandle: TARGET_HANDLE[targetHandle] || `${targetHandle}-t`,
      label: e.label,
      type: 'relation',
      animated: Boolean(e.animated),
      data: {
        branch,
        color: tone.edge,
        pathKind: pathKindFor(branch, sameChapter),
        label: e.label,
      },
      interactive: false,
      focusable: false,
      zIndex: 2,
    };
  });

  assignBundleOffsets(edges);
  assignFanoutOffsets(edges, posMap);
  return edges;
}

export function getOriginPositions() {
  const map = new Map();
  for (const f of graphFrames) map.set(f.id, { ...f.position });
  for (const n of knowledgeNodes) map.set(n.id, topicAbsPosition(n));
  return map;
}
