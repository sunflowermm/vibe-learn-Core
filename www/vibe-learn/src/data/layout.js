/**
 * 章框与卡片布局。
 * 连线原则：方块迁就边（见 layout-from-edges.js），不靠绕障折线躲卡片。
 */
import {
  chainRowPositions,
  hubSpokePositions,
  snakeRowPositions,
} from '../utils/layout-from-edges.js';

const TOP = 120;
const COL0 = 480;
const GAP = 340;

/* —— 第五章 AI：蛇形折返，行末竖线接到下一行 —— */
const AI_SNAKE = snakeRowPositions(
  [
    [
      'ai-what',
      'ai-llm-era',
      'ai-model-types',
      'ai-arch-beyond',
      'ai-transformer',
      'ai-finetune',
      'ai-chat-era',
    ],
    [
      'ai-openai-protocol',
      'ai-tool-calling',
      'ai-agent-birth',
      'ai-rag',
      'ai-agentic-rag',
      'ai-rag-shift',
      'ai-mcp',
    ],
    [
      'ai-protocol-forks',
      'ai-rules',
      'ai-skills',
      'ai-subagent',
      'ai-cli',
      'ai-agents-md',
    ],
  ],
  { originX: 48, originY: TOP, colGap: 300, rowGap: 280 }
);

/* —— 第二章语言：概念链 + 枢纽侧列，扇出不交叉 —— */
const LANG_CONCEPTS = chainRowPositions(
  [
    'lang-what-is-language',
    'lang-library-framework',
    'lang-tech-stack',
    'lang-tech-selection',
  ],
  { x: 48, y: TOP, gap: 340 }
);

const LANG_MODEL = {
  'lang-compiled-runtime': { x: 48, y: 320 },
  /* 落在「技术选型」正下方，概念→版图竖线短、不斜穿 */
  'lang-landscape': { x: 48 + 340 * 3, y: 320 },
};

const LANG_SPOKES = hubSpokePositions(
  'lang-landscape',
  [
    'lang-javascript',
    'lang-typescript',
    'lang-python',
    'lang-go',
    'lang-rust',
    'lang-java',
    'lang-csharp',
    'lang-php',
    'lang-c',
  ],
  {
    hub: LANG_MODEL['lang-landscape'],
    childX: 48 + 340 * 3 + 380,
    childGap: 108,
    align: 'top',
  }
);

const LANG_TOPICS = {
  ...LANG_CONCEPTS,
  ...LANG_MODEL,
  ...LANG_SPOKES,
  /* 落地汇入：放在侧列下方，竖线接 landscape / js / python */
  'lang-to-runtime': { x: LANG_SPOKES['lang-javascript'].x, y: LANG_SPOKES['lang-c'].y + 130 },
};

const langMaxY = Math.max(...Object.values(LANG_TOPICS).map((p) => p.y));
const langMaxX = Math.max(...Object.values(LANG_TOPICS).map((p) => p.x));
const aiMaxY = Math.max(...Object.values(AI_SNAKE).map((p) => p.y));
const aiMaxX = Math.max(...Object.values(AI_SNAKE).map((p) => p.x));

export const LAYOUT = {
  frameMachine: { x: 40, y: -1180, width: 1680, height: 560 },
  frameEnv: { x: 40, y: -540, width: 2920, height: 720 },
  /* 语言章：侧列拉高，框贴内容 */
  frameLang: {
    x: 2640,
    y: -540,
    width: Math.ceil(langMaxX + 320),
    height: Math.ceil(langMaxY + 200),
  },
  frameNet: { x: 40, y: 280, width: 3020, height: 820 },
  /* XRK 贴在语言框右侧，缩短跨章桥 */
  frameXrk: {
    x: 2640 + Math.ceil(langMaxX + 320) + 40,
    y: 200,
    width: 1680,
    height: 980,
  },
  /* AI：蛇形三排，框贴内容（不再拉满画布） */
  frameAi: {
    x: 40,
    y: 1160,
    width: Math.ceil(aiMaxX + 320),
    height: Math.ceil(aiMaxY + 200),
  },
  frameClash: { x: 80, y: 1160 + Math.ceil(aiMaxY + 200) + 40, width: 1520, height: 420 },

  topics: {
    'computer-system': { x: 48, y: 280 },
    'os-essence': { x: COL0, y: TOP },
    'hw-sw-link': { x: COL0, y: 320 },
    'chip-units': { x: 920, y: 200 },

    'terminal-worlds': { x: 48, y: 280 },
    'linux-distros': { x: COL0, y: TOP },
    'linux-cli': { x: COL0, y: 400 },
    'runtime-nodejs': { x: 920, y: TOP },
    'installers-path': { x: 920, y: 400 },
    'package-managers': { x: 1360, y: 200 },
    'git-workspace': { x: 1800, y: TOP },
    'git-forges': { x: 1800, y: 400 },
    'xrk-first-run': { x: 2240, y: 200 },

    ...LANG_TOPICS,

    'api-frontend': { x: COL0, y: TOP },
    'network-basics': { x: COL0, y: 460 },
    'protocol-stack': { x: 880, y: 270 },
    'ip-addressing': { x: 1260, y: TOP },
    'tcp-udp': { x: 1260, y: 460 },
    'routing-nat': { x: 1640, y: TOP },
    'dns-https': { x: 1640, y: 460 },
    'http-web': { x: 2040, y: 260 },
    'reverse-proxy': { x: 2360, y: 200 },
    'net-edge-practice': { x: 2360, y: 480 },

    'xrk-overview': { x: 48, y: TOP },
    'xrk-runtime': { x: 48, y: 400 },
    'xrk-core-layout': { x: 400, y: TOP },
    'xrk-plugin-arch': { x: 400, y: 400 },
    'xrk-http-www': { x: 760, y: TOP },
    'xrk-language-stack': { x: 760, y: 400 },
    'xrk-config': { x: 1120, y: TOP },
    'xrk-subserver': { x: 1120, y: 400 },
    'xrk-stream': { x: 760, y: 680 },

    ...AI_SNAKE,

    clash: { x: 56, y: TOP },
    'clash-port': { x: 500, y: TOP },
    'clash-setup': { x: 940, y: TOP },
  },
};

/* 供调试 / 文档：当前使用的布局常量 */
export const LAYOUT_META = {
  GAP,
  AI_SNAKE,
  LANG_TOPICS,
};
