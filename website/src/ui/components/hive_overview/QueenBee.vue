<script setup lang="ts">
import { useCssModule } from "vue";
import TitledField from "../input/fields/TitledField.vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import TitledText from "../paragrafs/TitledText.vue";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>{{ t("hiveOverview.queen") }}</h1>
        <div :class="s.buttons">
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
    </div>
    <div :class="s.body">
         <div :class="s.imageContainer">
            <img src="/src/assets/images/queen1.jpg" alt="">
        </div>
        <div :class="s.tags">
            <div :class="[s.tag, s.firstTag]">
                <h2 :class="s.title">Species</h2>
                <p :class="s.date">Tetragonula carbonaria</p>
            </div>
            <div :class="[s.tag, s.lastTag]">
                <h2 :class="s.title">Age</h2>
                <p :class="s.date">23 weeks</p>
            </div>
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
        margin: 1rem
        gap: .5rem
        box-sizing: border-box
        background: white
        border-radius: 3px
        overflow: auto


        .imageContainer
            flex: 1 
            display: flex
            min-height: 0 // prevents flexbox from overflowing
            
            img
                width: 100%
                height: 100%
                object-fit: cover

        .tags
            display: flex
            gap: 2px
            padding: 0 .5rem
            min-height: 4rem
            
            
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