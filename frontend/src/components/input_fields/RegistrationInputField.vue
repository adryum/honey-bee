<script setup>
import { useCssModule, useTemplateRef } from 'vue';

defineProps({
    hint: {
        type: String,
        default: 'Field'
    },
    type: {
        type: String,
        default: 'text'
    }
})

const input = useTemplateRef('input')
const model = defineModel()
const s = useCssModule()
</script>

<template>
<div @click="input.focus()" :class='s.container'>
    <p :class="[model ? s['not-empty'] : '', s.hint]">{{ hint }}</p>
    <input ref="input" :type="type" :class="[model ? s['not-empty-input'] : '', s.input]" v-model="model">
</div>
</template>

<style module lang='sass'>
.container
    height: 3rem
    overflow: hidden

    display: flex
    flex-direction: column
    position: relative

    box-sizing: border-box
    padding: .2rem 0 0 .3rem
    border-bottom: 3px solid #FFD426
    border-radius: 8px
    box-shadow: 0 0 4px rgba(0, 0, 0, .2)
    cursor: text

    &:focus-within
        .hint
            font-size: 10px
            
        .input
            font-size: 18px
.hint
    opacity: .7
    font-size: 14px
    transition: .1s

.not-empty
    font-size: 10px

.input
    all: unset
    width: 100%
    height: 100%
    font-size: 14px
    background: white
    transition: .1s
   
.not-empty-input
    font-size: 18px
</style>