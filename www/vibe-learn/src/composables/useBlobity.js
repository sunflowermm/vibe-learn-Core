/**
 * Vue Flow 官网同款鼠标特效（Blobity）
 * 触摸 / 减少动效时跳过
 * @see https://github.com/bcakmakoglu/vue-flow/blob/master/docs/components/utils.ts
 */
import Blobity from 'blobity';
import { nextTick, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';

function blobityOptions(theme) {
  const light = theme !== 'dark';
  const color = light ? '#0ea5e9' : '#38bdf8';
  return {
    licenseKey: 'opensource',
    invert: light,
    zIndex: 50,
    magnetic: false,
    color,
    dotColor: color,
    radius: 8,
    opacity: light ? 0.35 : 0.55,
    focusableElementsOffsetX: 6,
    focusableElementsOffsetY: 5,
    mode: 'normal',
    focusableElements:
      '[data-blobity], button:not([data-no-blobity]), .vue-flow__controls-button',
  };
}

function shouldSkipBlobity() {
  try {
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return true;
  }
}

/** @param {import('vue').Ref<string>} themeRef */
export function useBlobity(themeRef) {
  const blobity = shallowRef(null);

  function destroy() {
    if (!blobity.value) return;
    try {
      blobity.value.destroy();
    } catch {
      /* ignore */
    }
    blobity.value = null;
  }

  function create() {
    destroy();
    if (typeof window === 'undefined' || shouldSkipBlobity()) return;
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

  onBeforeUnmount(destroy);

  return { blobity };
}
