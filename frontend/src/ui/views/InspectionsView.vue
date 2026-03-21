<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from "vue";
import ToolBar from "../components/ToolBar.vue";
import InspectionTable from "../components/tables/InspectionTable.vue";
import type { InspectionTableEntryModel } from "@/core/stores/Models";
import { useInspections, type InspectionFilters } from "@/core/composables/useInspection";
import { InspectionDB_To_InspectionTableEntryModel } from "@/core/Convertors";

const s = useCssModule()
const props = defineProps<{}>()

const { inspections, nextPage, prevPage } = useInspections(ref<InspectionFilters>({
    page:   1,
    limit:  10,
    hiveId: undefined,
    ids:    undefined
}))

const inspectionEntries = computed(
    (): InspectionTableEntryModel[] => inspections.value?.map(InspectionDB_To_InspectionTableEntryModel) ?? []
)
</script>

<template>
<div 
    :class="s.container"
>
    <ToolBar
        label="Inpections"
    />
    <InspectionTable
        :class="s.table"
        :entries="inspectionEntries"
    />
    <button 
        @click="prevPage"
    >Previous</button>
    <button 
        @click="nextPage"
    >Next</button>
</div>
</template>

<style module lang="sass">
.container
    margin: 1rem
    width: 100%
    height: 100%

.table
    margin-top: 1rem
</style>