<script setup>
/**
 * 官网同款：虚线贝塞尔，描边色 = 目标节点色块
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
const stroke = computed(() => props.data?.color || '#94a3b8');

const pathStyle = computed(() => ({
  stroke: stroke.value,
  strokeWidth: props.selected ? 2.4 : 2,
  strokeDasharray: '6 5',
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
  max-width: 8.5rem;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 10px;
  line-height: 1.3;
  font-family: var(--font-mono);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: var(--label-bg);
  border: 1.5px solid;
  box-shadow: var(--shadow-sm);
}

.rel-label.selected {
  font-weight: 600;
}
</style>
