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
  <div class="stub" :class="{ selected }" :style="toneStyle" data-blobity>
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
  cursor: pointer;
  transform: translateZ(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stub:hover {
  transform: scale(1.02) translateY(-2px);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.35),
    0 16px 40px rgba(0, 0, 0, 0.35);
}

.stub.selected {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.45),
    var(--shadow-node);
}

.stub__tag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
}

.stub__title {
  margin-top: 7px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.stub__sub {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.82);
}

.stub__handle {
  width: 18px !important;
  height: 4px !important;
  border-radius: 2px !important;
  background: rgba(255, 255, 255, 0.45) !important;
  border: none !important;
  opacity: 1;
  pointer-events: none !important;
}
</style>
