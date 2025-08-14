<script setup lang="ts">
import { useCssModule } from 'vue';
import { motion } from 'motion-v';

const props = withDefaults(defineProps<{
    text?: string
}>(), {
    text: 'button'
})
const s = useCssModule()
</script>

<template>
<motion.button :class="s.container"
    :while-press="{scale: 0.9}"
>
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

    background: #D8A435
    border-radius: 3px
    border-bottom: 2px solid rgba(0,0,0,.2)
    
    .text
        @include main.font
        font-weight: 700
</style>