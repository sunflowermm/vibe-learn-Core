/**
 * 图谱连线路由辅助：选手柄、并线偏移、路径类型
 * 布局仍是绝对坐标；这里只改善「怎么画」
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

  /* 明显横向 */
  if (Math.abs(dx) > Math.abs(dy) * 1.15) {
    return dx >= 0
      ? { sourceHandle: 'right', targetHandle: 'left' }
      : { sourceHandle: 'left', targetHandle: 'right' };
  }
  /* 明显纵向 */
  if (Math.abs(dy) > Math.abs(dx) * 1.15) {
    return dy >= 0
      ? { sourceHandle: 'bottom', targetHandle: 'top' }
      : { sourceHandle: 'top', targetHandle: 'bottom' };
  }
  /* 对角线：优先右→左（阅读方向），必要时上下 */
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? { sourceHandle: 'right', targetHandle: 'left' }
      : { sourceHandle: 'left', targetHandle: 'right' };
  }
  return dy >= 0
    ? { sourceHandle: 'bottom', targetHandle: 'top' }
    : { sourceHandle: 'top', targetHandle: 'bottom' };
}

/**
 * 同章内用正交折线；跨章/番外用贝塞尔
 * @param {string} branch
 * @param {boolean} sameChapter
 */
export function pathKindFor(branch, sameChapter) {
  if (branch === 'side') return 'bezier';
  if (!sameChapter) return 'bezier';
  return 'smoothstep';
}

/**
 * 为「同起终点+同手柄」的边分配正交偏移，避免完全重叠
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
      const bundleOffset = n <= 1 ? 0 : (i - center) * 18;
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
 * 从 source 扇出的边：若手柄相同，按目标角度微调标签偏移方向
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
    const src = posMap.get(group[0].source);
    if (!src) continue;
    const ranked = [...group].sort((a, b) => {
      const pa = posMap.get(a.target);
      const pb = posMap.get(b.target);
      const ya = pa ? pa.y : 0;
      const yb = pb ? pb.y : 0;
      return ya - yb;
    });
    const n = ranked.length;
    ranked.forEach((e, i) => {
      const center = (n - 1) / 2;
      const fanOffset = (i - center) * 22;
      const existing = e.data?.bundleOffset || 0;
      e.data = {
        ...(e.data || {}),
        fanOffset,
        /* 扇出优先于同边并线；两者都有时叠加一点 */
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
 * @param {number} dx
 * @param {number} dy
 */
export function curvatureForDistance(dx, dy) {
  const dist = Math.hypot(dx, dy);
  if (dist < 280) return 0.22;
  if (dist < 700) return 0.35;
  if (dist < 1400) return 0.48;
  return 0.58;
}
