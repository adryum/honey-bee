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
    <p>{{ text }}</p>
</button>
</template>

<style module lang='sass'>
.container
    all: unset

    display: flex
    align-items: center
    justify-content: center

    box-sizing: border-box
    padding: .2rem
    border-radius: 2px
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)
    
    cursor: pointer
    background: white

    &:hover
        filter: brightness(95%)
    > p
        all: unset
        opacity: .7
</style>