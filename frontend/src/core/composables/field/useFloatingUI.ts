import { autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/vue";
import { nextTick, onUnmounted, ref, watch, type CSSProperties, type Ref } from "@vue/runtime-dom";
import { onClickOutside } from "@vueuse/core";

export type UseFloatingModel = {
    anchorElement?: Ref<HTMLElement> 
    floatingElement?: Ref<HTMLElement>
    isShown?: Ref<boolean>
    takeWidthFromAnchor?: boolean
    zIndex?: number
    floaterOffset?: number
}

export function useFloatingUI(
    options: UseFloatingModel
) {
    // to stop expensive position calculations
    var cleanup: () => void
    const floaterStyle = ref<CSSProperties>({ visibility: 'hidden' })

    function onShow() {
        var anchor = getElementFromMotionProxy(options.anchorElement)
        var floating = getElementFromMotionProxy(options.floatingElement)

        if (!floating || !anchor) {
            console.log(anchor);
            console.log(floating);
            return
        }

        const widthProps = (options.takeWidthFromAnchor)
            ? { width: `${anchor!.offsetWidth}px` }
            : { }

        cleanup = autoUpdate(anchor, floating, () => {
            requestAnimationFrame(() => {
                computePosition(anchor!, floating!, {
                    middleware: [
                        flip(),      // flip to the opposite side if not enough space
                        shift(),     // keep it horizontally on screen
                        offset(options.floaterOffset)
                    ],
                    placement: 'bottom-end'
                }).then(({x, y}) => {
                    floaterStyle.value = {
                        position: 'absolute',
                        visibility: hasAttached.value ? 'visible' : 'hidden',
                        left: `${x}px`,
                        top: `${y}px`,
                        boxSizing: 'border-box',
                        zIndex: options.zIndex,
                        ...widthProps
                    }
                });
            })
        });
    }

    if (options.isShown)
        watch(options.isShown, async (newValue, oldValue) => {
            if (newValue === oldValue) return

            if (newValue) {
                await nextTick() // wait for refs to get their value from hidden elements
                onShow()
            } else {
                cleanup?.()
            }
        })

    const hasAttached = ref(false) // flag
    watch(() => floaterStyle.value.left, async (newVal) => {
        if (newVal !== undefined && newVal !== '0px' && hasAttached.value === false) {
            hasAttached.value = true
        }
    }, {immediate: true})

    watch(() => floaterStyle.value.visibility, async (newVal) => {
        console.log("VISIBILIT: ", newVal);
        
    }, {immediate: true})
    onUnmounted(() => cleanup?.())
    if (options.isShown)
        onClickOutside(options.floatingElement, () => options.isShown!.value = false, { ignore: [options.anchorElement]})

    return {
        floaterStyle
    }
}

export function getElementFromMotionProxy(elRef: any): HTMLElement | null {
    if (!elRef) return null

    const el = elRef.value instanceof HTMLElement
        ? elRef.value
        : elRef.value?.$el

    return el ?? null
}