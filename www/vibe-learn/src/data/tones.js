export const TONES = {
  indigo: { id: 'indigo', bg: '#4f46e5', edge: '#818cf8' },
  pink: { id: 'pink', bg: '#db2777', edge: '#f472b6' },
  sky: { id: 'sky', bg: '#0284c7', edge: '#38bdf8' },
  orange: { id: 'orange', bg: '#ea580c', edge: '#fb923c' },
  violet: { id: 'violet', bg: '#7c3aed', edge: '#a78bfa' },
  rose: { id: 'rose', bg: '#e11d48', edge: '#fb7185' },
  teal: { id: 'teal', bg: '#0d9488', edge: '#2dd4bf' },
  slate: { id: 'slate', bg: '#475569', edge: '#94a3b8' },
};

export const NODE_TONE = {
  'computer-system': 'indigo',
  'os-essence': 'slate',
  'hw-sw-link': 'teal',
  'chip-units': 'orange',

  'terminal-worlds': 'slate',
  'linux-distros': 'sky',
  'linux-cli': 'teal',
  'runtime-nodejs': 'sky',
  'installers-path': 'indigo',
  'package-managers': 'violet',
  'git-workspace': 'orange',
  'xrk-first-run': 'teal',

  'lang-compiled-runtime': 'violet',
  'lang-landscape': 'pink',
  'lang-to-runtime': 'indigo',

  'api-frontend': 'pink',
  'network-basics': 'sky',
  'protocol-stack': 'violet',
  'ip-addressing': 'indigo',
  'tcp-udp': 'orange',
  'routing-nat': 'sky',
  'dns-https': 'pink',
  'http-web': 'violet',
  'reverse-proxy': 'rose',

  'xrk-overview': 'pink',
  'xrk-runtime': 'violet',
  'xrk-core-layout': 'indigo',
  'xrk-http-www': 'sky',
  'xrk-config': 'rose',

  clash: 'orange',
  'clash-port': 'sky',
  'clash-setup': 'violet',
};

export function toneOf(id) {
  return TONES[NODE_TONE[id]] || TONES.violet;
}
