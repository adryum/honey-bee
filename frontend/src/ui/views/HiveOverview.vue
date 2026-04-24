<script setup lang="ts">
import { computed, onMounted, ref, toRef, useCssModule } from 'vue';
import HiveGeneralFragment from '@/ui/components/hive/view_fragments/general/HiveGeneralFragment.vue';
import HiveNoteFragment from '@/ui/components/hive/view_fragments/notes/HiveNoteFragment.vue';
import NoteFragmentToolbarPart from '@/ui/components/hive/view_fragments/notes/NoteFragmentToolbarPart.vue';
import { HiveTab } from '@/core/ViewTabEnums';
import { useHiveQuery } from '@/core/composables/useHive';
import { useRouter } from 'vue-router';
import { RouterViewPaths } from '@/core/router';
import HiveCalendarFragment from '@/ui/components/hive/view_fragments/HiveCalendarFragment.vue';
import MonthChangerWidget from '@/ui/components/calendar/MonthChangerWidget.vue';
import HiveBeesFragment from '@/ui/components/hive/view_fragments/bees/HiveBeesFragment.vue';
import ToolBar from '../components/ToolBar.vue';

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
        case HiveTab.Calendar: return `calc(100% -  4rem)`
        case HiveTab.General:  return `calc(100% -  4rem)`
        case HiveTab.Bees:     return `calc(100% -  4rem)`
        // case HiveTab.Medicine: return `calc(100% -  7rem)`
        case HiveTab.Notes:    return `calc(100% -  4rem)`
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
        <ToolBar 
            :class="s.navbar"
            :label="hive.name"
            :show-back-button="true"
            :tabs="Object.values(HiveTab)" 
            :selectedTab="currentTab" 
            @changeTab="changeTab"
            @back="router.back()"
        >
            <template #header>
                <NoteFragmentToolbarPart
                    v-if="currentTab === HiveTab.Notes"
                    :hiveId="hive.id"
                    v-model:searchText="searchText"
                />

                <MonthChangerWidget
                    v-if="currentTab === HiveTab.Calendar"
                    :selectedDate="selectedDate"
                    @change="date => selectedDate = date"
                />
            </template>
        </ToolBar>

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

        <HiveBeesFragment
            v-if="currentTab === HiveTab.Bees && hive"
            :class="s.fragment"
            :style="{ maxHeight: fragmentHeight }" 
            :hive="hive"
        />

        <!-- <HiveMedicineFragment
            v-if="currentTab === HiveTab.Medicine && hive"
            :class="s.fragment"
            :style="{ height: fragmentHeight }" 
        
        /> -->
    </section>
</template>

<style module lang='sass'>

.navbar
    margin: 1rem
    margin-bottom: 0
    // box-sizing: border-box
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