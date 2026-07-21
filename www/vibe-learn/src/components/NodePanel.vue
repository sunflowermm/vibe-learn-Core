<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { marked } from 'marked';
import NetworkLab from './NetworkLab.vue';
import { resolveNodes } from '../data/nodes.js';

const props = defineProps({
  node: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'navigate']);

marked.setOptions({
  gfm: true,
  breaks: false,
});

const scrollEl = ref(null);
const titleEl = ref(null);

const html = computed(() => {
  if (!props.node?.markdown) return '';
  return marked.parse(props.node.markdown);
});

const showLab = computed(() => props.node?.lab === 'osi');
const prereqNodes = computed(() => resolveNodes(props.node?.prereqs));
const nextNodes = computed(() => resolveNodes(props.node?.next));
const extendNodes = computed(() =>
  resolveNodes([...(props.node?.chapterOut || []), ...(props.node?.sideOut || [])])
);

watch(
  () => props.node?.id,
  async () => {
    await nextTick();
    if (scrollEl.value) scrollEl.value.scrollTop = 0;
    titleEl.value?.focus({ preventScroll: true });
  }
);
</script>

<template>
  <div v-if="node" class="panel" role="article" :aria-labelledby="`panel-title-${node.id}`">
    <header class="panel__head">
      <div class="panel__head-text">
        <p class="panel__tag">{{ node.tag }}</p>
        <h2
          :id="`panel-title-${node.id}`"
          ref="titleEl"
          class="panel__title"
          tabindex="-1"
        >
          {{ node.label }}
        </h2>
        <p class="panel__sub">{{ node.subtitle }}</p>
      </div>
      <button
        class="panel__close"
        type="button"
        aria-label="关闭讲解面板"
        title="Esc"
        @click="emit('close')"
      >
        Esc
      </button>
    </header>

    <div ref="scrollEl" class="panel__scroll">
      <p v-if="node.role" class="panel__role">{{ node.role }}</p>

      <nav
        v-if="prereqNodes.length || nextNodes.length || extendNodes.length"
        class="panel__nav"
        aria-label="相关节点"
      >
        <div v-if="prereqNodes.length" class="panel__nav-row">
          <span class="panel__nav-label">建议先学</span>
          <button
            v-for="n in prereqNodes"
            :key="n.id"
            type="button"
            class="panel__chip"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
        <div v-if="nextNodes.length" class="panel__nav-row">
          <span class="panel__nav-label">接下来</span>
          <button
            v-for="n in nextNodes"
            :key="n.id"
            type="button"
            class="panel__chip next"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
        <div v-if="extendNodes.length" class="panel__nav-row">
          <span class="panel__nav-label">延伸</span>
          <button
            v-for="n in extendNodes"
            :key="n.id"
            type="button"
            class="panel__chip extend"
            @click="emit('navigate', n.id)"
          >
            {{ n.label }}
          </button>
        </div>
      </nav>

      <article class="md" v-html="html" />
      <NetworkLab v-if="showLab" />
    </div>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.panel__head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.4rem 1rem;
  border-bottom: 1px solid var(--line);
}

.panel__head-text {
  min-width: 0;
}

.panel__tag {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--signal);
}

.panel__title {
  margin: 0.25rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2vw, 1.65rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--node-title);
  text-wrap: balance;
  scroll-margin-top: 1rem;
}

.panel__title:focus {
  outline: none;
}

.panel__sub {
  margin: 0.35rem 0 0;
  color: var(--mist-dim);
  font-size: 0.9rem;
}

.panel__close {
  align-self: flex-start;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  color: var(--mist-dim);
  border: 1px solid var(--line);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.panel__close:hover {
  color: var(--mist);
  border-color: var(--accent);
}

.panel__scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 1.1rem 1.4rem 2.4rem;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-soft) transparent;
  overscroll-behavior: contain;
}

.panel__role {
  margin: 0 0 0.9rem;
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--mist);
  background: var(--accent-soft);
  border: 1px solid var(--line);
}

.panel__nav {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.15rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.panel__nav-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.panel__nav-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--mist-dim);
  margin-right: 0.25rem;
  min-width: 3.5rem;
}

.panel__chip {
  font-size: 0.78rem;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  color: var(--mist);
  background: var(--ink-3);
  border: 1px solid var(--line);
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.panel__chip:hover {
  border-color: var(--accent);
  color: var(--node-title);
}

.panel__chip.next {
  border-color: color-mix(in srgb, var(--amber) 40%, transparent);
  color: var(--amber);
}

.panel__chip.next:hover {
  border-color: var(--amber);
  background: color-mix(in srgb, var(--amber) 12%, transparent);
}

.panel__chip.extend {
  border-style: dashed;
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  color: var(--accent);
}

.panel__chip.extend:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.md {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--mist);
}

.md :deep(h1) {
  display: none;
}

.md :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--node-title);
  margin: 1.45rem 0 0.55rem;
  letter-spacing: -0.01em;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--line);
}

.md :deep(h2:first-of-type) {
  margin-top: 0.2rem;
}

.md :deep(h3) {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--node-title);
  margin: 1.15rem 0 0.4rem;
}

.md :deep(p) {
  margin: 0.55rem 0;
}

.md :deep(h3 + p),
.md :deep(h3 + ul) {
  margin-top: 0.3rem;
}

.md :deep(hr) {
  border: none;
  border-top: 1px solid var(--line);
  margin: 1.35rem 0;
}

.md :deep(blockquote) {
  margin: 0.75rem 0;
  padding: 0.6rem 0.85rem;
  border-left: 3px solid var(--accent);
  background: var(--accent-soft);
  border-radius: 0 8px 8px 0;
  color: var(--mist);
}

.md :deep(blockquote p) {
  margin: 0;
}

.md :deep(ol),
.md :deep(ul) {
  margin: 0.45rem 0;
  padding-left: 1.25rem;
}

.md :deep(li) {
  margin: 0.35rem 0;
  line-height: 1.6;
}

.md :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.75rem 0 1rem;
  font-size: 0.88rem;
}

.md :deep(th),
.md :deep(td) {
  border: 1px solid var(--line);
  padding: 0.45rem 0.6rem;
  text-align: left;
}

.md :deep(th) {
  background: var(--accent-soft);
  color: var(--node-title);
  font-weight: 600;
}

.md :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.82em;
  padding: 0.1em 0.35em;
  border-radius: 4px;
  background: color-mix(in srgb, var(--amber) 12%, transparent);
  color: var(--amber);
}

.md :deep(pre) {
  margin: 0.75rem 0;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  overflow: auto;
  background: var(--ink-3);
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--mist);
}

.md :deep(pre code) {
  padding: 0;
  background: none;
  color: inherit;
}

.md :deep(strong) {
  color: var(--node-title);
  font-weight: 600;
}

.md :deep(input[type='checkbox']) {
  margin-right: 0.4rem;
  accent-color: var(--accent);
}
</style>
