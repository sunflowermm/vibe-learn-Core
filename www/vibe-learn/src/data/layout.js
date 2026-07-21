/**
 * 章框顶栏安全区：标题条约 120×440，框内节点须避开。
 */
const TOP = 120;
const COL0 = 480;

export const LAYOUT = {
  /* 序章 · 认识计算机 */
  frameMachine: { x: 40, y: -1180, width: 1680, height: 560 },
  /* 第一章 · 环境与终端 */
  frameEnv: { x: 40, y: -540, width: 2920, height: 720 },
  /* 第二章 · 计算机语言 */
  frameLang: { x: 2640, y: -540, width: 1080, height: 720 },
  /* 第三章 · 计算机网络 */
  frameNet: { x: 40, y: 280, width: 2680, height: 740 },
  /* 第四章 · XRK 实践 */
  frameXrk: { x: 2840, y: 280, width: 1120, height: 740 },
  /* 番外 */
  frameClash: { x: 80, y: 1120, width: 1520, height: 420 },

  topics: {
    /* 序章 · 机器 */
    'computer-system': { x: 48, y: 280 },
    'os-essence': { x: COL0, y: TOP },
    'hw-sw-link': { x: COL0, y: 320 },
    'chip-units': { x: 920, y: 200 },

    /* 第一章 · 环境 */
    'terminal-worlds': { x: 48, y: 280 },
    'linux-distros': { x: COL0, y: TOP },
    'linux-cli': { x: COL0, y: 400 },
    'runtime-nodejs': { x: 920, y: TOP },
    'installers-path': { x: 920, y: 400 },
    'package-managers': { x: 1360, y: 200 },
    'git-workspace': { x: 1800, y: TOP },
    'git-forges': { x: 1800, y: 400 },
    'xrk-first-run': { x: 2240, y: 200 },

    /* 第二章 · 语言 */
    'lang-compiled-runtime': { x: 48, y: TOP },
    'lang-landscape': { x: 48, y: 340 },
    'lang-to-runtime': { x: 420, y: 220 },

    /* 第三章 · 网络 */
    'api-frontend': { x: COL0, y: TOP },
    'network-basics': { x: COL0, y: 460 },
    'protocol-stack': { x: 880, y: 270 },
    'ip-addressing': { x: 1260, y: TOP },
    'tcp-udp': { x: 1260, y: 460 },
    'routing-nat': { x: 1640, y: TOP },
    'dns-https': { x: 1640, y: 460 },
    'http-web': { x: 2040, y: 260 },
    'reverse-proxy': { x: 2360, y: 280 },

    /* 第四章 · XRK */
    'xrk-overview': { x: 48, y: TOP },
    'xrk-runtime': { x: 48, y: 340 },
    'xrk-core-layout': { x: 420, y: 200 },
    'xrk-http-www': { x: 420, y: 460 },
    'xrk-config': { x: 780, y: 340 },

    /* 番外 */
    clash: { x: 56, y: TOP },
    'clash-port': { x: 500, y: TOP },
    'clash-setup': { x: 940, y: TOP },
  },
};
