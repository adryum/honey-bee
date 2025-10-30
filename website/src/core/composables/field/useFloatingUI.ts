import { autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/vue";
import { nextTick, onUnmounted, watch, type Ref } from "@vue/runtime-dom";
import { onClickOutside } from "@vueuse/core";

export async function useFloatingUI(
    anchorElement: Ref<HTMLElement>, 
    floatingElement: Ref<HTMLElement>,
    isShown: Ref<boolean>,
    zIndex: number = 0,
    takeWidthFromAnchor: boolean = true,
    floaterOffset: number = 0
) {
    // to stop expensive position calculations
    var cleanup: () => void

    function onShow() {
        var anchor = getElementFromMotionProxy(anchorElement)
        var floating = getElementFromMotionProxy(floatingElement)

        if (!floating || !anchor) {
            console.log(anchor);
            console.log(floating);
            return
        }

        const widthProps = (takeWidthFromAnchor)
            ? { width: `${anchor!.offsetWidth}px` }
            : { width: `inherit` }

        cleanup = autoUpdate(anchor, floating, () => {
            requestAnimationFrame(() => {
                computePosition(anchor!, floating!, {
                    middleware: [
                        flip(),      // flip to the opposite side if not enough space
                        shift(),     // keep it horizontally on screen
                        offset(floaterOffset)
                    ],
                    placement: 'bottom-end'
                }).then(({x, y}) => {
                    Object.assign(floating!.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                        boxSizing: 'border-box',
                        zIndex: zIndex,
                        ...widthProps
                    });
                });
            })
        });
    }

    watch(isShown, async (newValue, oldValue) => {
        if (newValue === oldValue) return

        if (newValue) {
            await nextTick() // wait for refs to get their value from hidden elements
            onShow()
        } else {
            cleanup?.()
        }
    })

    onUnmounted(() => cleanup?.())
    onClickOutside(floatingElement, () => isShown.value = false, { ignore: [anchorElement]})
}

export function getElementFromMotionProxy(elRef: any): HTMLElement | null {
    if (!elRef) return null

    const el = elRef.value instanceof HTMLElement
        ? elRef.value
        : elRef.value?.$el

    return el ?? null
}