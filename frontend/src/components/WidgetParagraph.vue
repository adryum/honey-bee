<script setup>
import { useCssModule } from 'vue';
defineProps({
    title: String,
    content: {
        type: String,
        default: 'Not Provided',
    }
})

const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    // justify-content: space-evenly
    gap: .3rem

    box-sizing: border-box
    padding: .5rem
    border-left: 4px solid #FFD426
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)
    border-radius: 4px

    > *
        all: unset
    
    h1
        font-size: main.$font-size-heading

    p
        font-size: main.$font-size-text
        color: #707070
</style>