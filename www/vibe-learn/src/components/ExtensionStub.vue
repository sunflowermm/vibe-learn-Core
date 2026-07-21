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
    '--card-bg': t.bg || '#f97316',
    '--card-fg': t.fg || '#fff',
    '--card-muted': t.muted || 'rgba(255,255,255,0.85)',
  };
});
</script>

<template>
  <div class="stub" :class="{ selected }" :style="toneStyle">
    <Handle id="left" type="source" :position="Position.Left" class="stub__handle" :connectable="false" />
    <Handle id="right" type="source" :position="Position.Right" class="stub__handle" :connectable="false" />
    <Handle id="top" type="source" :position="Position.Top" class="stub__handle" :connectable="false" />
    <Handle id="bottom" type="source" :position="Position.Bottom" class="stub__handle" :connectable="false" />

    <div class="stub__tag">{{ data.tag }}</div>
    <div class="stub__title">{{ data.label }}</div>
    <div class="stub__sub">{{ data.subtitle }}</div>
  </div>
</template>

<style scoped>
.stub {
  width: 240px;
  padding: 15px 17px;
  border-radius: var(--radius);
  background: var(--card-bg);
  color: var(--card-fg);
  border: none;
  box-shadow: var(--shadow-node);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.stub:hover {
  transform: translateY(-2px);
}

.stub.selected {
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--card-bg) 40%, #fff),
    var(--shadow-node);
}

.stub__tag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--card-muted);
}

.stub__title {
  margin-top: 7px;
  font-size: 15px;
  font-weight: 700;
  color: var(--card-fg);
}

.stub__sub {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--card-muted);
}

.stub__handle {
  width: 18px !important;
  height: 4px !important;
  border-radius: 2px !important;
  background: #94a3b8 !important;
  border: none !important;
  opacity: 0.85;
  pointer-events: none !important;
}
</style>
