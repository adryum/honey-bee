<script setup lang="ts">
import { ref, useCssModule } from "vue";
import { motion } from 'motion-v';

const text = ref('')
const isHoldingAction = ref(false)
const props = withDefaults(defineProps<{
    hint?: string
    actionText?: string
    onClick?: (value: string) => void
}>(),
{
    hint: '...',
    actionText: 'Search',
    onClick: () => {}
})


const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <input :class="s.text"
        :placeholder="hint"
        v-model="text"
        @keyup.enter="() => onClick(text)"
    ></input>

    <motion.button 
    :while-press=" {filter: 'brightness(0.8)'}" 
    @mousedown="isHoldingAction = true" 
    @mouseup="isHoldingAction = false" 
    @click="() => onClick(text)"
    :class="s.action">
        <motion.p :animate="isHoldingAction ? { scale: 0.95} : {scale: 1}">{{ actionText }}</motion.p>
    </motion.button>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    align-items: center
    background: white
    border-radius: 3px
    box-shadow: inset 0 -2px rgba(0,0,0, .3)
    box-sizing: border-box

    .text
        all: unset
        @include main.font
        width: 12rem
        padding: 0 .5rem
        
        color: black

    .action
        all: unset
        display: flex
        justify-content: center
        align-items: center
        @include main.font
        font-weight: 450
        width: 6rem
        color: white

        height: 100%

        border-radius: 0 3px 3px 0
        box-shadow: inset 0 -2px rgba(0,0,0, .5)
        background: #963B28
        cursor: pointer


</style>