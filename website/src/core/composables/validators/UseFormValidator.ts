import { reactive, ref, watch, type Reactive, type Ref } from "vue";

export type ValidatorModel = Reactive<{
    isValid: boolean
    error: string
    showValidatorBorders: () => void
    resetField: () => void
}>

export type FormValidatorModel = {
    isFormValid: Ref<boolean>
    addValidator: (val: ValidatorModel) => void
    removeValidator: (val: ValidatorModel) => void
    showRequiredFieldBorders: () => void
    resetFields: () => void
}

export function useFormValidator(): FormValidatorModel {
    const isFormValid: Ref<boolean> = ref(true);
    const validators: Reactive<ValidatorModel[]> = reactive([])

    watch(
        () => validators.map(item => item.isValid), 
        (newValue) => {
            // console.log("Change bro, ", newValue)
            isFormValid.value = newValue.every(item => item)
        }
    )

    function resetFields() {
        validators.forEach(validator => validator.resetField())
    }

    function showRequiredFieldBorders() {
        validators.forEach(validator => validator.showValidatorBorders())
    }

    function addValidator(validator: ValidatorModel) {
        validators.push(validator)
        // console.log("added");
    }

    function removeValidator(validator: ValidatorModel) {
        const index = validators.indexOf(validator)
        if (index === -1) console.error("Cant find validator!");
        
        validators.splice(index, 1)
        // console.log('removed');
    }

    return {
        addValidator: addValidator,
        removeValidator: removeValidator,
        showRequiredFieldBorders: showRequiredFieldBorders,
        resetFields: resetFields,
        isFormValid: isFormValid
    }
}