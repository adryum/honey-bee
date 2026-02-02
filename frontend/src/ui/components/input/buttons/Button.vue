<script setup lang="ts">
import { useCssModule } from 'vue';
import { motion } from 'motion-v';

const props = withDefaults(defineProps<{
    text?: string
    isImportant?: boolean
    isDisabled?: boolean
}>(), {
    text: 'button',
    isImportant: true,
    isDisabled: false
})
const s = useCssModule()
</script>

<template>
<motion.button :class="[s.container, isImportant ? s.important : s.unimportnat, isDisabled && s.disabled]"
    :while-press="isDisabled ? {} : {scale: 0.98}"
    :disabled="isDisabled"
>
    <p :class="s.text">{{ text }}</p>
</motion.button>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
.container
    all: unset
    display: inline-flex
    cursor: pointer
    justify-content: center
    align-items: center

    height: 2rem
    max-height: 2rem
    padding: 0 1rem
    box-sizing: border-box
    border-radius: var(--border-radius-tiny)
    font-size: var(--font-size-medium)
    transition: .1s
    outline-color: white
    box-shadow: 0 1px 1px 0 var(--faint-border)

    .text
        font-family: var(--font-family)
        font-weight: 500
        letter-spacing: .02em

.unimportnat
    border: 1px solid rgba(0, 0, 0, .6)
    color: black
    opacity: .6

    &:hover
        opacity: 1
        border-color: black

.important
    background: var(--orange)
    color: white

    &:hover
        background: var(--darker-orange)

.disabled
    opacity: .5
</style>