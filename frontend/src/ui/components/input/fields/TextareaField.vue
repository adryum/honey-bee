<script setup lang="ts">
import { useFieldValidator } from "@/core/composables/validators/UseFieldValidator";
import type { FieldValidationOptions } from "@/core/composables/validators/UseFieldValidator";
import type { FormValidatorModel, ValidatorModel } from "@/core/composables/validators/UseFormValidator";
import { clamp } from "@vueuse/core";
import { useCssModule, onMounted, ref, watch, nextTick } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    placeholder?: string
    validatorOptions?: FieldValidationOptions<string>,
    maxLines?: number
    isTransparent?: boolean // background color
    readonly?: boolean
}>(), {
    isRequired: false,
    maxLines: 5,
    isTransparent: false,
    readonly: false
})
const inputValue = defineModel<string>("inputValue", { default: '' })
const emit = defineEmits<{
    onMountedValidator: [ValidatorModel],
    matchingSuggestion: [string]
}>()
const { validator, showValidatorBorders } = useFieldValidator(
    inputValue,
    props.validatorOptions ?? {},
    () => inputValue.value = ''
)

onMounted(() => {
    emit("onMountedValidator", validator)
})

const textarea = ref<HTMLTextAreaElement>()

function setAdaptiveTextareaSize(textarea: HTMLTextAreaElement, checkAgainst100Percent: boolean = false) {
    // reset fields height
    textarea.style.height = `0px`

    const style = getComputedStyle(textarea)
    const lineHeight = parseFloat(style.lineHeight)

    const scrollHeight = textarea.scrollHeight
    const paddingAndBorder = "1.5rem"

    // console.log("scrollHeight",scrollHeight);
    // console.log("lineHeight",lineHeight);
    

    let lineCount = Math.floor(scrollHeight / lineHeight)
    lineCount = clamp(lineCount, 0, props.maxLines)
    // console.log("lineCount:", lineCount);

    textarea.style.height = `calc(${paddingAndBorder} + (${lineHeight}px * ${lineCount}))`
    const plannedHeight = textarea.scrollHeight

    if (checkAgainst100Percent) {
        textarea.style.height = `100%`
        const initialHeight = textarea.scrollHeight

        if (initialHeight > plannedHeight) {
            textarea.style.height = '100%'
        } else {
            textarea.style.height = `calc(${paddingAndBorder} + (${lineHeight}px * ${lineCount}))`
        }
    }
}
watch(inputValue, () => {
    if (textarea.value == null) return

    setAdaptiveTextareaSize(textarea.value, true)
}, { immediate: true})

onMounted(async () => {
    await nextTick()
    setAdaptiveTextareaSize(textarea.value!, true)
})
</script>

<template>
    <textarea 
        ref="textarea"
        :placeholder="placeholder"
        :class="s.input"
        :style="{ 
            lineHeight: '20px', 
            background: isTransparent ? 'transparent' : '',
            boxShadow: !validator.isValid && showValidatorBorders ? '0 0 0 1px var(--red)' : ''
        }"
        :readonly="readonly"
        @focus="showValidatorBorders = true"
        v-model="inputValue"
    ></textarea>
</template>

<style module lang='sass'>
.input
    margin: 0
    resize: none
    border: none

    display: flex

    line-height: 1rem
    padding: .75rem .90rem
    box-sizing: border-box
    font-size: var(--font-size-medium)
    font-family: var(--font-family)
    width: 100%
    height: 100%
    min-height: 0

    box-shadow: inset 0 0 0 1px #E0E0E0
    border-radius: 6px
    background: white
    outline: 0 solid color-mix(in srgb, var(--yellow) 20%, transparent);

    &:focus     
        outline: 2px solid color-mix(in srgb, var(--yellow) 20%, transparent);
        box-shadow: inset 0 0 0 1px var(--yellow) !important

    &.incorrect
        box-shadow: inset 0 0 0 1px var(--red)
</style>