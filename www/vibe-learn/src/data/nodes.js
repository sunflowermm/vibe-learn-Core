/**
 * 图谱数据模型
 *
 * 序章 认识计算机 → 第一章 环境与终端 → 第二章 计算机语言
 * → 第三章 计算机网络 → 第四章 XRK 实践 → 第五章 人工智能 · 番外 Clash
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
import langWhatIsLanguage from './lessons/lang-what-is-language.js';
import langLibraryFramework from './lessons/lang-library-framework.js';
import langTechStack from './lessons/lang-tech-stack.js';
import langTechSelection from './lessons/lang-tech-selection.js';
import langLandscape from './lessons/lang-landscape.js';
import langJavascript from './lessons/lang-javascript.js';
import langTypescript from './lessons/lang-typescript.js';
import langPython from './lessons/lang-python.js';
import langGo from './lessons/lang-go.js';
import langRust from './lessons/lang-rust.js';
import langJava from './lessons/lang-java.js';
import langCsharp from './lessons/lang-csharp.js';
import langPhp from './lessons/lang-php.js';
import langC from './lessons/lang-c.js';
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
import netEdgePractice from './lessons/net-edge-practice.js';
import xrkOverview from './lessons/xrk-overview.js';
import xrkRuntime from './lessons/xrk-runtime.js';
import xrkCoreLayout from './lessons/xrk-core-layout.js';
import xrkPluginArch from './lessons/xrk-plugin-arch.js';
import xrkHttpWww from './lessons/xrk-http-www.js';
import xrkLanguageStack from './lessons/xrk-language-stack.js';
import xrkConfig from './lessons/xrk-config.js';
import xrkSubserver from './lessons/xrk-subserver.js';
import xrkStream from './lessons/xrk-stream.js';
import aiWhat from './lessons/ai-what.js';
import aiLlmEra from './lessons/ai-llm-era.js';
import aiModelTypes from './lessons/ai-model-types.js';
import aiArchBeyond from './lessons/ai-arch-beyond.js';
import aiTransformer from './lessons/ai-transformer.js';
import aiFinetune from './lessons/ai-finetune.js';
import aiChatEra from './lessons/ai-chat-era.js';
import aiOpenaiProtocol from './lessons/ai-openai-protocol.js';
import aiToolCalling from './lessons/ai-tool-calling.js';
import aiAgentBirth from './lessons/ai-agent-birth.js';
import aiRag from './lessons/ai-rag.js';
import aiAgenticRag from './lessons/ai-agentic-rag.js';
import aiRagShift from './lessons/ai-rag-shift.js';
import aiMcp from './lessons/ai-mcp.js';
import aiProtocolForks from './lessons/ai-protocol-forks.js';
import aiRules from './lessons/ai-rules.js';
import aiSkills from './lessons/ai-skills.js';
import aiSubagent from './lessons/ai-subagent.js';
import aiCli from './lessons/ai-cli.js';
import aiAgentsMd from './lessons/ai-agents-md.js';
import clashLesson from './lessons/clash.js';
import clashPortLesson from './lessons/clash-port.js';
import clashSetupLesson from './lessons/clash-setup.js';
import chapterMachine from './lessons/chapter-machine.js';
import chapterEnv from './lessons/chapter-env.js';
import chapterLanguages from './lessons/chapter-languages.js';
import chapterNetwork from './lessons/chapter-network.js';
import chapterXrk from './lessons/chapter-xrk.js';
import chapterAi from './lessons/chapter-ai.js';
import chapterClash from './lessons/chapter-clash.js';
import { LAYOUT } from './layout.js';
import { toneOf } from './tones.js';
import {
  assignBundleOffsets,
  assignFaninOffsets,
  assignFanoutOffsets,
  inferHandles,
  pathKindFor,
} from '../utils/edge-routing.js';

const CH_MACHINE = 'chapter-machine';
const CH_ENV = 'chapter-env';
const CH_LANG = 'chapter-languages';
const CH_NET = 'chapter-computer-network';
const CH_XRK = 'chapter-xrk-agt';
const CH_AI = 'chapter-ai';
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
    subtitle: '系统 · 联动 · 算力与存储',
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
    subtitle: '概念 · 选型 · 一门语言一课 · 接到本仓',
    tag: 'Chapter 02',
    role: '语言/框架/技术栈/选型；九门语言分课；主服 Node 与多语言子服。',
    position: { x: LAYOUT.frameLang.x, y: LAYOUT.frameLang.y },
    size: { width: LAYOUT.frameLang.width, height: LAYOUT.frameLang.height },
    markdown: chapterLanguages,
  },
  {
    id: CH_NET,
    kind: 'chapter',
    label: '第三章 · 计算机网络',
    subtitle: '从主机到边缘与出口',
    tag: 'Chapter 03',
    role: '协议栈到 HTTP；含 CDN、IP 池、代理与地域实务。',
    position: { x: LAYOUT.frameNet.x, y: LAYOUT.frameNet.y },
    size: { width: LAYOUT.frameNet.width, height: LAYOUT.frameNet.height },
    markdown: chapterNetwork,
  },
  {
    id: CH_XRK,
    kind: 'chapter',
    label: '第四章 · XRK-AGT',
    subtitle: '项目实践：融会进程 · 语言 · 网络',
    tag: 'Chapter 04',
    role: '知识体系汇合点；插件架构 · 多语言子服族 · Stream。',
    position: { x: LAYOUT.frameXrk.x, y: LAYOUT.frameXrk.y },
    size: { width: LAYOUT.frameXrk.width, height: LAYOUT.frameXrk.height },
    markdown: chapterXrk,
  },
  {
    id: CH_AI,
    kind: 'chapter',
    label: '第五章 · 人工智能',
    subtitle: '模型 · Agent · RAG · 协议 · 操作面',
    tag: 'Chapter 05',
    role: '一特性一课，按诞生原因与作用串时间线。',
    position: { x: LAYOUT.frameAi.x, y: LAYOUT.frameAi.y },
    size: { width: LAYOUT.frameAi.width, height: LAYOUT.frameAi.height },
    markdown: chapterAi,
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
    next: ['os-essence', 'hw-sw-link', 'terminal-worlds', 'network-basics', 'api-frontend'],
    position: LAYOUT.topics['computer-system'],
    markdown: computerSystem,
  },
  {
    id: 'os-essence',
    kind: 'topic',
    parentId: CH_MACHINE,
    label: '系统的本质',
    subtitle: '抽象 · 进程/线程 · 权限 · 内核',
    tag: '00 系统',
    role: 'OS 管资源与隔离；权限与进程模型从这里建立。',
    prereqs: ['computer-system'],
    next: ['chip-units', 'terminal-worlds', 'xrk-runtime'],
    position: LAYOUT.topics['os-essence'],
    markdown: osEssence,
  },
  {
    id: 'hw-sw-link',
    kind: 'topic',
    parentId: CH_MACHINE,
    label: '软硬件联动',
    subtitle: '分层 · 中断 · I/O',
    tag: '00 联动',
    role: '用户操作如何经驱动与中断落到硬件。',
    prereqs: ['computer-system'],
    next: ['chip-units'],
    position: LAYOUT.topics['hw-sw-link'],
    markdown: hwSwLink,
  },
  {
    id: 'chip-units',
    kind: 'topic',
    parentId: CH_MACHINE,
    label: '处理单元与存储',
    subtitle: 'CPU/GPU · 存储层次',
    tag: '00 芯片',
    role: '谁在算、数据离 CPU 有多远。',
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
    subtitle: '引擎 · 自带 npm/npx',
    tag: '01 运行时',
    role: 'JS 本机引擎；安装常附带官方包管理入口。',
    prereqs: ['terminal-worlds'],
    next: ['installers-path', 'package-managers', 'lang-compiled-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['runtime-nodejs'],
    markdown: runtimeNodejs,
    chapterOut: ['lang-compiled-runtime', 'xrk-language-stack'],
  },
  {
    id: 'installers-path',
    kind: 'topic',
    parentId: CH_ENV,
    label: '安装器与 PATH',
    subtitle: 'PATH · 自带 npm/npx',
    tag: '01 交付',
    role: '落盘与 PATH；装 Node 常附带官方包管理入口。',
    prereqs: ['terminal-worlds', 'runtime-nodejs'],
    next: ['package-managers', 'git-workspace'],
    position: LAYOUT.topics['installers-path'],
    markdown: installersPath,
  },
  {
    id: 'package-managers',
    kind: 'topic',
    parentId: CH_ENV,
    label: '包管理器',
    subtitle: '默认 npm · 本仓 pnpm · 同类 uv',
    tag: '01 依赖',
    role: '自带默认工具与替代品的共性；本仓只认 pnpm。',
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
    id: 'lang-what-is-language',
    kind: 'topic',
    parentId: CH_LANG,
    label: '什么是语言',
    subtitle: '语法 · 语义 · 运行时边界',
    tag: '02 概念',
    role: '编程语言是什么；与运行时、工具链分层。',
    prereqs: ['chip-units'],
    next: ['lang-library-framework', 'lang-compiled-runtime'],
    position: LAYOUT.topics['lang-what-is-language'],
    markdown: langWhatIsLanguage,
  },
  {
    id: 'lang-library-framework',
    kind: 'topic',
    parentId: CH_LANG,
    label: '库与框架',
    subtitle: '谁调用谁 · IoC',
    tag: '02 概念',
    role: '库 vs 框架 vs 引擎 vs SDK；Spring/React 归类。',
    prereqs: ['lang-what-is-language'],
    next: ['lang-tech-stack', 'lang-compiled-runtime'],
    position: LAYOUT.topics['lang-library-framework'],
    markdown: langLibraryFramework,
  },
  {
    id: 'lang-tech-stack',
    kind: 'topic',
    parentId: CH_LANG,
    label: '技术栈',
    subtitle: '从前到后的组合',
    tag: '02 概念',
    role: 'Tech Stack 分层；面试如何介绍；本仓栈速查。',
    prereqs: ['lang-library-framework'],
    next: ['lang-tech-selection', 'lang-to-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-tech-stack'],
    markdown: langTechStack,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-tech-selection',
    kind: 'topic',
    parentId: CH_LANG,
    label: '技术选型',
    subtitle: '维度 · 权衡 · 面试话术',
    tag: '02 概念',
    role: '场景驱动选型；五步法；Spring/多语言/本仓案例。',
    prereqs: ['lang-tech-stack'],
    next: ['lang-landscape', 'lang-to-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-tech-selection'],
    markdown: langTechSelection,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-compiled-runtime',
    kind: 'topic',
    parentId: CH_LANG,
    label: '编译与运行时',
    subtitle: '翻译发生在何时',
    tag: '02 模型',
    role: '编译型 / 解释与 VM 型如何把源码变成进程动作。',
    prereqs: ['lang-what-is-language', 'chip-units', 'runtime-nodejs'],
    next: ['lang-landscape'],
    position: LAYOUT.topics['lang-compiled-runtime'],
    markdown: langCompiledRuntime,
  },
  {
    id: 'lang-landscape',
    kind: 'topic',
    parentId: CH_LANG,
    label: '语言版图',
    subtitle: '三层地图 · 分课索引',
    tag: '02 版图',
    role: '系统/托管/脚本分层；指向九门语言分课。',
    prereqs: ['lang-compiled-runtime', 'lang-tech-selection'],
    next: [
      'lang-javascript',
      'lang-python',
      'lang-to-runtime',
      'xrk-language-stack',
    ],
    position: LAYOUT.topics['lang-landscape'],
    markdown: langLandscape,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-javascript',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'JavaScript',
    subtitle: '主服语言 · 事件驱动',
    tag: '02 JS',
    role: '浏览器与 Node 双宿主；本仓主服语言。',
    prereqs: ['lang-landscape'],
    next: ['lang-typescript', 'lang-to-runtime'],
    position: LAYOUT.topics['lang-javascript'],
    markdown: langJavascript,
  },
  {
    id: 'lang-typescript',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'TypeScript',
    subtitle: '类型化的 JS 超集',
    tag: '02 TS',
    role: '编译擦除后仍是 JS；契约与重构。',
    prereqs: ['lang-javascript'],
    next: ['lang-to-runtime'],
    position: LAYOUT.topics['lang-typescript'],
    markdown: langTypescript,
  },
  {
    id: 'lang-python',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'Python',
    subtitle: '默认子服 · AI 生态',
    tag: '02 Py',
    role: 'pyserver；科学计算与自动化主场。',
    prereqs: ['lang-landscape'],
    next: ['lang-to-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-python'],
    markdown: langPython,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-go',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'Go',
    subtitle: '并发 · 单二进制',
    tag: '02 Go',
    role: 'goserver；goroutine 与云原生工具。',
    prereqs: ['lang-landscape'],
    next: ['lang-to-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-go'],
    markdown: langGo,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-rust',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'Rust',
    subtitle: '所有权 · 无 GC 性能',
    tag: '02 Rust',
    role: 'rustserver；安全系统级与热点路径。',
    prereqs: ['lang-landscape', 'lang-c'],
    next: ['lang-to-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-rust'],
    markdown: langRust,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-java',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'Java',
    subtitle: 'JVM · 企业中间件',
    tag: '02 Java',
    role: 'jserver；Spring / JDBC 生态。',
    prereqs: ['lang-landscape'],
    next: ['lang-csharp', 'lang-to-runtime'],
    position: LAYOUT.topics['lang-java'],
    markdown: langJava,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-csharp',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'C# / .NET',
    subtitle: 'CLR · Windows 企业',
    tag: '02 C#',
    role: 'netserver；Office 与系统 API。',
    prereqs: ['lang-landscape'],
    next: ['lang-to-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-csharp'],
    markdown: langCsharp,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-php',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'PHP',
    subtitle: '轻量 Web 脚本',
    tag: '02 PHP',
    role: 'phpserver；单文件与字符串处理。',
    prereqs: ['lang-landscape'],
    next: ['lang-to-runtime', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-php'],
    markdown: langPhp,
    chapterOut: ['xrk-language-stack'],
  },
  {
    id: 'lang-c',
    kind: 'topic',
    parentId: CH_LANG,
    label: 'C 语言',
    subtitle: '近金属 · FFI 基石',
    tag: '02 C',
    role: '无独立子服；理解运行时与扩展底层。',
    prereqs: ['lang-landscape', 'lang-compiled-runtime'],
    next: ['lang-rust', 'lang-to-runtime'],
    position: LAYOUT.topics['lang-c'],
    markdown: langC,
  },
  {
    id: 'lang-to-runtime',
    kind: 'topic',
    parentId: CH_LANG,
    label: '接到本仓运行时',
    subtitle: '主服 Node · 子服多语言',
    tag: '02 落地',
    role: '主服契约（Node+pnpm）+ 指向多 runtime 子服。',
    prereqs: [
      'lang-landscape',
      'lang-javascript',
      'runtime-nodejs',
    ],
    next: ['xrk-overview', 'xrk-language-stack'],
    position: LAYOUT.topics['lang-to-runtime'],
    markdown: langToRuntime,
    chapterOut: ['xrk-overview', 'xrk-language-stack'],
  },

  /* 第三章 · 网络 */
  {
    id: 'network-basics',
    kind: 'topic',
    parentId: CH_NET,
    label: '网络是什么',
    subtitle: 'LAN/WAN · 设备角色 · 拓扑',
    tag: '03 网络',
    role: '联网动机、交换机/路由器直觉、拓扑。',
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
    subtitle: '地址 · DHCP · MAC/ARP',
    tag: '03 地址',
    role: '门牌、自动领地址、链路上找网卡。',
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
    subtitle: '选路 · NAT · 防火墙',
    tag: '03 转发',
    role: '出网、地址转换、入站过滤与端口转发。',
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
    next: ['reverse-proxy', 'xrk-http-www'],
    position: LAYOUT.topics['http-web'],
    markdown: httpWeb,
    chapterOut: ['xrk-http-www'],
  },
  {
    id: 'reverse-proxy',
    kind: 'topic',
    parentId: CH_NET,
    label: '反向代理与 CDN',
    subtitle: '门面 · 限流 · 边缘缓存',
    tag: '03 网关',
    role: '反代、负载、TLS、限流与 CDN 对照。',
    prereqs: ['http-web', 'routing-nat'],
    next: ['net-edge-practice', 'xrk-http-www'],
    position: LAYOUT.topics['reverse-proxy'],
    markdown: reverseProxy,
    sideOut: ['clash'],
    chapterOut: ['xrk-http-www'],
  },
  {
    id: 'net-edge-practice',
    kind: 'topic',
    parentId: CH_NET,
    label: '边缘与出口实务',
    subtitle: 'IP 池 · CF · 地域 · 代理',
    tag: '03 实务',
    role: '公网地址池、Cloudflare、机房地域、路径过滤症状与正向代理对照。',
    prereqs: ['reverse-proxy', 'dns-https', 'routing-nat'],
    next: ['xrk-http-www'],
    position: LAYOUT.topics['net-edge-practice'],
    markdown: netEdgePractice,
    sideOut: ['clash'],
    chapterOut: ['xrk-http-www'],
  },

  /* 第四章 · XRK · 融会枢纽 */
  {
    id: 'xrk-overview',
    kind: 'topic',
    parentId: CH_XRK,
    label: '项目鸟瞰',
    subtitle: 'Runtime · Core · 多语言子服',
    tag: '04 总览',
    role: '前几章知识在本仓的汇合入口。',
    prereqs: ['xrk-first-run', 'lang-to-runtime', 'api-frontend', 'os-essence'],
    next: ['xrk-runtime', 'xrk-core-layout', 'xrk-plugin-arch', 'xrk-language-stack'],
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
    role: '加载 Core、挂插件、接消息——回扣序章进程。',
    prereqs: ['xrk-overview', 'os-essence'],
    next: ['xrk-plugin-arch', 'xrk-http-www'],
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
    next: ['xrk-plugin-arch', 'xrk-http-www', 'xrk-config'],
    position: LAYOUT.topics['xrk-core-layout'],
    markdown: xrkCoreLayout,
  },
  {
    id: 'xrk-plugin-arch',
    kind: 'topic',
    parentId: CH_XRK,
    label: '插件式架构',
    subtitle: 'Loader · 基类 · 可插拔',
    tag: '04 扩展',
    role: '约定目录扫描挂载；业务不进内核。',
    prereqs: ['xrk-runtime', 'xrk-core-layout'],
    next: ['xrk-http-www', 'xrk-stream', 'xrk-subserver'],
    position: LAYOUT.topics['xrk-plugin-arch'],
    markdown: xrkPluginArch,
  },
  {
    id: 'xrk-language-stack',
    kind: 'topic',
    parentId: CH_XRK,
    label: '语言栈',
    subtitle: '主服 Node · 六语言子服',
    tag: '04 语言',
    role: '第二章语言版图 → 本仓多 runtime。',
    prereqs: ['xrk-overview', 'lang-to-runtime', 'runtime-nodejs', 'lang-landscape'],
    next: ['xrk-subserver', 'xrk-stream'],
    position: LAYOUT.topics['xrk-language-stack'],
    markdown: xrkLanguageStack,
  },
  {
    id: 'xrk-http-www',
    kind: 'topic',
    parentId: CH_XRK,
    label: 'HTTP 与 www',
    subtitle: '接口契约 · 静态挂载',
    tag: '04 暴露',
    role: '第三章 HTTP/反代在本仓的落点。',
    prereqs: ['xrk-runtime', 'xrk-core-layout', 'http-web', 'api-frontend'],
    next: ['xrk-config', 'xrk-stream', 'xrk-subserver'],
    position: LAYOUT.topics['xrk-http-www'],
    markdown: xrkHttpWww,
  },
  {
    id: 'xrk-subserver',
    kind: 'topic',
    parentId: CH_XRK,
    label: '子服务端',
    subtitle: '六 runtime · 配置只读',
    tag: '04 子服',
    role: '多进程 HTTP 契约；按语言短板卸重活。',
    prereqs: ['xrk-language-stack', 'xrk-plugin-arch', 'tcp-udp'],
    next: ['xrk-config', 'xrk-stream'],
    position: LAYOUT.topics['xrk-subserver'],
    markdown: xrkSubserver,
  },
  {
    id: 'xrk-config',
    kind: 'topic',
    parentId: CH_XRK,
    label: '配置归属',
    subtitle: '框架模板 vs 产品模板',
    tag: '04 配置',
    role: '配错地方比写错代码更难查。',
    prereqs: ['xrk-core-layout', 'package-managers'],
    next: ['xrk-stream'],
    position: LAYOUT.topics['xrk-config'],
    markdown: xrkConfig,
  },
  {
    id: 'xrk-stream',
    kind: 'topic',
    parentId: CH_XRK,
    label: 'Stream 业务层',
    subtitle: 'AiWorkflow · 对话与工具',
    tag: '04 Stream',
    role: '融会 HTTP/插件/配置，通往第五章。',
    prereqs: ['xrk-http-www', 'xrk-config', 'xrk-plugin-arch'],
    next: ['ai-what'],
    position: LAYOUT.topics['xrk-stream'],
    markdown: xrkStream,
  },

  {
    id: 'ai-what',
    kind: 'topic',
    parentId: CH_AI,
    label: 'AI 学科诞生',
    subtitle: '为何要有这门学科',
    tag: '05 · 基础',
    role: '图灵提问；麦卡锡命名；达特茅斯立科。',
    prereqs: ['xrk-stream'],
    next: ['ai-llm-era'],
    position: LAYOUT.topics['ai-what'],
    markdown: aiWhat,
  },
  {
    id: 'ai-llm-era',
    kind: 'topic',
    parentId: CH_AI,
    label: '规则到大模型',
    subtitle: '方法为何一代代换',
    tag: '05 · 基础',
    role: '规则不够用 → ML → 深度学习 → LLM。',
    prereqs: ['ai-what'],
    next: ['ai-model-types'],
    position: LAYOUT.topics['ai-llm-era'],
    markdown: aiLlmEra,
  },
  {
    id: 'ai-model-types',
    kind: 'topic',
    parentId: CH_AI,
    label: '模型类型',
    subtitle: '先分清你在用哪一类',
    tag: '05 · 模型',
    role: '生成/嵌入/多模态；基座与对话模型。',
    prereqs: ['ai-llm-era'],
    next: ['ai-arch-beyond'],
    position: LAYOUT.topics['ai-model-types'],
    markdown: aiModelTypes,
  },
  {
    id: 'ai-arch-beyond',
    kind: 'topic',
    parentId: CH_AI,
    label: '不止 Transformer',
    subtitle: 'CNN · RNN · MoE…',
    tag: '05 · 模型',
    role: '破除「大模型只有一种身子骨」的迷信。',
    prereqs: ['ai-model-types'],
    next: ['ai-transformer'],
    position: LAYOUT.topics['ai-arch-beyond'],
    markdown: aiArchBeyond,
  },
  {
    id: 'ai-transformer',
    kind: 'topic',
    parentId: CH_AI,
    label: 'Transformer',
    subtitle: '2017 注意力革命',
    tag: '05 · 模型',
    role: '并行与长依赖；当代 LLM 主流骨干。',
    prereqs: ['ai-arch-beyond'],
    next: ['ai-finetune'],
    position: LAYOUT.topics['ai-transformer'],
    markdown: aiTransformer,
  },
  {
    id: 'ai-finetune',
    kind: 'topic',
    parentId: CH_AI,
    label: '模型微调',
    subtitle: 'SFT · 对齐 · LoRA',
    tag: '05 · 模型',
    role: '基座如何变成听话的产品模型。',
    prereqs: ['ai-transformer'],
    next: ['ai-chat-era'],
    position: LAYOUT.topics['ai-finetune'],
    markdown: aiFinetune,
  },
  {
    id: 'ai-chat-era',
    kind: 'topic',
    parentId: CH_AI,
    label: '对话产品化',
    subtitle: 'ChatGPT 时刻',
    tag: '05 · 产品',
    role: '把能力做成人人会用的对话框。',
    prereqs: ['ai-finetune'],
    next: ['ai-openai-protocol'],
    position: LAYOUT.topics['ai-chat-era'],
    markdown: aiChatEra,
  },
  {
    id: 'ai-openai-protocol',
    kind: 'topic',
    parentId: CH_AI,
    label: 'Chat Completions',
    subtitle: '事实标准插头',
    tag: '05 · 产品',
    role: '为何开发者都兼容同一套 messages API。',
    prereqs: ['ai-chat-era'],
    next: ['ai-tool-calling'],
    position: LAYOUT.topics['ai-openai-protocol'],
    markdown: aiOpenaiProtocol,
  },
  {
    id: 'ai-tool-calling',
    kind: 'topic',
    parentId: CH_AI,
    label: '工具调用',
    subtitle: 'Function Calling',
    tag: '05 · 行动',
    role: '模型点菜、程序下厨。',
    prereqs: ['ai-openai-protocol'],
    next: ['ai-agent-birth'],
    position: LAYOUT.topics['ai-tool-calling'],
    markdown: aiToolCalling,
  },
  {
    id: 'ai-agent-birth',
    kind: 'topic',
    parentId: CH_AI,
    label: 'Agent 诞生',
    subtitle: '从聊天到办事',
    tag: '05 · 行动',
    role: '目标 · 规划 · 工具循环 · 观察。',
    prereqs: ['ai-tool-calling'],
    next: ['ai-rag'],
    position: LAYOUT.topics['ai-agent-birth'],
    markdown: aiAgentBirth,
  },
  {
    id: 'ai-rag',
    kind: 'topic',
    parentId: CH_AI,
    label: 'RAG',
    subtitle: '检索增强生成',
    tag: '05 · 知识',
    role: '先检索私有/新知识，再生成。',
    prereqs: ['ai-agent-birth'],
    next: ['ai-agentic-rag'],
    position: LAYOUT.topics['ai-rag'],
    markdown: aiRag,
  },
  {
    id: 'ai-agentic-rag',
    kind: 'topic',
    parentId: CH_AI,
    label: 'Agentic RAG',
    subtitle: '多轮检索闭环',
    tag: '05 · 知识',
    role: '检索变成 Agent 可调用的工具。',
    prereqs: ['ai-rag'],
    next: ['ai-rag-shift'],
    position: LAYOUT.topics['ai-agentic-rag'],
    markdown: aiAgenticRag,
  },
  {
    id: 'ai-rag-shift',
    kind: 'topic',
    parentId: CH_AI,
    label: 'RAG 观念转变',
    subtitle: '不再教条式默认上 RAG',
    tag: '05 · 知识',
    role: '长上下文 · 工具读文件 · 混合路由。',
    prereqs: ['ai-agentic-rag'],
    next: ['ai-mcp'],
    position: LAYOUT.topics['ai-rag-shift'],
    markdown: aiRagShift,
  },
  {
    id: 'ai-mcp',
    kind: 'topic',
    parentId: CH_AI,
    label: 'MCP',
    subtitle: '工具的 USB-C',
    tag: '05 · 协议',
    role: '解决 N×M 连接器；与 FC 互补。',
    prereqs: ['ai-rag-shift'],
    next: ['ai-protocol-forks'],
    position: LAYOUT.topics['ai-mcp'],
    markdown: aiMcp,
  },
  {
    id: 'ai-protocol-forks',
    kind: 'topic',
    parentId: CH_AI,
    label: '协议分层',
    subtitle: '自有 API · A2A',
    tag: '05 · 协议',
    role: '为何兼容之外还有原生与协作协议。',
    prereqs: ['ai-mcp'],
    next: ['ai-rules'],
    position: LAYOUT.topics['ai-protocol-forks'],
    markdown: aiProtocolForks,
  },
  {
    id: 'ai-rules',
    kind: 'topic',
    parentId: CH_AI,
    label: 'Rules',
    subtitle: '常驻护栏',
    tag: '05 · 操作面',
    role: '为何需要硬约束，而不是每次重说。',
    prereqs: ['ai-protocol-forks'],
    next: ['ai-skills'],
    position: LAYOUT.topics['ai-rules'],
    markdown: aiRules,
  },
  {
    id: 'ai-skills',
    kind: 'topic',
    parentId: CH_AI,
    label: 'Skills',
    subtitle: '按需流程包',
    tag: '05 · 操作面',
    role: 'Rules 太胖时，渐进披露的技能包。',
    prereqs: ['ai-rules'],
    next: ['ai-subagent'],
    position: LAYOUT.topics['ai-skills'],
    markdown: aiSkills,
  },
  {
    id: 'ai-subagent',
    kind: 'topic',
    parentId: CH_AI,
    label: '子代理',
    subtitle: '隔离与并行',
    tag: '05 · 操作面',
    role: '主对话被噪音占满时的委派工人。',
    prereqs: ['ai-skills'],
    next: ['ai-cli'],
    position: LAYOUT.topics['ai-subagent'],
    markdown: aiSubagent,
  },
  {
    id: 'ai-cli',
    kind: 'topic',
    parentId: CH_AI,
    label: 'Agent CLI',
    subtitle: '终端里的 Agent',
    tag: '05 · 操作面',
    role: '无 GUI / SSH / 自动化场景。',
    prereqs: ['ai-subagent'],
    next: ['ai-agents-md'],
    position: LAYOUT.topics['ai-cli'],
    markdown: aiCli,
  },
  {
    id: 'ai-agents-md',
    kind: 'topic',
    parentId: CH_AI,
    label: 'AGENTS.md',
    subtitle: '跨工具项目说明书',
    tag: '05 · 操作面',
    role: '给施工队的交底单。',
    prereqs: ['ai-cli'],
    next: [],
    position: LAYOUT.topics['ai-agents-md'],
    markdown: aiAgentsMd,
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
    prereqs: [
      'network-basics',
      'tcp-udp',
      'routing-nat',
      'dns-https',
      'reverse-proxy',
      'net-edge-practice',
    ],
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
  { id: 'e-chip-lang', source: 'chip-units', target: 'lang-what-is-language', sourceHandle: 'right', targetHandle: 'left', label: '指令从哪来', branch: 'c2', animated: true },
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
  { id: 'e-what-fw', source: 'lang-what-is-language', target: 'lang-library-framework', sourceHandle: 'right', targetHandle: 'left', label: '语言之上', branch: 'c2', animated: true },
  { id: 'e-fw-stack', source: 'lang-library-framework', target: 'lang-tech-stack', sourceHandle: 'right', targetHandle: 'left', label: '拼成技术栈', branch: 'c2', animated: true },
  { id: 'e-stack-sel', source: 'lang-tech-stack', target: 'lang-tech-selection', sourceHandle: 'right', targetHandle: 'left', label: '如何选型', branch: 'c2', animated: true },
  { id: 'e-what-cr', source: 'lang-what-is-language', target: 'lang-compiled-runtime', sourceHandle: 'bottom', targetHandle: 'top', label: '如何变成进程', branch: 'c2' },
  { id: 'e-sel-map', source: 'lang-tech-selection', target: 'lang-landscape', sourceHandle: 'bottom', targetHandle: 'top', label: '候选语言画像', branch: 'c2' },
  { id: 'e-stack-xrk', source: 'lang-tech-stack', target: 'xrk-language-stack', sourceHandle: 'right', targetHandle: 'top', label: '本仓栈落地', branch: 'bridge' },
  { id: 'e-sel-xrk', source: 'lang-tech-selection', target: 'xrk-language-stack', sourceHandle: 'right', targetHandle: 'left', label: '选型结果复述', branch: 'bridge' },
  { id: 'e-lang-map', source: 'lang-compiled-runtime', target: 'lang-landscape', sourceHandle: 'right', targetHandle: 'left', label: '放到层次图', branch: 'c2' },
  { id: 'e-land-js', source: 'lang-landscape', target: 'lang-javascript', sourceHandle: 'bottom', targetHandle: 'top', label: '主服语言', branch: 'c2', animated: true },
  { id: 'e-land-ts', source: 'lang-landscape', target: 'lang-typescript', sourceHandle: 'bottom', targetHandle: 'top', label: '类型层', branch: 'c2' },
  { id: 'e-land-py', source: 'lang-landscape', target: 'lang-python', sourceHandle: 'bottom', targetHandle: 'top', label: '默认子服', branch: 'c2', animated: true },
  { id: 'e-land-go', source: 'lang-landscape', target: 'lang-go', sourceHandle: 'bottom', targetHandle: 'top', label: '并发路径', branch: 'c2' },
  { id: 'e-land-rs', source: 'lang-landscape', target: 'lang-rust', sourceHandle: 'bottom', targetHandle: 'top', label: '性能路径', branch: 'c2' },
  { id: 'e-land-java', source: 'lang-landscape', target: 'lang-java', sourceHandle: 'bottom', targetHandle: 'top', label: 'JVM', branch: 'c2' },
  { id: 'e-land-cs', source: 'lang-landscape', target: 'lang-csharp', sourceHandle: 'bottom', targetHandle: 'top', label: 'CLR', branch: 'c2' },
  { id: 'e-land-php', source: 'lang-landscape', target: 'lang-php', sourceHandle: 'bottom', targetHandle: 'top', label: '轻量脚本', branch: 'c2' },
  { id: 'e-land-c', source: 'lang-landscape', target: 'lang-c', sourceHandle: 'right', targetHandle: 'top', label: '近金属', branch: 'c2' },
  { id: 'e-js-ts', source: 'lang-javascript', target: 'lang-typescript', sourceHandle: 'right', targetHandle: 'left', label: '超集', branch: 'c2' },
  { id: 'e-c-rust', source: 'lang-c', target: 'lang-rust', sourceHandle: 'bottom', targetHandle: 'right', label: '安全系统级', branch: 'c2' },
  { id: 'e-java-cs', source: 'lang-java', target: 'lang-csharp', sourceHandle: 'right', targetHandle: 'left', label: '托管对照', branch: 'c2' },
  { id: 'e-js-tr', source: 'lang-javascript', target: 'lang-to-runtime', sourceHandle: 'bottom', targetHandle: 'left', label: '主服契约', branch: 'c2', animated: true },
  { id: 'e-py-tr', source: 'lang-python', target: 'lang-to-runtime', sourceHandle: 'bottom', targetHandle: 'top', label: '子服入口', branch: 'c2' },
  { id: 'e-lang-land', source: 'lang-landscape', target: 'lang-to-runtime', sourceHandle: 'bottom', targetHandle: 'top', label: '汇总落地', branch: 'c2' },

  /* → 第四章（融会桥） */
  { id: 'e-run-xrk', source: 'xrk-first-run', target: 'xrk-overview', sourceHandle: 'right', targetHandle: 'left', label: '进入项目实践', branch: 'c4', animated: true },
  { id: 'e-lang-xrk', source: 'lang-to-runtime', target: 'xrk-overview', sourceHandle: 'right', targetHandle: 'left', label: '语言契约对齐', branch: 'bridge', animated: true },
  { id: 'e-lang-stack', source: 'lang-to-runtime', target: 'xrk-language-stack', sourceHandle: 'bottom', targetHandle: 'left', label: '主服+子服落地', branch: 'bridge' },
  { id: 'e-node-stack', source: 'runtime-nodejs', target: 'xrk-language-stack', sourceHandle: 'right', targetHandle: 'top', label: 'Node 引擎', branch: 'bridge' },
  { id: 'e-land-stack', source: 'lang-landscape', target: 'xrk-language-stack', sourceHandle: 'right', targetHandle: 'left', label: '版图落到多 runtime', branch: 'bridge' },
  { id: 'e-api-xrk', source: 'api-frontend', target: 'xrk-overview', sourceHandle: 'right', targetHandle: 'left', label: '前后端落到本仓', branch: 'bridge' },
  { id: 'e-api-http-xrk', source: 'api-frontend', target: 'xrk-http-www', sourceHandle: 'bottom', targetHandle: 'top', label: 'API 落点', branch: 'bridge' },
  { id: 'e-http-xrk', source: 'http-web', target: 'xrk-http-www', sourceHandle: 'right', targetHandle: 'left', label: 'HTTP 落到本仓', branch: 'bridge', animated: true },
  { id: 'e-proxy-xrk', source: 'reverse-proxy', target: 'xrk-http-www', sourceHandle: 'right', targetHandle: 'bottom', label: '挂载≈入口分流', branch: 'bridge' },
  { id: 'e-tcp-sub', source: 'tcp-udp', target: 'xrk-subserver', sourceHandle: 'right', targetHandle: 'left', label: '子服也是端口', branch: 'bridge' },
  { id: 'e-os-rt', source: 'os-essence', target: 'xrk-runtime', sourceHandle: 'right', targetHandle: 'left', label: '进程内中枢', branch: 'bridge' },
  { id: 'e-pnpm-cfg', source: 'package-managers', target: 'xrk-config', sourceHandle: 'right', targetHandle: 'top', label: '契约类比', branch: 'bridge' },

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
  { id: 'e-proxy-edge', source: 'reverse-proxy', target: 'net-edge-practice', sourceHandle: 'bottom', targetHandle: 'top', label: '边缘与出口落地', branch: 'c3', animated: true },
  { id: 'e-dns-edge', source: 'dns-https', target: 'net-edge-practice', sourceHandle: 'right', targetHandle: 'left', label: 'DNS/污染对照', branch: 'c3' },
  { id: 'e-route-edge', source: 'routing-nat', target: 'net-edge-practice', sourceHandle: 'bottom', targetHandle: 'left', label: 'IP 池与防火墙', branch: 'c3' },
  { id: 'e-edge-xrk', source: 'net-edge-practice', target: 'xrk-http-www', sourceHandle: 'right', targetHandle: 'bottom', label: '上线入口对照', branch: 'bridge' },
  { id: 'e-edge-clash', source: 'net-edge-practice', target: 'clash', sourceHandle: 'bottom', targetHandle: 'top', label: '客户端选路', branch: 'side' },

  /* 第四章内 */
  { id: 'e-xrk-rt', source: 'xrk-overview', target: 'xrk-runtime', sourceHandle: 'bottom', targetHandle: 'top', label: '进程心脏', branch: 'c4' },
  { id: 'e-xrk-core', source: 'xrk-overview', target: 'xrk-core-layout', sourceHandle: 'right', targetHandle: 'left', label: '业务往哪放', branch: 'c4' },
  { id: 'e-xrk-ov-plug', source: 'xrk-overview', target: 'xrk-plugin-arch', sourceHandle: 'right', targetHandle: 'top', label: '如何可插拔', branch: 'c4' },
  { id: 'e-xrk-ov-lang', source: 'xrk-overview', target: 'xrk-language-stack', sourceHandle: 'right', targetHandle: 'left', label: '语言分工', branch: 'c4' },
  { id: 'e-xrk-rt-plug', source: 'xrk-runtime', target: 'xrk-plugin-arch', sourceHandle: 'right', targetHandle: 'left', label: 'Loader 挂载', branch: 'c4', animated: true },
  { id: 'e-xrk-core-plug', source: 'xrk-core-layout', target: 'xrk-plugin-arch', sourceHandle: 'bottom', targetHandle: 'top', label: '目录即扩展点', branch: 'c4' },
  { id: 'e-xrk-plug-http', source: 'xrk-plugin-arch', target: 'xrk-http-www', sourceHandle: 'right', targetHandle: 'left', label: '对外暴露', branch: 'c4' },
  { id: 'e-xrk-core-http', source: 'xrk-core-layout', target: 'xrk-http-www', sourceHandle: 'right', targetHandle: 'left', label: 'http / www', branch: 'c4' },
  { id: 'e-xrk-rt-http', source: 'xrk-runtime', target: 'xrk-http-www', sourceHandle: 'right', targetHandle: 'bottom', label: '挂到 Runtime', branch: 'c4' },
  { id: 'e-xrk-lang-sub', source: 'xrk-language-stack', target: 'xrk-subserver', sourceHandle: 'right', targetHandle: 'left', label: '多语言子服族', branch: 'c4', animated: true },
  { id: 'e-xrk-plug-sub', source: 'xrk-plugin-arch', target: 'xrk-subserver', sourceHandle: 'right', targetHandle: 'bottom', label: '子服也可插拔', branch: 'c4' },
  { id: 'e-xrk-http-sub', source: 'xrk-http-www', target: 'xrk-subserver', sourceHandle: 'right', targetHandle: 'top', label: '经主服门面调', branch: 'c4' },
  { id: 'e-xrk-cfg', source: 'xrk-core-layout', target: 'xrk-config', sourceHandle: 'right', targetHandle: 'left', label: '配置契约', branch: 'c4' },
  { id: 'e-xrk-http-cfg', source: 'xrk-http-www', target: 'xrk-config', sourceHandle: 'right', targetHandle: 'bottom', label: '配与码对齐', branch: 'c4' },
  { id: 'e-xrk-sub-cfg', source: 'xrk-subserver', target: 'xrk-config', sourceHandle: 'top', targetHandle: 'bottom', label: '配置在主服', branch: 'c4' },
  { id: 'e-xrk-http-stream', source: 'xrk-http-www', target: 'xrk-stream', sourceHandle: 'bottom', targetHandle: 'top', label: '对话入口', branch: 'c4', animated: true },
  { id: 'e-xrk-cfg-stream', source: 'xrk-config', target: 'xrk-stream', sourceHandle: 'bottom', targetHandle: 'right', label: 'ai-workflow 配', branch: 'c4' },
  { id: 'e-xrk-plug-stream', source: 'xrk-plugin-arch', target: 'xrk-stream', sourceHandle: 'bottom', targetHandle: 'left', label: 'workflow 扩展点', branch: 'c4' },
  { id: 'e-xrk-lang-stream', source: 'xrk-language-stack', target: 'xrk-stream', sourceHandle: 'bottom', targetHandle: 'top', label: '主服跑工作流', branch: 'c4' },
  { id: 'e-xrk-sub-stream', source: 'xrk-subserver', target: 'xrk-stream', sourceHandle: 'bottom', targetHandle: 'right', label: '工具可调子服', branch: 'c4' },
  { id: 'e-stream-ai', source: 'xrk-stream', target: 'ai-what', sourceHandle: 'bottom', targetHandle: 'top', label: '进入第五章', branch: 'c5', animated: true },
  { id: 'e-ai-llm', source: 'ai-what', target: 'ai-llm-era', sourceHandle: 'right', targetHandle: 'left', label: '方法换代', branch: 'c5' },
  { id: 'e-ai-types', source: 'ai-llm-era', target: 'ai-model-types', sourceHandle: 'right', targetHandle: 'left', label: '先分类型', branch: 'c5' },
  { id: 'e-ai-beyond', source: 'ai-model-types', target: 'ai-arch-beyond', sourceHandle: 'right', targetHandle: 'left', label: '架构不止一种', branch: 'c5' },
  { id: 'e-ai-tf', source: 'ai-arch-beyond', target: 'ai-transformer', sourceHandle: 'right', targetHandle: 'left', label: '主流骨干', branch: 'c5', animated: true },
  { id: 'e-ai-ft', source: 'ai-transformer', target: 'ai-finetune', sourceHandle: 'right', targetHandle: 'left', label: '上岗培训', branch: 'c5' },
  { id: 'e-ai-chat', source: 'ai-finetune', target: 'ai-chat-era', sourceHandle: 'right', targetHandle: 'left', label: '产品化', branch: 'c5' },
  { id: 'e-ai-cc', source: 'ai-chat-era', target: 'ai-openai-protocol', sourceHandle: 'bottom', targetHandle: 'top', label: '可编程会话', branch: 'c5' },
  { id: 'e-ai-tools', source: 'ai-openai-protocol', target: 'ai-tool-calling', sourceHandle: 'right', targetHandle: 'left', label: '能提行动', branch: 'c5', animated: true },
  { id: 'e-ai-agent', source: 'ai-tool-calling', target: 'ai-agent-birth', sourceHandle: 'right', targetHandle: 'left', label: 'Agent 形态', branch: 'c5', animated: true },
  { id: 'e-ai-rag', source: 'ai-agent-birth', target: 'ai-rag', sourceHandle: 'right', targetHandle: 'left', label: '接私有知识', branch: 'c5' },
  { id: 'e-ai-arag', source: 'ai-rag', target: 'ai-agentic-rag', sourceHandle: 'right', targetHandle: 'left', label: '多轮检索', branch: 'c5' },
  { id: 'e-ai-ragshift', source: 'ai-agentic-rag', target: 'ai-rag-shift', sourceHandle: 'right', targetHandle: 'left', label: '观念更新', branch: 'c5' },
  { id: 'e-ai-mcp', source: 'ai-rag-shift', target: 'ai-mcp', sourceHandle: 'right', targetHandle: 'left', label: '标准插头', branch: 'c5', animated: true },
  { id: 'e-ai-forks', source: 'ai-mcp', target: 'ai-protocol-forks', sourceHandle: 'bottom', targetHandle: 'top', label: '继续分层', branch: 'c5' },
  { id: 'e-ai-rules', source: 'ai-protocol-forks', target: 'ai-rules', sourceHandle: 'right', targetHandle: 'left', label: '驯服 Agent', branch: 'c5' },
  { id: 'e-ai-skills', source: 'ai-rules', target: 'ai-skills', sourceHandle: 'right', targetHandle: 'left', label: '按需手册', branch: 'c5', animated: true },
  { id: 'e-ai-sub', source: 'ai-skills', target: 'ai-subagent', sourceHandle: 'right', targetHandle: 'left', label: '委派', branch: 'c5' },
  { id: 'e-ai-cli', source: 'ai-subagent', target: 'ai-cli', sourceHandle: 'right', targetHandle: 'left', label: '终端面', branch: 'c5' },
  { id: 'e-ai-agentsmd', source: 'ai-cli', target: 'ai-agents-md', sourceHandle: 'right', targetHandle: 'left', label: '项目交底', branch: 'c5', animated: true },

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
  const CARD_CX = 125;
  const CARD_CY = 48;

  const edges = knowledgeEdges.map((e) => {
    const sp = posMap.get(e.source);
    const tp = posMap.get(e.target);
    const inferred =
      sp && tp
        ? inferHandles(sp, tp)
        : { sourceHandle: e.sourceHandle || 'right', targetHandle: e.targetHandle || 'left' };

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

    const dist =
      sp && tp
        ? Math.hypot(
            tp.x + CARD_CX - (sp.x + CARD_CX),
            tp.y + CARD_CY - (sp.y + CARD_CY)
          )
        : 0;

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
        pathKind: pathKindFor(branch, sameChapter, dist),
        label: e.label,
      },
      interactive: true,
      focusable: false,
      zIndex: 1,
    };
  });

  assignBundleOffsets(edges);
  assignFanoutOffsets(edges, posMap);
  assignFaninOffsets(edges);
  return edges;
}

export function getOriginPositions() {
  const map = new Map();
  for (const f of graphFrames) map.set(f.id, { ...f.position });
  for (const n of knowledgeNodes) map.set(n.id, topicAbsPosition(n));
  return map;
}
