/**
 * 图谱连线路由：手柄推断、并线/扇出偏移、路径类型
 */

const CARD_W = 250;
const CARD_H = 96;

/**
 * @param {{ x: number, y: number }} a 节点左上角
 * @param {{ x: number, y: number }} b
 */
export function inferHandles(a, b) {
  const ax = a.x + CARD_W / 2;
  const ay = a.y + CARD_H / 2;
  const bx = b.x + CARD_W / 2;
  const by = b.y + CARD_H / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);

  if (adx > ady * 1.05) {
    return dx >= 0
      ? { sourceHandle: 'right', targetHandle: 'left' }
      : { sourceHandle: 'left', targetHandle: 'right' };
  }
  if (ady > adx * 1.05) {
    return dy >= 0
      ? { sourceHandle: 'bottom', targetHandle: 'top' }
      : { sourceHandle: 'top', targetHandle: 'bottom' };
  }
  /* 近似对角：优先水平出边，减少竖线穿越卡片 */
  return dx >= 0
    ? { sourceHandle: 'right', targetHandle: 'left' }
    : { sourceHandle: 'left', targetHandle: 'right' };
}

/**
 * 同章与中短距跨章用正交折线（可避障）；仅长距 / 番外用贝塞尔
 * @param {string} branch
 * @param {boolean} sameChapter
 * @param {number} [dist]
 */
export function pathKindFor(branch, sameChapter, dist = 0) {
  if (branch === 'side') return 'bezier';
  if (sameChapter) return 'smoothstep';
  /* 跨章也尽量正交+避障，减少穿卡片；极远才贝塞尔 */
  if (dist > 0 && dist < 1600) return 'smoothstep';
  return 'bezier';
}

/**
 * @param {Array<{ id: string, source: string, target: string, sourceHandle?: string, targetHandle?: string, data?: object }>} edges
 */
export function assignBundleOffsets(edges) {
  /** @type {Map<string, typeof edges>} */
  const groups = new Map();
  for (const e of edges) {
    const key = `${e.source}|${e.sourceHandle || ''}|${e.target}|${e.targetHandle || ''}`;
    const list = groups.get(key);
    if (list) list.push(e);
    else groups.set(key, [e]);
  }
  for (const group of groups.values()) {
    const n = group.length;
    group.forEach((e, i) => {
      const center = (n - 1) / 2;
      const bundleOffset = n <= 1 ? 0 : (i - center) * 26;
      e.data = {
        ...(e.data || {}),
        bundleIndex: i,
        bundleSize: n,
        bundleOffset,
      };
    });
  }
  return edges;
}

/**
 * @param {Array} edges
 * @param {Map<string, {x:number,y:number}>} posMap
 */
export function assignFanoutOffsets(edges, posMap) {
  /** @type {Map<string, typeof edges>} */
  const bySource = new Map();
  for (const e of edges) {
    const key = `${e.source}|${e.sourceHandle || 'right'}`;
    const list = bySource.get(key);
    if (list) list.push(e);
    else bySource.set(key, [e]);
  }
  for (const group of bySource.values()) {
    if (group.length < 2) continue;
    const ranked = [...group].sort((a, b) => {
      const pa = posMap.get(a.target);
      const pb = posMap.get(b.target);
      const handle = group[0].sourceHandle || 'right';
      if (handle === 'top' || handle === 'bottom') {
        const xa = pa ? pa.x : 0;
        const xb = pb ? pb.x : 0;
        return xa - xb;
      }
      const ya = pa ? pa.y : 0;
      const yb = pb ? pb.y : 0;
      return ya - yb;
    });
    const n = ranked.length;
    ranked.forEach((e, i) => {
      const center = (n - 1) / 2;
      const fanOffset = (i - center) * 28;
      const existing = e.data?.bundleOffset || 0;
      e.data = {
        ...(e.data || {}),
        fanOffset,
        routeOffset: existing + fanOffset,
      };
    });
  }
  for (const e of edges) {
    if (e.data?.routeOffset == null) {
      e.data = {
        ...(e.data || {}),
        routeOffset: e.data?.bundleOffset || 0,
      };
    }
  }
  return edges;
}

/**
 * 同目标汇入的边再错开一层，减轻「多线压在同一卡片顶」
 * @param {Array} edges
 */
export function assignFaninOffsets(edges) {
  /** @type {Map<string, typeof edges>} */
  const byTarget = new Map();
  for (const e of edges) {
    const key = `${e.target}|${e.targetHandle || 'left'}`;
    const list = byTarget.get(key);
    if (list) list.push(e);
    else byTarget.set(key, [e]);
  }
  for (const group of byTarget.values()) {
    if (group.length < 2) continue;
    const n = group.length;
    group.forEach((e, i) => {
      const center = (n - 1) / 2;
      const fanIn = (i - center) * 14;
      const base = e.data?.routeOffset || 0;
      e.data = {
        ...(e.data || {}),
        fanInOffset: fanIn,
        routeOffset: base + fanIn,
      };
    });
  }
  return edges;
}

/**
 * @param {number} dx
 * @param {number} dy
 */
export function curvatureForDistance(dx, dy) {
  const dist = Math.hypot(dx, dy);
  if (dist < 320) return 0.12;
  if (dist < 700) return 0.22;
  if (dist < 1200) return 0.32;
  return 0.4;
}

/**
 * smoothstep 中点沿主轴法线错开，避免多条折线叠在同一走廊
 * @param {number} sourceX
 * @param {number} sourceY
 * @param {number} targetX
 * @param {number} targetY
 * @param {string} sourcePosition
 * @param {number} routeOffset
 */
export function smoothStepCenter(sourceX, sourceY, targetX, targetY, sourcePosition, routeOffset) {
  const mx = (sourceX + targetX) / 2;
  const my = (sourceY + targetY) / 2;
  if (!routeOffset) return { centerX: mx, centerY: my };
  const horizontal =
    sourcePosition === 'left' ||
    sourcePosition === 'right' ||
    Math.abs(targetX - sourceX) >= Math.abs(targetY - sourceY);
  if (horizontal) {
    return { centerX: mx, centerY: my + routeOffset };
  }
  return { centerX: mx + routeOffset, centerY: my };
}
