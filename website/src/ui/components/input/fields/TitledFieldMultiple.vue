<script setup lang="ts">
import { ref, useCssModule } from "vue";
import type { FieldValidator, FieldOptions } from "@/core/composables/field/useField";
import FieldMultiple from "./FieldMultiple.vue";

const s = useCssModule()
const text = defineModel<string | number>("text")
const validator = ref<FieldValidator>({ isValid: true, error: ""})
const emit = defineEmits<{
    validator: [FieldValidator]
}>()

const props = withDefaults(defineProps<{
    title?: string
    hint?: string
    fieldOptions?: FieldOptions
}>(),
{
    title: '{ TITLE }',
    hint: '...',
})

function onValidatorUpdate(event: FieldValidator) {
    validator.value = event
    emit('validator', validator.value)
}
</script>

<template>
<div :class="s.container">
    <div :class="s.title">
        <h1>{{ title }}</h1>
        <p :class="s.error">{{ ((fieldOptions?.isRequired) ? "* " : " ") + validator.error }}</p>
    </div>
    <FieldMultiple :class="s.field" :hint="hint" :field-options="fieldOptions"
        v-model:text="text" 
        @validator="onValidatorUpdate"
        />
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    gap: .2rem

    .title
        all: unset
        display: flex
        gap: .5rem
        @include main.font
        @include main.f-size-very-small
        font-weight: 500

        .error
            color: red
            font-weight: 400
    .field
        
</style>