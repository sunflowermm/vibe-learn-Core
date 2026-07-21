<script setup>
defineProps({
  data: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});
</script>

<template>
  <!-- 空白区不抢事件，只从标题条拖动/点选章框 -->
  <div class="chapter" :class="{ selected }">
    <div class="chapter__rail" aria-hidden="true" />
    <!-- 扁条标题，不挡「前后端 → 第二章」的伸出视线 -->
    <header class="chapter__head chapter__drag" title="拖这里移动整章">
      <span class="chapter__tag">{{ data.tag }}</span>
      <div class="chapter__text">
        <h3 class="chapter__title">{{ data.label }}</h3>
        <p class="chapter__sub">{{ data.subtitle }}</p>
      </div>
      <span class="chapter__drag-tip">拖整章</span>
    </header>
    <div class="chapter__hint">框内主线</div>
  </div>
</template>

<style scoped>
.chapter {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  border: 2.5px solid rgba(62, 224, 196, 0.78);
  background:
    linear-gradient(180deg, rgba(20, 48, 52, 0.55) 0%, rgba(10, 22, 34, 0.38) 40%, rgba(8, 16, 28, 0.28) 100%);
  box-shadow:
    0 0 0 1px rgba(62, 224, 196, 0.22),
    0 0 36px rgba(62, 224, 196, 0.14),
    inset 0 0 60px rgba(62, 224, 196, 0.05),
    0 20px 50px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.chapter.selected {
  border-color: rgba(240, 160, 80, 0.9);
  box-shadow:
    0 0 0 1px rgba(240, 160, 80, 0.35),
    0 0 44px rgba(240, 160, 80, 0.2),
    inset 0 0 60px rgba(240, 160, 80, 0.05),
    0 20px 50px rgba(0, 0, 0, 0.4);
}

.chapter__rail {
  position: absolute;
  inset: 8px;
  border-radius: 14px;
  border: 1px dashed rgba(62, 224, 196, 0.22);
  pointer-events: none;
}

.chapter.selected .chapter__rail {
  border-color: rgba(240, 160, 80, 0.3);
}

.chapter__head {
  position: absolute;
  z-index: 1;
  left: 14px;
  top: 10px;
  right: auto;
  max-width: min(420px, calc(100% - 120px));
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.75rem 0.4rem 0.55rem;
  border-radius: 10px;
  background: rgba(7, 14, 22, 0.9);
  border: 1px solid rgba(62, 224, 196, 0.35);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  pointer-events: all;
  cursor: grab;
}

.chapter__head:active {
  cursor: grabbing;
}

.chapter__tag {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #04110e;
  background: linear-gradient(120deg, #3ee0c4, #7ef0d8);
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  font-weight: 600;
}

.chapter__text {
  min-width: 0;
  flex: 1;
}

.chapter__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: #f5fbff;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter__sub {
  margin: 0.1rem 0 0;
  font-size: 0.68rem;
  color: #a8bdd4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter__drag-tip {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  color: rgba(138, 155, 179, 0.85);
}

.chapter__hint {
  position: absolute;
  right: 1rem;
  bottom: 0.7rem;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  color: #3ee0c4;
  background: rgba(7, 14, 22, 0.7);
  border: 1px solid rgba(62, 224, 196, 0.3);
  padding: 0.22rem 0.5rem;
  border-radius: 999px;
  pointer-events: none;
}
</style>
