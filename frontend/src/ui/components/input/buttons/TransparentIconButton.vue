<script setup lang="ts">
import { useCssModule } from 'vue';
import { motion } from 'motion-v';
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import Icon from '../../Icon.vue';


const props = withDefaults(defineProps<{
    svg?: SVG
    onClick?: () => void
}>(), {
    svg: SVG.Confirm
})
const s = useCssModule()
</script>

<template>
<motion.button :class="s.container" @click="onClick"
    :while-press="{scale: 0.9}"
>
    <Icon 
        :class="s.icon" 
        :svg="svg"
        :type="IconType.SMALL"
    />
</motion.button>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
.container
    all: unset
    display: flex
    align-items: center
    justify-content: center
    height: 2rem
    width: 2rem

    cursor: pointer

    box-sizing: border-box

    background: transparent
    box-shadow: inset 0 -2px rgba(0,0,0, .3)
    height: 100%
    transition: .2s

    &:hover
        background: var(--red)
    
    .icon
        width: 1rem
        height: 1rem
</style>