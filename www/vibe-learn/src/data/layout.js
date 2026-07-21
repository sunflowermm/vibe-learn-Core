/**
 * 图谱布局：错落 DAG，避免「两行对齐」导致边线叠成梳子。
 * 坐标为章框相对位置；框外 stub 用绝对坐标。
 */
export const LAYOUT = {
  frame: { x: 60, y: 220, width: 2780, height: 620 },
  /** 卡片约 280×120，列距 / 行错落加大 */
  topics: {
    'computer-system': { x: 56, y: 230 },
    'api-frontend': { x: 400, y: 56 },
    'network-basics': { x: 400, y: 400 },
    'protocol-stack': { x: 760, y: 210 },
    'ip-addressing': { x: 1140, y: 40 },
    'tcp-udp': { x: 1140, y: 420 },
    'routing-nat': { x: 1520, y: 20 },
    'dns-https': { x: 1520, y: 440 },
    'http-web': { x: 1920, y: 200 },
    'reverse-proxy': { x: 2320, y: 220 },
  },
  /** 框外：第二章贴 api 上方；番外扇形错落在下方，减少竖直平行线 */
  stubs: {
    'stub-xrk-agt': { x: 420, y: 24 },
    clash: { x: 360, y: 920 },
    'clash-port': { x: 820, y: 980 },
    'clash-setup': { x: 1280, y: 920 },
  },
};
