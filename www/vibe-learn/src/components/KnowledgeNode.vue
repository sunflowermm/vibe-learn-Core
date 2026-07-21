<script setup>
import { Handle, Position } from '@vue-flow/core';

defineProps({
  data: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="k-node" :class="{ selected }">
    <Handle id="left" type="source" :position="Position.Left" class="k-handle" :connectable="false" />
    <Handle id="right" type="source" :position="Position.Right" class="k-handle" :connectable="false" />
    <Handle id="top" type="source" :position="Position.Top" class="k-handle" :connectable="false" />
    <Handle id="bottom" type="source" :position="Position.Bottom" class="k-handle" :connectable="false" />

    <div class="k-node__surface">
      <div class="k-node__tag">{{ data.tag }}</div>
      <div class="k-node__title">{{ data.label }}</div>
      <div class="k-node__sub">{{ data.subtitle }}</div>
      <div class="k-node__orb" aria-hidden="true" />
    </div>
    <!-- 选中黄光单独一层，不动画 transform / 入场动画 -->
    <div class="k-node__glow" aria-hidden="true" />
  </div>
</template>

<style scoped>
.k-node {
  position: relative;
  width: 280px;
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(21, 32, 51, 0.95), rgba(10, 16, 28, 0.92));
  border: 1px solid rgba(62, 224, 196, 0.28);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    0 18px 40px rgba(0, 0, 0, 0.45);
  overflow: visible;
  animation: node-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.k-node__surface {
  position: relative;
  z-index: 1;
  padding: 1.15rem 1.25rem 1.2rem;
  border-radius: inherit;
  overflow: hidden;
}

.k-node__surface::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 35%,
    rgba(255, 255, 255, 0.07) 48%,
    transparent 62%
  );
  transform: translateX(-130%);
  animation: node-sheen 4.5s ease-in-out 1.2s infinite;
  pointer-events: none;
}

.k-node:hover {
  border-color: rgba(62, 224, 196, 0.6);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    0 20px 44px rgba(0, 0, 0, 0.5);
}

.k-node.selected {
  border-color: rgba(240, 160, 80, 0.85);
  box-shadow:
    0 0 0 1px rgba(240, 160, 80, 0.2) inset,
    0 18px 40px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(240, 160, 80, 0.35);
}

.k-node__glow {
  position: absolute;
  inset: -3px;
  border-radius: 18px;
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 0 0 0 rgba(240, 160, 80, 0);
  transition: opacity 0.2s ease;
}

.k-node.selected .k-node__glow {
  opacity: 1;
  animation: amber-pulse 2.2s ease-out infinite;
}

.k-node__tag {
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--signal);
  margin-bottom: 0.45rem;
}

.k-node__title {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #f4f8ff;
  line-height: 1.15;
}

.k-node__sub {
  position: relative;
  z-index: 1;
  margin-top: 0.45rem;
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--mist-dim);
}

.k-node__orb {
  position: absolute;
  right: -20px;
  top: -24px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(62, 224, 196, 0.35), transparent 70%);
  pointer-events: none;
}

/* 仅作锚点视觉，不抢拖拽 */
.k-handle {
  width: 8px !important;
  height: 8px !important;
  background: var(--signal) !important;
  border: 2px solid #0a1220 !important;
  opacity: 0.35;
  pointer-events: none !important;
  z-index: 2;
}

.k-node:hover .k-handle,
.k-node.selected .k-handle {
  opacity: 0.85;
}

@keyframes node-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes node-sheen {
  0%,
  60% {
    transform: translateX(-130%);
  }
  80%,
  100% {
    transform: translateX(130%);
  }
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
</style>
