<script setup lang="ts">
import { useCssModule } from "vue";
import type { QueenHistoryModelDB } from "@/core/stores/Models";

const s = useCssModule()
const props = defineProps<{
    previousBees: QueenHistoryModelDB[]
}>()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label 
            :class="s.label"    
        >
            Queen History
        </label>

        <!-- <div 
            :class="s.buttons"
        >
            <IconTextButton 
                text="Edit"
                :icon="SVG.Pencil"
            />
        </div> -->
    </div>

    <hr :style="{
        minHeight: '1px',
        border: 'none',
        background: 'rgba(0,0,0,.2)',
        margin: 0
    }">

    <div :class="s.body">
        <p
            v-if="previousBees.length === 0"
            :class="s.noHistory"
        >
            No other queens have been in this hive
        </p>
        <div
            v-for="(bee, i) in previousBees"
            :class="s.item"
        >
            <img
                :class="s.image" 
                :src="bee.imageUrl || '@/assets/images/queen1.jpg'" 
                alt="queen-picture"
            />

            <p
                :class="s.order"
            >
                NR: {{ i + 1}}
            </p>

            <div
                :class="s.description"
            >
                <p
                    :class="s.gridLabels"
                >
                    Species
                </p>
                <p
                    :class="s.gridValues"
                >
                    {{ bee.species }}
                </p>


                <p
                    :class="s.gridLabels"
                >
                    Time in hive
                </p>
                <p
                    :class="s.gridValues"
                >
                    {{ bee.timeInHive }}
                </p>


                <p
                    :class="s.gridLabels"
                >
                    Placed here at
                </p>
                <p
                    :class="s.gridValues"
                >
                    {{ new Date(bee.placedHereAt).toDDMMYYYY("-") }}
                </p>
            </div>
        </div>
    </div>
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

.item
    position: relative
    display: flex
    flex-direction: column
    // align-items: center

    min-width: 25rem
    width: 25rem

    height: 100%

    // background: var(--secondary)
    // box-shadow: 0 0 0 1px var(--black)
    border-radius: var(--border-radius-small)
    isolation: isolate

    .description
        // margin-top: .5rem
        display: grid
        grid-template-columns: 1fr 1.5fr 
        row-gap: 1rem

        padding: .5rem
        box-sizing: border-box

    .image
        width: 100%
        height: 100%
        object-fit: cover
        border-radius: var(--border-radius-small) var(--border-radius-small) 0 0
        box-shadow: 0 0 0 1px var(--faint-border)

    .order
        position: absolute
        top: 0
        left: 0

        padding: .5rem 1rem
        background: var(--black)
        color: var(--white)
        border-radius: var(--border-radius-small) 0 var(--border-radius-small) 0

        z-index: 1

.body
    flex: 1
    display: flex

    padding: .25rem
    gap: 1rem
    // gap: .5rem
    box-sizing: border-box
    overflow-y: scroll

    font-family: var(--font-family)

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