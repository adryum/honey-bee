<script setup>
import { useCssModule } from 'vue';
defineProps({
    text: {
        type: String,
        default: 'HR'
    }
})
const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <hr :class="s.hr">
    <h1 :class="s.text">{{ text }}</h1>
    <hr :class="s.hr">
</div>
</template>

<style module lang='sass'>
.container
    display: flex
    align-items: center
    justify-content: center

    width: 100%

    .text
        margin: 0 1rem
        font-size: 25px
    .hr
        all: unset

        flex: 1
        height: 3px
        background: gray
        
        border-radius: 20px
</style>