<script setup lang="ts">
import { useCssModule } from 'vue';
import SVGComponent from '../../SVGComponent.vue';
import { motion } from 'motion-v';
import { SVGImage, SVGRes } from '@/core/SVGLoader';


const props = withDefaults(defineProps<{
    svg?: SVGImage
    text: string,
    isImportant?: boolean
    isDisabled?: boolean
    onClick?: () => void
}>(), {
    text: 'button',
    isImportant: true,
    isDisabled: false,
    svg: () => new SVGImage(SVGRes.Apiaries)
})
const s = useCssModule()
</script>

<template>
<motion.button :class="[s.container, isImportant && s.important, isDisabled && s.disabled]" @click="onClick"
    :while-press="isDisabled ? {} : {scale: 0.9}"
    :disabled="isDisabled"
>
    <SVGComponent :class="s.icon" :svg="svg"/>
    <p :class="s.text">{{ text }}</p>
</motion.button>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
.container
    all: unset
    display: flex
    align-items: center
    cursor: pointer

    padding: .5rem 1rem 
    gap: 1rem

    border-radius: 3px
    border: 2px solid rgba(0,0,0,.2)
    box-sizing: border-box
    // box-shadow: inset 0 -2px rgba(0,0,0, .3)

    &.important
        border: 2px solid var(--accent)
        border-bottom: 2px solid rgba(0,0,0,.2)
        background: var(--accent)
    
    .icon
        width: 1rem
        aspect-ratio: 1

    .text
        @include main.button-font
        color: black

.disabled
    opacity: .5
</style>