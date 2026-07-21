<script setup>
import { computed } from 'vue';
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
</script>

<template>
  <div v-if="node" class="panel">
    <header class="panel__head">
      <div>
        <p class="panel__tag">{{ node.tag }}</p>
        <h2 class="panel__title">{{ node.label }}</h2>
        <p class="panel__sub">{{ node.subtitle }}</p>
      </div>
      <button class="panel__close" type="button" aria-label="关闭" @click="emit('close')">
        Esc
      </button>
    </header>

    <div class="panel__scroll">
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
  font-size: clamp(1.5rem, 2vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #f5f8ff;
}

.panel__sub {
  margin: 0.35rem 0 0;
  color: var(--mist-dim);
  font-size: 0.9rem;
}

.panel__close {
  align-self: flex-start;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  color: var(--mist-dim);
  border: 1px solid var(--line);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.panel__close:hover {
  color: var(--mist);
  border-color: rgba(62, 224, 196, 0.4);
}

.panel__scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 1.1rem 1.4rem 2.4rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(62, 224, 196, 0.35) transparent;
}

.panel__role {
  margin: 0 0 0.9rem;
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.55;
  color: #d7e8df;
  background: rgba(62, 224, 196, 0.08);
  border: 1px solid rgba(62, 224, 196, 0.22);
}

.panel__nav {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.15rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(62, 224, 196, 0.1);
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
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.panel__chip:hover {
  border-color: rgba(62, 224, 196, 0.45);
  color: #e8fff8;
}

.panel__chip.next {
  border-color: rgba(240, 160, 80, 0.35);
  color: #f5e6d0;
}

.panel__chip.next:hover {
  border-color: rgba(240, 160, 80, 0.65);
  background: rgba(240, 160, 80, 0.1);
}

.panel__chip.extend {
  border-style: dashed;
  border-color: rgba(94, 234, 212, 0.45);
  color: #c8fff2;
}

.panel__chip.extend:hover {
  border-color: rgba(94, 234, 212, 0.75);
  background: rgba(62, 224, 196, 0.1);
}

.md {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--mist);
  animation: fade-in 0.55s 0.08s ease both;
}

.md :deep(h1) {
  display: none;
}

.md :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.22rem;
  font-weight: 600;
  color: #eef4ff;
  margin: 1.55rem 0 0.6rem;
  letter-spacing: -0.01em;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid rgba(62, 224, 196, 0.12);
}

.md :deep(h2:first-of-type) {
  margin-top: 0.2rem;
}

.md :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 600;
  color: #e2ecf8;
  margin: 1.25rem 0 0.45rem;
}

.md :deep(p) {
  margin: 0.6rem 0;
}

.md :deep(h3 + p),
.md :deep(h3 + ul) {
  margin-top: 0.35rem;
}

.md :deep(hr) {
  border: none;
  border-top: 1px solid rgba(62, 224, 196, 0.14);
  margin: 1.5rem 0;
}

.md :deep(blockquote) {
  margin: 0.8rem 0;
  padding: 0.65rem 0.9rem;
  border-left: 3px solid var(--signal);
  background: rgba(62, 224, 196, 0.06);
  border-radius: 0 10px 10px 0;
  color: #d7e6f5;
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
  background: rgba(62, 224, 196, 0.08);
  color: #e8f7f2;
  font-weight: 600;
}

.md :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.82em;
  padding: 0.1em 0.35em;
  border-radius: 4px;
  background: rgba(240, 160, 80, 0.12);
  color: var(--amber);
}

.md :deep(pre) {
  margin: 0.75rem 0;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  overflow: auto;
  background: rgba(7, 11, 18, 0.65);
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.5;
  color: #d5e2f0;
}

.md :deep(pre code) {
  padding: 0;
  background: none;
  color: inherit;
}

.md :deep(strong) {
  color: #f0f6ff;
  font-weight: 600;
}

.md :deep(input[type='checkbox']) {
  margin-right: 0.4rem;
  accent-color: var(--signal);
}
</style>
