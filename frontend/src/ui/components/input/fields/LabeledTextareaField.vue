<script setup lang="ts">
import { ref, useCssModule } from "vue";
import type { FieldValidationOptions } from "@/core/composables/validators/UseFieldValidator";
import Icon from "../../Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import TextareaField from "./TextareaField.vue";

const s = useCssModule()
const props = defineProps<{
    label: string
    placeholder?: string
    options: FieldValidationOptions<string>
}>()
const input = defineModel('input', { default: '' })
const shown = ref(false)
</script>

<template>
<div :class="s.container"
    @click="shown = !shown"
>
    <label :class="s.label" for="field">{{ label }}</label>
    <TextareaField 
        id="field" 
        :class="s.field"
        :placeholder="placeholder"
        :validator-options="options"
        :max-lines="5"
        v-model:input="input"
    />
    <div 
        v-if="false"
        :class="[
            s.hint,
            
            shown ? s.showHint : s.hideHint
        ]"
    >
        <Icon 
            :svg="SVG.InfoCircle"
            :type="IconType.SMALL"
        />
        <p>
            Ima hint
        </p>
    </div>
</div>
</template>

<style module lang='sass'>

.showHint
    opacity: .8
    height: 1rem
    margin-top: .5rem

.hideHint
    opacity: 0
    height: 0rem
    margin-top: 0rem

.container
    display: flex
    flex-direction: column

    font-family: var(--font-family)
    font-size: var(--font-size-small)
    font-weight: 500
    letter-spacing: .02em

    .label
        opacity: .8
        font-weight: 600
        letter-spacing: .04em
        font-size: var(--font-size-small)
        color: var(--black)
        margin-bottom: .5rem

    .hint
        display: flex
        align-items: center
        gap: .25rem

        transition: .2s
        min-height: 0
        font-weight: 400
        letter-spacing: .04em
        font-size: var(--font-size-small)
        color: var(--black)
</style>