<script setup lang="ts">
import { useCssModule } from "vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { FormvalidatorAndItsOptionsModel } from "@/core/composables/validators/UseFormValidator";
import Icon from "../../Icon.vue";
import { getRandomId } from "@/core/utils/Utils";

const s = useCssModule()
const props = defineProps<{
    label:        string
    disabled?:    boolean
    formOptions?: FormvalidatorAndItsOptionsModel
}>()
const id = getRandomId("checkbox")
const isTrue = defineModel("isTrue", { default: false })
// const validator = useModularDropdownValidator(props.formOptions)
</script>

<template>
<div :class="s.container">
    <div :class="s.wrapper">
        <input
            :id="id"
            type="checkbox"
            :disabled="disabled"
            :class="[
                s.input,
                isTrue && s.isTrue,
                disabled && s.disabled
            ]"
            v-model="isTrue"
        />
        <Icon
            v-if="isTrue"
            :class="s.icon"
            :svg="SVG.Checkmark"
            :type="IconType.SMALL"
            color="white"
        />
    </div>
    <label 
        :for="id"
        :class="[
            s.label, 
            disabled && s.disabled
        ]"
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
        border-radius: var(--border-radius-small)
        margin: 0

        background: var(--white)
        box-shadow: inset 0 0 0 1px var(--gray)

        &.disabled
            background: var(--light-gray) !important
            box-shadow: inset 0 0 0 1px var(--gray) !important
            cursor: not-allowed

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

        &.disabled
            opacity: .4
</style>