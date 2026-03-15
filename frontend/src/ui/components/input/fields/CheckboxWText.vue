<script setup lang="ts">
import { ref, useCssModule } from "vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { FormvalidatorAndItsOptionsModel } from "@/core/composables/validators/UseFormValidator";
import Icon from "../../Icon.vue";

const s = useCssModule()
const props = defineProps<{
    label: string
    formOptions?: FormvalidatorAndItsOptionsModel
}>()
const isTrue = defineModel("isTrue", { default: false })
// const validator = useModularDropdownValidator(props.formOptions)
</script>

<template>
<div :class="s.container">
    <div :class="s.wrapper">
        <input
            id="checkbox"
            type="checkbox"
            :class="[
                s.input,
                isTrue && s.isTrue
            ]"
            v-model="isTrue"
        />
        <Icon
            v-if="isTrue"
            :class="s.icon"
            :svg="SVG.Confirm"
            :type="IconType.SMALL"
        />
    </div>
    <label 
        for="checkbox"
        :class="s.label"
    >
        {{ label }}
    </label>
</div>
</template>

<style module lang='sass'>
.wrapper
    position: relative
    display: flex
    align-items: center
    justify-content: center

    .input
        appearance: none
        width: 2rem
        height: 2rem
        box-shadow: 0 0 0 1px var(--border-color)
        border-radius: var(--border-radius-small)
        margin: 0

        background: var(--light-gray)
        box-shadow: inset 0 0 0 1px var(--gray)

        &.isTrue
            box-shadow: inset 0 0 0 1px var(--green)
            background: var(--green)

    .icon
        position: absolute
        pointer-events: none

.container
    display: flex
    align-items: center
    gap: .5rem


    .label
        font-family: var(--font-family)
        font-size: var(--font-size-medium)
        letter-spacing: .02em

</style>