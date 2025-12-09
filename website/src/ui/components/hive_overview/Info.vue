<script setup lang="ts">
import { useCssModule } from "vue";
import TitledText from "../paragrafs/TitledText.vue";
import { useI18n } from "vue-i18n";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import { createPopup } from "@/core/utils/components";
import HiveUpdatePopup from "../popups/hive/HiveUpdatePopup.vue";
import type { HiveModel } from "@/core/models/HiveModels";
import IconTextButton from '../input/buttons/IconTextButton.vue'
import { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
const { t } = useI18n()
const hive = 
  {
    apiaryId: 84,
    apiaryImagePath: "https://res.cloudinary.com/dj8lvgcxl/image/upload/v1757347829/apiaries/User:2_Apiary:84.png",
    apiaryName: "Hampter", 
    id: 2,
    imagePath: "Hive3.jpg",
    name: "Box2",
    type: "Tower"
  } as HiveModel

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label :class="s.label">{{ t("hiveOverview.info") }}</label>
        <div :class="s.buttons">
            <IconTextButton 
                text="Edit"
                :svg="SVG.Pencil"
                @click="createPopup(HiveUpdatePopup, { hive: hive })"
            />
        </div>
    </div>
    <div :class="s.body">
        <div :class="s.imageSide">
            <img src="@/assets/images/apiary.jpg" alt="">
        </div>
        <div :class="s.dataSide">
            <TitledText :class="s.entry" title="Name" content="Hive name"/>
            <TitledText :class="s.entry" title="Type" content="Movable"/>
            <TitledText :class="s.entry" title="Location" content="Dārzciems"/>
            <TitledText :class="[s.entry, s.description]" title="Description" content="Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :)))))"/>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column

    .header
        position: relative
        display: flex
        align-items: center
        width: 100%
        min-height: 2.5rem
        max-height: 2.5rem
        padding: .25rem 0.5rem

        box-sizing: border-box

        background: var(--white)
        border-radius: var(--border-radius-small)

        font-family: var(--font-family)
        letter-spacing: .02em

        .label
            font-size: var(--font-size-medium)
            font-weight: 500

        .buttons
            display: flex
            gap: .2rem
            margin-left: auto
    .body
        flex: 1
        display: grid
        grid-template-areas: "image data"
        grid-template-columns: repeat(2, 1fr)

        padding-top: .5rem
        gap: .5rem
        box-sizing: border-box
        overflow: auto

        .imageSide
            grid-area: image
            overflow: hidden
            background: rgba(0, 0, 0, .3)

            img
                border-radius: var(--border-radius-tiny)
                width: 100%
                height: 100%
                object-fit: cover

        .dataSide
            grid-area: data
            display: flex
            flex-direction: column

            gap: .5rem
            box-sizing: border-box

            .description
                flex: 1

            .entry
                padding: .5rem
                background: var(--white)
                border-radius: var(--border-radius-tiny)
</style>