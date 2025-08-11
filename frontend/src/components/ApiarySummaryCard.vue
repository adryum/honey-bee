<script setup lang="ts">
import { useCssModule } from "vue"
const s = useCssModule()

const props = defineProps({
  apiary: Object,
  sizeMultiplier: Number,
  onDelete: Function
})

</script>
<template>
<div :class="s.container" ref="container" @click="$router.push('/apiaries/' + apiary!.id)">
    
    <img :class="s.image" src="/src/assets/images/apiary1.jpg" alt="apiary image">
    <hr :class="s.linearDim">
    <div :class="[s.options, s.entry]"></div>
    <h1 :class="[s.name]">{{ apiary!.name }}</h1>
    <ul :class="s.info">
        <div :class="s.entry"></div>
        <div :class="s.entry"></div>
        <div :class="s.entry"></div>
    </ul>

</div>
</template>

<style module lang="sass">
@use '../assets/_colors.sass' as colors
@use '../assets/main.sass' as main
.container
    position: relative
    display: flex
    flex-direction: column
    justify-content: flex-end

    width: 550px
    height: 450px
    box-sizing: border-box
    overflow: hidden
    border-radius: 5px
    transition: .3s ease-out
    box-shadow: 0 2px 5px rgba(0, 0, 0, .5)
    cursor: pointer
        
    &:hover .image
        scale: 1.1
    &:hover .options
        opacity: 1

    .options
        z-index: 0
        top: 0
        right: 0
        position: absolute
        margin: 1em
        background: rgba(0, 0, 0, .3)
        opacity: 0
        transition: .3s

    .name
        @include main.jetbrains-mono
        font-size: 3.5em
        font-weight: 800
        
        margin: 0
        z-index: 0
        padding: 0 2rem

    .info
        all: unset
        z-index: 0

        display: flex
        justify-content: flex-end
        gap: 1em
        padding: 1em

    .entry
        width: 50px
        height: 50px

        border: 2px solid rgba(255, 255, 255, .5)
        border-radius: 5px

    .image
        position: absolute
        height: 100%
        width: 100%
        object-fit: cover
        transition: .3s ease-out
        outline: 6px solid rgba(255, 255, 255, .2)

    .linearDim
        all: unset
        position: absolute
        bottom: 0
        height: 40%
        width: 100%

        background: linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .65) 100%)
</style>
        
