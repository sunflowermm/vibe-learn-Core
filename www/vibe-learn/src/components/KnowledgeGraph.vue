<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { computed, nextTick, ref, watch } from 'vue';
import ChapterFrame from './ChapterFrame.vue';
import GraphCard from './GraphCard.vue';
import RelationEdge from './RelationEdge.vue';
import {
  buildFlowEdges,
  buildFlowNodes,
  getOriginPositions,
} from '../data/nodes.js';

const props = defineProps({
  activeId: { type: String, default: null },
  theme: { type: String, default: 'light' },
  /** 面板导航时递增，触发聚焦选中节点 */
  focusNonce: { type: Number, default: 0 },
});

const emit = defineEmits(['select', 'clear']);

const { fitView } = useVueFlow();

const nodes = ref(
  buildFlowNodes().map((n) => ({
    ...n,
    selected: n.id === props.activeId,
  }))
);
const edges = ref(buildFlowEdges());

const nodeTypes = {
  knowledge: GraphCard,
  chapter: ChapterFrame,
  stub: GraphCard,
};
const edgeTypes = { relation: RelationEdge };

const isLight = computed(() => props.theme === 'light');
const bgColor = computed(() =>
  isLight.value ? '#e2e8f0' : 'rgba(161, 161, 170, 0.18)'
);
const miniMask = computed(() =>
  isLight.value ? 'rgba(248, 250, 252, 0.7)' : 'rgba(9, 9, 11, 0.72)'
);

/** 区分点击与拖拽，避免拖完误选/误清 */
let dragMoved = false;
/** 拖章标题时，同步平移同章 topic */
let chapterDragOrigin = null;

function syncSelection(id) {
  for (const n of nodes.value) {
    const on = n.id === id;
    if (n.selected !== on) n.selected = on;
  }
  for (const e of edges.value) {
    const on = Boolean(id && (e.source === id || e.target === id));
    if (e.selected !== on) e.selected = on;
  }
}

watch(
  () => props.activeId,
  (id) => syncSelection(id),
  { immediate: true }
);

watch(
  () => props.focusNonce,
  async (nonce) => {
    if (!nonce || !props.activeId) return;
    await nextTick();
    fitView({
      nodes: [props.activeId],
      padding: 0.45,
      duration: 420,
      maxZoom: 1.15,
    });
  }
);

function onNodeClick({ node }) {
  if (dragMoved) return;
  emit('select', node.id);
}

function onPaneClick() {
  if (dragMoved) return;
  emit('clear');
}

function onNodeDragStart({ node }) {
  dragMoved = false;
  chapterDragOrigin =
    node.type === 'chapter' ? { x: node.position.x, y: node.position.y } : null;
}

function onNodeDrag({ node }) {
  dragMoved = true;
  if (node.type !== 'chapter' || !chapterDragOrigin) return;
  const dx = node.position.x - chapterDragOrigin.x;
  const dy = node.position.y - chapterDragOrigin.y;
  if (dx === 0 && dy === 0) return;
  chapterDragOrigin = { x: node.position.x, y: node.position.y };
  const chapterId = node.id;
  for (const n of nodes.value) {
    if (n.data?.kind === 'topic' && n.data.chapterId === chapterId) {
      n.position.x += dx;
      n.position.y += dy;
    }
  }
}

function onNodeDragStop() {
  chapterDragOrigin = null;
  /* 下一拍再清，避免同一次 pointerup 仍触发 click */
  requestAnimationFrame(() => {
    dragMoved = false;
  });
}

function doFit(duration = 450) {
  nextTick(() => fitView({ padding: 0.16, duration }));
}

function resetLayout() {
  const origin = getOriginPositions();
  for (const n of nodes.value) {
    const p = origin.get(n.id);
    if (p) {
      n.position.x = p.x;
      n.position.y = p.y;
    }
  }
  doFit(450);
}
</script>

<template>
  <div class="graph-wrap">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      :default-viewport="{ zoom: 0.52 }"
      :min-zoom="0.12"
      :max-zoom="1.9"
      :nodes-draggable="true"
      :nodes-connectable="false"
      :edges-updatable="false"
      :elements-selectable="true"
      :elevate-edges-on-select="true"
      :select-nodes-on-drag="false"
      :multi-selection-key-code="null"
      :pan-on-drag="true"
      :zoom-on-scroll="true"
      :zoom-on-double-click="false"
      :prevent-scrolling="true"
      fit-view-on-init
      @node-click="onNodeClick"
      @pane-click="onPaneClick"
      @node-drag-start="onNodeDragStart"
      @node-drag="onNodeDrag"
      @node-drag-stop="onNodeDragStop"
      @pane-ready="() => doFit(600)"
      @pane-double-click="resetLayout"
    >
      <Background variant="lines" :gap="24" :size="1" :pattern-color="bgColor" />
      <Controls position="bottom-left" aria-label="画布缩放控制" />
      <MiniMap
        position="bottom-right"
        pannable
        zoomable
        aria-label="小地图"
        :node-color="(n) => n.data?.tone?.bg || '#6366f1'"
        :mask-color="miniMask"
      />
    </VueFlow>
    <div class="graph-tools">
      <button
        type="button"
        class="graph-tool"
        title="恢复默认布局（双击空白亦可）"
        aria-label="复位布局"
        @click="resetLayout"
      >
        复位
      </button>
    </div>
  </div>
</template>

<style scoped>
.graph-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--canvas);
}

.graph-wrap :deep(.vue-flow__edges) {
  z-index: 2 !important;
  pointer-events: none !important;
}

.graph-wrap :deep(.vue-flow__edge-labels) {
  z-index: 4 !important;
  pointer-events: none !important;
}

.graph-wrap :deep(.vue-flow__nodes) {
  z-index: 3 !important;
}

.graph-wrap :deep(.vue-flow__node) {
  cursor: pointer;
}

.graph-wrap :deep(.vue-flow__node.dragging) {
  cursor: grabbing;
}

.graph-wrap :deep(.vue-flow__node-chapter) {
  z-index: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  cursor: default !important;
  pointer-events: none !important;
}

.graph-wrap :deep(.vue-flow__node-chapter .chapter__drag) {
  pointer-events: auto !important;
  cursor: grab;
}

.graph-wrap :deep(.vue-flow__node-chapter .chapter__drag:active) {
  cursor: grabbing;
}

.graph-wrap :deep(.vue-flow__edge-path) {
  stroke-linecap: round;
  pointer-events: none;
  transition: stroke-opacity 0.2s ease, stroke-width 0.2s ease;
}

.graph-wrap :deep(.vue-flow__edge.animated path) {
  stroke-dasharray: 5;
  animation: vf-dash 0.5s linear infinite;
}

.graph-wrap :deep(.vue-flow__controls),
.graph-wrap :deep(.vue-flow__minimap) {
  z-index: 20;
}

.graph-wrap :deep(.vue-flow__controls) {
  box-shadow: var(--shadow-sm);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--line);
  margin: 15px;
}

.graph-wrap :deep(.vue-flow__controls-button) {
  background: var(--ink-2);
  border-bottom: 1px solid var(--line);
  width: 28px;
  height: 28px;
  fill: var(--mist-dim);
}

.graph-wrap :deep(.vue-flow__controls-button:hover) {
  background: var(--ink-3);
}

.graph-wrap :deep(.vue-flow__controls-button:focus-visible) {
  box-shadow: var(--focus-ring);
}

.graph-wrap :deep(.vue-flow__minimap) {
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--ink-2) !important;
  margin: 15px;
}

.graph-tools {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 30;
}

.graph-tool {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--mist-dim);
  background: var(--glass);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.graph-tool:hover {
  color: var(--accent);
  border-color: var(--accent);
}

@keyframes vf-dash {
  from {
    stroke-dashoffset: 10;
  }
}

@media (prefers-reduced-motion: reduce) {
  .graph-wrap :deep(.vue-flow__edge.animated path) {
    animation: none;
  }
}
</style>
