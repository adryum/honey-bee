<script setup lang="ts">
import { useField, type FieldOptions, type FieldValidator } from "@/core/composables/field/useField";
import { useCssModule, toRef } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    hint?: string
    fieldOptions?: FieldOptions
}>(),
{
    hint: '...',
    fieldOptions: () => ({}) as FieldOptions,
})
const text = defineModel<string | number>("text", { default: "" })

const emit = defineEmits<{ validator: [FieldValidator] }>()
const { type, validator, validateInput } = useField(toRef(props, 'fieldOptions'), text, emit)
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