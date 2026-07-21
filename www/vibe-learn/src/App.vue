<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import KnowledgeGraph from './components/KnowledgeGraph.vue';
import NodePanel from './components/NodePanel.vue';
import { useBlobity } from './composables/useBlobity.js';
import { getNodeById, countTopics } from './data/nodes.js';

const THEME_KEY = 'vibe-learn-theme';

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function readNodeFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get('node');
    return id && getNodeById(id) ? id : 'chapter-computer-network';
  } catch {
    return 'chapter-computer-network';
  }
}

function writeNodeToUrl(id) {
  try {
    const url = new URL(window.location.href);
    if (id) url.searchParams.set('node', id);
    else url.searchParams.delete('node');
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    /* ignore */
  }
}

const activeId = ref(readNodeFromUrl());
const theme = ref(readTheme());
/** 面板 chip 跳转时递增，驱动图谱聚焦该节点 */
const focusNonce = ref(0);
const activeNode = computed(() => (activeId.value ? getNodeById(activeId.value) : null));

useBlobity(theme);

watch(
  theme,
  (t) => {
    document.documentElement.setAttribute('data-theme', t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      /* ignore */
    }
  },
  { immediate: true }
);

watch(activeId, (id) => writeNodeToUrl(id), { immediate: true });

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

function selectNode(id) {
  activeId.value = id;
}

function navigateNode(id) {
  activeId.value = id;
  focusNonce.value += 1;
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
    <a class="skip-link" href="#learn-panel">跳到讲解面板</a>

    <header class="topbar">
      <div class="brand" data-blobity translate="no">
        <div class="brand-mark">Vibe <span>Learn</span></div>
        <div class="brand-sub">知识图谱</div>
      </div>
      <div class="topbar-actions">
        <button
          type="button"
          class="theme-toggle"
          data-blobity
          :aria-pressed="theme === 'dark'"
          :aria-label="theme === 'dark' ? '当前深色，点击切换到浅色' : '当前浅色，点击切换到深色'"
          :title="theme === 'dark' ? '切换到浅色' : '切换到深色'"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? '深色' : '浅色' }}
        </button>
        <div class="topbar-meta">第一章 <strong>{{ countTopics() }}</strong> 个主题</div>
      </div>
    </header>

    <div class="workspace">
      <section class="graph-pane" aria-label="知识图谱画布">
        <KnowledgeGraph
          :active-id="activeId"
          :theme="theme"
          :focus-nonce="focusNonce"
          @select="selectNode"
          @clear="clearSelection"
        />
      </section>

      <aside id="learn-panel" class="panel-pane" aria-label="节点讲解">
        <NodePanel
          v-if="activeNode"
          :node="activeNode"
          @close="clearSelection"
          @navigate="navigateNode"
        />
        <div v-else class="empty-hint">
          <h2>选择一个节点</h2>
          <p>点卡片看讲解；拖空白平移画布；拖章标题可整章移动。Esc 或点空白取消选中。</p>
        </div>
      </aside>
    </div>
  </div>
</template>
