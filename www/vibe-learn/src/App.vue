<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import KnowledgeGraph from './components/KnowledgeGraph.vue';
import NodePanel from './components/NodePanel.vue';
import { getNodeById, countTopics } from './data/nodes.js';

const activeId = ref('chapter-computer-network');

const activeNode = computed(() => (activeId.value ? getNodeById(activeId.value) : null));

function selectNode(id) {
  activeId.value = id;
}

function clearSelection() {
  activeId.value = null;
}

function onKey(e) {
  if (e.key === 'Escape') clearSelection();
}

onMounted(() => window.addEventListener('keydown', onKey));
onUnmounted(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">Vibe Learn</div>
        <div class="brand-sub">章 · 延伸 · 番外 · 交互式知识图谱</div>
      </div>
      <div class="topbar-meta">
        <div>第一章 <strong>{{ countTopics() }}</strong> 个主题</div>
      </div>
    </header>

    <div class="workspace">
      <section class="graph-pane">
        <KnowledgeGraph :active-id="activeId" @select="selectNode" />
      </section>

      <aside class="panel-pane">
        <NodePanel
          v-if="activeNode"
          :node="activeNode"
          @close="clearSelection"
          @navigate="selectNode"
        />
        <div v-else class="empty-hint">
          <h2>选择一个节点</h2>
          <p>章框内是网络主线；上方伸出第二章，下方琥珀色是代理引擎番外（本质 · 端口 · 配置）。</p>
        </div>
      </aside>
    </div>
  </div>
</template>
