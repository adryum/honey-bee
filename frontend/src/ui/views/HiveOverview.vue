<script setup lang="ts">
import { computed, ref, useCssModule, type Component, type DefineComponent } from 'vue';
import { motion } from 'motion-v';
import Button from '../components/input/buttons/Button.vue';
import HiveMedicineFragment from '../components/view_fragments/HiveMedicineFragment.vue';
import HiveGeneralFragment from '../components/view_fragments/HiveGeneralFragment.vue';
import HiveNoteFragment from '../components/view_fragments/HiveNoteFragment.vue';
import CalendarView from './CalendarView.vue';
import { Destinations, type DestinationProps } from '@/core/models/OtherModels';
import NoteFragmentToolbarPart from '../components/view_fragments/NoteFragmentToolbarPart.vue';
import { useHiveStore } from '@/core/stores/HiveStore';
import { storeToRefs } from 'pinia';
import type { HiveModelDB } from '@/core/stores/Models';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import { usePopupCreator } from '@/core/utils/PopupHiarchy';
import CalendarCreateEventPopup from '../components/popups/CalendarCreateEventPopup.vue';

const s = useCssModule()
const props = defineProps({
    hiveId: String,
})

const hiveStore = useHiveStore()
const { selectedHive } = storeToRefs(hiveStore)
const searchText = ref('')

const currentDestination = ref<Destinations>(Destinations.Notes)
const destinatonProps: DestinationProps[] = [
    { destination: Destinations.General, fragmentComponent: HiveGeneralFragment, fragmentToolbarComponent: undefined},
    { destination: Destinations.Calendar, fragmentComponent: CalendarView, fragmentToolbarComponent: undefined},
    { destination: Destinations.Notes, fragmentComponent: HiveNoteFragment, fragmentToolbarComponent: NoteFragmentToolbarPart },
    { destination: Destinations.Medicine, fragmentComponent:  HiveMedicineFragment, fragmentToolbarComponent: undefined }
]

const selectedDestinationProps = computed(() => {
    return destinatonProps.find(val => val.destination === currentDestination.value)!
})
const hasSelectedFragmentComponents = computed(() => {
    return selectedDestinationProps.value.fragmentToolbarComponent
})

function changeDestination(destination: Destinations) {
    currentDestination.value = destination
}

const { create } = usePopupCreator({
    popupComponent: CalendarCreateEventPopup,
    maxCount: 1,
    props: {
        hive: selectedHive
    }
})
</script>

<template>
    <section
        :class="s.container"
    >
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
            <div :class="[s.fragmentSpecific, s.shown]">
                <NoteFragmentToolbarPart
                    v-if="currentDestination === Destinations.Notes"
                    v-model:searchText="searchText"
                />
                <div
                    v-if="currentDestination === Destinations.Calendar"
                >
                    <IconTextButton
                        text="Create Event" 
                        :class="s.create"
                        :svg="SVG.Pencil"
                        @click="create"
                    />
                </div>
            </div>
        </div>

        <HiveGeneralFragment
            v-if="currentDestination === Destinations.General"
            :class="s.fragment"
            :style="{ maxHeight: `calc(100vh - ${hasSelectedFragmentComponents ? '9rem' : '6.5rem' })` }" 
            :hive="selectedHive ?? {} as HiveModelDB"
        /> 
        <CalendarView
            v-if="currentDestination === Destinations.Calendar"
            :class="s.fragment"
            :style="{ maxHeight: `calc(100vh - ${hasSelectedFragmentComponents ? '9rem' : '6.5rem' })` }" 

        />
        <HiveNoteFragment
            v-if="currentDestination === Destinations.Notes"
            :class="s.fragment"
            :style="{ maxHeight: `calc(100vh - ${hasSelectedFragmentComponents ? '9rem' : '6.5rem' })` }" 
            :search-text="searchText"
        />

        <HiveMedicineFragment
            v-if="currentDestination === Destinations.Medicine"
            :class="s.fragment"
            :style="{ maxHeight: `calc(100vh - ${hasSelectedFragmentComponents ? '9rem' : '6.5rem' })` }" 
        
        />
    </section>
</template>

<style module lang='sass'>
.container 
    flex: 1
    box-sizing: border-box

.fragment
    flex: 1
    padding: 1rem
    box-sizing: border-box

.toolbarComponent
    align-self: center

.toolbar
    box-shadow: 0 0 1px 0 var(--faint-border)

    margin: 1rem
    margin-bottom: 0

    display: flex
    flex-direction: column
    border-radius: var(--border-radius-small)
    background: var(--white)

    .fragmentSpecific
        display: flex
        height: 0
        transition: .1s
        opacity: 0

        box-sizing: border-box
        box-shadow: inset 0 1px 1px 0 var(--faint-border)

        gap: .2rem

        &.shown
            height: 2.5rem
            max-height: 2.5rem
            opacity: 1
            padding: .2rem
            padding-top: calc( .2rem + 1px  )

    .shared
        display: flex
        min-height: 2.5rem
        max-height: 2.5rem
        align-items: center
        font-family: var(--font-family)
        font-size: var(--font-size-medium)
        font-weight: 500

        padding: .25rem
        box-sizing: border-box
        gap: .25rem

        .button
            all: unset
            position: relative
            height: 100%
            box-sizing: border-box
            padding: .5rem 1rem
            height: 2rem
            border-radius: 2px
            cursor: pointer
            transition: .2s
            opacity: .7
            letter-spacing: .02em

            &::before
                position: absolute
                content: ''
                width: 100%
                height: 2px
                
                left: 0
                bottom: 0
                transition: .2s
                border-radius: 100rem


            &.selected
                opacity: 1
                
                &::before
                    background: var(--orange)


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