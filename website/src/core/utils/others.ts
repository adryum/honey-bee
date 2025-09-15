import { type Ref, ref, type CSSProperties } from "vue"
import { onResize } from "./Hooks"

export function cssStringToObject(cssString: string): Record<string, string> {
  if (!cssString) return {}
  return cssString
    .split(";")
    .filter(Boolean)
    .map(rule => rule.split(":"))
    .reduce<Record<string, string>>((obj, [key, value]) => {
      if (key && value) obj[key.trim()] = value.trim()
      return obj
    }, {})
}

export function isNumber(number: unknown) {
    return typeof number === "number"
}

export function removeFrom<T>(array: T[], item: T): T[] {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function useFlexibleGrid({gridRef, itemWidth, gap}: { gridRef: Ref<HTMLDivElement | null>, itemWidth: number, gap: string }) {
    const style = ref<CSSProperties>({
        display: 'grid',
        gap: gap,
        gridTemplateColumns: 'repeat(1, 1fr)',
    })

    onResize(gridRef, (element) => {
        const columns = Math.max(1, Math.floor(element.contentRect.width / itemWidth))
        style.value.gridTemplateColumns = `repeat(${columns}, 1fr)`
    })

    return {
        style
    }
}