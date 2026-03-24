import { type Ref, ref, computed } from "vue"

export type ModalBaseModel = {
    id:    Ref<string>
    open:  () => void
    close: () => void
}

export function useModalBase() {
    const modal = ref<ModalBaseModel | undefined>()

    const exposed: ModalBaseModel = {
        id:    computed(() => modal.value?.id.value ?? ""),
        open:  () => modal.value?.open(),
        close: () => modal.value?.close()
    }

    return { modal, exposed }
}