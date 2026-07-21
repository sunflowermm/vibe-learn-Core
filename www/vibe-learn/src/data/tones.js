/**
 * Vue Flow 官网首页同款色块：实心彩色卡片 + 边线跟目标色
 * @see https://vueflow.dev/
 */
export const TONES = {
  emerald: { id: 'emerald', bg: '#10b981', fg: '#ffffff', muted: 'rgba(255,255,255,0.82)', edge: '#10b981' },
  pink: { id: 'pink', bg: '#ec4899', fg: '#ffffff', muted: 'rgba(255,255,255,0.82)', edge: '#ec4899' },
  sky: { id: 'sky', bg: '#38bdf8', fg: '#0c4a6e', muted: 'rgba(12,74,110,0.75)', edge: '#0ea5e9' },
  orange: { id: 'orange', bg: '#f97316', fg: '#ffffff', muted: 'rgba(255,255,255,0.85)', edge: '#f97316' },
  violet: { id: 'violet', bg: '#8b5cf6', fg: '#ffffff', muted: 'rgba(255,255,255,0.82)', edge: '#8b5cf6' },
  rose: { id: 'rose', bg: '#f43f5e', fg: '#ffffff', muted: 'rgba(255,255,255,0.82)', edge: '#f43f5e' },
};

/** 各节点色块（主线错开，番外偏橙/天空） */
export const NODE_TONE = {
  'computer-system': 'emerald',
  'api-frontend': 'pink',
  'network-basics': 'sky',
  'protocol-stack': 'violet',
  'ip-addressing': 'emerald',
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
