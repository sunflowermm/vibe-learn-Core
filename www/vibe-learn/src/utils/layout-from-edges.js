/**
 * 边驱动布局：方块迁就连线，而不是连线绕方块。
 *
 * 原则：
 * 1. 有边相连的节点应相邻（同列或同行）
 * 2. 长链用蛇形折返，避免「行末 → 下一行行首」斜穿整排卡片
 * 3. 一对多枢纽：子节点排成一列/一行，边只走短正交段
 * 4. 间距按真实卡片外包算：colGap ≥ CARD_W+gutter，rowGap ≥ CARD_H+gutter
 */

/** 与 GraphCard.vue `.card` 宽一致；高取含副标题的保守值（CSS 无固定 height） */
export const CARD_W = 250;
export const CARD_H = 118;
/** 卡与卡之间的空隙（不是中心距） */
export const CARD_GUTTER_X = 100;
export const CARD_GUTTER_Y = 64;
/** 节点原点间距（左上角到左上角） */
export const CARD_COL = CARD_W + CARD_GUTTER_X; // 350
export const CARD_ROW = CARD_H + CARD_GUTTER_Y; // 182

/**
 * 检测两张卡（左上角坐标）是否 AABB 重叠。
 * @param {{ x: number, y: number }} a
 * @param {{ x: number, y: number }} b
 * @param {{ w?: number, h?: number, pad?: number }} [box]
 */
export function cardsOverlap(a, b, box = {}) {
  const w = box.w ?? CARD_W;
  const h = box.h ?? CARD_H;
  const pad = box.pad ?? 8;
  return !(
    a.x + w + pad <= b.x ||
    b.x + w + pad <= a.x ||
    a.y + h + pad <= b.y ||
    b.y + h + pad <= a.y
  );
}

/**
 * 开发期断言：同章话题不得叠卡。命中则抛错，避免再默默叠成糖葫芦。
 * @param {Record<string, { x: number, y: number }>} positions
 * @param {string} [label]
 */
export function assertNoCardOverlap(positions, label = 'layout') {
  const ids = Object.keys(positions);
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = positions[ids[i]];
      const b = positions[ids[j]];
      if (cardsOverlap(a, b)) {
        throw new Error(
          `[${label}] 卡片重叠: ${ids[i]}@(${a.x},${a.y}) × ${ids[j]}@(${b.x},${b.y})；增大 CARD_COL/CARD_ROW 或分区下移`
        );
      }
    }
  }
}

/**
 * 蛇形时间线：奇数行 L→R，偶数行 R→L，折返边变成短竖线。
 * @param {string[][]} rows 每行按「故事顺序」排列的 id（均为阅读顺序，不必已镜像）
 * @param {{ originX?: number, originY?: number, colGap?: number, rowGap?: number }} [opts]
 * @returns {Record<string, { x: number, y: number }>}
 */
export function snakeRowPositions(rows, opts = {}) {
  const originX = opts.originX ?? 48;
  const originY = opts.originY ?? 120;
  const colGap = opts.colGap ?? CARD_COL;
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
  const childX = opts.childX ?? opts.hub.x + CARD_COL + 40;
  const childGap = opts.childGap ?? CARD_ROW;
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
 * 枢纽 + 右侧多列网格：子节点多时避免单列叠成一条「糖葫芦」。
 * 默认按列填（先第一列自上而下，再第二列…），从左枢纽扇出边不易交叉。
 *
 * @param {string} hubId
 * @param {string[]} childIds
 * @param {{
 *   hub: { x: number, y: number },
 *   childX?: number,
 *   cols?: number,
 *   colGap?: number,
 *   rowGap?: number,
 *   align?: 'center' | 'top',
 *   fill?: 'column' | 'row',
 *   includeHub?: boolean,
 * }} opts
 */
export function hubSpokeGridPositions(hubId, childIds, opts) {
  const cols = Math.max(1, opts.cols ?? 2);
  const childX = opts.childX ?? opts.hub.x + CARD_COL + 40;
  const colGap = opts.colGap ?? CARD_COL;
  const rowGap = opts.rowGap ?? CARD_ROW;
  const align = opts.align ?? 'top';
  const fill = opts.fill ?? 'column';
  const includeHub = opts.includeHub !== false;
  const n = childIds.length;
  const rows = Math.max(1, Math.ceil(n / cols));

  /** @type {Record<string, { x: number, y: number }>} */
  const out = includeHub ? { [hubId]: { ...opts.hub } } : {};
  let startY = opts.hub.y;
  if (align === 'center') startY = opts.hub.y - ((rows - 1) * rowGap) / 2;

  childIds.forEach((id, i) => {
    let col;
    let row;
    if (fill === 'row') {
      col = i % cols;
      row = Math.floor(i / cols);
    } else {
      col = Math.floor(i / rows);
      row = i % rows;
    }
    out[id] = { x: childX + col * colGap, y: startY + row * rowGap };
  });
  return out;
}

/**
 * 水平链：按边顺序排成一行。
 * @param {string[]} ids
 * @param {{ x: number, y: number, gap?: number }} opts
 */
export function chainRowPositions(ids, opts) {
  const gap = opts.gap ?? CARD_COL;
  /** @type {Record<string, { x: number, y: number }>} */
  const out = {};
  ids.forEach((id, i) => {
    out[id] = { x: opts.x + i * gap, y: opts.y };
  });
  return out;
}

/**
 * 在一组节点包围盒下方再开一行（整区下移，避免与上层混叠）。
 * @param {Record<string, { x: number, y: number }>} above
 * @param {number} [extra]
 */
export function belowBlockY(above, extra = CARD_GUTTER_Y) {
  const maxY = Math.max(...Object.values(above).map((p) => p.y));
  return maxY + CARD_H + extra;
}

/**
 * 泳道块：自上而下多条带，带内左→右链式（循序渐进主读线）。
 * 适合「入口 → 分层能力 → 收束」的章节，而非等距填格。
 *
 * @param {string[][]} lanes
 * @param {{ originX?: number, originY?: number, colGap?: number, laneGap?: number }} [opts]
 */
export function laneBlockPositions(lanes, opts = {}) {
  const originX = opts.originX ?? 48;
  const originY = opts.originY ?? 120;
  const colGap = opts.colGap ?? CARD_COL;
  const laneGap = opts.laneGap ?? CARD_ROW + 48;
  /** @type {Record<string, { x: number, y: number }>} */
  const out = {};
  lanes.forEach((lane, r) => {
    lane.forEach((id, i) => {
      out[id] = { x: originX + i * colGap, y: originY + r * laneGap };
    });
  });
  return out;
}

/**
 * 脊柱 + 并行短支后汇合（序章等小图）。
 * spine 为左→右主读；可选 upper/lower 挂在 spine[1] 的上下。
 *
 * @param {{
 *   spine: [string, string, string],
 *   upper?: string,
 *   lower?: string,
 *   originX?: number,
 *   originY?: number,
 *   colGap?: number,
 *   branchGap?: number,
 * }} opts
 * spine = [入口, 中段主节点, 汇合]
 */
export function spineForkMergePositions(opts) {
  const originX = opts.originX ?? 48;
  const originY = opts.originY ?? 200;
  const colGap = opts.colGap ?? CARD_COL;
  const branchGap = opts.branchGap ?? CARD_ROW;
  const [a, b, c] = opts.spine;
  /** @type {Record<string, { x: number, y: number }>} */
  const out = {
    [a]: { x: originX, y: originY },
    [b]: { x: originX + colGap, y: originY },
    [c]: { x: originX + colGap * 2, y: originY },
  };
  if (opts.upper) {
    out[opts.upper] = { x: originX + colGap, y: originY - branchGap };
  }
  if (opts.lower) {
    out[opts.lower] = { x: originX + colGap, y: originY + branchGap };
  }
  return out;
}

/**
 * 左→右流水线：每一列可含 1～2 张卡（上/下轨），适合环境章、网络章。
 * columns[i] = string | [upper, lower] | [single]
 *
 * @param {(string | string[])[]} columns
 * @param {{ originX?: number, originY?: number, colGap?: number, pairGap?: number }} [opts]
 */
export function pipelineColumnsPositions(columns, opts = {}) {
  const originX = opts.originX ?? 48;
  const originY = opts.originY ?? 200;
  const colGap = opts.colGap ?? CARD_COL;
  const pairGap = opts.pairGap ?? CARD_ROW;
  /** @type {Record<string, { x: number, y: number }>} */
  const out = {};
  columns.forEach((col, i) => {
    const x = originX + i * colGap;
    const ids = Array.isArray(col) ? col : [col];
    if (ids.length === 1) {
      out[ids[0]] = { x, y: originY };
      return;
    }
    out[ids[0]] = { x, y: originY - pairGap / 2 };
    out[ids[1]] = { x, y: originY + pairGap / 2 };
  });
  return out;
}
