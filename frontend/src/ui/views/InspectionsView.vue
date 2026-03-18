<script setup lang="ts">
import { computed, onMounted, useCssModule } from "vue";
import ToolBar from "../components/ToolBar.vue";
import InspectionTable from "../components/tables/InspectionTable.vue";
import { useInspectionStore } from "@/core/stores/InspectionStore";
import type { InspectionTableEntryModel } from "@/core/stores/Models";
import { storeToRefs } from "pinia";

const s = useCssModule()
const props = defineProps<{}>()

const inspectionStore = useInspectionStore()
const { inspections } = storeToRefs(inspectionStore)
const inspectionEntries = computed((): InspectionTableEntryModel[] => inspections.value)


onMounted(async () => {
    await inspectionStore.getInspections({
        page: 1,
        limit: 999
    })
})
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