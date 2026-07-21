/**
 * 实心色卡底色 + 连线同色相（字色在 GraphCard 内统一为白）
 */
export const TONES = {
  indigo: { id: 'indigo', bg: '#4f46e5', edge: '#818cf8' },
  pink: { id: 'pink', bg: '#db2777', edge: '#f472b6' },
  sky: { id: 'sky', bg: '#0284c7', edge: '#38bdf8' },
  orange: { id: 'orange', bg: '#ea580c', edge: '#fb923c' },
  violet: { id: 'violet', bg: '#7c3aed', edge: '#a78bfa' },
  rose: { id: 'rose', bg: '#e11d48', edge: '#fb7185' },
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
