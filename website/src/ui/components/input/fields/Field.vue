<script setup lang="ts">
import { FieldType, type FieldValidator, type FieldOptions } from "@/core/options/FieldOptions";
import { isNumber } from "@/core/utils/others";
import { watchOnce } from "@vueuse/core";
import { computed, onMounted, reactive, ref, toRaw, useCssModule, watch } from "vue";

const s = useCssModule()

const defaultFieldOptions: Required<FieldOptions> = {
    onlyNumbers: false,
    isRequired: false,
    maxLength: 255,
    minLength: 0,
    type: FieldType.None,
}

const mergedFieldOptions = computed<Required<FieldOptions>>(() => ({
    ...defaultFieldOptions,
    ...props.fieldOptions,
}))

const text = defineModel<string | number>("text", { default: "" })
const type = ref<FieldType>(FieldType.None)

const validator = reactive<FieldValidator>({ isValid: true, error: '' })
const emit = defineEmits<{ validator: [FieldValidator] }>()

const props = withDefaults(defineProps<{
    hint?: string
    fieldOptions?: FieldOptions
}>(),
{
    hint: '...',
})

function validateInput(event?: Event) {
    var target: HTMLInputElement | undefined
    var fieldValue: string

    if (event) {
        target = event.target as HTMLInputElement
        fieldValue = target.value
    } else {
        fieldValue = text.value.toString()
    }
    const options = mergedFieldOptions.value
    
    const isNumberB = (options.onlyNumbers) ? isNumber(Number(fieldValue)) : true
    const isInMaxLength = fieldValue.length <= options.maxLength
    const isInMinLength = fieldValue.length >= options.minLength

    if (isNumberB && isInMaxLength && isInMinLength) {
        validator.isValid = true
        validator.error = "" 
    }
    else validator.isValid = false

    if (!isNumberB) validator.error = "Only numbers"
    if (!isInMaxLength) validator.error = `Max ${options.maxLength} symbols`
    if (!isInMinLength) validator.error = `Min ${options.minLength} symbols`

    emit('validator', validator)
}

watch(text, (newVal) => {
    if (props.fieldOptions?.isRequired || newVal != "") validateInput()
    else  {
        validator.isValid = true
        validator.error = ""
        emit('validator', validator)
    }
},
{ immediate: true }
)
</script>

<template>
<div :class="[s.container, !validator.isValid && s.notValid]">
    <input v-model="text" :class="s.text" :type="type" :placeholder="hint"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    align-items: center
    background: white
    border: 1px solid rgba(0,0,0,.1)
    // border-radius: 3px
    // box-shadow: inset 0 -2px rgba(0,0,0, .3)
    box-sizing: border-box

    &.notValid
        border: 1px solid rgba(250,0,0,1)

    .text
        all: unset
        @include main.font
        padding: 0 .5rem
        height: 100%
        width: 100%
        color: black
</style>