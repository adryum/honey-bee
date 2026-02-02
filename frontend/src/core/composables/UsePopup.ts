import { computed, onUnmounted, ref, shallowReactive, shallowRef, unref, type Component, type MaybeRef } from "vue"
import { createPopup, type PopupData, type PopupFunctions, type PopupInfo } from "../utils/PopupHiarchy"

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
    const isAtMaxPopups = computed(() => {
        return popups.length >= popupModel.maxCount 
    })
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
        closeAll,
        isAtMaxPopups
    }
}