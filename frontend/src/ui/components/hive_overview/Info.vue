<script setup lang="ts">
import {toRef, useCssModule } from "vue";
import { useI18n } from "vue-i18n";
import IconTextButton from '../input/buttons/IconTextButton.vue'
import { SVG } from "@/assets/svgs/SVGLoader";
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
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label :class="s.label">{{ t("hiveOverview.info") }}</label>
        <div :class="s.buttons">
            <IconTextButton 
                text="Edit"
                :icon="SVG.Pencil"
            />
        </div>
    </div>

    <hr :style="{
        minHeight: '1px',
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
    letter-spacing: .04em
.description
    margin-top: 1rem
    margin-bottom: 1rem
    font-size: var(--font-size-medium)
    color: var(--black)
    font-weight: 400
    line-height: 1.5rem
    letter-spacing: .02em

.grid
    margin-top: auto
    display: grid
    grid-template-columns: 1fr 1.5fr
    row-gap: 1rem

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
        min-height: 2.5rem
        max-height: 2.5rem
        // padding: .25rem
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
    .body
        flex: 1
        display: flex
        flex-direction: column


        padding: 1rem
        // gap: 1rem
        // gap: .5rem
        box-sizing: border-box
        overflow: auto

        font-family: var(--font-family)

</style>