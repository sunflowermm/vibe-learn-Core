/**
 * Vue Flow 官网同款鼠标特效（Blobity）
 * @see https://github.com/bcakmakoglu/vue-flow/blob/master/docs/components/utils.ts
 */
import Blobity from 'blobity';
import { nextTick, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';

function blobityOptions(theme) {
  const light = theme !== 'dark';
  return {
    licenseKey: 'opensource',
    /* 浅色 invert；深色用冰蓝点，不用绿色 */
    invert: light,
    zIndex: 50,
    magnetic: false,
    color: light ? '#0ea5e9' : '#38bdf8',
    dotColor: light ? '#0ea5e9' : '#38bdf8',
    radius: 8,
    opacity: light ? 0.35 : 0.55,
    focusableElementsOffsetX: 6,
    focusableElementsOffsetY: 5,
    mode: 'normal',
    focusableElements:
      '[data-blobity], a:not([data-no-blobity]), button:not([data-no-blobity]), .k-node, .stub, .chapter__drag, .theme-toggle__btn, .vue-flow__controls-button, .panel__chip, .panel__close',
  };
}

function isCoarsePointer() {
  try {
    return window.matchMedia('(pointer: coarse)').matches;
  } catch {
    return false;
  }
}

/**
 * @param {import('vue').Ref<string>} themeRef
 */
export function useBlobity(themeRef) {
  const blobity = shallowRef(null);

  function destroy() {
    if (blobity.value) {
      try {
        blobity.value.destroy();
      } catch {
        /* ignore */
      }
      blobity.value = null;
    }
  }

  function create() {
    destroy();
    if (typeof window === 'undefined' || isCoarsePointer()) return;
    try {
      blobity.value = new Blobity(blobityOptions(themeRef.value));
    } catch (err) {
      console.warn('[blobity]', err);
    }
  }

  onMounted(async () => {
    await nextTick();
    create();
  });

  watch(themeRef, () => {
    if (!blobity.value) {
      create();
      return;
    }
    try {
      blobity.value.updateOptions(blobityOptions(themeRef.value));
      blobity.value.reset();
    } catch {
      create();
    }
  });

  onBeforeUnmount(() => {
    destroy();
  });

  return { blobity };
}
