<script setup lang="ts">
import { useCssModule } from 'vue';
import SVGComponent from '../../SVGComponent.vue';
import { motion } from 'motion-v';
import { SVGIconRes, type SVGIcon } from '../../../../core/SVGLoader';

const props = withDefaults(defineProps<{
    svg?: SVGIcon
    text: string,
    onClick?: () => void
}>(), {
    text: 'button',
    svg: () => ({
        res: SVGIconRes.Apiaries,
        path: "M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z",
        viewBox: "0 0 540 540",
        color: "#FFFFFF"
    })
})
const s = useCssModule()
</script>

<template>
<motion.button :class="s.container" @click="onClick"
    :while-press="{scale: 0.9}"
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

    background: #D8A435
    border-radius: 3px
    box-shadow: inset 0 -2px rgba(0,0,0, .3)
    
    .icon
        width: 1rem
        aspect-ratio: 1

    .text
        @include main.button-font
        color: var(--button-text)
</style>