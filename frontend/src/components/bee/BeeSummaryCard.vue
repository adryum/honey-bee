<script setup lang="ts">
import { ref, useCssModule } from "vue"
import { getSVG, SVGIconRes } from "../../core/SVGLoader";
import { motion } from "motion-v"
import type { DropdownOptions } from "../../core/Interfaces";
import CubeDropdown from "../input/dropdowns/CubeDropdown.vue";
import Button from "../input/buttons/Button.vue";
const s = useCssModule()

const props = defineProps({
  apiary: Object,
  sizeMultiplier: Number,
  onDelete: Function
})

</script>
<template>
<div :class="s.container" ref="container" @click="$router.push('/apiaries/' + apiary!.id)">
    <img :class="s.image" src="/src/assets/images/queen1.jpg" alt="apiary image">
    <hr :class="s.linearDim">

    <div :class="s.elements">
        <h1 :class="s.species">Tetragonula carbonaria</h1>
        <h2 :class="s.intro">"The biggest, strogest and favorite of em all"</h2>
        <Button :class="s.button" text="Read more"/>
    </div>
</div>
</template>

<style module lang="sass">
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
.container
    @include main.font
    text-align: center
    position: relative
    display: flex
    flex-direction: column
    justify-content: flex-end

    height: 400px
    box-sizing: border-box
    overflow: hidden
    border-radius: 5px
    transition: .2s ease-out
    cursor: pointer

    &:hover
        transform: scale( 1.01)

        
    &:hover .image
        transform: scale( 1.1)

   
    .elements
        position: relative
        display: flex
        flex-direction: column
        align-items: center
        justify-content: flex-end
        width: 100%
        height: 100%
        gap: 1rem

        padding: 1rem
        box-sizing: border-box

       
        .species
            all: unset
            @include main.f-size-large
            font-weight: 800
            color: white

    
        .intro
            all: unset
            @include main.f-size-very-small
            font-weight: 300
            letter-spacing: 1px
            color: white

        .button
            width: calc( 100% - 2rem )

    &::after
        content: ""
        position: absolute
        inset: 0
        border: 2px solid rgba(0, 0, 0, .2)   
        border-radius: 5px
        pointer-events: none      

    .image
        display: block
        position: absolute
        height: 100%
        width: 100%
        object-fit: cover
        transition: .3s ease-out
       

    .linearDim
        all: unset
        position: absolute
        bottom: 0
        height: 50%
        width: 100%

        background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .60) 100%)
</style>
        
