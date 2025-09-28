<script setup lang="ts">
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import { useCssModule } from "vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";

const s = useCssModule()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>Upcoming calendar events</h1>

        <div :class="s.navigator">
            <IconCubeButton :class="[s.iconButton, s.left]" :svg="new SVGImage(SVGRes.ArrowHead)"/>
            <p>current date 2025.</p>
            <IconCubeButton :class="s.iconButton" :svg="new SVGImage(SVGRes.ArrowHead)"/>
            <IconCubeButton :class="s.iconButton" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
    </div>
    <div :class="s.body">
        <div :class="[s.column, s.today]">
            <div :class="s.topHeader">
                <div :class="[s.title]">
                    <h1 :class="s.dateNumber">25</h1>
                    <h2 :class="s.dateMonth">sep.</h2>
                    <p :class="s.todayText">Today</p>
                </div>
                
            </div>
            <div :class="s.tasks">
                <div :class="s.task">
                    <h1 :class="s.title">Do that thing!</h1>
                    <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
                </div>
                <div :class="s.task">
                    <h1 :class="s.title">Feed hungry bees</h1>
                    <p :class="s.content">They need to be fed with only the most potent elixir from our rarest flowers!</p>
                </div>
                <div :class="s.task">
                    <h1 :class="s.title">Feed hungry bees</h1>
                    <p :class="s.content">They need to be fed with only the most potent elixir from our rarest flowers!</p>
                </div>
                <div :class="s.task">
                    <h1 :class="s.title">Feed hungry bees</h1>
                    <p :class="s.content">They need to be fed with only the most potent elixir from our rarest flowers!</p>
                </div>
            </div>
        </div>
        <div :class="[s.column]">
            <div :class="s.topHeader">
                <div :class="s.title">
                    <h1 :class="s.dateNumber">25</h1>
                    <h2 :class="s.dateMonth">sep.</h2>
                </div>
                
            </div>
            <div :class="s.tasks">
                <div :class="s.task">
                    <h1 :class="s.title">Do that thing!</h1>
                    <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
                </div>
                <div :class="s.task">
                    <h1 :class="s.title">Feed hungry bees</h1>
                    <p :class="s.content">They need to be fed with only the most potent elixir from our rarest flowers!</p>
                </div>
            </div>
        </div>
        <div :class="[s.column]">
            <div :class="s.topHeader">
                <div :class="s.title">
                    <h1 :class="s.dateNumber">25</h1>
                    <h2 :class="s.dateMonth">sep.</h2>
                </div>
            </div>
            <div :class="s.tasks">
                <div :class="s.task">
                    <h1 :class="s.title">Do that thing!</h1>
                    <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
                </div>
                <div></div>
                <div></div>
                <div></div>
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
    overflow: hidden

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
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)

        .navigator
            margin-left: auto
            display: flex
            align-items: center
            gap: .2rem
            height: 100%

            .iconButton
                height: 100%

                &.left
                    rotate: 180deg 0 0 1

    .body
        @include main.font
        flex: 1
        grid-area: data
        display: flex
        align-items: flex-end

        max-height: calc(100% - 2.5rem)


        padding: 1rem
        gap: 1rem
        box-sizing: border-box
        background: var(--surface)

        .column
            flex: 1
            border-radius: 3px
            overflow: hidden

            height: 100%
            display: flex
            flex-direction: column
            gap: 1rem


            box-sizing: border-box
            border: 1px solid var(--base)

            &.today
                border: 1px solid var(--light)

            .tasks
                display: flex
                flex-direction: column
                gap: 1rem
                height: 100%
                overflow: auto
                padding: 0 1rem
                margin-bottom: 1rem


                .task
                    display: flex
                    flex-direction: column
                    gap: .5rem
                    padding: .5rem
                    border-radius: 0 0 6px 6px
                    // padding: 1rem



                    box-sizing: border-box
                    background: white
                    border-top: 6px solid var(--accent)

                    .title
                        @include main.f-size-very-small
                        font-weight: 900

                    .content
                        @include main.f-size-very-small

            .topHeader
                display: flex
                flex-direction: column
                // gap: .5rem
                padding: 1rem 1rem 0 1rem


                .title
                    display: flex
                    align-items: flex-end
                    line-height: 14px
                    
                    box-sizing: border-box
                    width: 100%
                    border-radius: 3px
                    gap: .5rem

                    @include main.f-size-very-small
                    font-weight: 900
                    text-transform: uppercase

                    .todayText
                        margin-left: auto
                        @include main.f-size-very-small
                        font-weight: 900
                        color: var(--light)

                    .dateNumber
                        @include main.f-size-small
                        font-weight: 700
                    .dateMonth
                        @include main.f-size-very-small

</style>