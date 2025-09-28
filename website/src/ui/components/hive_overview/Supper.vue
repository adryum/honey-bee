<script setup lang="ts">
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import { useCssModule } from "vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.imageDiv">
        <img src="/src/assets/images/gas.jpg" alt="">
    </div>
    <div :class="s.information">
        <div :class="s.header">
            <h1>Name</h1>
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
        <div :class="s.frames">
            <h1 :class="s.title">Frames</h1>
            <p :class="s.count">2/5</p>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    background: white
    border-radius: 3px

    // border: 1px solid var(--base)

    .information
        display: flex
        flex-direction: column
        width: 100%
        padding: .5rem
        gap: .5rem
        box-sizing: border-box

        .header
            display: flex
            font-weight: 900
            letter-spacing: .02em

            align-items: center
            max-height: 2rem
            .button
                margin-left: auto
                height: 28px

        .frames
            display: flex
            // flex-direction: column
            align-items: center
            justify-content: space-between
            padding: .5rem 1rem
            box-sizing: border-box
            min-height: 2rem
            background: var(--surface)

            .title
                @include main.f-size-very-small
                letter-spacing: .02em

            .count
                @include main.f-size-very-small


    .imageDiv
        min-width: 30%
        max-width: 30%
        
        img
            height: 100%
            width: 100%
            object-fit: cover
</style>