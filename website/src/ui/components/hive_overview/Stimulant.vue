<script setup lang="ts">
import { useCssModule } from "vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.imageContainer">
        <img src="@/assets/images/apiary.jpg" alt="">
    </div>

    <div :class="s.info">
        <div :class="s.header">
            <h1 :class="s.name">Trens</h1>
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
        <div :class="s.tags">
            <div :class="s.tag">
                <h2 :class="s.title">Since</h2>
                <p :class="s.date">22.sep.</p>
            </div>
            <div :class="s.tag">
                <h2 :class="s.title">Till</h2>
                <p :class="s.date">22.sep.</p>
            </div>
            <div :class="s.tag">
                <h2 :class="s.title">Next</h2>
                <p :class="s.date">22.sep.</p>
            </div>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    width: 100%

    background: white
    border-radius: 3px

    .imageContainer
        min-width: 20%
        height: 100%

        img
            width: 100%
            height: 100%
            object-fit: cover


    .info
        display: flex
        flex-direction: column
        gap: 1rem

        box-sizing: border-box
        padding: .5rem

        .header
            display: flex
            padding: .25rem 0
            align-items: center
            .name
                @include main.f-size-small
                font-weight: 700

            .button
                height: 28px
                margin-left: auto
            

        .tags
            display: flex
            background: var(--accent)
            gap: 1px
            border-left: 1px solid var(--accent)
            border-right: 1px solid var(--accent)

            .tag
                flex: 1
                display: flex
                flex-direction: column
                gap: .2rem

                box-sizing: border-box
                padding: 0 .5rem
                background: white

                .title
                    @include main.f-size-tiny
                    font-weight: 900
                    letter-spacing: 0.02em

                .date
                    @include main.f-size-very-small
</style>