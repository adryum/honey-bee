<script setup>
import { useCssModule, useTemplateRef } from 'vue';

const model = defineModel()
const props = defineProps({
    text: {
        type: String,
        default: 'checkbox'
    },
    isRequired: Boolean
})
const input = useTemplateRef('box')
const s = useCssModule()
</script>

<template>
    <div :class="s.container">
        <input ref="box" :class="s.input" type="checkbox" v-model="model"/>
        <p @click="input.click()" :class="[!model && isRequired && s['not-checked'], s.text]">{{ text }}</p>
    </div>
</template>

<style module lang="sass">
.container
    display: flex 
    align-items: center
    gap: 4px

.input
    aspect-ratio: 1
    margin: 0
    width: 1.2rem

    border-radius: 8px
    box-shadow: 0 0 10px rgba(0, 0, 0, .1)

.not-checked
    color: rgba(255, 61, 61, .9) !important

.text
    all: unset
    letter-spacing: .5px
    font-size: 14px
    transition: .2s
</style>
