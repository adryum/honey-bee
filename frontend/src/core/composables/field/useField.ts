import { isNumber } from "@/core/utils/others"
import { computed, reactive, watch, type Ref } from "vue"

export enum FieldType {
    None = "text",
    Email = "email",
    Password = "password"
}

const defaultFieldOptions: Required<FieldOptions> = {
    onlyNumbers: false,
    isRequired: false,
    maxLength: 255,
    minLength: 0,
    type: FieldType.None,
}

export type FieldOptions = {
    onlyNumbers?: boolean
    isRequired?: boolean
    maxLength?: number
    minLength?: number
    type?: FieldType
}

export type FieldValidator = {
    isValid: boolean
    error: string
}

export function useField(
    fieldOptions: Ref<FieldOptions>,
    text: Ref<string | number>,
    emit: (event: 'validator', value: FieldValidator) => void
) {
    const type = computed<FieldType>(() => fieldOptions.value.type || FieldType.None)
    const validator = reactive<FieldValidator>({ isValid: true, error: '' })

    const mergedFieldOptions = computed<Required<FieldOptions>>(() => ({
        ...defaultFieldOptions,
        ...fieldOptions.value,
    }))

    watch(text, (newVal) => {
        if (fieldOptions.value?.isRequired || newVal != "") {
            validateInput()
        } else  {
            validator.isValid = true
            validator.error = ""
            emit('validator', validator)
        }
    }, { immediate: true })

    function validateInput(event?: Event) {
        var target: HTMLInputElement | undefined
        var fieldValue: string

        // getting input event
        if (event) {
            target = event.target as HTMLInputElement
            fieldValue = target.value
        } else {
            fieldValue = text.value.toString()
        }
        const options = mergedFieldOptions.value
        
        // all options
        const isAValue = (options.isRequired) ? fieldValue != "" : true
        const isNumberB = (options.onlyNumbers) ? isNumber(Number(fieldValue)) : true
        const isInMaxLength = fieldValue.length <= options.maxLength
        const isInMinLength = fieldValue.length >= options.minLength

        if (isNumberB && isInMaxLength && isInMinLength && isAValue) {
            validator.isValid = true
            validator.error = "" 
        }
        else validator.isValid = false

        if (!isNumberB) validator.error = "Only numbers"
        if (!isInMaxLength) validator.error = `Max ${options.maxLength} symbols`
        if (!isInMinLength) validator.error = `Min ${options.minLength} symbols`

        emit('validator', validator)
    }

    return {
        type,
        validateInput,
        validator
    }
}


