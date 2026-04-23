import { useEventBus, type UseEventBusReturn } from "@vueuse/core"
import { computed, onMounted, onUnmounted, ref } from "vue"

export type FieldValidee = {
    isValid:            () => boolean
    clear:              UseEventBusReturn<void, any>
    showThatIsRequired: UseEventBusReturn<void, any>
}

export type FormValideeModel = {
    isValid:      () => boolean
    onClear:      () => void
    onInitialize: () => void
}

export const useFormValidator = () => {
    const validees    = ref<{ field: FieldValidee, form: FormValideeModel }[]>([])
    const isFormValid = computed(() => !validees.value.some(validee => !validee.field.isValid()))

    // events and emiters
    const clearBus              = useEventBus<void>("clear")
    const showThatIsRequiredBus = useEventBus<void>("showThatIsRequired")

    const clear              = () => clearBus.emit()
    const initialize = () => validees.value.forEach(item => item.form.onInitialize())
    const showThatIsRequired = () => showThatIsRequiredBus.emit()

    function getFormValidee(model: FormValideeModel): FieldValidee {
        const validee = {
            isValid:            model.isValid,
            clear:              clearBus,
            showThatIsRequired: showThatIsRequiredBus,
        }
        validees.value.push({ field: validee, form: model })

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
        initialize
    }
}