<script setup>
import { VueFlow, useVueFlow, ConnectionMode } from '@vue-flow/core';
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
  /** 本机书签节点 id */
  bookmarkedIds: { type: Array, default: () => [] },
  /** 有笔记的节点 id */
  notedIds: { type: Array, default: () => [] },
});

const emit = defineEmits(['select', 'clear']);

const { fitView } = useVueFlow();

const nodes = ref(
  buildFlowNodes().map((n) => ({
    ...n,
    selected: n.id === props.activeId,
    class: '',
  }))
);
const edges = ref(buildFlowEdges());

const nodeTypes = {
  knowledge: GraphCard,
  chapter: ChapterFrame,
};
const edgeTypes = { relation: RelationEdge };

const isLight = computed(() => props.theme === 'light');
const bgColor = computed(() =>
  isLight.value ? '#e2e8f0' : 'rgba(161, 161, 170, 0.18)'
);
const miniMask = computed(() =>
  isLight.value ? 'rgba(248, 250, 252, 0.7)' : 'rgba(9, 9, 11, 0.72)'
);

/** 悬停节点：预览相邻关系（未点选时也出标签） */
const hoverId = ref(null);

/** 区分点击与拖拽，避免拖完误选/误清 */
let dragMoved = false;
/** 拖章标题时，同步平移同章 topic */
let chapterDragOrigin = null;

function neighborIds(id) {
  if (!id) return new Set();
  const set = new Set([id]);
  for (const e of edges.value) {
    if (e.source === id) set.add(e.target);
    if (e.target === id) set.add(e.source);
  }
  return set;
}

function chapterIdOf(nodeId) {
  if (!nodeId) return null;
  const n = nodes.value.find((x) => x.id === nodeId);
  return n?.data?.chapterId || null;
}

/** 同章全部 topic 节点 */
function chapterMemberIds(chapterId) {
  const set = new Set();
  if (!chapterId) return set;
  for (const n of nodes.value) {
    if (n.data?.kind === 'topic' && n.data.chapterId === chapterId) {
      set.add(n.id);
    }
  }
  return set;
}

/**
 * 点选 / 悬停 → 点亮所属整章 + 与该章有连线的外部节点，以及相关连线；
 * 关系文字仍只在「当前卡片相邻边」上显示，避免标签爆炸。
 */
function syncHighlight(activeId, hoveredId) {
  const focusId = activeId || hoveredId;
  const chapterId = chapterIdOf(focusId);
  const chapterMembers = chapterId
    ? chapterMemberIds(chapterId)
    : neighborIds(focusId);

  /** 整章 + 任意一跳跨章邻居 */
  const spotlight = new Set(chapterMembers);
  if (chapterMembers.size) {
    for (const e of edges.value) {
      const srcIn = chapterMembers.has(e.source);
      const tgtIn = chapterMembers.has(e.target);
      if (srcIn || tgtIn) {
        spotlight.add(e.source);
        spotlight.add(e.target);
      }
    }
  }

  const hasFocus = Boolean(focusId);

  for (const e of edges.value) {
    const touchesLit =
      hasFocus && (spotlight.has(e.source) || spotlight.has(e.target));
    const onActive = Boolean(
      activeId && (e.source === activeId || e.target === activeId)
    );
    const onHover = Boolean(
      hoveredId && (e.source === hoveredId || e.target === hoveredId)
    );
    if (e.selected !== onActive) e.selected = onActive;
    const preview = onHover && !onActive;
    const chapterLit = touchesLit && !onActive && !preview;
    if (e.data?.preview !== preview || e.data?.chapterLit !== chapterLit) {
      e.data = { ...(e.data || {}), preview, chapterLit };
    }
    let nextClass = '';
    if (preview) nextClass = 'is-preview';
    else if (chapterLit) nextClass = 'is-chapter';
    if (e.class !== nextClass) e.class = nextClass;
  }

  for (const n of nodes.value) {
    if (n.data?.kind === 'chapter' || n.type === 'chapter') {
      n.selected = n.id === chapterId;
      n.class = chapterId && n.id === chapterId ? 'is-chapter-frame' : '';
      continue;
    }
    const on = n.id === activeId;
    if (n.selected !== on) n.selected = on;
    let nextClass = '';
    if (hasFocus && !spotlight.has(n.id)) nextClass = 'is-dimmed';
    else if (hasFocus && spotlight.has(n.id) && n.id !== activeId) {
      nextClass = chapterMembers.has(n.id)
        ? 'is-chapter-peer'
        : 'is-bridge-peer';
    }
    if (n.class !== nextClass) n.class = nextClass;
  }
}

watch(
  () => [props.activeId, hoverId.value],
  ([active, hover]) => syncHighlight(active, hover),
  { immediate: true }
);

watch(
  () => [props.bookmarkedIds, props.notedIds],
  () => {
    const bm = new Set(props.bookmarkedIds || []);
    const nt = new Set(props.notedIds || []);
    for (const n of nodes.value) {
      if (n.data?.kind !== 'topic') continue;
      const bookmarked = bm.has(n.id);
      const hasNote = nt.has(n.id);
      if (n.data.bookmarked !== bookmarked || n.data.hasNote !== hasNote) {
        n.data = { ...n.data, bookmarked, hasNote };
      }
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.focusNonce,
  async (nonce) => {
    if (!nonce || !props.activeId) return;
    await nextTick();
    const ch = chapterIdOf(props.activeId);
    const ids = ch
      ? [...chapterMemberIds(ch)]
      : [...neighborIds(props.activeId)];
    fitView({
      nodes: ids,
      padding: 0.28,
      duration: 420,
      maxZoom: 1.05,
    });
  }
);

function onNodeClick({ node }) {
  if (dragMoved) return;
  if (node.type === 'chapter') return;
  emit('select', node.id);
}

function onPaneClick() {
  if (dragMoved) return;
  hoverId.value = null;
  emit('clear');
}

/** 点连线：沿关系跳到另一端（已选一端则去对端，否则去 target） */
function onEdgeClick({ edge }) {
  if (dragMoved) return;
  const a = props.activeId;
  if (a === edge.source) emit('select', edge.target);
  else if (a === edge.target) emit('select', edge.source);
  else emit('select', edge.target);
}

function onNodeMouseEnter({ node }) {
  if (node.type === 'chapter' || node.data?.kind === 'chapter') return;
  hoverId.value = node.id;
}

function onNodeMouseLeave({ node }) {
  if (hoverId.value === node.id) hoverId.value = null;
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
  hoverId.value = null;
  doFit(450);
}

/** 框选：本章 + 与本章有连线的外部节点 */
function fitNeighborhood() {
  const id = props.activeId || hoverId.value;
  if (!id) {
    doFit(400);
    return;
  }
  const ch = chapterIdOf(id);
  const members = ch ? chapterMemberIds(ch) : new Set([id]);
  const ids = new Set(members);
  for (const e of edges.value) {
    if (members.has(e.source) || members.has(e.target)) {
      ids.add(e.source);
      ids.add(e.target);
    }
  }
  fitView({
    nodes: [...ids],
    padding: 0.28,
    duration: 400,
    maxZoom: 1.05,
  });
}
</script>

<template>
  <div class="graph-wrap" :class="{ 'has-focus': Boolean(activeId || hoverId) }">
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
      :connection-mode="ConnectionMode.Loose"
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
      @edge-click="onEdgeClick"
      @pane-click="onPaneClick"
      @node-mouse-enter="onNodeMouseEnter"
      @node-mouse-leave="onNodeMouseLeave"
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
        title="框选当前节点所属章节"
        aria-label="聚焦本章"
        @click="fitNeighborhood"
      >
        本章
      </button>
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
    <p class="graph-hint" aria-hidden="true">
      点选点亮整章及跨章关联 · 悬停预览关系 · 点连线跳转
    </p>
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
  z-index: 1 !important;
}

/* 标签仅少量出现时可压在节点之上，保证可读 */
.graph-wrap :deep(.vue-flow__edge-labels) {
  z-index: 6 !important;
  pointer-events: none !important;
}

.graph-wrap :deep(.vue-flow__nodes) {
  z-index: 5 !important;
}

.graph-wrap :deep(.vue-flow__node) {
  cursor: pointer;
  transition:
    opacity 0.22s ease,
    filter 0.22s ease;
}

.graph-wrap :deep(.vue-flow__node.is-dimmed) {
  opacity: 0.52;
  filter: grayscale(0.18);
}

.graph-wrap :deep(.vue-flow__node.is-dimmed:hover) {
  opacity: 0.92;
  filter: none;
}

.graph-wrap :deep(.vue-flow__node.is-chapter-peer .card) {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.32),
    var(--shadow-node);
  filter: brightness(1.03);
}

.graph-wrap :deep(.vue-flow__node.is-bridge-peer .card) {
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--accent) 55%, #fff),
    var(--shadow-node);
  filter: brightness(1.02);
}

.graph-wrap :deep(.vue-flow__node-chapter.is-chapter-frame) {
  opacity: 1 !important;
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
  opacity: 1 !important;
  filter: none !important;
}

.graph-wrap :deep(.vue-flow__node-chapter .chapter__drag) {
  pointer-events: auto !important;
  cursor: grab;
}

.graph-wrap :deep(.vue-flow__node-chapter .chapter__drag:active) {
  cursor: grabbing;
}

.graph-wrap.has-focus
  :deep(
    .vue-flow__edge:not(.selected):not(.is-preview):not(.is-chapter)
      .vue-flow__edge-path
  ) {
  stroke-opacity: 0.18 !important;
}

.graph-wrap :deep(.vue-flow__edge.selected .vue-flow__edge-path),
.graph-wrap :deep(.vue-flow__edge.is-preview .vue-flow__edge-path) {
  stroke-opacity: 1 !important;
}

.graph-wrap :deep(.vue-flow__edge.is-chapter .vue-flow__edge-path) {
  stroke-opacity: 0.88 !important;
  stroke-width: 2.15;
}

.graph-wrap :deep(.vue-flow__edge-path) {
  stroke-linecap: round;
  pointer-events: none;
  transition:
    stroke-opacity 0.2s ease,
    stroke-width 0.2s ease;
}

.graph-wrap :deep(.vue-flow__edge) {
  pointer-events: stroke;
  cursor: pointer;
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
  display: flex;
  gap: 8px;
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

.graph-hint {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  z-index: 15;
  margin: 0;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--mist-dim);
  background: var(--glass);
  border: 1px solid var(--line);
  pointer-events: none;
  opacity: 0.85;
  transition: opacity 0.25s ease;
}

.graph-wrap.has-focus .graph-hint {
  opacity: 0;
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

  .graph-wrap :deep(.vue-flow__node) {
    transition: none;
  }
}
</style>
