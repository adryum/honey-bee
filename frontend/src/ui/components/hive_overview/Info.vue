<script setup lang="ts">
import { computed, toRef, useCssModule } from "vue";
import { useI18n } from "vue-i18n";
import HiveUpdatePopup from "../popups/hive/HiveUpdatePopup.vue";
import IconTextButton from '../input/buttons/IconTextButton.vue'
import { SVG } from "@/assets/svgs/SVGLoader";
import { usePopupCreator } from "@/core/utils/PopupHiarchy";
import type { HiveModelDB } from "@/core/stores/Models";
import { useApiaryQuery } from "@/core/composables/useApiary";

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    hive:       HiveModelDB
}>()

const { apiary } = useApiaryQuery({
    id: toRef(() => props.hive.apiaryId)
})

const { create } = usePopupCreator({
    popupComponent: HiveUpdatePopup,
    maxCount: 1,
    props: {
        hive: props.hive
    }
})
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label :class="s.label">{{ t("hiveOverview.info") }}</label>
        <div :class="s.buttons">
            <IconTextButton 
                text="Edit"
                :svg="SVG.Pencil"
                @click="create"
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
        <p
            :class="s.name"
        >
            {{ hive.name }}
        </p>
        <p
            :class="s.description"
        >
            {{ hive.description }}
        </p>

        <div 
            :class="s.grid"
        >
            <label 
                for="apiary"
                :class="s.gridLabels"
            >Apiary</label>
            <p 
                id="apiary"
                :class="s.gridValues"    
            >{{ apiary?.name ?? "No apiary" }}</p>
            <label 
                for="created"
                :class="s.gridLabels"
            >Created at</label>
            <p 
                id="created"
                :class="s.gridValues"    
            >{{ hive.creationDate }}</p>
            <label 
                for="type"
                :class="s.gridLabels"
            >Type</label>
            <p 
                id="type"
                :class="s.gridValues"    
            >{{ hive.type }}</p>

            <label 
                for="loacaion"
                :class="s.gridLabels"
            >Location</label>
            <p 
                id="loacaion"
                :class="s.gridValues"
            >{{ hive.location ?? "Not set"}}</p>

        </div>
    </div>
</div>
</template>

<style module lang='sass'>
.name
    margin-top: .5rem
    font-size: var(--font-size-large)
    font-weight: 700
    letter-spacing: .02em
.description
    margin-top: 1rem
    margin-bottom: 1rem
    font-size: var(--font-size-small)
    font-weight: 300
    line-height: 1.5rem
    letter-spacing: .02em

.grid
    margin-top: auto
    display: grid
    grid-template-columns: 10rem 1fr
    gap: 1rem

.gridLabels
    font-size: var(--font-size-medium)
    font-weight: 300
    color: var(--black)
    letter-spacing: .02em
    opacity: .8

.gridValues
    font-size: var(--font-size-medium)
    font-weight: 500
    color: var(--black)
    letter-spacing: .02em


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
        display: flex
        flex-direction: column


        padding: .5rem
        // gap: 1rem
        // gap: .5rem
        box-sizing: border-box
        overflow: auto

        font-family: var(--font-family)
        

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