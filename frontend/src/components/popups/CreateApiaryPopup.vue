<script setup>
import { useCssModule } from 'vue';
import IconCubeButton from '../buttons/IconCubeButton.vue';
import Icon from '../Icon.vue';
import TextTitle from '../TextTitle.vue';
import PopupPlate from '../utlis/PopupPlate.vue';

const s = useCssModule()
</script>

<template>
<PopupPlate>
    <div :class="s.container">
        <div :class="s.header">
            <Icon :id="s.icon" res="fa-solid fa-bug"/>
            <TextTitle :class="s.title" text="Create Apiary"/>
            <div style="margin: auto"></div>
            <div :class="s['vertical-split']"></div>
            <IconCubeButton :id="s.other"/>
            <IconCubeButton :id="s.close"/>
        </div>
        <div class="separator"></div>

        <div class="grid">

        </div>

    </div>
</PopupPlate>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as *
.container
    display: flex
    flex-direction: column
        
    border-radius: 2px
    overflow: hidden
    box-shadow: 0 0 30px rgba(0, 0, 0, .5)

    width: 50vw
    height: 50vh

    background: #F3E8C4

    .header
        display: flex
        align-items: center

        box-sizing: border-box
        padding: .6rem
        gap: .6rem

        height: 5rem
        border-radius: 0 0 2px 2px
        background: $dark
        .vertical-split
            border-radius: 20px
            height: 100%
            width: 4px
            background: $underline-dark

        #icon
            aspect-ratio: 1
            height: 100%
        #close
            background: $button-special
        #other
            background: $button-common

    .grid
        flex: 1
        padding: 0 1rem
        display: grid
        grid-template-areas: 'left right'
        grid-template-columns: 1fr 1fr
        grid-template-rows: repeat(2rem, 2) 6rem 2rem
</style>