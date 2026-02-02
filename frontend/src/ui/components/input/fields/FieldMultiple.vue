<script setup lang="ts">
import { type FieldOptions, type FieldValidator, useField } from "@/core/composables/field/useField";
import { toRef, useCssModule } from "vue";

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
    <textarea :class="s.text" :rows="5" :placeholder="hint" v-model="text"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    align-items: center
    background: white
    border: 1px solid rgba(0,0,0,.1)
    box-sizing: border-box

    &.notValid
        border: 1px solid rgba(250,0,0,1)

    .text
        all: unset
        @include main.font
        box-sizing: border-box
        padding: .35rem .5rem
        height: 100%
        width: 100%
        color: black
        resize: vertical
</style>