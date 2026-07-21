<script setup>
import { Handle, Position } from '@vue-flow/core';
import { computed } from 'vue';

const props = defineProps({
  data: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});

const isSide = computed(() => props.data.branch === 'side');
</script>

<template>
  <div class="stub" :class="{ selected, side: isSide }">
    <Handle id="left" type="source" :position="Position.Left" class="stub__handle" :connectable="false" />
    <Handle id="right" type="source" :position="Position.Right" class="stub__handle" :connectable="false" />
    <Handle id="top" type="source" :position="Position.Top" class="stub__handle" :connectable="false" />
    <Handle id="bottom" type="source" :position="Position.Bottom" class="stub__handle" :connectable="false" />

    <div class="stub__surface">
      <div class="stub__tag">{{ data.tag }}</div>
      <div class="stub__title">{{ data.label }}</div>
      <div class="stub__sub">{{ data.subtitle }}</div>
      <div class="stub__badge">{{ data.branch === 'side' ? '番外 · 点开学习' : '预留延伸 · 点击查看说明' }}</div>
    </div>
    <div class="stub__glow" aria-hidden="true" />
  </div>
</template>

<style scoped>
.stub {
  position: relative;
  width: 260px;
  border-radius: 16px;
  border: 1.5px dashed rgba(62, 224, 196, 0.45);
  background: rgba(12, 22, 34, 0.55);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  overflow: visible;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.stub.side {
  border-color: rgba(240, 160, 80, 0.5);
}

.stub:hover {
  border-color: rgba(62, 224, 196, 0.65);
}

.stub.side:hover {
  border-color: rgba(240, 160, 80, 0.7);
}

.stub.selected {
  border-style: solid;
  border-color: rgba(240, 160, 80, 0.85);
  box-shadow: 0 0 0 1px rgba(240, 160, 80, 0.35), 0 12px 32px rgba(0, 0, 0, 0.35);
}

.stub__glow {
  position: absolute;
  inset: -3px;
  border-radius: 18px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.stub.selected .stub__glow {
  opacity: 1;
  animation: amber-pulse 2.2s ease-out infinite;
}

@keyframes amber-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(240, 160, 80, 0.45);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(240, 160, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(240, 160, 80, 0);
  }
}

.stub__surface {
  padding: 1rem 1.1rem 1.05rem;
  border-radius: inherit;
}

.stub__tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--signal);
}

.stub.side .stub__tag {
  color: var(--amber);
}

.stub__title {
  margin-top: 0.35rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: #eef4ff;
}

.stub__sub {
  margin-top: 0.35rem;
  font-size: 0.76rem;
  line-height: 1.4;
  color: var(--mist-dim);
}

.stub__badge {
  margin-top: 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: rgba(158, 176, 200, 0.9);
}

.stub__handle {
  width: 8px !important;
  height: 8px !important;
  background: var(--signal) !important;
  border: 2px solid #0a1220 !important;
  opacity: 0.35;
  pointer-events: none !important;
}

.stub.side .stub__handle {
  background: var(--amber) !important;
}
</style>
