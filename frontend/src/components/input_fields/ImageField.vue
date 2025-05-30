<script setup>
import { useCssModule } from 'vue';
import TextTitle from './TextTitle.vue';
defineProps({
    title: {
        type: String,
        default: 'TITLE'
    }
})
const model = defineModel()
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.title">
        <TextTitle :class="s.title" 
        is-disabled="true" shrink-width-to-text="true" 
        :text="title"/>
    </div>
    <div :class="s['img-container']">
        <img src="@\assets\images\Texas-Bee-Apiary.jpg" alt="api">
    </div>
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
    .img-container
        background: main.$popup-base
        border-radius: 2px
        overflow: hidden

        img
            object-fit: cover
            object-position: center
            width: 100%
            height: 100%

</style>