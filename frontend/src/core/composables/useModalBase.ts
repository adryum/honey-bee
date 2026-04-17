import { type Ref, ref, computed } from "vue"

export type ModalBaseModel = {
    id:    Ref<string>
    open:  () => void
    close: () => void
    isOpen: Ref<boolean>
}

export function useModalBase() {
    const modal = ref<ModalBaseModel | undefined>()

    const exposed: ModalBaseModel = {
        id:    computed(() => modal.value?.id.value ?? ""),
        open:  () => modal.value?.open(),
        close: () => modal.value?.close(),
        isOpen: computed(() => modal.value?.isOpen.value ?? false)
    }

    return { modal, exposed }
}