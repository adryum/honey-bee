<script setup lang="ts">
import { useCssModule } from "vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import { useI18n } from "vue-i18n";
import type { DropdownItem } from "@/core/Interfaces";
import CubeDropdown from "../input/dropdowns/CubeDropdown.vue";
import { createPopup } from "@/core/utils/components";
import QueenBeeCreatePopup, { type QueenBeeCreatePopupProps } from "../popups/QueenBeeCreatePopup.vue";
import AreYouSurePopup, { type AreYouSurePopupProps } from "../popups/AreYouSurePopup.vue";
import QueenBeeMovePopup, { type QueenBeeMovePopupProps } from "../popups/QueenBeeMovePopup.vue";

const s = useCssModule()
const { t } = useI18n()
const queenBeeAddPopupProps: QueenBeeCreatePopupProps = {
    hiveId: 0
}
const areYouSurePopupProps: AreYouSurePopupProps = {
    title: "Delete Queen bee?",
    description: "This action will permanetly delete this queen!",
    onYes: function (): void {
    },
    onNo: function (): void {
    }
}
const queenBeeMoveProps: QueenBeeMovePopupProps = {
    queenBeeId: 0
}
const dropdownItems: DropdownItem[] = [
    {
        text: "Create Queen",
        onClick: () => createPopup(QueenBeeCreatePopup, { queenBeeAddPopupProps })
    },
    {
        text: "Move Queen",
        onClick: () => createPopup(QueenBeeMovePopup, { queenBeeMoveProps })
    },
    {
        text: "Remove Queen",
        color: "Red",
        onClick: () => createPopup(AreYouSurePopup, { areYouSurePopupProps })
    }
]

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>{{ t("hiveOverview.queen") }}</h1>
        <div :class="s.buttons">
            <CubeDropdown 
                :class="s.button" 
                :svg="new SVGImage(SVGRes.MoreDots)"
                :dropdownItems="dropdownItems"
            />
        </div>
    </div>

    <ol :class="s.body">
        <!-- <p :class="s.top">Queen bee</p> -->
        <li :class="s.row">
            <p :class="s.title">Queen bee age</p>
            <p :class="s.value">34 weeks</p>
        </li>
        <hr :class="s.spacer">
        <li :class="s.row">
            <p :class="s.title">Species</p>
            <p :class="s.value">Apple bees</p>
        </li>
    </ol>

    <ol :class="s.body">
        <li :class="s.row">
            <p :class="s.title">Bee temper</p>
            <p :class="s.value">Agressive</p>
        </li>
        <hr :class="s.spacer">
        <li :class="s.row">
            <p :class="s.title">Bee health</p>
            <p :class="s.value">Sick - Ticks</p>
        </li>
    </ol>
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
        border-radius: 2px
        box-sizing: border-box
        background: white
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
        all: unset

        display: flex
        flex-direction: column
        margin-top: .5em
        padding: .5rem

        box-sizing: border-box
        border-radius: 2px
        background: white

        .top
            @include main.font
            @include main.f-size-small
            font-weight: 700
            padding: .5rem

        .row
            all: unset
            display: grid
            grid-template-areas: "title value"
            grid-template-columns: 1fr 1fr
            padding: .5rem

            box-sizing: border-box
            border-radius: 2px
            transition: .1s

            &:hover
                backdrop-filter: brightness(95%)

            & > *
                display: flex
                align-items: center

                @include main.font
                @include main.f-size-very-small

            .title
                grid-area: title
                font-weight: 700
                letter-spacing: .02em

                padding-left: 1rem
                box-sizing: border-box 
            .value
                grid-area: value

        .spacer
            all: unset
            margin: auto
            width: calc(100% - 1rem)
            margin: .5rem
            min-height: 2px
            max-height: 2px
            border-radius: 100rem

            background: rgba(0, 0, 0, .1)
</style>