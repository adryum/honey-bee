<script setup lang="ts">
import { useCssModule } from "vue";
import TitledText from "../paragrafs/TitledText.vue";
import { useI18n } from "vue-i18n";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import { createPopup } from "@/core/utils/components";
import HiveUpdatePopup from "../popups/hive/HiveUpdatePopup.vue";
import type { HiveModel } from "@/core/models/HiveModels";

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
        <p>{{ t("hiveOverview.info") }}</p>
        <div :class="s.buttons">
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.ArrowHead)" @click="createPopup(HiveUpdatePopup, { hive: hive })"/>
        </div>
    </div>
    <div :class="s.body">
        <div :class="s.imageSide">
            <img src="@/assets/images/apiary.jpg" alt="">
        </div>
        <div :class="s.dataSide">
            <TitledText :class="s.entry" title="Name" content="Hive name"/>
            <TitledText :class="s.entry" title="Type" content="Movable"/>
            <TitledText :class="s.entry" title="Location" content="D'arciems"/>
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
        display: grid
        grid-template-areas: "image data"
        grid-template-columns: repeat(2, 1fr)

        padding: 1rem
        gap: 1rem
        box-sizing: border-box
        overflow: auto

        .imageSide
            grid-area: image
            overflow: hidden
            background: rgba(0, 0, 0, .3)

            img
                border-radius: 3px
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
                background: white
                border-radius: 3px
</style>