<script setup lang="ts">
import { computed, onMounted, ref, toRef, useCssModule } from 'vue';
import { motion } from 'motion-v';
import Button from '../components/input/buttons/Button.vue';
import HiveMedicineFragment from '../components/view_fragments/HiveMedicineFragment.vue';
import HiveGeneralFragment from '../components/view_fragments/HiveGeneralFragment.vue';
import HiveNoteFragment from '../components/view_fragments/HiveNoteFragment.vue';
import CalendarView from './CalendarView.vue';
import NoteFragmentToolbarPart from '../components/view_fragments/NoteFragmentToolbarPart.vue';
import { HiveTab } from '@/core/ViewTabEnums';
import { useHiveQuery } from '@/core/composables/useHive';
import { useRouter } from 'vue-router';
import { RouterViewPaths } from '@/core/router';

const s = useCssModule()
const props = defineProps<{
    id:  number,
    tab: HiveTab
}>()

const searchText = ref("")
const currentTab = computed<HiveTab>(() => props.tab)
const { hive }   = useHiveQuery({ id: toRef(() => props.id) })
const router = useRouter()
const fragmentHeight = computed((): string => {
    switch (currentTab.value) {
        case HiveTab.Calendar: return `calc(100% -  9rem)`
        case HiveTab.General:  return `calc(100% -  6.5rem)`
        case HiveTab.Medicine: return `calc(100% -  6.5rem)`
        case HiveTab.Notes:    return `calc(100% -  6.5rem)`
        default:               return ""
    }
})

function changeTab(tab: HiveTab) {
    router.replace({
        name: RouterViewPaths.HiveOverview,
        params: { 
            id:  props.id, 
            tab: tab 
        }
    })
}

onMounted(() => console.log(props.tab))
</script>

<template>
    <section
        :class="s.container"
    >
        <div :class="s.toolbar">
            <div :class="s.shared">
                <motion.button 
                    v-for="loopTab in Object.values(HiveTab)" 
                    :class="[
                        s.button, 
                        loopTab === currentTab && s.selected
                    ]"
                    :while-press="{ scale: 0.98}"
                    @click="changeTab(loopTab)"
                >
                    {{ loopTab }}
                </motion.button>
                <Button :style="{ marginLeft: 'auto'}" text="Add Inspection"></Button>
            </div>


            <div 
                :class="[
                    s.fragmentSpecific, 
                    s.shown
                ]"
            >
                <NoteFragmentToolbarPart
                    v-if="currentTab === HiveTab.Notes"
                    v-model:searchText="searchText"
                />
            </div>
        </div>

        <HiveGeneralFragment
            v-if="currentTab === HiveTab.General && hive"
            :class="s.fragment"
            :style="{ height: fragmentHeight }" 
            :hive="hive"
        /> 

        <CalendarView
            v-if="currentTab === HiveTab.Calendar && hive"
            :class="s.fragment"
            :style="{ height: fragmentHeight }" 
        />

        <HiveNoteFragment
            v-if="currentTab === HiveTab.Notes && hive"
            :class="s.fragment"
            :style="{ maxHeight: fragmentHeight }" 
            :search-text="searchText"
            :hive-id="hive.id"
        />

        <HiveMedicineFragment
            v-if="currentTab === HiveTab.Medicine && hive"
            :class="s.fragment"
            :style="{ height: fragmentHeight }" 
        
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