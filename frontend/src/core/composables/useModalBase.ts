import { type Ref, ref, computed, watch, isRef } from "vue"

export type ModalBaseModel = {
    id:     Ref<string>
    open:   () => void
    close:  () => void
    isOpen: () => boolean
}

export function useModalBase() {
    const modal = ref<ModalBaseModel | undefined>()
    const isOpen = ref(false)
    
    watch(modal, (newModal) => {
        if (!newModal) return
        watch(() => newModal.isOpen(), (val) => {
            isOpen.value = val
        })
    }, { immediate: true })

    const exposed: ModalBaseModel = {
        id:     computed(() => modal.value?.id.value ?? ""),
        open:   () => modal.value?.open(),
        close:  () => modal.value?.close(),
        isOpen: () => isOpen.value
    }

    return { modal, exposed }
}