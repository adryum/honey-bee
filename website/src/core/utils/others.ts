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
    return typeof number === "number" && Number.isFinite(number)
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

export type FlexibleGridOptions = {
    gridRef: Ref<HTMLDivElement | null>, 
    itemMinWidthPx: number, 
    itemMinHeightPx?: number, 
    gapPx: number
}
export function useFlexibleGrid(options: FlexibleGridOptions) {
    const style = ref<CSSProperties>({
        display: 'grid',
        gap: options.gapPx + "px",
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridTemplateRows: (options.itemMinHeightPx !== undefined) ? 'repeat(1, 1fr)' : '',
    })

    onResize(options.gridRef, (element) => {
        // possible columns
        const possibleColumns = Math.max(1, Math.floor(element.contentRect.width / options.itemMinWidthPx))
        // adds gaps to consideration
        const columns = Math.max(1, Math.floor((element.contentRect.width - options.gapPx * (possibleColumns - 1)) / options.itemMinWidthPx))

        style.value.gridTemplateColumns = `repeat(${columns}, 1fr)`

        if (options.itemMinHeightPx !== undefined) {
            // possible rows
            const possibleRows = Math.max(1, Math.floor(element.contentRect.height / options.itemMinHeightPx))
            // adds gaps to consideration
            const rows = Math.max(1, Math.floor((element.contentRect.height - options.gapPx * (possibleRows - 1)) / options.itemMinHeightPx))

            style.value.gridTemplateRows = `repeat(${rows}, 1fr)`
        }
    })

    return {
        style
    }
}

export function replace<T>(arr: T[], item: T, expression: (item: T) => boolean) {
    var result = arr.find(item => expression(item))

    if (!result) return;

    const index = arr.indexOf(result)
    arr[index] = item
}