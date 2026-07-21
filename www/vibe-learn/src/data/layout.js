/**
 * 章框顶栏安全区：标题条约 120×440，框内节点须避开。
 */
const TOP = 120;
const COL0 = 480;
const GAP = 340;

export const LAYOUT = {
  /* 序章 · 认识计算机 */
  frameMachine: { x: 40, y: -1180, width: 1680, height: 560 },
  /* 第一章 · 环境与终端 */
  frameEnv: { x: 40, y: -540, width: 2920, height: 720 },
  /* 第二章 · 计算机语言 */
  frameLang: { x: 2640, y: -540, width: 1080, height: 720 },
  /* 第三章 · 计算机网络 */
  frameNet: { x: 40, y: 280, width: 2680, height: 740 },
  /* 第四章 · XRK 实践（融会枢纽） */
  frameXrk: { x: 2840, y: 200, width: 1680, height: 980 },
  /* 第五章 · 人工智能 */
  frameAi: { x: 40, y: 1280, width: 4920, height: 1180 },
  /* 番外 */
  frameClash: { x: 80, y: 2620, width: 1520, height: 420 },

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

    /* 第四章 · XRK 融会 */
    'xrk-overview': { x: 48, y: TOP },
    'xrk-runtime': { x: 48, y: 400 },
    'xrk-core-layout': { x: 400, y: TOP },
    'xrk-plugin-arch': { x: 400, y: 400 },
    'xrk-http-www': { x: 760, y: TOP },
    'xrk-language-stack': { x: 760, y: 400 },
    'xrk-config': { x: 1120, y: TOP },
    'xrk-subserver': { x: 1120, y: 400 },
    'xrk-stream': { x: 760, y: 680 },

    /* 第五章 · AI · 三排时间线 */
    'ai-what': { x: 48, y: TOP },
    'ai-llm-era': { x: 48 + GAP, y: TOP },
    'ai-model-types': { x: 48 + GAP * 2, y: TOP },
    'ai-arch-beyond': { x: 48 + GAP * 3, y: TOP },
    'ai-transformer': { x: 48 + GAP * 4, y: TOP },
    'ai-finetune': { x: 48 + GAP * 5, y: TOP },
    'ai-chat-era': { x: 48 + GAP * 6, y: TOP },

    'ai-openai-protocol': { x: 48, y: 420 },
    'ai-tool-calling': { x: 48 + GAP, y: 420 },
    'ai-agent-birth': { x: 48 + GAP * 2, y: 420 },
    'ai-rag': { x: 48 + GAP * 3, y: 420 },
    'ai-agentic-rag': { x: 48 + GAP * 4, y: 420 },
    'ai-rag-shift': { x: 48 + GAP * 5, y: 420 },
    'ai-mcp': { x: 48 + GAP * 6, y: 420 },

    'ai-protocol-forks': { x: 48, y: 740 },
    'ai-rules': { x: 48 + GAP, y: 740 },
    'ai-skills': { x: 48 + GAP * 2, y: 740 },
    'ai-subagent': { x: 48 + GAP * 3, y: 740 },
    'ai-cli': { x: 48 + GAP * 4, y: 740 },
    'ai-agents-md': { x: 48 + GAP * 5, y: 740 },

    /* 番外 */
    clash: { x: 56, y: TOP },
    'clash-port': { x: 500, y: TOP },
    'clash-setup': { x: 940, y: TOP },
  },
};
