<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import KnowledgeGraph from './components/KnowledgeGraph.vue';
import NodePanel from './components/NodePanel.vue';
import { useBlobity } from './composables/useBlobity.js';
import { getNodeById, countTopics } from './data/nodes.js';

const THEME_KEY = 'vibe-learn-theme';

const activeId = ref('chapter-computer-network');
const theme = ref(
  typeof localStorage !== 'undefined' && localStorage.getItem(THEME_KEY) === 'dark'
    ? 'dark'
    : 'light'
);

const activeNode = computed(() => (activeId.value ? getNodeById(activeId.value) : null));

/** 官网同款 Blobity 光标 blob */
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

function setTheme(t) {
  theme.value = t;
}

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
      <div class="brand" data-blobity>
        <div class="brand-mark">Vibe <span>Learn</span></div>
        <div class="brand-sub">知识图谱</div>
      </div>
      <div class="topbar-actions">
        <div class="theme-toggle" role="group" aria-label="主题">
          <button
            type="button"
            class="theme-toggle__btn"
            :class="{ active: theme === 'dark' }"
            @click="setTheme('dark')"
          >
            黑
          </button>
          <button
            type="button"
            class="theme-toggle__btn"
            :class="{ active: theme === 'light' }"
            @click="setTheme('light')"
          >
            白
          </button>
        </div>
        <div class="topbar-meta">
          <div>第一章 <strong>{{ countTopics() }}</strong> 个主题</div>
        </div>
      </div>
    </header>

    <div class="workspace">
      <section class="graph-pane">
        <KnowledgeGraph :active-id="activeId" :theme="theme" @select="selectNode" />
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
          <p>点选卡片阅读；拖动画布平移缩放。顶栏可切换黑 / 白主题。</p>
        </div>
      </aside>
    </div>
  </div>
</template>
