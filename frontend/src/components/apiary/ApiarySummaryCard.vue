<script setup lang="ts">
import { ref, useCssModule } from "vue"
import { getSVG, SVGIconRes } from "../../core/SVGLoader";
import { motion } from "motion-v"
import type { DropdownOptions } from "../../core/Interfaces";
import CubeDropdown from "../input/dropdowns/CubeDropdown.vue";
import type { ApiaryResponseModel } from "../../core/server/models/ResponseModels";

const s = useCssModule()
const props = defineProps<{
    apiary: ApiaryResponseModel,
    onDelete: Function
}>()

const MotionIconCubeDropdown = motion.create(CubeDropdown)
const dropdownActions: DropdownOptions[] = [
    {
        text: 'Overview',
        svg: getSVG(SVGIconRes.OpenWindow, 'black'),
        onClick: () => {}
    },
    {
        text: 'Delete',
        svg: getSVG(SVGIconRes.Cross, 'black'),
        onClick: () => {}
    },
]

</script>
<template>
<div :class="s.container" ref="container">
    <img :class="s.image" src="/src/assets/images/apiary1.jpg" alt="apiary image">
    <hr :class="s.linearDim">
    <MotionIconCubeDropdown 
        :svg="getSVG(SVGIconRes.MoreDots)" :class="[s.options]"
        :buttons="dropdownActions"
         />
    <h1 :class="[s.name]">{{ apiary!.name }}</h1>
    <ul :class="s.info">
        <div :class="s.entry">
            <p :class="s.value">{{ apiary.hiveCount }}</p>
            <hr>
            <p :class="s.title">Hives</p>
        </div>
        <!-- <div :class="s.entry"></div>
        <div :class="s.entry"></div> -->
    </ul>

</div>
</template>

<style module lang="sass">
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
.container
    @include main.font
    position: relative
    display: flex
    flex-direction: column
    justify-content: flex-end

    height: 450px
    box-sizing: border-box
    overflow: hidden
    border-radius: 5px
    transition: .3s ease-out
    cursor: pointer

    &:hover
        box-shadow: 2px 2px 10px rgba(0, 0, 0, .3)
        transform: translateY(-3px)

    &:hover .image
        scale: 1.1
    &:hover .options
        opacity: 1

    .options
        position: absolute
        z-index: 0
        top: 0
        right: 0
        margin: 1em
        
    .name
        font-size: 3.5em
        font-weight: 800
        
        margin: 0
        z-index: 0
        padding: 0 2rem
        color: white

    .info
        all: unset
        z-index: 0

        display: flex
        justify-content: flex-end
        gap: 1em
        padding: 1em

    .entry
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center

        // background: rgba(0, 0, 0, .4)
        // padding: .5rem 1rem 
        // box-sizing: border-box  
        // border-radius: 10px      
        .value
            color: white
            @include main.f-size-very-small
            font-weight: 700

        .title
            color: white
            @include main.f-size-very-small
            font-weight: 400
            letter-spacing: .8px

        

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
        
