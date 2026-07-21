/**
 * 实心色卡：字色统一白；边线用偏暗的同色相，避免暗底上发白刺眼
 */
const FG = '#ffffff';
const MUTED = 'rgba(255,255,255,0.82)';

export const TONES = {
  indigo: { id: 'indigo', bg: '#4f46e5', fg: FG, muted: MUTED, edge: '#6366f1' },
  pink: { id: 'pink', bg: '#db2777', fg: FG, muted: MUTED, edge: '#ec4899' },
  sky: { id: 'sky', bg: '#0284c7', fg: FG, muted: MUTED, edge: '#0ea5e9' },
  orange: { id: 'orange', bg: '#ea580c', fg: FG, muted: MUTED, edge: '#f97316' },
  violet: { id: 'violet', bg: '#7c3aed', fg: FG, muted: MUTED, edge: '#8b5cf6' },
  rose: { id: 'rose', bg: '#e11d48', fg: FG, muted: MUTED, edge: '#f43f5e' },
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
