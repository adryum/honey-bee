<script setup lang="ts">
import { useCssModule } from 'vue';
import SVGComponent from '../SVGComponent.vue';
import { motion } from 'motion-v';
import { getSVG, SVGIconRes, type SVGIcon } from '../../core/SVGLoader';

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

    background: #D8A435
    border-radius: 3px
    box-shadow: inset 0 -2px rgba(0,0,0, .3)
    
    .icon
        width: 1rem
        aspect-ratio: 1
</style>