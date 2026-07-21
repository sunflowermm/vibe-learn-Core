/**
 * 零基础术语表（按学习出现顺序维护）
 * brief：一句话人话；also：相关节点 id，供面板跳转
 */

/** @typedef {{ term: string, brief: string, also?: string[] }} GlossaryEntry */

/** @type {Record<string, GlossaryEntry>} */
export const GLOSSARY = {
  /* —— 序章 · 机器 —— */
  hardware: {
    term: '硬件（Hardware）',
    brief: '摸得着的部件：CPU、内存条、硬盘、网卡、屏幕等。软件要靠它们才能真正「动起来」。',
    also: ['hw-sw-link', 'chip-units'],
  },
  software: {
    term: '软件（Software）',
    brief: '程序与数据的合称：告诉硬件「做什么、按什么顺序做」的说明书与工序。',
    also: ['hw-sw-link', 'computer-system'],
  },
  os: {
    term: '操作系统（OS, Operating System）',
    brief: '管理整台电脑资源的「总管」：谁用 CPU、谁读写磁盘、谁上网，都要经它批准。Windows、macOS、Linux 都是 OS。',
    also: ['os-essence', 'terminal-worlds'],
  },
  kernel: {
    term: '内核（Kernel）',
    brief: '操作系统最核心、权限最高的那一层，能直接驱动硬件；普通程序不能随便进内核。',
    also: ['os-essence'],
  },
  userland: {
    term: '用户态（User space）',
    brief: '普通应用运行的「平民区」：浏览器、编辑器、Node 都在这里；要碰硬件必须请内核帮忙。',
    also: ['os-essence'],
  },
  syscall: {
    term: '系统调用（System call）',
    brief: '用户态程序向内核「打申请」的标准入口，例如打开文件、创建进程、收发网络数据。',
    also: ['os-essence', 'linux-cli'],
  },
  process: {
    term: '进程（Process）',
    brief: '正在运行的一个程序实例。同个软件开两次，通常就是两个进程。',
    also: ['os-essence', 'linux-cli'],
  },
  thread: {
    term: '线程（Thread）',
    brief: '进程内部的一条执行线。一个进程可以有多条线程，同时干几件事。',
    also: ['os-essence'],
  },
  virtual_memory: {
    term: '虚拟内存（Virtual memory）',
    brief: 'OS 给每个进程「假装独占一大片地址空间」的技术；实际映射到物理内存或磁盘交换区。',
    also: ['os-essence'],
  },
  file_system: {
    term: '文件系统（File system）',
    brief: '把磁盘上的字节组织成「文件 / 文件夹」的规则与实现，如 NTFS、ext4。',
    also: ['os-essence', 'linux-cli'],
  },
  socket: {
    term: '套接字（Socket）',
    brief: '程序用来收发网络数据的「门把手」。你写的网络代码，底层几乎都握着某个 socket。',
    also: ['os-essence', 'tcp-udp'],
  },
  cpu: {
    term: 'CPU（Central Processing Unit）',
    brief: '中央处理器：通用计算与决策的主力，负责执行绝大多数程序指令。',
    also: ['chip-units'],
  },
  gpu: {
    term: 'GPU（Graphics Processing Unit）',
    brief: '图形 / 并行计算处理器：擅长大量相似运算同时做，常用于画面与部分 AI。',
    also: ['chip-units'],
  },
  ram: {
    term: '内存 / RAM',
    brief: '正在干活时暂存程序与数据的高速仓库；断电内容通常丢失。',
    also: ['chip-units', 'os-essence'],
  },
  driver: {
    term: '驱动（Driver）',
    brief: '教操作系统如何与某块具体硬件「说话」的软件，例如网卡驱动、显卡驱动。',
    also: ['hw-sw-link'],
  },

  /* —— 第一章 · 环境 —— */
  terminal: {
    term: '终端（Terminal）',
    brief: '用来打字下命令、看文字输出的窗口程序（如 Windows Terminal、macOS「终端」）。它本身不解释命令。',
    also: ['terminal-worlds'],
  },
  shell: {
    term: 'Shell（壳）',
    brief: '终端窗口里真正解析你输入文字的程序：bash、zsh、PowerShell 都是 Shell。',
    also: ['terminal-worlds', 'linux-cli'],
  },
  cli: {
    term: '命令行（CLI, Command Line Interface）',
    brief: '用文字命令而不是鼠标菜单来操作系统的方式。',
    also: ['terminal-worlds', 'linux-cli'],
  },
  ssh: {
    term: 'SSH（Secure Shell）',
    brief: '加密远程登录协议：键盘在你电脑，命令跑在远端服务器上。',
    also: ['terminal-worlds'],
  },
  wsl: {
    term: 'WSL（Windows Subsystem for Linux）',
    brief: '在 Windows 里跑一套 Linux 用户环境的技术，方便跟 Linux 教程对齐。',
    also: ['terminal-worlds', 'linux-distros'],
  },
  distro: {
    term: '发行版（Distro）',
    brief: 'Linux 内核 + 软件仓库 + 安装器 + 默认工具的「整机包装」。Ubuntu、Fedora、Arch 都是发行版。',
    also: ['linux-distros'],
  },
  package_mgr_os: {
    term: '系统包管理器',
    brief: '发行版自带的装软件工具：apt（Debian/Ubuntu）、dnf（Fedora）、pacman（Arch）等。',
    also: ['linux-distros', 'installers-path'],
  },
  sudo: {
    term: 'sudo',
    brief: '临时用管理员权限执行一条命令。提示 Permission denied 时，先想是否缺权限，而不是乱 sudo。',
    also: ['linux-cli', 'os-essence'],
  },
  path_env: {
    term: 'PATH（环境变量）',
    brief: '一串目录列表。你在 Shell 里敲 \`node\` 时，系统按 PATH 顺序找叫 node 的可执行文件。',
    also: ['installers-path', 'runtime-nodejs'],
  },
  runtime: {
    term: '运行时（Runtime）',
    brief: '能执行某类程序的引擎环境。对 JS 后端来说，常见就是 Node.js。',
    also: ['runtime-nodejs', 'lang-compiled-runtime'],
  },
  nodejs: {
    term: 'Node.js',
    brief: '让 JavaScript 在浏览器之外运行的运行时：可读文件、开端口、跑后端服务。',
    also: ['runtime-nodejs', 'lang-to-runtime'],
  },
  v8: {
    term: 'V8',
    brief: 'Google 开源的 JavaScript 引擎；Chrome 与 Node.js 都用它执行 JS。',
    also: ['runtime-nodejs'],
  },
  engines_field: {
    term: 'engines（package.json）',
    brief: '项目声明「我需要哪个版本的 Node」。版本不够，语法或依赖可能直接跑不起来。',
    also: ['runtime-nodejs', 'package-managers'],
  },
  msi: {
    term: 'MSI',
    brief: 'Windows 安装包格式，双击走系统安装向导，常顺带改 PATH。',
    also: ['installers-path'],
  },
  package_json: {
    term: 'package.json',
    brief: 'Node 项目的「清单」：叫什么名字、依赖哪些包、有哪些脚本命令。',
    also: ['package-managers', 'git-workspace'],
  },
  lockfile: {
    term: '锁文件（lockfile）',
    brief: '把依赖的精确版本钉死（如 pnpm-lock.yaml），保证你和同事装出同一棵依赖树。',
    also: ['package-managers'],
  },
  node_modules: {
    term: 'node_modules',
    brief: '依赖安装后的落地目录。一般不手工改、也不提交进 Git。',
    also: ['package-managers'],
  },
  pnpm: {
    term: 'pnpm',
    brief: '一种 Node 包管理器。本仓库只认 pnpm：按 package.json 下载并链接依赖。',
    also: ['package-managers'],
  },
  registry: {
    term: '注册表 / Registry',
    brief: '存放公开 JS 包的服务器（如 npmjs、npmmirror）。pnpm install 默认从这里拉包。',
    also: ['package-managers'],
  },
  corepack: {
    term: 'Corepack',
    brief: 'Node 自带的包管理器版本助手，可按项目声明启用指定 pnpm 版本。',
    also: ['package-managers'],
  },
  git: {
    term: 'Git',
    brief: '分布式版本控制系统：记录谁在何时改了什么，支持分支与合并。',
    also: ['git-workspace', 'git-forges'],
  },
  repo: {
    term: '仓库（Repository）',
    brief: '一套由 Git 管理的项目历史 + 文件。可以在本地，也可以托管在 GitHub/Gitee。',
    also: ['git-workspace', 'git-forges'],
  },
  clone: {
    term: '克隆（git clone）',
    brief: '把远程仓库完整（或浅）复制到你磁盘，得到带 .git 的工作区。',
    also: ['git-workspace'],
  },
  commit: {
    term: '提交（Commit）',
    brief: '一次「拍照」：把选定改动固化进历史，并附说明。',
    also: ['git-workspace'],
  },
  staging: {
    term: '暂存区（Staging area）',
    brief: 'git add 之后、commit 之前的「购物车」：决定下一次提交带走哪些改动。',
    also: ['git-workspace'],
  },
  remote: {
    term: '远程（Remote）',
    brief: '不在你电脑上的仓库副本地址，常见名叫 origin，指向 GitHub/Gitee 等。',
    also: ['git-workspace', 'git-forges'],
  },
  github: {
    term: 'GitHub',
    brief: '全球常用的 Git 托管平台：网页看代码、提 Issue、发 Pull Request、跑 CI。',
    also: ['git-forges'],
  },
  gitee: {
    term: 'Gitee（码云）',
    brief: '国内常用的 Git 托管平台，心智与 GitHub 接近；许多项目会挂镜像。',
    also: ['git-forges'],
  },
  pr: {
    term: 'Pull Request / Merge Request',
    brief: '请求把你的分支合并进目标分支的「合并申请单」，开源协作的标准动作。',
    also: ['git-forges'],
  },
  issue: {
    term: 'Issue',
    brief: '托管平台上的讨论单：报 bug、提需求，不一定立刻改代码。',
    also: ['git-forges'],
  },
  fork: {
    term: 'Fork',
    brief: '在托管平台上复制一份别人的仓库到自己账号下，再改、再提 PR。',
    also: ['git-forges'],
  },

  /* —— 第二章 · 语言 —— */
  source_code: {
    term: '源码（Source code）',
    brief: '人写的程序文本。要变成机器能调度的动作，还须编译或交给运行时。',
    also: ['lang-compiled-runtime'],
  },
  compiler: {
    term: '编译器（Compiler）',
    brief: '把源码翻译成机器码或中间码的工具，翻译多发生在「运行之前」。',
    also: ['lang-compiled-runtime'],
  },
  interpreter: {
    term: '解释器（Interpreter）',
    brief: '边读源码边执行的引擎。许多「脚本语言」给人这种直觉（实现上常更复杂）。',
    also: ['lang-compiled-runtime'],
  },
  bytecode: {
    term: '字节码（Bytecode）',
    brief: '介于源码与机器码之间的中间形式，常由虚拟机执行（如 JVM）。',
    also: ['lang-compiled-runtime'],
  },
  vm_lang: {
    term: '虚拟机（语言 VM）',
    brief: '这里指执行字节码的软件机器（JVM、CLR），不是「虚拟出一整台电脑」的那种。',
    also: ['lang-compiled-runtime'],
  },
  javascript: {
    term: 'JavaScript（JS）',
    brief: '最初为网页而生的语言；在 Node.js 上也可做后端与工具脚本。',
    also: ['lang-landscape', 'lang-to-runtime'],
  },
  typescript: {
    term: 'TypeScript（TS）',
    brief: '给 JavaScript 加上类型系统的超集；最终仍变成 JS 再运行。',
    also: ['lang-landscape'],
  },

  /* —— 第三章 · 网络 —— */
  network: {
    term: '计算机网络',
    brief: '多台计算机经线路与设备连起来，共享资源、传递信息的系统。',
    also: ['network-basics'],
  },
  lan: {
    term: '局域网（LAN）',
    brief: 'Local Area Network：家、办公室、校园这类「近、通常较快」的网络。',
    also: ['network-basics'],
  },
  wan: {
    term: '广域网（WAN）',
    brief: 'Wide Area Network：跨城跨省的远距离连接，如企业专线。',
    also: ['network-basics'],
  },
  internet: {
    term: '互联网（Internet）',
    brief: '把无数网络再连起来的「网中之网」，网页与多数在线服务跑在上面。',
    also: ['network-basics'],
  },
  bandwidth: {
    term: '带宽（Bandwidth）',
    brief: '单位时间能传输多少数据的能力，常被说成「管道有多粗」。',
    also: ['network-basics'],
  },
  latency: {
    term: '延迟（Latency）',
    brief: '从发出到收到要等多久，单位常是毫秒（ms）。',
    also: ['network-basics'],
  },
  topology: {
    term: '拓扑（Topology）',
    brief: '设备怎么连成什么形状：星型、总线、网状等。',
    also: ['network-basics'],
  },
  protocol: {
    term: '协议（Protocol）',
    brief: '通信双方事先约定好的「对话规矩」：谁先说、报文长什么样、出错怎么办。',
    also: ['protocol-stack'],
  },
  osi: {
    term: 'OSI 七层模型',
    brief: '教学用的七层网络分层参考模型，帮助理解「每一层只管一类事」。',
    also: ['protocol-stack'],
  },
  tcp_ip: {
    term: 'TCP/IP 模型',
    brief: '互联网实际运行更贴近的分层模型（常见四层说法），HTTP、TCP、IP、网卡各管一层。',
    also: ['protocol-stack'],
  },
  ip: {
    term: 'IP 地址',
    brief: '给上网设备的数字门牌号（如 192.168.1.3），用来在网络层找到「哪一台主机」。',
    also: ['ip-addressing'],
  },
  subnet: {
    term: '子网 / 掩码',
    brief: '把一大段地址切成小片的规则；用来判断「同网段还是要找网关」。',
    also: ['ip-addressing', 'routing-nat'],
  },
  port: {
    term: '端口（Port）',
    brief: '主机上的数字隔间（0–65535），用来区分「同一台机器上的哪个进程」在收数据。',
    also: ['tcp-udp', 'clash-port'],
  },
  tcp: {
    term: 'TCP',
    brief: '面向连接、可靠传输的协议：握手、确认、重传。网页 HTTP 多数跑在 TCP 上。',
    also: ['tcp-udp', 'http-web'],
  },
  udp: {
    term: 'UDP',
    brief: '无连接、轻量的传输协议：快但不保证送达，常见于视频、部分游戏与 DNS。',
    also: ['tcp-udp'],
  },
  gateway: {
    term: '网关（Gateway）',
    brief: '出本网段的「门口」设备，家里通常是路由器。',
    also: ['routing-nat'],
  },
  router: {
    term: '路由器（Router）',
    brief: '根据路由表决定数据包下一跳往哪走的设备。',
    also: ['routing-nat', 'network-basics'],
  },
  nat: {
    term: 'NAT（网络地址转换）',
    brief: '让家里多台设备共用一个公网 IP 出网的技术；路由器常做 NAT。',
    also: ['routing-nat'],
  },
  dns: {
    term: 'DNS',
    brief: 'Domain Name System：把好记的域名（example.com）翻译成 IP 地址。',
    also: ['dns-https'],
  },
  domain: {
    term: '域名（Domain name）',
    brief: '给人看的网站名字；机器真正连接时仍要靠 DNS 变成 IP。',
    also: ['dns-https'],
  },
  https: {
    term: 'HTTPS',
    brief: '在 HTTP 外包一层加密（TLS）：防窃听、防篡改，浏览器地址栏常见小锁。',
    also: ['dns-https', 'http-web'],
  },
  tls: {
    term: 'TLS / SSL',
    brief: '传输层安全协议，HTTPS 的加密与证书校验就建立在它上面（SSL 是旧称）。',
    also: ['dns-https'],
  },
  http: {
    term: 'HTTP',
    brief: '超文本传输协议：浏览器与网站（以及许多 API）交换请求/响应的应用层规矩。',
    also: ['http-web', 'api-frontend'],
  },
  api: {
    term: 'API',
    brief: 'Application Programming Interface：程序与程序约定好的调用方式，像「菜单」。',
    also: ['api-frontend'],
  },
  frontend: {
    term: '前端（Frontend）',
    brief: '用户看得见、点得着的界面一侧，常跑在浏览器或 App 里。',
    also: ['api-frontend'],
  },
  backend: {
    term: '后端（Backend）',
    brief: '跑在服务器上的业务与数据一侧，通常提供 API，界面不一定直接看见。',
    also: ['api-frontend', 'xrk-overview'],
  },
  rest: {
    term: 'REST',
    brief: '一种常用的 Web API 风格：用 URL 表示资源，用 GET/POST 等方法表示动作。',
    also: ['api-frontend', 'http-web'],
  },
  reverse_proxy: {
    term: '反向代理',
    brief: '站在服务器门口的门面：客户端以为在访问它，它再把请求转给后面的真实服务。',
    also: ['reverse-proxy'],
  },
  forward_proxy: {
    term: '正向代理',
    brief: '更靠近客户端的代理：替「你」出门访问别人，Clash 引擎更接近这一侧。',
    also: ['reverse-proxy', 'clash'],
  },

  /* —— 第四章 · XRK —— */
  agent_runtime: {
    term: 'AgentRuntime',
    brief: '本仓库的运行时心脏：拉起进程、加载插件/HTTP/工作流等扩展点。',
    also: ['xrk-runtime', 'xrk-overview'],
  },
  core_pkg: {
    term: 'Core（业务包）',
    brief: '放在 core/<名>-Core/ 下的业务能力包：插件、HTTP、www、配置等，不写进 src/ 内核。',
    also: ['xrk-core-layout'],
  },
  plugin: {
    term: '插件（Plugin）',
    brief: '挂到运行时上的可加载能力模块，常响应消息或事件。',
    also: ['xrk-core-layout'],
  },
  www_static: {
    term: 'www（静态前端）',
    brief: 'Core 里的前端静态资源目录，由框架挂到诸如 /vibe-learn/ 的路径下。',
    also: ['xrk-http-www'],
  },
  commonconfig: {
    term: 'CommonConfig',
    brief: '带 schema 的统一配置机制：模板、校验与消费代码三者要对齐。',
    also: ['xrk-config'],
  },
  http_response: {
    term: 'HttpResponse',
    brief: '本仓库统一的 HTTP 成功/失败响应封装，前端按约定解包字段。',
    also: ['xrk-http-www'],
  },
  loader: {
    term: 'Loader（加载器）',
    brief: '框架扫描 core/*/ 约定目录（plugin、http、www…）并挂到 Runtime 上的机制。',
    also: ['xrk-runtime', 'xrk-core-layout'],
  },

  /* —— 番外 · Clash —— */
  proxy_engine: {
    term: '代理引擎',
    brief: '跑在本机的选路程序：按规则决定流量直连还是经节点转发。Clash 属于此类。',
    also: ['clash'],
  },
  proxy_node: {
    term: '节点（代理节点）',
    brief: '远端跳板服务器；流量先到节点再去目标网站。',
    also: ['clash', 'clash-setup'],
  },
  subscription: {
    term: '订阅（Subscription）',
    brief: '一串可更新的节点/规则配置地址，客户端定时拉取以刷新可用节点。',
    also: ['clash-setup'],
  },
  listen: {
    term: '监听（Listen）',
    brief: '进程在某端口上等待别人连进来。代理引擎要先 listen，其它程序才能「走代理」。',
    also: ['clash-port', 'tcp-udp'],
  },
  mac: {
    term: 'MAC 地址',
    brief: '网卡出厂级的硬件地址，主要在同一局域网的链路层转发时使用；和 IP 不是同一层。',
    also: ['ip-addressing', 'protocol-stack'],
  },
  arp: {
    term: 'ARP',
    brief: 'Address Resolution Protocol：在局域网里把 IP 问成 MAC，好让交换机/网卡把帧送到正确接口。',
    also: ['ip-addressing'],
  },
  loopback: {
    term: '回环地址 127.0.0.1',
    brief: '「自己访问自己」的特殊 IP，不走出网卡。本机调试服务常用 localhost / 127.0.0.1。',
    also: ['ip-addressing', 'xrk-first-run'],
  },
  private_ip: {
    term: '私有 IP',
    brief: '仅在内网使用的地址段（如 192.168.x.x）。出公网通常要经路由器做 NAT。',
    also: ['ip-addressing', 'routing-nat'],
  },
  status_code: {
    term: 'HTTP 状态码',
    brief: '响应里的三位数：2xx 成功、4xx 客户端问题、5xx 服务器问题（如 404、502）。',
    also: ['http-web', 'reverse-proxy'],
  },
  load_balance: {
    term: '负载均衡',
    brief: '把请求分到多台后端，避免单机扛不住；常由反向代理完成。',
    also: ['reverse-proxy'],
  },
};

/**
 * @param {string[]} ids
 * @returns {GlossaryEntry[]}
 */
export function resolveGlossary(ids = []) {
  const out = [];
  const seen = new Set();
  for (const id of ids) {
    if (!id || seen.has(id)) continue;
    const entry = GLOSSARY[id];
    if (!entry) continue;
    seen.add(id);
    out.push({ id, ...entry });
  }
  return out;
}
