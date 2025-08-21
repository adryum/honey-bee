<script setup lang="ts">
import { useCssModule } from 'vue';
import SVGComponent from '../../SVGComponent.vue';
import { motion } from 'motion-v';
import { type SVGIcon, getSVG, SVGIconRes } from '../../../core/SVGLoader';

const props = withDefaults(defineProps<{
    svg?: SVGIcon
    onClick?: () => void
}>(), {
    svg: () => getSVG(SVGIconRes.House)
})
const s = useCssModule()
</script>

<template>
<motion.button :class="s.container" @click="onClick"
    :while-press="{scale: 0.9}"
>
    <SVGComponent :class="s.icon" :svg="svg"/>
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
    box-sizing: border-box

    background: transparent
    box-shadow: inset 0 -2px rgba(0,0,0, .3)
    height: 100%
    transition: .2s

    &:hover
        background: #98392c
    
    .icon
        height: 100%
        aspect-ratio: 1
</style>