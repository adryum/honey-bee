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

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    id:  number,
    tab: HiveTab
}>()

const searchText = ref("")
const currentTab = computed<HiveTab>(() => props.tab)
const { hive }   = useHiveQuery({ 
    id:      toRef(() => props.id),
})

const fragmentHeight = computed((): string => {
    switch (currentTab.value) {
        case HiveTab.Calendar: return `calc(100% -  7rem)`
        case HiveTab.General:  return `calc(100% -  7rem)`
        case HiveTab.Medicine: return `calc(100% -  7rem)`
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