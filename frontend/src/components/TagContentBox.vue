<script setup>
import { useCssModule } from 'vue';
const props = defineProps({
    label: {
        type: String,
        defaut: 'TAG'
    },
    content: {
        type: String,
        defaut: 'Centent'
    }
})
const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <h1>{{ label }}</h1>
    <p>{{ content }}</p>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: .1rem

    box-sizing: border-box
    padding: .1rem 1rem

    color: white
    background: #C2A774
    border-radius: 4px

    > *
        all: unset
    h1
        font-size: main.$font-size-text
    p
        font-size: main.$font-size-heading
</style>