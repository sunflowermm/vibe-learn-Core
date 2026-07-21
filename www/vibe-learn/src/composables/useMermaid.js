/**
 * 惰性加载 Mermaid（pnpm / 国内 registry 安装，随 Vite 打包）。
 * 主题跟随 document.documentElement[data-theme]。
 */
import { enhanceMermaidFrames } from '../utils/mermaid-zoom.js';

let mermaidPromise = null;
let lastTheme = null;

async function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => m.default);
  }
  return mermaidPromise;
}

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

/**
 * @param {ParentNode | null | undefined} root
 */
export async function renderMermaidIn(root) {
  if (!root) return;
  const nodes = [...root.querySelectorAll('pre.mermaid')].filter(
    (el) => !el.getAttribute('data-processed')
  );
  if (!nodes.length) {
    enhanceMermaidFrames(root);
    return;
  }

  const mermaid = await loadMermaid();
  const theme = isDarkTheme() ? 'dark' : 'neutral';
  if (theme !== lastTheme) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme,
      fontFamily: 'inherit',
    });
    lastTheme = theme;
  }

  try {
    await mermaid.run({ nodes });
  } catch (err) {
    console.warn('[vibe-learn] Mermaid 渲染失败', err);
  }
  enhanceMermaidFrames(root);
}
