<script setup lang="ts">
import { useCssModule } from "vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import { useI18n } from "vue-i18n";
import Note from './Note.vue'

const s = useCssModule()
const { t } = useI18n()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>{{ t("hiveOverview.notes") }}</h1>
        <div :class="s.buttons">
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.Pluss)"/>
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
    </div>
    <div :class="s.body">
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
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
        gap: .5rem
        box-sizing: border-box
        overflow: auto
</style>