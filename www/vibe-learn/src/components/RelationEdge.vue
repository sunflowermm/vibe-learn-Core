<script setup>
/**
 * 虚线贝塞尔：描边/标签色跟目标节点，保证两主题下都清晰可读
 */
import { computed } from 'vue';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@vue-flow/core';

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

const pathStyle = computed(() => ({
  stroke: stroke.value,
  strokeWidth: props.selected ? 2.75 : 'var(--edge-width)',
  strokeDasharray: '6 5',
  strokeOpacity: props.selected ? 1 : 'var(--edge-opacity)',
  ...(props.style || {}),
}));

const geometry = computed(() => {
  const [path, mx, my] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
    curvature: 0.3,
  });
  return { path, lx: mx, ly: my - 12 };
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
    :class="{ selected, animated }"
  />
  <EdgeLabelRenderer v-if="text">
    <div class="rel-label nodrag nopan" :class="{ selected }" :style="labelStyle" :title="text">
      {{ text }}
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.rel-label {
  max-width: 10.5rem;
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

.rel-label.selected {
  font-weight: 700;
  box-shadow: 0 0 0 1px color-mix(in srgb, currentColor 28%, transparent);
}
</style>
