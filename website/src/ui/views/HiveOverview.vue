<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import Info from '../components/hive_overview/Info.vue';
import NoteList from '../components/hive_overview/notes/NoteList.vue';
import CalendarHiveEvents from '../components/hive_overview/calendar/CalendarHiveEvents.vue';
import MedicineList from '../components/hive_overview/medicine/MedicineList.vue';
import { motion } from 'motion-v';
import Button from '../components/input/buttons/Button.vue';
import HiveMedicineFragment from '../components/view_fragments/HiveMedicineFragment.vue';

const s = useCssModule()
const props = defineProps({
    hiveId: String,
})
enum Destinations {
    General = "General",
    Calendar = "Calendar",
    Notes = "Notes",
    Medicine = "Medicine"
}
const currentDestination = ref<Destinations>(Destinations.Medicine)
const buttons = [
    { "destination": Destinations.General, component: Info },
    { "destination": Destinations.Calendar, component: CalendarHiveEvents },
    { "destination": Destinations.Notes, component: NoteList },
    { "destination": Destinations.Medicine, component:  HiveMedicineFragment }
]
function changeDestination(destination: Destinations) {
    currentDestination.value = destination
}
</script>

<template>
<div :class="s.toolbar">
    <motion.button 
        v-for="btn in buttons" 
        :class="[s.button, (btn.destination === currentDestination) && s.selected]"
        :while-press="{ scale: 0.98}"
        @click="changeDestination(btn.destination)"
    >{{ btn.destination }}</motion.button>

    <Button :style="{ marginLeft: 'auto'}" text="Add Inspection"></Button>
</div>

<component :class="s.container" :is="buttons.find(val => val.destination === currentDestination)?.component" />
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
@use '@/assets/_base.sass' as base

.toolbar
    display: flex
    margin: 1rem
    margin-bottom: 0
    min-height: 2rem
    align-items: center
    background: var(--surface)
    border-radius: 2px

    .button
        all: unset
        @include main.f-size-small
        @include main.font
        position: relative
        height: 100%
        box-sizing: border-box
        padding: .5rem 1rem
        border-radius: 2px
        cursor: pointer
        transition: .1s

        // &::before
        //     content: ''
        //     position: absolute
        //     left: 0
        //     right: 0
        //     bottom: -4px
        //     height: 4px
        //     background: var(--light)
        //     display: none  // optional, if you only want it visible when selected

        // &.selected::before
        //     display: block  // show when selected

        &.selected
            background: var(--accent)
            color: white
            &:hover
                backdrop-filter: none

        &:hover
            backdrop-filter: brightness(90%)

    .verticalSpacer
        all: unset
        display: flex
        align-self: center
        margin: .5rem
        min-width: 1px
        max-width: 1px
        height: calc(100% - 1rem)
        background: rgba(0, 0, 0, .2)
        border-radius: 100px

.container 
    flex: 1
    max-height: calc( 100vh - 6.5rem )
    padding: 1rem
    box-sizing: border-box
    
    // box-sizing: border-box

    // @media (min-width: base.$xl) 
    //     grid-template-areas:"genInfo genInfo genInfo upcomingEvents upcomingEvents upcomingEvents" "stimulants stimulants suppers suppers queen queen " "eventLog eventLog notes notes notes notes"
    //     grid-template-rows: repeat(3, 400px)
    //     grid-template-columns: repeat(6, 1fr)
    //     max-height: 100%

    
    // @media (min-width: base.$xxl) 
    //     grid-template-columns: repeat(10, 1fr)
    //     grid-template-areas: "genInfo genInfo genInfo genInfo suppers suppers queen queen  notes notes" "eventLog eventLog stimulants stimulants upcomingEvents upcomingEvents upcomingEvents upcomingEvents notes notes"
    //     grid-template-rows: repeat(2, 1fr)
    //     max-height: calc( 100vh - 3rem )

    // > *
    //     border-radius: 0 0 3px 3px

    // .stimulants
    //     grid-area: stimulants
        
    // .upcomingEvents
    //     grid-area: upcomingEvents

    // .suppers
    //     grid-area: suppers

    // .queenBee
    //     grid-area: queen

    // .eventLog
    //     grid-area: eventLog

    // .notes
    //     grid-area: notes
        
    // .generalInfo
    //     grid-area: genInfo
        
</style>