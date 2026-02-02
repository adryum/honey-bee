import { computed, onMounted, onUnmounted, reactive, ref, toRaw, unref, watch, type MaybeRef, type Reactive, type Ref } from "vue"
import type { FormValidatorModel, ValidatorModel } from "./UseFormValidator"
import { isValidValue } from "@/core/utils/others"

export type FieldValidationOptions<T> = {
    formValidator?: FormValidatorModel,
    validInputValues?: MaybeRef<T[]>
    isRequired?: boolean
    mustBeOneOfSuggestions?: boolean
    errors?: FieldValidatorErrors
    inputMatchesExpresion?: (item: T | undefined) => boolean
}

export type FieldValidatorErrors = {
    isBeforeFailed?: string
}

export function useFieldValidator<T>(
    input: MaybeRef<T | undefined>,
    options: FieldValidationOptions<T>, 
    onReset: () => void
) {
    const validator = reactive<ValidatorModel>({ 
        isValid: true, 
        error: '', 
        showValidatorBorders: () => showValidatorBorders.value = true,
        resetField: () => {
            onReset?.()
            showValidatorBorders.value = false
        }
    })
    const showValidatorBorders = ref(false) // dummy bool that will be false until swithced

    function validate() {
        // console.log('suggestions:', options.suggestions);
        validator.isValid = true
        validator.error = ''
        
        // gona build on top of it
        if (options.mustBeOneOfSuggestions && options.validInputValues) {
            const matchesValidInputValue = 
                (!input) 
                ? false
                : options.inputMatchesExpresion?.(unref(input)) ?? true

            validator.isValid = matchesValidInputValue
            validator.error = (matchesValidInputValue) ? '' : "Must be one of suggestions!"
        }
         
        if (options.isRequired && !isValidValue(unref(input))) {
            validator.isValid = false
            validator.error = ''
        } 
    }

    // validate input on its change and if validation options (provided items) change
    watch(
        [
            () => unref(input),
            () => options.validInputValues
        ], 
        () => {
            validate()
        },
        {
            immediate: true
        }
    )

    onMounted(() => {
        options.formValidator?.addValidator(validator)
    })

    onUnmounted(() => {
        options.formValidator?.removeValidator(validator)
    })

    return {
        validator,
        showValidatorBorders
    }
}