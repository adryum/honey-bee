<script setup lang="ts">
import {ref, useCssModule } from "vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import type { QueenModelDB } from "@/core/stores/Models";
import IconTextButton from "../../input/buttons/IconTextButton.vue";
import { getRandomId } from "@/core/utils/Utils";
import QueenCreateModal from "../../modals/QueenCreateModal.vue";
import type { ModalBaseModel } from "@/core/composables/useModalBase";

const s = useCssModule()
const props = defineProps<{
    hiveId: number
    queen?: QueenModelDB
}>()

const bornId           = getRandomId("label")
const lifeExpectancyId = getRandomId("label")
const placedHereId     = getRandomId("label")
const ageId            = getRandomId("label")

const queenCreateModal = ref<ModalBaseModel>()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label 
            :class="s.label"    
        >
            Queen
        </label>

        <p
            v-if="queen"
            :class="s.species"
        >
            {{ queen.species.scientificName }}
        </p>

        <div 
            :class="s.buttons"
        >   
            <IconTextButton 
                v-if="!queen"
                text="Add"
                :icon="SVG.Plus"
                @click="queenCreateModal?.open"
            />
            <IconTextButton 
                v-if="queen"
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

    <p
        v-if="!queen"
        :class="s.noHistory"
    >
        No queen in this hive
    </p>

    <div 
        v-if="queen"
        :class="s.body"
    >
        <img
            :class="s.image" 
            :src="queen.imageUrl" 
            alt="queen-picture"
        />

        <div 
            :class="s.grid"
        >
            <label 
                :for="bornId"
                :class="s.gridLabels"
            >Born</label>
            <p 
                :id="bornId"
                :class="s.gridValues"    
            >{{ queen.bornDate.toLocaleDateString() }}</p>

            <label 
                :for="lifeExpectancyId"
                :class="s.gridLabels"
            >Life expectancy</label>
            <p 
                :id="lifeExpectancyId"
                :class="s.gridValues"    
            >{{ queen.species.lifeExpectancy }}</p>
             <label 
                :for="placedHereId"
                :class="s.gridLabels"
            >Placed here at</label>
            <p 
                :id="placedHereId"
                :class="s.gridValues"
            >{{ queen.addedToHiveDate.toLocaleDateString() }}</p>

            <label 
                :for="ageId"
                :class="s.gridLabels"
            >Age</label>
            <p 
                :id="ageId"
                :class="s.gridValues"    
            >{{ queen.age }}</p>

        </div>
    </div>
    <QueenCreateModal
        ref="queenCreateModal"
        :hive-id="hiveId"
    />
</div>
</template>

<style module lang='sass'>
.noHistory
    font-family: var(--font-family)
    font-size: var(--font-size-large)
    font-weight: 600
    opacity: 1
    color: #71797E
    margin: auto

.image
    width: 100%
    height: 100%
    object-fit: cover
    border-radius: var(--border-radius-small)

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
    margin-top: 1rem
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
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

        .species
            font-size: var(--font-size-medium)
            color: var(--faint-text)
            font-weight: 500
            line-height: 1.5rem
            letter-spacing: .02em

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