<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { computed, nextTick, ref, watch } from 'vue';
import ChapterFrame from './ChapterFrame.vue';
import ExtensionStub from './ExtensionStub.vue';
import KnowledgeNode from './KnowledgeNode.vue';
import RelationEdge from './RelationEdge.vue';
import {
  buildFlowEdges,
  buildFlowNodes,
  getOriginPositions,
} from '../data/nodes.js';

const props = defineProps({
  activeId: { type: String, default: null },
  theme: { type: String, default: 'dark' },
});

const emit = defineEmits(['select']);

const { fitView } = useVueFlow();

const nodes = ref(
  buildFlowNodes().map((n) => ({
    ...n,
    selected: n.id === props.activeId,
  }))
);
const edges = ref(buildFlowEdges());

const nodeTypes = {
  knowledge: KnowledgeNode,
  chapter: ChapterFrame,
  stub: ExtensionStub,
};
const edgeTypes = { relation: RelationEdge };

/** 网格：暗底用弱灰线，不要发白 */
const bgVariant = computed(() => 'lines');
const bgColor = computed(() =>
  props.theme === 'light' ? '#e2e8f0' : 'rgba(161, 161, 170, 0.18)'
);
const bgGap = computed(() => 24);
const bgSize = computed(() => 1);
const miniMask = computed(() =>
  props.theme === 'light' ? 'rgba(248, 250, 252, 0.7)' : 'rgba(9, 9, 11, 0.72)'
);

let chapterDragOrigin = null;

watch(
  () => props.activeId,
  (id) => {
    for (const n of nodes.value) {
      const on = n.id === id;
      if (n.selected !== on) n.selected = on;
    }
  }
);

function onNodeClick({ node }) {
  emit('select', node.id);
}

function onNodeDragStart({ node }) {
  chapterDragOrigin =
    node.type === 'chapter' ? { x: node.position.x, y: node.position.y } : null;
}

function onNodeDrag({ node }) {
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
}

function onInit() {
  nextTick(() => fitView({ padding: 0.16, duration: 600 }));
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
  nextTick(() => fitView({ padding: 0.16, duration: 450 }));
}

function miniColor(node) {
  return node.data?.tone?.bg || '#6366f1';
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
      @node-drag-start="onNodeDragStart"
      @node-drag="onNodeDrag"
      @node-drag-stop="onNodeDragStop"
      @pane-ready="onInit"
      @pane-double-click="resetLayout"
    >
      <Background
        :variant="bgVariant"
        :gap="bgGap"
        :size="bgSize"
        :pattern-color="bgColor"
      />
      <Controls position="bottom-left" />
      <MiniMap
        position="bottom-right"
        pannable
        zoomable
        :node-color="miniColor"
        :mask-color="miniMask"
      />
    </VueFlow>
    <div class="graph-tools">
      <button type="button" class="graph-tool" @click="resetLayout">复位</button>
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
  z-index: 3 !important;
  pointer-events: none !important;
}

.graph-wrap :deep(.vue-flow__nodes) {
  z-index: 5 !important;
}

.graph-wrap :deep(.vue-flow__node) {
  cursor: grab;
}

.graph-wrap :deep(.vue-flow__node:active) {
  cursor: grabbing;
}

.graph-wrap :deep(.vue-flow__node-chapter) {
  z-index: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  cursor: default !important;
  /* 大框本身穿透，空白处可平移画布；只有小卡片接事件 */
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
}

/* 与官网 animated edge 一致 */
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
</style>
