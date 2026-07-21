/**
 * 各知识点「本课必懂名词」——按学习路径点名，确保出现过的专有名词有解释入口
 */
export const NODE_TERMS = {
  'computer-system': ['hardware', 'software', 'os', 'process'],
  'os-essence': [
    'os',
    'kernel',
    'userland',
    'syscall',
    'process',
    'thread',
    'virtual_memory',
    'file_system',
    'socket',
  ],
  'hw-sw-link': ['hardware', 'software', 'os', 'driver', 'syscall'],
  'chip-units': ['cpu', 'gpu', 'ram', 'os', 'process'],

  'terminal-worlds': ['terminal', 'shell', 'cli', 'os', 'ssh', 'wsl'],
  'linux-distros': ['distro', 'kernel', 'package_mgr_os', 'wsl'],
  'linux-cli': ['cli', 'shell', 'process', 'sudo', 'file_system', 'path_env'],
  'runtime-nodejs': ['runtime', 'nodejs', 'v8', 'engines_field', 'javascript'],
  'installers-path': ['msi', 'path_env', 'runtime', 'shell'],
  'package-managers': [
    'pnpm',
    'package_json',
    'lockfile',
    'node_modules',
    'registry',
    'corepack',
    'nodejs',
  ],
  'git-workspace': ['git', 'repo', 'clone', 'commit', 'staging', 'remote', 'package_json'],
  'git-forges': ['github', 'gitee', 'git', 'remote', 'clone', 'fork', 'pr', 'issue'],
  'xrk-first-run': ['nodejs', 'pnpm', 'path_env', 'repo', 'clone', 'package_json'],

  'lang-compiled-runtime': [
    'source_code',
    'compiler',
    'interpreter',
    'bytecode',
    'vm_lang',
    'runtime',
  ],
  'lang-landscape': ['javascript', 'typescript', 'compiler', 'runtime', 'source_code'],
  'lang-to-runtime': ['javascript', 'nodejs', 'pnpm', 'package_json', 'engines_field'],

  'api-frontend': ['api', 'frontend', 'backend', 'rest', 'http', 'javascript'],
  'network-basics': ['network', 'lan', 'wan', 'internet', 'bandwidth', 'latency', 'topology'],
  'protocol-stack': ['protocol', 'osi', 'tcp_ip', 'http', 'tcp', 'ip'],
  'ip-addressing': ['ip', 'subnet', 'lan', 'internet', 'mac', 'arp', 'loopback', 'private_ip'],
  'tcp-udp': ['tcp', 'udp', 'port', 'socket', 'ip'],
  'routing-nat': ['router', 'gateway', 'nat', 'ip', 'subnet', 'private_ip'],
  'dns-https': ['dns', 'domain', 'https', 'tls', 'ip'],
  'http-web': ['http', 'https', 'tcp', 'api', 'frontend', 'backend', 'status_code'],
  'reverse-proxy': [
    'reverse_proxy',
    'forward_proxy',
    'http',
    'https',
    'backend',
    'load_balance',
    'status_code',
  ],

  'xrk-overview': ['agent_runtime', 'core_pkg', 'backend', 'nodejs', 'pnpm'],
  'xrk-runtime': ['agent_runtime', 'process', 'plugin', 'runtime', 'loader'],
  'xrk-core-layout': ['core_pkg', 'plugin', 'www_static', 'commonconfig', 'loader'],
  'xrk-http-www': ['http', 'api', 'www_static', 'http_response', 'reverse_proxy'],
  'xrk-config': ['commonconfig', 'core_pkg'],

  clash: ['proxy_engine', 'forward_proxy', 'proxy_node', 'port', 'router'],
  'clash-port': ['listen', 'port', 'tcp', 'proxy_engine'],
  'clash-setup': ['subscription', 'proxy_node', 'proxy_engine', 'dns'],

  /* 章说明 */
  'chapter-machine': ['hardware', 'software', 'os', 'cpu'],
  'chapter-env': ['terminal', 'shell', 'nodejs', 'git', 'pnpm'],
  'chapter-languages': ['source_code', 'runtime', 'javascript'],
  'chapter-computer-network': ['network', 'protocol', 'ip', 'http'],
  'chapter-xrk-agt': ['agent_runtime', 'core_pkg'],
  'chapter-clash': ['proxy_engine', 'forward_proxy', 'port'],
};
