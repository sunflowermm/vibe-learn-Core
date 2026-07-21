/**
 * 实心色卡：字色统一白；边线用饱和同色相（靠透明度控刺眼，不压灰度）
 */
const FG = '#ffffff';
const MUTED = 'rgba(255,255,255,0.82)';

export const TONES = {
  indigo: { id: 'indigo', bg: '#4f46e5', fg: FG, muted: MUTED, edge: '#818cf8' },
  pink: { id: 'pink', bg: '#db2777', fg: FG, muted: MUTED, edge: '#f472b6' },
  sky: { id: 'sky', bg: '#0284c7', fg: FG, muted: MUTED, edge: '#38bdf8' },
  orange: { id: 'orange', bg: '#ea580c', fg: FG, muted: MUTED, edge: '#fb923c' },
  violet: { id: 'violet', bg: '#7c3aed', fg: FG, muted: MUTED, edge: '#a78bfa' },
  rose: { id: 'rose', bg: '#e11d48', fg: FG, muted: MUTED, edge: '#fb7185' },
};

/** 各节点色块（主线错开，番外偏橙/天空） */
export const NODE_TONE = {
  'computer-system': 'indigo',
  'api-frontend': 'pink',
  'network-basics': 'sky',
  'protocol-stack': 'violet',
  'ip-addressing': 'indigo',
  'tcp-udp': 'orange',
  'routing-nat': 'sky',
  'dns-https': 'pink',
  'http-web': 'violet',
  'reverse-proxy': 'rose',
  'stub-xrk-agt': 'pink',
  clash: 'orange',
  'clash-port': 'sky',
  'clash-setup': 'violet',
};

export function toneOf(id) {
  return TONES[NODE_TONE[id]] || TONES.violet;
}
