<script setup lang="ts">
import type { FieldValidee } from "@/core/composables/useFormValidator";
import { useCssModule, ref,computed, onMounted } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    placeholder?:   string
    validee?:       FieldValidee
    maxLines?:      number
    isTransparent?: boolean       // background color
    readonly?:      boolean
}>(), {
    isRequired:    false,
    maxLines:      5,
    isTransparent: false,
    readonly:      false
})
const input                = defineModel<string>("input", { default: '' })
const hasBeenFocussed      = ref(false)
const showIncorrectBorders = computed(() => hasBeenFocussed.value && !props.validee?.isValid())

onMounted(() => {
    if (!props.validee) return
    
    props.validee.showThatIsRequired.on(() => {
        hasBeenFocussed.value = true
    })
    props.validee.clear.on(() => {
        input.value = ""
    })
})
// const textarea = ref<HTMLTextAreaElement>()

// function setAdaptiveTextareaSize(textarea: HTMLTextAreaElement, checkAgainst100Percent: boolean = false) {
//     // reset fields height
//     textarea.style.height = `0px`

//     const style = getComputedStyle(textarea)
//     const lineHeight = parseFloat(style.lineHeight)

//     const scrollHeight = textarea.scrollHeight
//     const paddingAndBorder = "1.5rem"

//     // console.log("scrollHeight",scrollHeight);
//     // console.log("lineHeight",lineHeight);
    

//     let lineCount = Math.floor(scrollHeight / lineHeight)
//     lineCount = clamp(lineCount, 0, props.maxLines)
//     // console.log("lineCount:", lineCount);

//     textarea.style.height = `calc(${paddingAndBorder} + (${lineHeight}px * ${lineCount}))`
//     const plannedHeight = textarea.scrollHeight

//     if (checkAgainst100Percent) {
//         textarea.style.height = `100%`
//         const initialHeight = textarea.scrollHeight

//         if (initialHeight > plannedHeight) {
//             textarea.style.height = '100%'
//         } else {
//             textarea.style.height = `calc(${paddingAndBorder} + (${lineHeight}px * ${lineCount}))`
//         }
//     }
// }
// watch(input, () => {
//     if (textarea.value == null) return

//     setAdaptiveTextareaSize(textarea.value, true)
// }, { immediate: true})

// onMounted(async () => {
//     await nextTick()
//     setAdaptiveTextareaSize(textarea.value!, true)
// })
</script>

<template>
    <textarea 
        ref="textarea"
        :placeholder="placeholder"
        :class="s.input"
        :style="{ 
            lineHeight: '20px', 
            background: isTransparent ? 'transparent' : '',
            boxShadow: showIncorrectBorders ? '0 0 0 1px var(--red)' : undefined
        }"
        :readonly="readonly"
        @focus="hasBeenFocussed = true"
        v-model="input"
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
    background: var(--white)
    outline: 0 solid color-mix(in srgb, var(--orange) 20%, transparent);

    &:focus     
        outline: 2px solid color-mix(in srgb, var(--orange) 20%, transparent);
        box-shadow: inset 0 0 0 1px var(--orange) !important

    &.incorrect
        box-shadow: inset 0 0 0 1px var(--red)
</style>