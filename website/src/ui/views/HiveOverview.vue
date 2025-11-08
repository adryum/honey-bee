<script setup lang="ts">
import { computed, ref, useCssModule, type Component, type DefineComponent } from 'vue';
import NoteList from '../components/hive_overview/notes/NoteList.vue';
import CalendarHiveEvents from '../components/hive_overview/calendar/CalendarHiveEvents.vue';
import { motion } from 'motion-v';
import Button from '../components/input/buttons/Button.vue';
import HiveMedicineFragment from '../components/view_fragments/HiveMedicineFragment.vue';
import HiveGeneralFragment from '../components/view_fragments/HiveGeneralFragment.vue';
import HiveNoteFragment from '../components/view_fragments/HiveNoteFragment.vue';
import CalendarView from './CalendarView.vue';

const s = useCssModule()
const props = defineProps({
    hiveId: String,
})

const currentDestination = ref<Destinations>(Destinations.Notes)
const destinatonProps: DestinationProps[] = [
    { destination: Destinations.General, fragmentComponent: HiveGeneralFragment, fragmentToolbarComponents: []},
    { destination: Destinations.Calendar, fragmentComponent: CalendarView, fragmentToolbarComponents: [Button]},
    { destination: Destinations.Notes, fragmentComponent: HiveNoteFragment, fragmentToolbarComponents: [Button, Button, Button] },
    { destination: Destinations.Medicine, fragmentComponent:  HiveMedicineFragment, fragmentToolbarComponents: [Button] }
]

const selectedDestinationProps = computed(() => {
    return destinatonProps.find(val => val.destination === currentDestination.value)!
})
const hasSelectedFragmentComponents = computed(() => {
    return selectedDestinationProps.value.fragmentToolbarComponents.length > 0
})

function changeDestination(destination: Destinations) {
    currentDestination.value = destination
}
</script>

<script lang="ts">
export enum Destinations {
    General = "General",
    Calendar = "Calendar",
    Notes = "Notes",
    Medicine = "Sickness and Remedies"
}

export type DestinationProps = {
    destination: Destinations
    fragmentComponent: Component
    fragmentToolbarComponents: Component[]
}
</script>

<template>
    <div :class="s.toolbar">
        <div :class="s.shared">
            <motion.button 
                v-for="props in destinatonProps" 
                :class="[s.button, (props.destination === currentDestination) && s.selected]"
                :while-press="{ scale: 0.98}"
                @click="changeDestination(props.destination)"
            >
            {{ props.destination }}
            </motion.button>
            <Button :style="{ marginLeft: 'auto'}" text="Add Inspection"></Button>
        </div>
        <div :class="[s.fragmentSpecific, hasSelectedFragmentComponents && s.selected]">
            <component 
                v-for="component in selectedDestinationProps.fragmentToolbarComponents" 
                :class="s.toolbarComponent" 
                :is="component"
            />
        </div>
    </div>

    <component 
        :class="s.container"
        :style="{ maxHeight: `calc(100vh - ${hasSelectedFragmentComponents ? '9rem' : '6.5rem' })` }" 
        :is="selectedDestinationProps.fragmentComponent" />
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
@use '@/assets/_base.sass' as base
.container 
    flex: 1
    padding: 1rem
    box-sizing: border-box

.toolbarComponent
    align-self: center
.toolbar
    margin: 1rem
    margin-bottom: 0

    display: flex
    flex-direction: column
    border-radius: 2px
    background: var(--surface)

    .fragmentSpecific
        display: flex
        gap: .5rem
        height: 0
        transition: .1s
        opacity: 0

        box-sizing: border-box
        padding: 0 .5rem

        &.selected
            height: 2.5rem
            max-height: 2.5rem
            opacity: 1

    .shared
        display: flex
        min-height: 2.5rem
        max-height: 2.5rem
        align-items: center
        border-bottom: 1px solid rgba(0, 0, 0, .1)

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
            opacity: .8
            font-weight: 500
            letter-spacing: .02em

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
                opacity: 1
                &:hover
                    backdrop-filter: none

            &:hover
                opacity: 1
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
</style>