<script setup>
/**
 * 关系边：路径随拖动重算；标签浮在节点上；按 branch 区分主线 / 第二章 / 番外。
 */
import { computed } from 'vue';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, MarkerType } from '@vue-flow/core';

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
});

const text = computed(() => props.label || props.data?.label || '');
const branch = computed(() => props.data?.branch || 'main');

const pathStyle = computed(() => {
  if (branch.value === 'side') {
    return {
      stroke: 'rgba(240, 160, 80, 0.6)',
      strokeWidth: 1.75,
      strokeDasharray: '7 5',
    };
  }
  if (branch.value === 'next-chapter') {
    return {
      stroke: 'rgba(94, 234, 212, 0.75)',
      strokeWidth: 2,
      strokeDasharray: '3 7',
    };
  }
  return {
    stroke: 'rgba(62, 224, 196, 0.42)',
    strokeWidth: 1.8,
    ...(props.style || {}),
  };
});

const marker = computed(() => props.markerEnd || MarkerType.ArrowClosed);

const geometry = computed(() => {
  const [path, mx, my] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
    borderRadius: 16,
    offset: 12,
  });

  const dx = props.targetX - props.sourceX;
  const dy = props.targetY - props.sourceY;
  const len = Math.hypot(dx, dy) || 1;
  const hash = [...String(props.id)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const sign = hash % 2 === 0 ? 1 : -1;
  const bump = Math.min(28, Math.max(14, len * 0.04)) * sign;

  return {
    path,
    lx: mx + (-dy / len) * bump,
    ly: my + (dx / len) * bump,
  };
});

const labelStyle = computed(() => ({
  position: 'absolute',
  transform: `translate(-50%, -50%) translate(${geometry.value.lx}px, ${geometry.value.ly}px)`,
  /* 不抢节点拖拽 / 画布平移 */
  pointerEvents: 'none',
  zIndex: 4,
}));
</script>

<script>
export default { inheritAttrs: false };
</script>

<template>
  <BaseEdge
    :id="id"
    :path="geometry.path"
    :marker-end="marker"
    :style="pathStyle"
    :class="{ selected }"
  />
  <EdgeLabelRenderer v-if="text">
    <div
      class="rel-label nodrag nopan"
      :class="[branch, { selected }]"
      :style="labelStyle"
      :title="text"
    >
      {{ text }}
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.rel-label {
  max-width: 9.5rem;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  line-height: 1.25;
  letter-spacing: 0.01em;
  color: #c5d4e6;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(10, 16, 28, 0.92);
  border: 1px solid rgba(62, 224, 196, 0.35);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.rel-label.next-chapter {
  border-color: rgba(94, 234, 212, 0.55);
  color: #d7fff6;
}

.rel-label.side {
  border-color: rgba(240, 160, 80, 0.55);
  color: #ffe6c8;
}

.rel-label.selected {
  color: #ffe8c8;
  border-color: rgba(240, 160, 80, 0.7);
}
</style>
