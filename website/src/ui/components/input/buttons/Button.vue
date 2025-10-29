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
<motion.button :class="[s.container, isImportant && s.important, isDisabled && s.disabled]"
    :while-press="{scale: 0.9}"
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

    padding: .5rem 1rem
    border-radius: 3px
    box-sizing: border-box
    border: 2px solid rgba(0,0,0,.2)
    
    .text
        @include main.button-font


.important
    border: 2px solid var(--accent)
    border-bottom: 2px solid rgba(0,0,0,.2)
    background: var(--accent)

.disabled
    opacity: .5
</style>