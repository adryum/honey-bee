<script setup lang="ts">
import { ref, useCssModule } from "vue";
import NoteList from '../components/hive_overview/NoteList.vue'
import CalendarHiveEvents from "../components/hive_overview/CalendarHiveEvents.vue";
import QueenBee from '../components/hive_overview/QueenBee.vue'
import Info from '../components/hive_overview/Info.vue'
import Suppers from '../components/hive_overview/Suppers.vue'
import EventLog from '../components/hive_overview/EventLog.vue'
import Medicines from "../components/hive_overview/Medicines.vue";

const props = defineProps({
    hiveId: String,
})

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <Info :class="s.generalInfo"/>
    <NoteList :class="s.notes"/>
    <EventLog :class="s.eventLog"/>
    <QueenBee :class="s.queenBee"/>
    <Suppers :class="s.suppers"/>
    <CalendarHiveEvents :class="s.upcomingEvents" />
    <Medicines :class="s.stimulants"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
@use '@/assets/_base.sass' as base

.container 
    flex: 1
    display: grid

    padding: 1rem
    gap: 1rem
    box-sizing: border-box

    @media (min-width: base.$xl) 
        grid-template-areas:"genInfo genInfo genInfo upcomingEvents upcomingEvents upcomingEvents" "stimulants stimulants suppers suppers queen queen " "eventLog eventLog notes notes notes notes"
        grid-template-rows: repeat(3, 400px)
        grid-template-columns: repeat(6, 1fr)
        max-height: 100%

    
    @media (min-width: base.$xxl) 
        grid-template-columns: repeat(10, 1fr)
        grid-template-areas: "genInfo genInfo genInfo genInfo upcomingEvents upcomingEvents upcomingEvents upcomingEvents notes notes" "eventLog eventLog stimulants stimulants suppers suppers queen queen notes notes"
        grid-template-rows: repeat(2, 1fr)
        max-height: calc( 100vh - 3rem )

    > *
        border-radius: 0 0 3px 3px

    .stimulants
        grid-area: stimulants
        
    .upcomingEvents
        grid-area: upcomingEvents

    .suppers
        grid-area: suppers

    .queenBee
        grid-area: queen

    .eventLog
        grid-area: eventLog

    .notes
        grid-area: notes
        
    .generalInfo
        grid-area: genInfo
        
</style>