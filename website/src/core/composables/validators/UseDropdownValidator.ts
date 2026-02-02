import { onMounted, onUnmounted, reactive, ref, watch, type Ref } from "vue"
import type { FormValidatorModel, ValidatorModel } from "./UseFormValidator"

export type DropdownValidationOptions = {
    isRequired?: boolean
    formValidator?: FormValidatorModel,
    errors?: DropdownValidatorErrors
}

export type DropdownValidatorErrors = {
    isBeforeFailed?: string
    isAfterFailed?: string
}

export type UseDropdownValidatorModel<T> = {
    input: Ref<T | undefined>,
    options: DropdownValidationOptions, 
}

export function useDropdownValidator<T>(
    model: UseDropdownValidatorModel<T>
) {
    const validator = reactive<ValidatorModel>({ 
        isValid: true, 
        error: '', 
        showValidatorBorders: () => showValidatorBorders.value = true,
        resetField: () => {
            showValidatorBorders.value = false
            model.input.value = undefined
        }
    })
    const showValidatorBorders = ref(false) // dummy bool that will be false until swithced

    function validate() {
        console.log("Drop values");
        console.log("innput", model.input.value);
        console.log("req", model.options.isRequired);
        
        if (model.options.isRequired && !model.input.value) {
            validator.isValid = false
            validator.error = ''
        } else {
            validator.isValid = true
            validator.error = ''
        }
    }

    watch(
        [
            () => model.input.value,
        ], 
        () => {
            validate()
        },
        { 
            immediate: true
        }
    )

    onMounted(() => {
        model.options.formValidator?.addValidator(validator)
    })

    onUnmounted(() => {
        model.options.formValidator?.removeValidator(validator)
    })

    return {
        validator,
        showValidatorBorders
    }
}