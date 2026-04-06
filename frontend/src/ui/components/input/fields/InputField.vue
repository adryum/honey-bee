<script setup lang="ts">
import type { FieldValidee } from "@/core/composables/useFormValidator";
import { computed, onMounted, ref, useCssModule } from "vue";

const s = useCssModule()
const props = defineProps<{
    validee?: FieldValidee
}>()

const input                = defineModel('input', { default: '' })
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
</script>

<template>
<input
    :style="showIncorrectBorders && {  boxShadow: 'inset 0 0 0 1px var(--red)' }"
    :class="[s.input]"
    type="text"
    v-model="input"
    @focus="hasBeenFocussed = true"
>
</template>

<style module lang='sass'>
.input
    all: unset
    min-width: 0
    width: 100%
    height: 2.5rem

    line-height: 1rem
    padding: .75rem .90rem
    box-sizing: border-box
    font-size: var(--font-size-medium)
    font-family: var(--font-family)
    box-shadow: inset 0 0 0 1px #E0E0E0
    border-radius: 6px
    background: white
    transition: .3s
    outline: 0 solid color-mix(in srgb, var(--orange) 20%, transparent);

    &:focus     
        outline: 2px solid color-mix(in srgb, var(--orange) 20%, transparent);
        box-shadow: inset 0 0 0 1px var(--orange) !important

    &.incorrect
        box-shadow: inset 0 0 0 1px var(--red)
</style>