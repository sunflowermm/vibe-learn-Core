<script setup>
/**
 * 连线：默认正交折线；标签仅在选中/悬停时显示，且不压在节点之上
 */
import { computed, ref } from 'vue';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
  Position,
} from '@vue-flow/core';
import {
  curvatureForDistance,
  smoothStepCenter,
} from '../utils/edge-routing.js';

const props = defineProps({
  id: { type: String, required: true },
  sourceX: { type: Number, required: true },
  sourceY: { type: Number, required: true },
  targetX: { type: Number, required: true },
  targetY: { type: Number, required: true },
  sourcePosition: { type: String, required: true },
  targetPosition: { type: String, required: true },
  markerEnd: { type: String, default: undefined },
  style: { type: Object, default: undefined },
  label: { type: String, default: '' },
  data: { type: Object, default: () => ({}) },
  selected: { type: Boolean, default: false },
  animated: { type: Boolean, default: false },
});

const hovered = ref(false);

const text = computed(() => props.label || props.data?.label || '');
const stroke = computed(() => props.data?.color || 'var(--edge-stroke)');
const isSide = computed(() => props.data?.branch === 'side');
const routeOffset = computed(() => Number(props.data?.routeOffset) || 0);
const pathKind = computed(() => props.data?.pathKind || 'smoothstep');
const showLabel = computed(
  () => Boolean(text.value) && (props.selected || hovered.value)
);

const pathStyle = computed(() => ({
  stroke: stroke.value,
  strokeWidth: props.selected ? 2.6 : hovered.value ? 2.1 : 'var(--edge-width)',
  strokeDasharray: isSide.value ? '4 6' : '7 5',
  strokeOpacity: props.selected
    ? 1
    : hovered.value
      ? 0.85
      : isSide.value
        ? 'calc(var(--edge-opacity) * 0.7)'
        : 'var(--edge-opacity)',
  ...(props.style || {}),
}));

function offsetEndpoints(ox, oy, tx, ty, offset) {
  if (!offset) return { sx: ox, sy: oy, ex: tx, ey: ty, dx: tx - ox, dy: ty - oy };
  const dx = tx - ox;
  const dy = ty - oy;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return {
    sx: ox + nx * offset * 0.35,
    sy: oy + ny * offset * 0.35,
    ex: tx + nx * offset * 0.35,
    ey: ty + ny * offset * 0.35,
    dx,
    dy,
    nx,
    ny,
  };
}

/** 标签放在路径中点，并沿法线外推，远离端点卡片 */
function labelPoint(mx, my, sx, sy, ex, ey, offset) {
  const dx = ex - sx;
  const dy = ey - sy;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const push = 14 + Math.abs(offset) * 0.35;
  /* 略偏向路径中段外侧，减少压在节点顶边 */
  return {
    lx: mx + nx * push,
    ly: my + ny * push,
  };
}

const geometry = computed(() => {
  const offset = routeOffset.value;
  const kind = pathKind.value;
  const srcPos = props.sourcePosition || Position.Right;
  const tgtPos = props.targetPosition || Position.Left;

  if (kind === 'smoothstep') {
    const { centerX, centerY } = smoothStepCenter(
      props.sourceX,
      props.sourceY,
      props.targetX,
      props.targetY,
      srcPos,
      offset
    );
    const stepOffset = 20 + Math.abs(offset) * 0.25;
    const [path, mx, my] = getSmoothStepPath({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      targetX: props.targetX,
      targetY: props.targetY,
      sourcePosition: srcPos,
      targetPosition: tgtPos,
      borderRadius: 16,
      offset: stepOffset,
      centerX,
      centerY,
    });
    const { lx, ly } = labelPoint(
      mx,
      my,
      props.sourceX,
      props.sourceY,
      props.targetX,
      props.targetY,
      offset
    );
    return { path, lx, ly };
  }

  const { sx, sy, ex, ey, dx, dy } = offsetEndpoints(
    props.sourceX,
    props.sourceY,
    props.targetX,
    props.targetY,
    offset
  );
  const curvature = curvatureForDistance(dx, dy);
  const [path, mx, my] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    targetX: ex,
    targetY: ey,
    sourcePosition: srcPos,
    targetPosition: tgtPos,
    curvature,
  });
  const { lx, ly } = labelPoint(mx, my, sx, sy, ex, ey, offset);
  return { path, lx, ly };
});

const labelStyle = computed(() => ({
  position: 'absolute',
  transform: `translate(-50%, -50%) translate(${geometry.value.lx}px, ${geometry.value.ly}px)`,
  pointerEvents: 'none',
  borderColor: stroke.value,
  color: stroke.value,
}));
</script>

<script>
export default { inheritAttrs: false };
</script>

<template>
  <g
    class="rel-edge"
    :class="{ selected, animated, side: isSide, hovered }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- 加宽透明描边便于悬停 -->
    <path
      class="rel-edge__hit"
      :d="geometry.path"
      fill="none"
      stroke="transparent"
      stroke-width="18"
    />
    <BaseEdge
      :id="id"
      :path="geometry.path"
      :style="pathStyle"
      :class="{ selected, animated, side: isSide }"
    />
  </g>
  <EdgeLabelRenderer v-if="showLabel">
    <div
      class="rel-label nodrag nopan"
      :class="{ selected, side: isSide }"
      :style="labelStyle"
      :title="text"
    >
      {{ text }}
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.rel-edge__hit {
  pointer-events: stroke;
  cursor: default;
}

.rel-label {
  max-width: 9.5rem;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.3;
  font-family: var(--font-mono);
  letter-spacing: 0.01em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: var(--label-bg);
  border: 1px solid;
  box-shadow: var(--shadow-sm);
  opacity: 0.96;
}

.rel-label.side {
  font-weight: 500;
  opacity: 0.9;
}

.rel-label.selected {
  font-weight: 700;
  box-shadow: 0 0 0 1px color-mix(in srgb, currentColor 28%, transparent);
}
</style>
