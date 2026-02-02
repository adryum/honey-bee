<script setup lang="ts">
import { useCssModule } from 'vue';
import IconCubeButton from '../input/buttons/IconCubeButton.vue'
import { SVG } from '@/assets/svgs/SVGLoader';


const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <div :class="s.profile">
        <img :class="s.image" src="https://i.imgur.com/69AAeeG.jpeg" alt="profile picture">
        <div :class="s.column">
            <p :class="s.name">Ieva Rūtiņa</p>
            <p :class="s.email">ieva.rutina@gmail.com</p>
        </div>
        <IconCubeButton :svg="SVG.Confirm"/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
@use '@/assets/_colors.sass' as colors
.container
    display: flex
    align-items: center
    width: 100%
    min-height: 3rem

    box-sizing: border-box
    padding: .5rem
    

    background: var(--white)
    border-bottom: 2px solid var(--light-gray)
    font-family: var(--font-family)

    .profile
        display: inline-flex
        margin-left: auto
        max-width: 15rem
        gap: .5rem


        align-items: center

        .image
            width: 2rem
            height: 2rem
            border-radius: 100rem
            object-fit: cover

        .column
            display: flex
            flex-direction: column

            .name
                font-weight: 500
                letter-spacing: .02em
                font-size: var(--font-size-small)
            
            .email
                font-size: var(--font-size-tiny)
                opacity: .6
</style>