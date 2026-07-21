<script setup>
import { Handle, Position } from '@vue-flow/core';
import { computed } from 'vue';

const props = defineProps({
  data: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});

const toneStyle = computed(() => {
  const t = props.data.tone || {};
  return {
    '--card-bg': t.bg || '#8b5cf6',
    '--card-fg': t.fg || '#fff',
    '--card-muted': t.muted || 'rgba(255,255,255,0.8)',
  };
});
</script>

<template>
  <!-- 官网同款：彩色实心卡片 + 白字 + 浮起阴影 -->
  <div class="k-node" :class="{ selected }" :style="toneStyle">
    <Handle id="left" type="source" :position="Position.Left" class="k-handle" :connectable="false" />
    <Handle id="right" type="source" :position="Position.Right" class="k-handle" :connectable="false" />
    <Handle id="top" type="source" :position="Position.Top" class="k-handle" :connectable="false" />
    <Handle id="bottom" type="source" :position="Position.Bottom" class="k-handle" :connectable="false" />

    <div class="k-node__tag">{{ data.tag }}</div>
    <div class="k-node__title">{{ data.label }}</div>
    <div class="k-node__sub">{{ data.subtitle }}</div>
  </div>
</template>

<style scoped>
.k-node {
  width: 250px;
  padding: 16px 18px 18px;
  border-radius: var(--radius);
  background: var(--card-bg);
  color: var(--card-fg);
  border: none;
  box-shadow: var(--shadow-node);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

.k-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.18);
}

.k-node.selected {
  filter: brightness(1.05);
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--card-bg) 35%, #fff),
    var(--shadow-node);
}

.k-node__tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 8px;
  color: var(--card-muted);
}

.k-node__title {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--card-fg);
}

.k-node__sub {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--card-muted);
}

/* 官网细灰连接条 */
.k-handle {
  width: 18px !important;
  height: 4px !important;
  border-radius: 2px !important;
  background: #94a3b8 !important;
  border: none !important;
  opacity: 0.85;
  pointer-events: none !important;
}
</style>
