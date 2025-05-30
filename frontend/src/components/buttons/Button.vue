<script setup>
import { useCssModule } from 'vue';

defineProps({
    title: {
        type: String,
        default: 'Button'
    },
    type: {
        type: String,
        default: 'button'
    }
})

const s = useCssModule()
</script>

<template>
    <button :class="s.button" :type="type"><label :class="s.text">{{ title }}</label></button>
</template>

<style module lang="sass">
@use '@/assets/main.sass' as main
.button 
    @include main.button-base
    all: unset
    display: flex
    justify-content: center
    align-items: center

    font-size: 30px
    border-radius: 2px

    border: 2px solid Orange
    box-sizing: border-box

    background: main.$button-special
    transition: .2s
    
    &:hover
        border: 2px solid
        
        .text
            scale: 1.05

    .text
        @include main.button-base
        transition: .2s
        
</style>