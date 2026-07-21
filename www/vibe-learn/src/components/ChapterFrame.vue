<script setup>
defineProps({
  data: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});
</script>

<template>
  <div class="chapter" :class="{ selected }">
    <header class="chapter__head chapter__drag" title="拖这里移动整章" data-blobity>
      <span class="chapter__tag">{{ data.tag }}</span>
      <div class="chapter__text">
        <h3 class="chapter__title">{{ data.label }}</h3>
        <p class="chapter__sub">{{ data.subtitle }}</p>
      </div>
      <span class="chapter__drag-tip">拖整章</span>
    </header>
  </div>
</template>

<style scoped>
.chapter {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 18px;
  border: 2px dashed var(--chapter-border);
  /* 必须透明：节点层在连线之上，有底色会把框内边压糊 */
  background: transparent;
  pointer-events: none;
}

.chapter.selected {
  border-color: var(--accent);
  border-style: solid;
}

.chapter__head {
  position: absolute;
  left: 12px;
  top: 12px;
  max-width: min(440px, calc(100% - 28px));
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--accent);
  color: #fff;
  box-shadow: var(--shadow-node);
  pointer-events: all;
  cursor: grab;
  transform: translateZ(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chapter__head:hover {
  transform: scale(1.02);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.35),
    var(--shadow-node);
}

.chapter__head:active {
  cursor: grabbing;
}

.chapter__tag {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.18);
  padding: 3px 7px;
  border-radius: 6px;
  font-weight: 600;
}

.chapter__text {
  min-width: 0;
  flex: 1;
}

.chapter__title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter__sub {
  margin: 3px 0 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chapter__drag-tip {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
