import { type Ref, onMounted, onBeforeUnmount, ref } from "vue"

export function onResize(ref: Ref<HTMLElement | undefined | null>, onChange: (element: ResizeObserverEntry) => void): void {
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


export function useElementExists(id: string | (() => string)): Ref<boolean> {
    const exists = ref(false)
    let observer: MutationObserver | undefined

    const getId = typeof id === 'function' ? id : () => id

    const check = () => {
        const currentId = getId()
        if (!currentId) {
            exists.value = false
            return
        }
        exists.value = !!document.getElementById(currentId)
    }

    onMounted(() => {
        check()
        observer = new MutationObserver(check)
        observer.observe(document.body, { childList: true, subtree: true })
    })

    onBeforeUnmount(() => observer?.disconnect())

    return exists
}