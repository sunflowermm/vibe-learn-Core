/**
 * 惰性加载 Mermaid（随 Vite 打包）。主题跟随 document.documentElement[data-theme]。
 */
import { enhanceMermaidFrames } from '../utils/mermaid-zoom.js';
import { normalizeMermaidSource } from '../utils/normalize-mermaid.js';

let mermaidPromise = null;
let lastTheme = null;

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((m) => m.default ?? m);
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

  for (const el of nodes) {
    const src = normalizeMermaidSource(el.textContent);
    el.textContent = src;
    el.setAttribute('data-mermaid-source', src);
  }

  const mermaid = await loadMermaid();
  const theme = isDarkTheme() ? 'dark' : 'neutral';
  if (theme !== lastTheme) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme,
      fontFamily: 'inherit',
      flowchart: { htmlLabels: true, curve: 'basis' },
    });
    lastTheme = theme;
  }

  try {
    await mermaid.run({ nodes, suppressErrors: true });
  } catch (err) {
    console.warn('[vibe-learn] Mermaid 渲染失败', err);
  }

  enhanceMermaidFrames(root);
}
