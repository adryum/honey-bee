<script setup lang="ts">
import { useCssModule } from "vue";
import { useI18n } from "vue-i18n";
import HiveUpdatePopup from "../popups/hive/HiveUpdatePopup.vue";
import type { HiveModel } from "@/core/models/HiveModels";
import IconTextButton from '../input/buttons/IconTextButton.vue'
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import Icon from "../Icon.vue";
import { createPopup } from "@/core/utils/PopupHiarchy";

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
                @click="createPopup({ 
                    component: HiveUpdatePopup, 
                    props: { hive: hive }
                })"
            />
        </div>
    </div>
    <hr :style="{
        height: '1px',
        border: 'none',
        background: 'rgba(0,0,0,.2)',
        margin: 0
    }">
    <div :class="s.body">
        <!-- <div :class="s.imageSide">
            <img src="@/assets/images/apiary.jpg" alt="">
        </div> -->
        <div :class="s.dataSide">

            <label for="grid" :class="s.labelGeneral">
                <Icon :type="IconType.SMALL" :svg="SVG.InfoSquere" />
                <p :class="s.labelText">
                    General information
                </p>            
            </label>
            <div id="grid" :class="s.grid">
                <p :class="s.label">Name</p>
                <p :class="s.text">Hive name</p>
                
                <p :class="s.label">Location</p>
                <p :class="s.text">Hive Location here</p>
                <p :class="s.label">Type</p>
                <p :class="s.text">Hive_Type_here</p>
                <!-- <TitledText :class="s.entry" title="Name" content="Hive name"/>
                <TitledText :class="s.entry" title="Type" content="Movable"/>
                <TitledText :class="s.entry" title="Location" content="Dārzciems"/> -->
                <p :class="s.label">Description</p>
                <p :class="[s.text, s.description]">Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :))))) Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :))))) Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :))))) Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :))))) Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :))))) Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :))))) Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :)))))</p>
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
    box-shadow: 0 0 1px 0 var(--faint-border)
    border-radius: var(--border-radius-small)
    overflow: hidden
    background: var(--white)
    padding: .25rem 
    gap: .25rem

    .header
        position: relative
        display: flex
        align-items: center
        width: 100%
        min-height: 2rem
        max-height: 2rem
        // padding: .25rem
        padding-left: .5rem
        box-sizing: border-box
        font-family: var(--font-family)
        letter-spacing: .02em

        .label
            font-size: var(--font-size-medium)
            font-weight: 500
            text-transform: capitalize

        .buttons
            display: flex
            gap: .2rem
            margin-left: auto
    .body
        flex: 1
        display: grid
        grid-template-areas: "data"
        grid-template-columns: 1fr

        // padding-top: .5rem
        // gap: 1rem
        // gap: .5rem
        box-sizing: border-box
        overflow: auto

        .imageSide
            grid-area: image
            overflow: hidden
            // background: rgba(0, 0, 0, .3)
            margin: .25rem

            img
                border-radius: var(--border-radius-tiny)
                width: 100%
                height: 100%
                object-fit: cover

        .dataSide
            grid-area: data
            display: flex
            flex-direction: column



            // gap: .5rem
            box-sizing: border-box
            font-family: var(--font-family)

            .labelGeneral
                // background: rgba(200, 200, 220, .5)
                display: flex
                align-items: center
                gap: .5rem
                height: 2rem
                max-height: 2rem
                box-sizing: border-box
                background: #f1f1f1
                font-size: var(--font-size-small)
                line-height: 1rem

                padding: .5rem
                border-radius: var(--border-radius-tiny)

                .labelText
                    line-height: 1rem


            .grid
                display: grid
                grid-template-areas: 'nameLabel name' 'locationLabel location' 'typeLabel type' 'descriptionLabel description' 
                grid-template-rows: 2rem 2rem 2rem auto
                grid-template-columns: 8rem 1fr
                row-gap: .25rem
                box-sizing: border-box
                padding: .5rem

                & > *
                    // display: flex
                    // align-items: center
                    padding: .5rem 0 

                .label
                    font-size: var(--font-size-small)
                    font-weight: 500
                    color: var(--black)
                    letter-spacing: .02em
                    opacity: .9
                .text
                    font-size: var(--font-size-small)
                    font-weight: 300
                    line-height: 1rem
                    color: black
                    opacity: 1
                    // background: var(--gray)
                    // border-left: 2px solid var(--faint-border)
                    padding-left: .5rem
                    border-radius: var(--border-radius-tiny)

                .description
                    min-height: 0
                    overflow-y: scroll

            .entry
                padding: .5rem
                background: var(--white)
                border-radius: var(--border-radius-tiny)
</style>