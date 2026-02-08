<script setup lang="ts">
import { useFieldValidator, type FieldValidationOptions } from "@/core/composables/validators/UseFieldValidator";
import { useCssModule } from "vue";

const s = useCssModule()
const props = defineProps<{
    options: FieldValidationOptions<string>,
}>()
const input = defineModel('input', { default: '' })
const { showValidatorBorders, validator } = useFieldValidator<string>(
    input,
    props.options ?? {},
    () => input.value = '',
)
</script>

<template>
<input
    :style="showValidatorBorders && !validator.isValid && {  boxShadow: 'inset 0 0 0 1px var(--red)' }"
    :class="[s.input]"
    type="text"
    v-model="input"
    @click="showValidatorBorders = true"
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
    outline: 0 solid color-mix(in srgb, var(--yellow) 20%, transparent);

    &:focus     
        outline: 2px solid color-mix(in srgb, var(--yellow) 20%, transparent);
        box-shadow: inset 0 0 0 1px var(--yellow) !important

    &.incorrect
        box-shadow: inset 0 0 0 1px var(--red)
</style>