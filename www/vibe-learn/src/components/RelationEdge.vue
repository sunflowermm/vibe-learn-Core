<script setup>
/**
 * 连线：同章 smooth-step（并线/扇出偏移）；跨章贝塞尔（距离调曲率 + 法线错开）
 */
import { computed } from 'vue';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
} from '@vue-flow/core';
import { curvatureForDistance } from '../utils/edge-routing.js';

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

const text = computed(() => props.label || props.data?.label || '');
const stroke = computed(() => props.data?.color || 'var(--edge-stroke)');
const isSide = computed(() => props.data?.branch === 'side');
const routeOffset = computed(() => Number(props.data?.routeOffset) || 0);
const pathKind = computed(() => props.data?.pathKind || 'bezier');

const pathStyle = computed(() => ({
  stroke: stroke.value,
  strokeWidth: props.selected ? 2.75 : 'var(--edge-width)',
  strokeDasharray: isSide.value ? '4 6' : '6 5',
  strokeOpacity: props.selected
    ? 1
    : isSide.value
      ? 'calc(var(--edge-opacity) * 0.85)'
      : 'var(--edge-opacity)',
  ...(props.style || {}),
}));

/** 沿弦的法线平移端点，拆开平行弧 */
function offsetEndpoints(ox, oy, tx, ty, offset) {
  if (!offset) return { sx: ox, sy: oy, ex: tx, ey: ty, dx: tx - ox, dy: ty - oy };
  const dx = tx - ox;
  const dy = ty - oy;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return {
    sx: ox + nx * offset,
    sy: oy + ny * offset,
    ex: tx + nx * offset,
    ey: ty + ny * offset,
    dx,
    dy,
    nx,
    ny,
  };
}

const geometry = computed(() => {
  const offset = routeOffset.value;
  const kind = pathKind.value;
  const { sx, sy, ex, ey, dx, dy, nx, ny } = offsetEndpoints(
    props.sourceX,
    props.sourceY,
    props.targetX,
    props.targetY,
    kind === 'bezier' ? offset * 0.85 : 0
  );
  const len = Math.hypot(dx, dy) || 1;
  const fnx = nx ?? -dy / len;
  const fny = ny ?? dx / len;

  if (kind === 'smoothstep') {
    const stepOffset = offset === 0 ? 18 : 18 + offset;
    const [path, mx, my] = getSmoothStepPath({
      sourceX: props.sourceX,
      sourceY: props.sourceY,
      targetX: props.targetX,
      targetY: props.targetY,
      sourcePosition: props.sourcePosition,
      targetPosition: props.targetPosition,
      borderRadius: 12,
      offset: stepOffset,
    });
    const labelShift = offset * 0.5;
    return {
      path,
      lx: mx + fnx * labelShift,
      ly: my + fny * labelShift - 10,
    };
  }

  const curvature = curvatureForDistance(dx, dy);
  const [path, mx, my] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    targetX: ex,
    targetY: ey,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
    curvature,
  });
  const labelShift = offset * 0.65;
  return {
    path,
    lx: mx + fnx * labelShift,
    ly: my + fny * labelShift - 12,
  };
});

const labelStyle = computed(() => ({
  position: 'absolute',
  transform: `translate(-50%, -50%) translate(${geometry.value.lx}px, ${geometry.value.ly}px)`,
  pointerEvents: 'none',
  zIndex: 4,
  borderColor: stroke.value,
  color: stroke.value,
}));
</script>

<script>
export default { inheritAttrs: false };
</script>

<template>
  <BaseEdge
    :id="id"
    :path="geometry.path"
    :style="pathStyle"
    :class="{ selected, animated, side: isSide }"
  />
  <EdgeLabelRenderer v-if="text">
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
.rel-label {
  max-width: 11rem;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.35;
  font-family: var(--font-mono);
  letter-spacing: 0.01em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: var(--label-bg);
  border: 1.5px solid;
  box-shadow: var(--shadow-sm);
}

.rel-label.side {
  font-weight: 500;
  opacity: 0.92;
}

.rel-label.selected {
  font-weight: 700;
  box-shadow: 0 0 0 1px color-mix(in srgb, currentColor 28%, transparent);
}
</style>
