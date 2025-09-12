import { type Ref, onMounted, onBeforeUnmount } from "vue"

export function onResize(ref: Ref<HTMLElement | undefined>, onChange: (element: ResizeObserverEntry) => void): void {
    let observer: ResizeObserver | null = null
    onMounted(() => {
        if (!ref.value) return

        observer = new ResizeObserver(([entry]) => {
            onChange(entry)
        })

        observer.observe(ref.value)
    })

    onBeforeUnmount(() => {
        if (observer && ref.value) {
            observer.unobserve(ref.value)
            observer.disconnect()
        }
    })
}