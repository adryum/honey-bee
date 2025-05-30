<script setup>
import { useCssModule } from 'vue';
import TextTitle from './TextTitle.vue';

defineProps({
    title: {
        type: String,
        default: 'NO TITLE'
    }
})
const model = defineModel()
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.title">
        <TextTitle :class="s.title" 
        :is-disabled="true" :shrink-width-to-text="true" 
        :text="title"/>
    </div>
    <textarea :class="s.input" v-model="model"></textarea>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: grid
    grid-template-rows: 3.4rem 1fr
    gap: .5rem
    padding: .4rem
    border-radius: 2px
    box-sizing: border-box
    background: main.$base-dark

    .title
        display: flex
    .input
        all: unset
        background: main.$popup-base
        font-size: 28px
        box-sizing: border-box
        padding: 0 .4rem 
        border-radius: 2px
        text-align: start


</style>