<script setup>
import { useCssModule } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: 'NONE'
    },
    content: {
        type: String,
        default: 'NONE'
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
    align-items: center
    box-sizing: border-box
    padding: .2rem .4rem
    background: white
    border-radius: 4px
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)

    > *
        all: unset
        flex: 1

    h1
        font-size: main.$font-size-heading
        color: black

    p
        display: flex
        justify-content: center
        font-size: main.$font-size-text
        color: Orange
        
</style>