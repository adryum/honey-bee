<script setup lang="ts">
import { useCssModule } from "vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>Notes</h1>
        <div :class="s.buttons">
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.Pluss)"/>
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
    </div>
    <div :class="s.body">
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
        <div :class="s.note">
            <div :class="s.top">
                <h2 :class="s.informative">Information</h2>
                <p :class="s.date">22 sep. 2046.</p>
            </div>
            <h1 :class="s.title">Do that thing!</h1>
            <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    @include main.font
    background: var(--surface)

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

            &.left
                rotate: 180deg 0 0 1


    .body
        flex: 1
        display: flex
        flex-direction: column

        padding: 1rem
        gap: 1rem
        box-sizing: border-box
        overflow: auto

        .note
            display: flex
            flex-direction: column

            gap: .5rem
            padding: .5rem

            box-sizing: border-box
            background: white
            border-left: 6px solid var(--accent)
            border-radius: 0 6px 6px 0

            .top
                @include main.mono-font
                @include main.f-size-tiny

                display: flex
                justify-content: space-between

                .informative
                    font-weight: 900
                    letter-spacing: .02em
                    text-transform: uppercase;

                .date
                    font-weight: 500



            .title
                @include main.f-size-very-small
                font-weight: 900
                padding-left: 1rem

            .content
                @include main.f-size-very-small
                padding-left: 1rem

</style>