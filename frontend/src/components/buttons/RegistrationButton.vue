<script setup>
import { useCssModule } from 'vue';

defineProps({
    text: {
        type: String,
        default: 'button'
    }
})

const s = useCssModule()
</script>

<template>
<button :class='s.container'>
    {{ text }}
</button>
</template>

<style module lang='sass'>
.container
    all: unset
    height: 3rem
  
    font-size: 30px
    cursor: pointer

    display: flex
    align-items: center
    justify-content: center

    box-sizing: border-box
    border-bottom: 3px solid #D4AA00
    border-radius: 8px
    box-shadow: 0 0 4px rgba(0, 0, 0, .2)

    background: #FAD764
    transition: .2s

    &:hover
        filter: brightness(90%)
</style>