<script setup>
import CubeButtonTranspparent from '@/components/buttons/CubeButtonTranspparent.vue';
import TagContentBox from '@/components/TagContentBox.vue';
import { useCssModule } from 'vue';
defineProps({
    supper: {
        type: Object,
        default: undefined
    }
})
const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <div :class="s.pully"></div>
    <img :class="s.img" src="@/assets/images/Hive1.jpg">
    <div :class="s.content">
        <div :class="s.header">
            <CubeButtonTranspparent :class="s.button" res="fa-solid fa-ellipsis-vertical"/>
            <h2>{{ supper.orderNumber }}</h2>
            <h1>{{ supper.name }}</h1>
        </div>
        <div :class="s.tags">
            <TagContentBox label="type" content="3/5"/>
            <TagContentBox label="frame weight" content="3kg"/>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: grid
    grid-template-areas: 'pully img content'
    grid-template-columns: 1rem 1fr 2fr
    gap: .5rem

    .pully
        grid-area: pully
    .img
        grid-area: img
    .content
        grid-area: content
        box-sizing: border-box
        padding: 1rem

        display: flex
        flex-direction: column

    .header
        position: relative
        align-items: center

        h2
            all: unset
            font-size: main.$font-size-text
        h1
            all: unset
            font-size: main.$font-size-heading

        .button
            position: absolute
            right: 0

</style>