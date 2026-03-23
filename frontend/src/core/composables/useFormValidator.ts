import { useEventBus, type UseEventBusReturn } from "@vueuse/core"
import { computed, onUnmounted, ref } from "vue"

export type FieldValidee = {
    isValid:            () => boolean
    clear:              UseEventBusReturn<void, any>
    showThatIsRequired: UseEventBusReturn<void, any>
}

export const useFormValidator = () => {
    const validees    = ref<FieldValidee[]>([])
    const isFormValid = computed(() => !validees.value.some(validee => !validee.isValid()))

    // events and emiters
    const clearBus              = useEventBus<void>("clear")
    const showThatIsRequiredBus = useEventBus<void>("showThatIsRequired")

    const clear              = () => clearBus.emit()
    const showThatIsRequired = () => showThatIsRequiredBus.emit()

    function getFormValidee(isValid: () => boolean): FieldValidee {
        const validee = {
            isValid:            isValid,
            clear:              clearBus,
            showThatIsRequired: showThatIsRequiredBus,
        }
        validees.value.push(validee)

        return validee
    }

    onUnmounted(() => {
        validees.value = []
    })

    return {
        isFormValid,
        getFormValidee,
        clear,
        showThatIsRequired,
    }
}