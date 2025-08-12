<script setup>
import { useCssModule } from 'vue';
import TextTitle from './TextTitle.vue';

defineProps({
    title: {
        type: String,
        default: 'NO TITLE'
    },
    type: {
        type: String,
        default: 'text'
    }
})
const model = defineModel()
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <TextTitle :class="s.title" :text="title"/>
    <input @keydown.enter.prevent :type="text" :class="s.input" v-model="model"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 1.5rem
    padding: .4rem
    border-radius: 2px
    box-sizing: border-box

    .title
        flex: 1
    .input
        all: unset
        @include main.input-base
        flex: 1
        font-size: 28px
        box-sizing: border-box
        padding: 0 .4rem 
        border-radius: 2px


</style>