<script setup lang="ts">
import { computed, onMounted, ref, toRef, useCssModule } from 'vue';
import HiveMedicineFragment from '../components/view_fragments/HiveMedicineFragment.vue';
import HiveGeneralFragment from '../components/view_fragments/HiveGeneralFragment.vue';
import HiveNoteFragment from '../components/view_fragments/HiveNoteFragment.vue';
import NoteFragmentToolbarPart from '../components/view_fragments/NoteFragmentToolbarPart.vue';
import { HiveTab } from '@/core/ViewTabEnums';
import { useHiveQuery } from '@/core/composables/useHive';
import { useRouter } from 'vue-router';
import { RouterViewPaths } from '@/core/router';
import Navbar from '../components/Navbar.vue';
import HiveCalendarFragment from '../components/view_fragments/HiveCalendarFragment.vue';
import IconCubeButton from '../components/input/buttons/IconCubeButton.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    id:  number,
    tab: HiveTab
}>()

const searchText = ref("")
const selectedDate = ref(new Date().nextMonth().previousMonth())
const currentTab = computed<HiveTab>(() => props.tab)
const { hive }   = useHiveQuery({ 
    id:      toRef(() => props.id),
})

const fragmentHeight = computed((): string => {
    switch (currentTab.value) {
        case HiveTab.Calendar: return `calc(100% -  7rem)`
        case HiveTab.General:  return `calc(100% -  7rem)`
        // case HiveTab.Medicine: return `calc(100% -  7rem)`
        case HiveTab.Notes:    return `calc(100% -  7rem)`
        default:               return ""
    }
})

function changeTab(tab: string) {
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
        v-if="hive"
        :class="s.container"
    >
        <Navbar 
            :class="s.navbar"
            :tabs="Object.values(HiveTab)" 
            :selectedTab="currentTab" 
            @changeTab="changeTab"
        >
            <NoteFragmentToolbarPart
                v-if="currentTab === HiveTab.Notes"
                :hiveId="hive.id"
                v-model:searchText="searchText"
            />

            <div
                v-if="currentTab === HiveTab.Calendar"
                :class="s.dateSelector"
            >
                <IconTextButton
                    :class="s.today"
                    text="Today"
                    :hideIcon="true"
                    @click="selectedDate = new Date()"
                />
                <IconCubeButton
                    :svg="SVG.ArrowLeftSmall"
                    @click="selectedDate = selectedDate.previousMonth()"
                />
                <p
                    :class="s.date"
                >
                    {{ selectedDate.toLocaleString('default', { month: 'long' }) }} {{ selectedDate.getFullYear() }}
                </p>
                <IconCubeButton
                    :svg="SVG.ArrowRightSmall"
                    @click="selectedDate = selectedDate.nextMonth()"
                />
            </div>
        </Navbar>

        <HiveGeneralFragment
            v-if="currentTab === HiveTab.General && hive"
            :class="s.fragment"
            :style="{ maxHeight: fragmentHeight }" 
            :hive="hive"
        /> 

        <HiveCalendarFragment
            v-if="currentTab === HiveTab.Calendar && hive"
            :class="s.fragment"
            :style="{ height: fragmentHeight }" 
            :hive="hive"
            :selectedDate="selectedDate"
        />

        <HiveNoteFragment
            v-if="currentTab === HiveTab.Notes && hive"
            :class="s.fragment"
            :style="{ maxHeight: fragmentHeight }" 
            :search-text="searchText"
            :hive-id="hive.id"
        />

        <!-- <HiveMedicineFragment
            v-if="currentTab === HiveTab.Medicine && hive"
            :class="s.fragment"
            :style="{ height: fragmentHeight }" 
        
        /> -->
    </section>
</template>

<style module lang='sass'>

.dateSelector
    display: flex
    align-items: center
    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 500
    letter-spacing: .02em
    width: 12rem
    text-align: center

    .today
        margin-right: .5rem

    .date
        min-width: 10rem

.navbar
    margin: 1rem
    margin-bottom: 0
.container 
    flex: 1
    box-sizing: border-box
    min-height: 0
    max-height: calc(100vh - var(--header-height))

.fragment
    flex: 1
    padding: 1rem
    box-sizing: border-box

</style>