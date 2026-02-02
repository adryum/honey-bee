import { ref, onMounted, onUnmounted, computed } from "vue";

export enum ScreenSize {
  XS = 0,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1400,
}

export function getScreenSize(width: number = window.innerWidth): ScreenSize {
  if (width < ScreenSize.SM) return ScreenSize.XS;
  if (width < ScreenSize.MD) return ScreenSize.SM;
  if (width < ScreenSize.LG) return ScreenSize.MD;
  if (width < ScreenSize.XL) return ScreenSize.LG;
  if (width < ScreenSize.XXL) return ScreenSize.XL;
  return ScreenSize.XXL;
}

export function biggerThan(size: ScreenSize): boolean {
  return window.innerWidth >= size;
}

export function useScreenSize() {
  const screenSize = ref<ScreenSize>(ScreenSize.XS);

  const updateSize = () => {
    screenSize.value = getScreenSize();
  };

  onMounted(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize);
  });

  const biggerThan = (size: ScreenSize) => screenSize.value >= size;

  return { screenSize, biggerThan };
}
