<script setup>
import { computed, onUnmounted, ref } from 'vue';
import { osiLayers, phaseCopy, topologyPath } from '../data/osi.js';

const activeLayer = ref(7);
const playing = ref(false);
const packetProgress = ref(0);
const packetPhase = ref('idle'); // idle | down | wire | up | done
const highlightHop = ref(-1);
const wrapCount = ref(0);
const statusFlash = ref(0);

let raf = 0;
let startTs = 0;
let flashTimer = 0;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

const selected = computed(() => osiLayers.find((l) => l.id === activeLayer.value));

const statusText = computed(() => phaseCopy[packetPhase.value] ?? phaseCopy.idle);

const stackHighlight = computed(() => {
  if (packetPhase.value === 'down') {
    const idx = Math.min(6, Math.floor(packetProgress.value * 7));
    return osiLayers[idx]?.id ?? 7;
  }
  if (packetPhase.value === 'up') {
    const idx = Math.min(6, Math.floor(packetProgress.value * 7));
    return osiLayers[6 - idx]?.id ?? 1;
  }
  return activeLayer.value;
});

const wrapChips = computed(() => {
  if (packetPhase.value === 'down') {
    const n = Math.min(7, Math.max(1, Math.ceil(packetProgress.value * 7)));
    return osiLayers.slice(0, n).map((l) => l.wrap);
  }
  if (packetPhase.value === 'wire') {
    return ['IP 包', '链路帧', '比特…'];
  }
  if (packetPhase.value === 'up') {
    const peeled = Math.min(7, Math.floor(packetProgress.value * 7));
    return osiLayers.slice(0, 7 - peeled).map((l) => l.wrap);
  }
  if (packetPhase.value === 'done') return ['应用数据 ✓'];
  return selected.value ? [selected.value.wrap] : [];
});

const trailDots = computed(() => {
  if (packetPhase.value !== 'wire') return [];
  const t = packetProgress.value;
  return [0.08, 0.16, 0.24].map((lag, i) => {
    const u = Math.max(0, t - lag);
    return { ...wirePos(u), opacity: 0.35 - i * 0.08, scale: 0.7 - i * 0.12 };
  });
});

function selectLayer(id) {
  if (playing.value) return;
  activeLayer.value = id;
  statusFlash.value += 1;
}

function stopAnim() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  if (flashTimer) clearTimeout(flashTimer);
  playing.value = false;
  packetPhase.value = 'idle';
  packetProgress.value = 0;
  highlightHop.value = -1;
  wrapCount.value = 0;
}

function runPhase(phase, duration, onFrame) {
  return new Promise((resolve) => {
    packetPhase.value = phase;
    startTs = performance.now();
    const tick = (now) => {
      const raw = Math.min(1, (now - startTs) / duration);
      const t = easeInOutCubic(raw);
      packetProgress.value = t;
      onFrame?.(t, raw);
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        resolve();
      }
    };
    raf = requestAnimationFrame(tick);
  });
}

function wirePos(t) {
  const span = topologyPath.length - 1;
  const f = t * span;
  const i = Math.min(span - 0.0001, Math.max(0, f));
  const idx = Math.floor(i);
  const local = i - idx;
  const a = topologyPath[idx];
  const b = topologyPath[Math.min(span, idx + 1)];
  return {
    left: `${a.x + (b.x - a.x) * local}%`,
    top: `${a.y + (b.y - a.y) * local}%`,
  };
}

async function sendPacket() {
  if (playing.value) {
    stopAnim();
    return;
  }
  playing.value = true;
  wrapCount.value = 0;
  try {
    await runPhase('down', 2400, (t) => {
      wrapCount.value = Math.min(7, Math.ceil(t * 7));
      const idx = Math.min(6, Math.floor(t * 7));
      activeLayer.value = osiLayers[idx].id;
    });
    await runPhase('wire', 3200, (t) => {
      highlightHop.value = Math.min(topologyPath.length - 1, Math.floor(t * topologyPath.length));
    });
    await runPhase('up', 2400, (t) => {
      const idx = Math.min(6, Math.floor(t * 7));
      activeLayer.value = osiLayers[6 - idx].id;
      wrapCount.value = Math.max(0, 7 - Math.floor(t * 7));
    });
    packetPhase.value = 'done';
    highlightHop.value = topologyPath.length - 1;
    activeLayer.value = 7;
    await new Promise((r) => {
      flashTimer = setTimeout(r, 900);
    });
  } finally {
    playing.value = false;
    packetPhase.value = 'idle';
    packetProgress.value = 0;
    highlightHop.value = -1;
    wrapCount.value = 0;
  }
}

onUnmounted(stopAnim);

const stackPacketStyle = computed(() => {
  if (packetPhase.value === 'down') {
    const y = 4 + packetProgress.value * 88;
    return { left: '18%', top: `${y}%`, opacity: 1, transform: `scale(${1 + wrapCount.value * 0.04})` };
  }
  if (packetPhase.value === 'up') {
    const y = 92 - packetProgress.value * 88;
    return { left: '82%', top: `${y}%`, opacity: 1, transform: `scale(${1.28 - packetProgress.value * 0.28})` };
  }
  return { opacity: 0 };
});

const wirePacketStyle = computed(() => {
  if (packetPhase.value !== 'wire') return { opacity: 0 };
  return { ...wirePos(packetProgress.value), opacity: 1 };
});

const beamWidth = computed(() => {
  if (packetPhase.value !== 'wire') return '0%';
  return `${Math.max(4, packetProgress.value * 78)}%`;
});
</script>

<template>
  <section class="lab">
    <header class="lab__head">
      <div>
        <p class="lab__eyebrow">Interactive Lab</p>
        <h3 class="lab__title">协议栈 · 报文旅程</h3>
      </div>
      <button class="lab__cta" type="button" :class="{ stop: playing }" @click="sendPacket">
        <span class="lab__cta-glow" aria-hidden="true" />
        {{ playing ? '停止动画' : '发送报文' }}
      </button>
    </header>

    <p class="lab__status" :key="statusFlash + packetPhase">
      <span class="lab__status-dot" :class="{ live: playing || packetPhase === 'done' }" />
      {{ statusText }}
    </p>

    <div class="wrap-rail" aria-hidden="true">
      <TransitionGroup name="chip">
        <span v-for="(chip, i) in wrapChips" :key="chip + '-' + i" class="wrap-chip" :style="{ '--i': i }">
          {{ chip }}
        </span>
      </TransitionGroup>
    </div>

    <div class="lab__body">
      <div class="stack" aria-label="OSI 七层">
        <div class="stack__rail" aria-hidden="true" />
        <button
          v-for="(layer, li) in osiLayers"
          :key="layer.id"
          type="button"
          class="stack__layer"
          :class="{
            active: activeLayer === layer.id && packetPhase === 'idle',
            lit: stackHighlight === layer.id,
          }"
          :style="{ '--layer-color': layer.color, '--delay': `${li * 40}ms` }"
          @click="selectLayer(layer.id)"
        >
          <span class="stack__num">L{{ layer.id }}</span>
          <span class="stack__mid">
            <span class="stack__name">{{ layer.name }}</span>
            <span class="stack__en">{{ layer.en }}</span>
          </span>
          <span class="stack__pulse" aria-hidden="true" />
        </button>
        <div class="stack__packet" :style="stackPacketStyle">
          <span class="stack__packet-core" />
          <span class="stack__packet-ring" />
        </div>
      </div>

      <div class="lab__side">
        <Transition name="card-swap" mode="out-in">
          <article class="layer-card" v-if="selected" :key="selected.id">
            <div class="layer-card__badge" :style="{ color: selected.color }">
              Layer {{ selected.id }} · {{ selected.en }}
            </div>
            <h4>{{ selected.name }}</h4>
            <p class="layer-card__analogy">{{ selected.analogy }}</p>
            <div class="protos">
              <span v-for="p in selected.protocols" :key="p" class="proto">{{ p }}</span>
            </div>
            <p class="hint-mono">套上：{{ selected.wrap }} · {{ selected.packetHint }}</p>
          </article>
        </Transition>

        <div class="topo" aria-label="简化拓扑">
          <div class="topo__beam" :style="{ width: beamWidth }" />
          <svg class="topo__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3ee0c4" stop-opacity="0.2" />
                <stop offset="50%" stop-color="#f0a050" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#3ee0c4" stop-opacity="0.2" />
              </linearGradient>
            </defs>
            <path
              class="topo__path"
              d="M12 48 H32 M36 48 H56 M60 48 H84"
              fill="none"
              stroke="url(#wireGrad)"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-dasharray="2 2.5"
            />
          </svg>
          <div
            v-for="(hop, i) in topologyPath"
            :key="hop.id"
            class="topo__hop"
            :class="{ on: highlightHop === i, passed: highlightHop > i }"
            :style="{ left: hop.x + '%', top: hop.y + '%' }"
          >
            <span class="topo__dot">
              <span class="topo__ripple" />
            </span>
            <span class="topo__label">{{ hop.label }}</span>
            <span class="topo__role">{{ hop.role }}</span>
          </div>
          <div
            v-for="(dot, di) in trailDots"
            :key="'trail-' + di"
            class="topo__trail"
            :style="{
              left: dot.left,
              top: dot.top,
              opacity: dot.opacity,
              transform: `translate(-50%, -50%) scale(${dot.scale})`,
            }"
          />
          <div class="topo__packet" :style="wirePacketStyle">
            <span class="topo__packet-core" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lab {
  margin-top: 1.5rem;
  padding: 1.15rem 1.15rem 1.25rem;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background:
    radial-gradient(ellipse 80% 60% at 10% 0%, rgba(62, 224, 196, 0.08), transparent 50%),
    linear-gradient(160deg, rgba(21, 32, 51, 0.9), rgba(7, 11, 18, 0.72));
  box-shadow: var(--shadow);
  animation: lab-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.lab__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.lab__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--amber);
}

.lab__title {
  margin: 0.15rem 0 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: #f4f8ff;
}

.lab__cta {
  position: relative;
  flex-shrink: 0;
  padding: 0.6rem 1.15rem;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #04110e;
  background: linear-gradient(120deg, var(--signal), #7ef0d8 55%, #b8ffe8);
  box-shadow: 0 0 28px rgba(62, 224, 196, 0.4);
  overflow: hidden;
  transition: transform 0.25s ease, filter 0.25s ease, box-shadow 0.25s ease;
}

.lab__cta:hover {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.06);
  box-shadow: 0 0 36px rgba(62, 224, 196, 0.55);
}

.lab__cta-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%);
  transform: translateX(-120%);
  animation: sheen 3.2s ease-in-out infinite;
}

.lab__cta.stop {
  color: var(--mist);
  background: rgba(232, 121, 169, 0.28);
  border: 1px solid rgba(232, 121, 169, 0.5);
  box-shadow: none;
}

.lab__cta.stop .lab__cta-glow {
  display: none;
}

.lab__status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.85rem 0 0.65rem;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  font-size: 0.82rem;
  line-height: 1.45;
  color: #d5e2f2;
  background: rgba(7, 11, 18, 0.45);
  border: 1px solid rgba(62, 224, 196, 0.12);
  animation: status-pop 0.35s ease both;
}

.lab__status-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mist-dim);
}

.lab__status-dot.live {
  background: var(--signal);
  box-shadow: 0 0 10px var(--signal);
  animation: blink 1s ease-in-out infinite;
}

.wrap-rail {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  min-height: 1.7rem;
  margin-bottom: 0.85rem;
}

.wrap-chip {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 0.22rem 0.5rem;
  border-radius: 999px;
  color: var(--amber);
  background: rgba(240, 160, 80, 0.12);
  border: 1px solid rgba(240, 160, 80, 0.28);
}

.chip-enter-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.chip-leave-active {
  transition: all 0.25s ease;
}
.chip-enter-from {
  opacity: 0;
  transform: translateY(6px) scale(0.9);
}
.chip-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.lab__body {
  display: grid;
  grid-template-columns: minmax(150px, 0.95fr) 1.25fr;
  gap: 1rem;
}

@media (max-width: 720px) {
  .lab__body {
    grid-template-columns: 1fr;
  }
}

.stack {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
}

.stack__rail {
  position: absolute;
  left: 0.55rem;
  top: 0.4rem;
  bottom: 0.4rem;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--signal), var(--amber), #a78bfa);
  opacity: 0.35;
}

.stack__layer {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.7rem;
  border-radius: 11px;
  text-align: left;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;
  animation: layer-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay);
}

.stack__layer:hover {
  background: rgba(62, 224, 196, 0.07);
}

.stack__layer.active,
.stack__layer.lit {
  border-color: color-mix(in srgb, var(--layer-color) 60%, transparent);
  background: color-mix(in srgb, var(--layer-color) 16%, transparent);
  transform: translateX(5px);
  box-shadow: 0 0 20px color-mix(in srgb, var(--layer-color) 22%, transparent);
}

.stack__layer.lit .stack__pulse {
  opacity: 1;
  animation: layer-pulse 1.1s ease-out infinite;
}

.stack__num {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--layer-color);
  z-index: 1;
}

.stack__mid {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  min-width: 0;
  z-index: 1;
}

.stack__name {
  font-size: 0.86rem;
  font-weight: 600;
  color: #eef4ff;
}

.stack__en {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--mist-dim);
}

.stack__pulse {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  pointer-events: none;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--layer-color) 50%, transparent);
}

.stack__packet {
  position: absolute;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  pointer-events: none;
  z-index: 3;
  transition: opacity 0.2s ease;
}

.stack__packet-core {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 28%, #fff8ec, var(--amber) 42%, var(--signal));
  animation: packet-glow 0.85s ease-in-out infinite;
}

.stack__packet-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(62, 224, 196, 0.55);
  animation: ring-expand 1s ease-out infinite;
}

.lab__side {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
}

.layer-card {
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: rgba(7, 11, 18, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.layer-card__badge {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  margin-bottom: 0.35rem;
}

.layer-card h4 {
  margin: 0 0 0.45rem;
  font-family: var(--font-display);
  font-size: 1.08rem;
  color: #f7fafc;
}

.layer-card__analogy {
  margin: 0 0 0.55rem !important;
  font-size: 0.88rem !important;
  line-height: 1.55 !important;
  color: #dce8f6 !important;
}

.protos {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}

.proto {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  color: var(--signal);
  background: rgba(62, 224, 196, 0.1);
  border: 1px solid rgba(62, 224, 196, 0.2);
}

.hint-mono {
  margin-top: 0.7rem !important;
  font-family: var(--font-mono);
  font-size: 0.7rem !important;
  color: var(--amber) !important;
  line-height: 1.4 !important;
}

.card-swap-enter-active,
.card-swap-leave-active {
  transition: all 0.28s ease;
}
.card-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.card-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.topo {
  position: relative;
  height: 148px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background:
    radial-gradient(ellipse at 50% 50%, rgba(62, 224, 196, 0.1), transparent 60%),
    rgba(7, 11, 18, 0.55);
  overflow: hidden;
}

.topo__beam {
  position: absolute;
  left: 10%;
  top: 46%;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, transparent, rgba(240, 160, 80, 0.55), rgba(62, 224, 196, 0.65));
  box-shadow: 0 0 16px rgba(62, 224, 196, 0.45);
  transition: width 0.05s linear;
  pointer-events: none;
  z-index: 0;
}

.topo__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.topo__path {
  animation: dash-flow 2.4s linear infinite;
}

.topo__hop {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  z-index: 1;
}

.topo__dot {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ink-3);
  border: 2px solid var(--signal-dim);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease,
    transform 0.3s ease;
}

.topo__ripple {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid rgba(240, 160, 80, 0.6);
  opacity: 0;
}

.topo__hop.on .topo__dot {
  background: var(--amber);
  border-color: #ffe0b0;
  box-shadow: 0 0 18px rgba(240, 160, 80, 0.8);
  transform: scale(1.15);
}

.topo__hop.on .topo__ripple {
  opacity: 1;
  animation: ring-expand 1s ease-out infinite;
}

.topo__hop.passed .topo__dot {
  border-color: var(--signal);
  background: color-mix(in srgb, var(--signal) 35%, var(--ink-3));
}

.topo__label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--mist-dim);
  white-space: nowrap;
}

.topo__role {
  font-size: 0.58rem;
  color: rgba(138, 155, 179, 0.75);
  white-space: nowrap;
}

.topo__hop.on .topo__label {
  color: var(--amber);
}

.topo__trail {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(62, 224, 196, 0.55);
  pointer-events: none;
  z-index: 2;
}

.topo__packet {
  position: absolute;
  width: 14px;
  height: 14px;
  margin: 0;
  transform: translate(-50%, -50%);
  z-index: 3;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.topo__packet-core {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, var(--amber) 50%, var(--signal));
  animation: packet-glow 0.8s ease-in-out infinite;
  box-shadow: 0 0 14px rgba(240, 160, 80, 0.85);
}

@keyframes lab-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layer-in {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes layer-pulse {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: scale(1.02);
  }
}

@keyframes status-pop {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

@keyframes sheen {
  0%,
  55% {
    transform: translateX(-120%);
  }
  75%,
  100% {
    transform: translateX(120%);
  }
}

@keyframes ring-expand {
  0% {
    transform: scale(0.7);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes dash-flow {
  to {
    stroke-dashoffset: -18;
  }
}
</style>
