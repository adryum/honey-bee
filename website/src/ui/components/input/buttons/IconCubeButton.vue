<script setup lang="ts">
import { useCssModule } from 'vue';
import { motion } from 'motion-v';
import SVGComponent from '../../SVGComponent.vue';
import { SVGImage, SVGRes } from '@/core/SVGLoader';

const props = withDefaults(defineProps<{
    svg?: SVGImage
    onClick?: () => void
}>(), {
    svg: () => new SVGImage(SVGRes.House)
})
const s = useCssModule()
</script>

<template>
<motion.button :class="s.container" @click="(e: Event) => { e.stopPropagation(); onClick?.() } "
    :while-press="{scale: 0.9}"
>
    <SVGComponent :class="s.icon" :svg="svg"/>
</motion.button>
</template>

<style module lang='sass'>
@use '/src/assets/_colors.sass' as colors
@use '/src/assets/main.sass' as main
.container
    all: unset
    display: inline-flex
    align-items: center
    justify-content: center
    cursor: pointer

    padding: .2rem
    border-radius: 3px
    box-sizing: border-box

    // box-shadow: inset 0 -2px rgba(0,0,0, .3)
    transition: .2s

    &:hover
        background: rgba(0,0,0, .1)
    
    .icon
        height: 100%
        width: 100%
</style>