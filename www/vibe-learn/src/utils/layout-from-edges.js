/**
 * 边驱动布局：方块迁就连线，而不是连线绕方块。
 *
 * 原则：
 * 1. 有边相连的节点应相邻（同列或同行）
 * 2. 长链用蛇形折返，避免「行末 → 下一行行首」斜穿整排卡片
 * 3. 一对多枢纽：子节点排成一列/一行，边只走短正交段
 */

/**
 * 蛇形时间线：奇数行 L→R，偶数行 R→L，折返边变成短竖线。
 * @param {string[][]} rows 每行按「故事顺序」排列的 id（均为阅读顺序，不必已镜像）
 * @param {{ originX?: number, originY?: number, colGap?: number, rowGap?: number }} [opts]
 * @returns {Record<string, { x: number, y: number }>}
 */
export function snakeRowPositions(rows, opts = {}) {
  const originX = opts.originX ?? 48;
  const originY = opts.originY ?? 120;
  const colGap = opts.colGap ?? 300;
  const rowGap = opts.rowGap ?? 280;
  /** @type {Record<string, { x: number, y: number }>} */
  const out = {};
  rows.forEach((row, r) => {
    const rtl = r % 2 === 1;
    const n = row.length;
    row.forEach((id, i) => {
      const col = rtl ? n - 1 - i : i;
      out[id] = { x: originX + col * colGap, y: originY + r * rowGap };
    });
  });
  return out;
}

/**
 * 枢纽 + 侧列：parent 在左，children 在右侧竖排，扇出边互不交叉。
 * @param {string} hubId
 * @param {string[]} childIds 自上而下
 * @param {{ hub: { x: number, y: number }, childX?: number, childGap?: number, align?: 'center' | 'top' }} opts
 */
export function hubSpokePositions(hubId, childIds, opts) {
  const childX = opts.childX ?? opts.hub.x + 360;
  const childGap = opts.childGap ?? 112;
  const align = opts.align ?? 'center';
  /** @type {Record<string, { x: number, y: number }>} */
  const out = { [hubId]: { ...opts.hub } };
  const totalH = (childIds.length - 1) * childGap;
  let startY = opts.hub.y;
  if (align === 'center') startY = opts.hub.y - totalH / 2;
  childIds.forEach((id, i) => {
    out[id] = { x: childX, y: startY + i * childGap };
  });
  return out;
}

/**
 * 水平链：按边顺序排成一行。
 * @param {string[]} ids
 * @param {{ x: number, y: number, gap?: number }} opts
 */
export function chainRowPositions(ids, opts) {
  const gap = opts.gap ?? 340;
  /** @type {Record<string, { x: number, y: number }>} */
  const out = {};
  ids.forEach((id, i) => {
    out[id] = { x: opts.x + i * gap, y: opts.y };
  });
  return out;
}
