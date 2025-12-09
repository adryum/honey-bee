<script setup lang="ts">
import { useCssModule } from 'vue';
import Icon from '../../Icon.vue'
import { SVG } from '@/assets/svgs/SVGLoader';

const props = withDefaults(defineProps<{
    svg?: SVG
    text: string,
    isImportant?: boolean
    isDisabled?: boolean
    onClick?: () => void
}>(), {
    text: 'button',
    isImportant: true,
    isDisabled: false,
    svg: SVG.Confirm
})
const s = useCssModule()
</script>

<template>
<button 
    :class="[
        s.container, 
        isImportant && s.important, 
        isDisabled && s.disabled
    ]" 
    :disabled="isDisabled"
    @click="onClick"
>
    <Icon :class="s.icon" :svg="svg"/>
    <p :class="s.text">{{ text }}</p>
</button>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
.container
    all: unset
    display: flex
    align-items: center
    cursor: pointer

    padding: .25rem .5rem
    gap: .5rem
    height: 2rem
    max-height: 2rem

    border-radius: var(--border-radius-tiny)
    border: 1px solid var(--gray)
    box-sizing: border-box
    transition: .1s

    &:hover
        background: var(--orange)
        border: 1px solid var(--orange)
    .icon
        width: 1rem
        height: 1rem

    .text
        padding: 0
        font-family: var(--font-family)
        font-size: var(--font-size-small)
        color: var(--black)
        letter-spacing: .02em

.disabled
    opacity: .5
</style>