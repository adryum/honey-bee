<script setup lang="ts">
import { useCssModule } from "vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1 :class="s.name">Trens</h1>
        <IconCubeButton :class="s.button" :svg="SVG.Confirm"/>
    </div>
    <!-- <TitledText title="Description"/> -->
    <div :class="s.tags">
        <div :class="[s.tag, s.firstTag]">
            <h2 :class="s.title">Since</h2>
            <p :class="s.date">22.sep.</p>
        </div>
        <div :class="[s.tag, s.middleTag]">
            <h2 :class="s.title">Till</h2>
            <p :class="s.date">22.sep.</p>
        </div>
        <div :class="[s.tag, s.lastTag]">
            <h2 :class="s.title">Next</h2>
            <p :class="s.date">22.sep.</p>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    width: 100%

    background: white
    border-radius: 3px

    gap: .5rem

    box-sizing: border-box
    padding: .5rem

    .header
        display: flex
        align-items: center
        .name
            @include main.f-size-small
            font-weight: 700

        .button
            height: 28px
            margin-left: auto

    .tags
        display: flex
        gap: 2px
        
        .tag
            flex: 1
            display: flex
            flex-direction: column
            gap: .25rem
            box-sizing: border-box

            &.lastTag .title
                border-radius: 0 10px 10px 0

            &.middleTag .title

            &.firstTag .title
                border-radius: 10px 0 0 10px


            .title
                @include main.f-size-very-small
                font-weight: 700
                letter-spacing: 0.02em
                // border: 1px solid
                padding: .25rem .5rem 
                background: var(--grayishOnWhite)

            .date
                @include main.f-size-very-small
                letter-spacing: 0.02em
                padding: .25rem .5rem 

</style>