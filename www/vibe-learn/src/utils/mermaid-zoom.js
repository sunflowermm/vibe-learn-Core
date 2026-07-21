/**
 * 为已渲染的 Mermaid 图包裹缩放/平移壳
 * 控件通过事件委托绑定（见 LessonBody）
 */

const MIN = 0.5;
const MAX = 3;
const STEP = 0.15;

/**
 * @param {HTMLElement} frame
 * @param {number} scale
 * @param {number} [tx]
 * @param {number} [ty]
 */
export function applyMermaidTransform(frame, scale, tx = 0, ty = 0) {
  const stage = frame.querySelector('.mermaid-frame__stage');
  const pct = frame.querySelector('.mermaid-frame__pct');
  if (!stage) return;
  const s = Math.min(MAX, Math.max(MIN, scale));
  frame.dataset.scale = String(s);
  frame.dataset.tx = String(tx);
  frame.dataset.ty = String(ty);
  stage.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  if (pct) pct.textContent = `${Math.round(s * 100)}%`;
}

/**
 * @param {ParentNode | null | undefined} root
 */
export function enhanceMermaidFrames(root) {
  if (!root) return;

  const diagrams = [...root.querySelectorAll('.mermaid')].filter(
    (el) => el.getAttribute('data-processed') === 'true' || el.querySelector('svg')
  );

  for (const el of diagrams) {
    if (el.closest('.mermaid-frame')) continue;

    const frame = document.createElement('div');
    frame.className = 'mermaid-frame';
    frame.dataset.scale = '1';
    frame.dataset.tx = '0';
    frame.dataset.ty = '0';

    const bar = document.createElement('div');
    bar.className = 'mermaid-frame__bar';
    bar.innerHTML = `
      <span class="mermaid-frame__label">示意图</span>
      <div class="mermaid-frame__ops">
        <button type="button" class="mermaid-frame__btn" data-mz="out" data-no-blobity aria-label="缩小" title="缩小">−</button>
        <span class="mermaid-frame__pct" aria-live="polite">100%</span>
        <button type="button" class="mermaid-frame__btn" data-mz="in" data-no-blobity aria-label="放大" title="放大">+</button>
        <button type="button" class="mermaid-frame__btn" data-mz="reset" data-no-blobity aria-label="复位" title="复位">复位</button>
      </div>
    `;

    const view = document.createElement('div');
    view.className = 'mermaid-frame__view';
    view.tabIndex = 0;
    view.setAttribute('role', 'img');
    view.setAttribute('aria-label', '可缩放流程图，滚轮缩放，拖拽平移');

    const stage = document.createElement('div');
    stage.className = 'mermaid-frame__stage';

    el.parentNode.insertBefore(frame, el);
    stage.appendChild(el);
    view.appendChild(stage);
    frame.appendChild(bar);
    frame.appendChild(view);
  }
}

/**
 * @param {HTMLElement} frame
 * @param {'in' | 'out' | 'reset'} action
 */
export function mermaidZoomAction(frame, action) {
  const scale = Number(frame.dataset.scale) || 1;
  const tx = Number(frame.dataset.tx) || 0;
  const ty = Number(frame.dataset.ty) || 0;
  if (action === 'in') applyMermaidTransform(frame, scale + STEP, tx, ty);
  else if (action === 'out') applyMermaidTransform(frame, scale - STEP, tx, ty);
  else applyMermaidTransform(frame, 1, 0, 0);
}

/**
 * 在 LessonBody 根上绑定一次：按钮 / 滚轮 / 拖拽
 * @param {HTMLElement} root
 * @returns {() => void} dispose
 */
export function bindMermaidZoomInteractions(root) {
  if (!root || root.dataset.mzBound === '1') return () => {};
  root.dataset.mzBound = '1';

  /** @type {{ frame: HTMLElement, x: number, y: number, tx: number, ty: number } | null} */
  let drag = null;

  function onClick(e) {
    const btn = e.target.closest?.('[data-mz]');
    if (!btn || !root.contains(btn)) return;
    const frame = btn.closest('.mermaid-frame');
    if (!frame) return;
    e.preventDefault();
    mermaidZoomAction(frame, btn.getAttribute('data-mz'));
  }

  function onWheel(e) {
    const view = e.target.closest?.('.mermaid-frame__view');
    if (!view || !root.contains(view)) return;
    const frame = view.closest('.mermaid-frame');
    if (!frame) return;
    e.preventDefault();
    const scale = Number(frame.dataset.scale) || 1;
    const tx = Number(frame.dataset.tx) || 0;
    const ty = Number(frame.dataset.ty) || 0;
    const delta = e.deltaY > 0 ? -STEP : STEP;
    applyMermaidTransform(frame, scale + delta, tx, ty);
  }

  function onPointerDown(e) {
    if (e.button !== 0) return;
    if (e.target.closest?.('.mermaid-frame__bar')) return;
    const view = e.target.closest?.('.mermaid-frame__view');
    if (!view || !root.contains(view)) return;
    const frame = view.closest('.mermaid-frame');
    if (!frame) return;
    drag = {
      frame,
      x: e.clientX,
      y: e.clientY,
      tx: Number(frame.dataset.tx) || 0,
      ty: Number(frame.dataset.ty) || 0,
    };
    view.classList.add('is-panning');
    view.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    const scale = Number(drag.frame.dataset.scale) || 1;
    applyMermaidTransform(drag.frame, scale, drag.tx + dx, drag.ty + dy);
  }

  function onPointerUp(e) {
    if (!drag) return;
    const view = drag.frame.querySelector('.mermaid-frame__view');
    view?.classList.remove('is-panning');
    view?.releasePointerCapture?.(e.pointerId);
    drag = null;
  }

  function onDblClick(e) {
    const view = e.target.closest?.('.mermaid-frame__view');
    if (!view || !root.contains(view)) return;
    const frame = view.closest('.mermaid-frame');
    if (frame) mermaidZoomAction(frame, 'reset');
  }

  root.addEventListener('click', onClick);
  root.addEventListener('wheel', onWheel, { passive: false });
  root.addEventListener('pointerdown', onPointerDown);
  root.addEventListener('pointermove', onPointerMove);
  root.addEventListener('pointerup', onPointerUp);
  root.addEventListener('pointercancel', onPointerUp);
  root.addEventListener('dblclick', onDblClick);

  return () => {
    root.removeEventListener('click', onClick);
    root.removeEventListener('wheel', onWheel);
    root.removeEventListener('pointerdown', onPointerDown);
    root.removeEventListener('pointermove', onPointerMove);
    root.removeEventListener('pointerup', onPointerUp);
    root.removeEventListener('pointercancel', onPointerUp);
    root.removeEventListener('dblclick', onDblClick);
    delete root.dataset.mzBound;
  };
}
