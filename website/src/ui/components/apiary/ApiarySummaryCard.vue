<script setup lang="ts">
import { ref, useCssModule } from "vue"
import { motion, rgba } from "motion-v"
import type { DropdownItem } from "../../../core/Interfaces";
import CubeDropdown from "../input/dropdowns/CubeDropdown.vue";
import type { ApiaryResponseModel } from "../../../core/api/models/ResponseModels";
import type { ApiaryModel } from "@/core/models/Models";
import { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
const props = defineProps<{
    apiary: ApiaryModel,
    onDelete?: Function
}>()

const MotionIconCubeDropdown = motion.create(CubeDropdown)
const dropdownActions: DropdownItem[] = [
    {
        text: 'Overview',
        svg: SVG.Info,
        onClick: () => { },
        color: ""
    },
    {
        text: 'Delete',
        svg: SVG.Cross,
        onClick: () => { },
        color: "#963B28"
    },
]

</script>
<template>
<div :class="s.container" ref="container">
    <img :class="s.image" :src="apiary.imagePath" alt="apiary image">
    <hr :class="s.linearDim">
    <MotionIconCubeDropdown
        :svg="SVG.Pounds" :class="[s.options]"
        :options="dropdownActions"
         />
    <h1 :class="[s.name]">{{ apiary!.name }}</h1>
    <ul :class="s.info">
        <div :class="s.entry">
            <p :class="s.value">{{ apiary.hiveCount }}</p>
            <hr :class="s.HRhorizontal">
            <p :class="s.title">Hives</p>
        </div>
    </ul>

</div>
</template>

<style module lang="sass">
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main

.HRhorizontal
    height: 2px
    width: 100%
    background: var(--white)
    border: none
.container
    font-family: var(--font-family)
    position: relative
    display: flex
    flex-direction: column
    justify-content: flex-end

    height: 450px
    box-sizing: border-box
    overflow: hidden
    transition: .3s ease-out
    cursor: pointer
    border-radius: var(--border-radius-small)

    &:hover .image
        transform: scale(1.01)
    &:hover .options
        opacity: 1

    .options
        position: absolute
        z-index: 0
        top: 0
        right: 0
        margin: 1em
        
    .name
        font-size: var(--font-size-huge)
        font-weight: 800
        letter-spacing: .02em
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

        .value
            color: white
            font-size: var(--font-size-medium)
            font-weight: 700

        .title
            color: white
            font-size: var(--font-size-medium)
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
        height: 60%
        width: 100%

        background: linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .15) 100%)
</style>
        
