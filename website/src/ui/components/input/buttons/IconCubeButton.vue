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

    min-width: 2rem
    min-height: 2rem
    max-height: 2rem
    max-width: 2rem

    padding: .2rem
    box-sizing: border-box

    transition: .1s
    border-radius: var(--border-radius-tiny)
    background: var(--white)

    &:hover
        background: var(--orange)
        filter: brightness(98%)
    
    .icon
        height: 100%
        width: 100%
</style>