<script setup lang="ts">
import { useCssModule } from "vue";
import TitledField from "../input/fields/TitledField.vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>Queen</h1>
        <div :class="s.buttons">
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
    </div>
    <div :class="s.body">
        <div :class="s.imageContainer">
            <img src="/src/assets/images/queen1.jpg" alt="">
        </div>
        <div :class="s.description">
            <TitledField title="Species" hint="Tetragonula carbonaria"/>
            <TitledField title="Age" hint="23 weeks"/>  
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    background: rgba(0, 0, 0, .3)
    background: var(--surface)
    @include main.font

    .header
        @include main.button-font
        position: relative
        display: flex
        align-items: center
        width: 100%
        min-height: 2.5rem
        max-height: 2.5rem
        padding: .25rem 0.5rem
        box-sizing: border-box
        background: var(--surface)
        border-top: 4px solid var(--light)
        // border-bottom: 1px solid rgba(0, 0, 0, .1)
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)

        .buttons
            margin-left: auto
            display: flex
            align-items: center
            gap: .2rem
            height: 100%

            .button
                height: 100%

    .body
        display: flex
        flex-direction: column
        height: calc(100% - 2.5rem)
        padding: 1rem
        gap: 1rem
        box-sizing: border-box

        .imageContainer
            flex: 1 
            display: flex
            min-height: 0 // prevents flexbox from overflowing
            
            img
                border-radius: 3px
                width: 100%
                height: 100%
                object-fit: cover

        .description
            display: flex
            gap: 1rem
            min-height: 3rem
            max-height: 3rem
</style>