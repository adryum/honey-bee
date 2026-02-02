import { type Ref, type Component, ref, render, type VNode, createVNode, computed, type MaybeRef, onUnmounted, shallowReactive, unref } from "vue"

var zIndex = 1000
const setOnTop = () => `${zIndex++}`

export function focusPopup(popup: PopupInfo) {
    const newZIndex = setOnTop()

    // dont change if clicked again same element
    if (Number(newZIndex) - 1 === Number(popup.element.value.style.zIndex)) {
        zIndex--
        return
    }

    popup.zIndex.value = Number(newZIndex);
    popup.element.value.style.zIndex = newZIndex;
}

export type PopupData = {
    functions: PopupFunctions
    info: PopupInfo
}

export type PopupFunctions = {
    unmount: () => void
    focus: () => void
}

export type PopupInfo = {
    element: Ref<HTMLElement>
    zIndex: Ref<number>
}

export function createPopup(data: {
    component: Component, // <-- loose type
    props?: Object,
    onUnmount?: () => void,
    onFocus?: () => void
}) {
    // useless wrapper just to later 'safely and correctly' unmount created
    const container = document.createElement('div')
    document.body.appendChild(container)

    container.style.position = 'fixed'

    const popupInfo: PopupInfo = {
        zIndex: ref(0),
        element: ref(container)
    }
    
    const popupFunctions: PopupFunctions = {
        unmount: function (): void {
            data.onUnmount?.()
            render(null, container)
            container.remove()
        },
        focus: function (): void {
            data.onFocus?.()
            focusPopup(popupInfo)
        }
    } 

    const popupData: PopupData = {
        functions: popupFunctions,
        info: popupInfo
    }
    
    focusPopup(popupInfo)

    // Create vnode with optional props  ...props - all previously defined props, and new one - unmount
    const vnode: VNode = createVNode(data.component, { ...data.props, popupData})
    render(vnode, container)

    return {
        vnode,
        popupData
    }
}

export type UsePopupModel = {
    props?: MaybeRef<Object>
    label: MaybeRef<string>
    functions: MaybeRef<PopupFunctions>
    info: MaybeRef<PopupInfo>
}

export type ButBetterUsePopupModel = {
    popupComponent: Component
    maxCount: number
    props?: MaybeRef<Object>
}


export type PopupFrameModel = {
    label: string 
    functions: PopupFunctions
    info: PopupInfo
}

export function usePopup(
    popupModel: UsePopupModel
) {
    // forwards changes / values
    const frameModel = computed<PopupFrameModel>(() => ({
        label: unref(popupModel.label),
        functions: unref(popupModel.functions),
        info: unref(popupModel.info)
    }))

    function close() {
        frameModel.value?.functions.unmount()
    }

    return {
        frameModel,
        close
    }
}

export function usePopupCreator(
    popupModel: ButBetterUsePopupModel
) {
    const openedPopups = ref(0)
    const popups = shallowReactive<PopupData[]>([])
    // forwards changes / values

    function create() {
        if (!(openedPopups.value < popupModel.maxCount)) return
        const { popupData } = createPopup({
            component: popupModel.popupComponent, 
            props: popupModel.props,
            onUnmount: () => close()
        })
        popups.push(popupData)
        openedPopups.value++
    }

    function close() {
        // frameModel.value?.functions.unmount()
        openedPopups.value--
    }

    function closeAll() {
        popups.forEach(popup => {
            popup.functions.unmount()
            close()
        })
    }

    onUnmounted(() => {
        // remove all opened popups
        closeAll()
    })

    return {
        create,
        closeAll
    }
}