<script setup lang="ts">
import { useCssModule } from "vue";
import { useI18n } from "vue-i18n";
import type { MoreAboutSpeciesModel } from "@/core/stores/Models";

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    moreInfo: MoreAboutSpeciesModel
}>()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label 
            :class="s.label"    
        >
            More about:  
            <p
                :class="s.gridLabels"
            >{{ moreInfo.species }}</p>
        </label>
    </div>

    <hr :style="{
        minHeight: '1px',
        border: 'none',
        background: 'rgba(0,0,0,.2)',
        margin: 0
    }">

    <div :class="s.body">
        <div
            :class="s.column"
        >
            <p
                :class="[
                    s.gridLabels,
                ]"
            >Description</p> 
            <p
                :class="[
                    s.gridValues,
                ]"
            >{{ moreInfo.description }}</p> 
        </div>
        
        <div
            :class="s.column"
        >
            <p
                :class="[
                    s.gridLabels,
                ]"
            >Behavior</p> 
            <p
                :class="[
                    s.gridValues
                ]"
            >{{ moreInfo.behavior }}</p> 
        </div>
        
        <div
            :class="s.column"
        >
             <p
                :class="[
                    s.gridLabels,
                ]"
            >Preferences</p> 
            <p
                :class="[
                    s.gridValues,
                ]"
            >{{ moreInfo.preferences }}</p>

        </div>
    </div>
</div>
</template>

<style module lang='sass'>

.gridLabels
    font-size: var(--font-size-medium)
    font-weight: 400
    color: #666
    letter-spacing: .02em

.gridValues
    font-size: var(--font-size-medium)
    font-weight: 500
    color: var(--black)
    letter-spacing: .02em

.queenCard
    display: flex
    flex-direction: column
    // align-items: center

    min-width: 20rem
    height: 100%

    // background: var(--secondary)
    // box-shadow: 0 0 0 1px var(--black)
    border-radius: var(--border-radius-small)

    .description
        margin-top: 1rem
        display: grid
        grid-template-columns: 1fr 1.5fr 
        row-gap: 1rem

    .image
        width: 100%
        height: 100%
        object-fit: cover
        border-radius: var(--border-radius-small)

.body
    font-family: var(--font-family)
    display: flex
    gap: 3rem
    padding: 1rem
    .column
        display: flex
        flex-direction: column
        gap: 1rem

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
        gap: 1rem


        width: 100%
        min-height: 2.5rem
        max-height: 2.5rem

        padding-left: .5rem
        box-sizing: border-box
        font-family: var(--font-family)
        letter-spacing: .02em

        .label
            font-size: var(--font-size-medium)
            font-weight: 500
            letter-spacing: .02em
            text-transform: capitalize

        .buttons
            display: flex
            gap: .2rem
            margin-left: auto
</style>