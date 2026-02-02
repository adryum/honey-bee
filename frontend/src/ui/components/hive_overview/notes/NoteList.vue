<script setup lang="ts">
import { useCssModule } from "vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { useI18n } from "vue-i18n";
import Note from './Note.vue'
import { createPopup } from "@/core/utils/components";
import NoteCreatePopup from "../../popups/NoteCreatePopup.vue";
import ExtendableSearchbar from "../../input/searchbars/ExtendableSearchbar.vue";
import { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
const { t } = useI18n()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>{{ t("hiveOverview.notes") }}</h1>
        <div :class="s.buttons">
            <IconCubeButton 
                :class="s.button" 
                :svg="SVG.Confirm"
                @click="createPopup(NoteCreatePopup)"
            />
            <ExtendableSearchbar />
            <IconCubeButton :class="s.button" :svg="SVG.Confirm"/>
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
        background: white
        border-top: 4px solid var(--light-gray)
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

        padding-top: .5rem
        gap: .5rem
        box-sizing: border-box
        overflow: auto
</style>