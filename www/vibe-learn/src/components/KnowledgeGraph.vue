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

/** 拖整章时记录上一帧位置，只平移章内 topic，绝不带动 stub */
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
  if (node.type === 'chapter') {
    chapterDragOrigin = { x: node.position.x, y: node.position.y };
  } else {
    chapterDragOrigin = null;
  }
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
  nextTick(() => fitView({ padding: 0.12, duration: 700 }));
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
  nextTick(() => fitView({ padding: 0.12, duration: 500 }));
}

const hint = computed(() => '拖卡片独立移动 · 章标题拖整章（番外不跟） · 空白平移');

function miniColor(node) {
  if (node.type === 'chapter') return '#1a3a44';
  if (node.type === 'stub') return node.data?.branch === 'side' ? '#9a6b2f' : '#2a7a6a';
  return '#1a9e88';
}
</script>

<template>
  <div class="graph-wrap">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      :default-viewport="{ zoom: 0.62 }"
      :min-zoom="0.15"
      :max-zoom="1.85"
      :nodes-draggable="true"
      :nodes-connectable="false"
      :edges-updatable="false"
      :elements-selectable="true"
      :elevate-edges-on-select="false"
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
      <Background :gap="28" :size="1" pattern-color="rgba(62, 224, 196, 0.1)" />
      <Controls position="bottom-left" />
      <MiniMap
        position="bottom-right"
        pannable
        zoomable
        :node-color="miniColor"
        mask-color="rgba(7, 11, 18, 0.75)"
      />
    </VueFlow>
    <div class="graph-tools">
      <button type="button" class="graph-tool" @click="resetLayout">复位布局</button>
    </div>
    <p class="graph-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.graph-wrap {
  position: relative;
  width: 100%;
  height: 100%;
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
}

.graph-wrap :deep(.vue-flow__node-chapter .chapter__drag) {
  cursor: grab;
}

.graph-wrap :deep(.vue-flow__edge-path) {
  stroke-linecap: round;
  pointer-events: none;
}

.graph-wrap :deep(.vue-flow__controls),
.graph-wrap :deep(.vue-flow__minimap) {
  z-index: 20;
}

.graph-wrap :deep(.vue-flow__controls) {
  box-shadow: var(--shadow);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.graph-wrap :deep(.vue-flow__controls-button) {
  background: var(--ink-2);
  border-bottom-color: var(--line);
  fill: var(--mist);
}

.graph-wrap :deep(.vue-flow__minimap) {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--ink-2) !important;
}

.graph-tools {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 30;
}

.graph-tool {
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--mist-dim);
  background: rgba(7, 11, 18, 0.75);
  border: 1px solid var(--line);
  backdrop-filter: blur(8px);
}

.graph-tool:hover {
  color: var(--signal);
  border-color: rgba(62, 224, 196, 0.45);
}

.graph-hint {
  position: absolute;
  left: 50%;
  bottom: 1.1rem;
  transform: translateX(-50%);
  margin: 0;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--mist-dim);
  background: rgba(7, 11, 18, 0.72);
  border: 1px solid var(--line);
  backdrop-filter: blur(8px);
  pointer-events: none;
  white-space: nowrap;
  max-width: calc(100% - 2rem);
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 20;
}
</style>
