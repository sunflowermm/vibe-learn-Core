/**
 * 课文渲染：Markdown + HTML5/SVG 片段 + Mermaid 围栏
 * Mermaid 经 pnpm（国内镜像 registry）打包进产物，不依赖外网 CDN。
 */
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const RAW_LANGS = new Set(['html', 'html5', 'svg', 'raw']);

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const renderer = new marked.Renderer();
const baseCode = renderer.code.bind(renderer);

renderer.code = function code(token) {
  const lang = (token.lang || '').trim().toLowerCase().split(/\s+/)[0] || '';
  const text = token.text ?? '';

  if (lang === 'mermaid') {
    return `<pre class="mermaid">${escapeHtml(text)}</pre>`;
  }
  if (RAW_LANGS.has(lang)) {
    return `<div class="lesson-embed" data-embed="${lang}">${text}</div>`;
  }
  return baseCode(token);
};

marked.setOptions({
  gfm: true,
  breaks: false,
  renderer,
});

const PURIFY = {
  USE_PROFILES: { html: true, svg: true, svgFilters: true },
  ADD_TAGS: [
    'figure',
    'figcaption',
    'details',
    'summary',
    'mark',
    'time',
    'progress',
    'meter',
    'picture',
    'source',
    'video',
    'audio',
    'track',
    'section',
    'article',
    'aside',
    'header',
    'footer',
    'nav',
    'main',
  ],
  ADD_ATTR: [
    'open',
    'controls',
    'loop',
    'muted',
    'playsinline',
    'poster',
    'preload',
    'type',
    'src',
    'srcset',
    'sizes',
    'media',
    'datetime',
    'value',
    'max',
    'min',
    'low',
    'high',
    'optimum',
    'role',
    'aria-label',
    'aria-hidden',
    'data-embed',
    'class',
    'viewBox',
    'xmlns',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'd',
    'cx',
    'cy',
    'r',
    'rx',
    'ry',
    'x',
    'y',
    'x1',
    'y1',
    'x2',
    'y2',
    'width',
    'height',
    'transform',
    'points',
    'preserveAspectRatio',
    'gradientUnits',
    'offset',
    'stop-color',
    'stop-opacity',
    'opacity',
    'clip-path',
    'marker-end',
    'marker-start',
  ],
};

/**
 * @param {string} markdown
 * @returns {string} 消毒后的 HTML（含未渲染的 .mermaid 节点）
 */
export function renderLesson(markdown) {
  if (!markdown) return '';
  const raw = marked.parse(markdown, { async: false });
  const clean = DOMPurify.sanitize(raw, PURIFY);
  /* 表格外包一层，便于边框与横向滚动，避免贴边裁切 */
  return clean.replace(/<table[\s\S]*?<\/table>/gi, (table) => {
    return `<div class="md-table-wrap">${table}</div>`;
  });
}
