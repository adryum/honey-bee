<script setup lang="ts">
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import { useCssModule } from "vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { useI18n } from "vue-i18n";
import CubeDropdown from "../../input/dropdowns/CubeDropdown.vue";

const { t } = useI18n()
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.type">Deep</div>
    <div :class="s.frames">
        <h1 :class="s.title">Frames</h1>
        <p :class="s.count">2 / 5</p>
    </div>
    <CubeDropdown :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    background: white
    border-radius: 2px
    align-items: center

    box-sizing: border-box
    padding: .5rem 
    gap: .5rem

    // border: 1px solid var(--base)
    .button
        margin-left: auto
        height: 28px
        width: 28px

    .type
        @include main.f-size-very-small
        font-weight: 700
        letter-spacing: .02em
        display: flex
        height: 100%
        padding: .5rem 1rem
        border-radius: 3px
        box-sizing: border-box
        align-items: center
        justify-content: center
        background: var(--light)

    .frames
        flex: 1
        height: 100%
        display: flex
        flex-wrap: wrap
        // flex-direction: column
        justify-content: center
        align-items: center
        justify-content: space-between
        padding: .5rem 1rem
        border-radius: 3px
        box-sizing: border-box
        background: var(--grayishOnWhite)

        .title
            @include main.f-size-very-small
            letter-spacing: .02em

        .count
            @include main.f-size-very-small
</style>