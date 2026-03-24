<script setup lang="ts">
import { ref, useCssModule } from "vue";
import ToolBar from "../components/ToolBar.vue";
import InspectionTable from "../components/tables/InspectionTable.vue";
import { useInspections, type InspectionFilters } from "@/core/composables/useInspection";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
const props = defineProps<{}>()

const filters = ref<InspectionFilters>({
    page:   1,
    limit:  14,
    hiveId: undefined,
    ids:    undefined
})
const { inspectionTableEntries, nextPage, prevPage } = useInspections(filters)

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
        :entries="inspectionTableEntries ?? []"
        :page="filters.page!"
        :limit="filters.limit!"
    >
        <IconTextButton 
            text="Previous"
            :svg="SVG.ArrowLeftSmall"
            :disabled="(filters?.page) === 1"
            @click="prevPage"
        />
        <IconTextButton 
            text="Next"
            :swap-icon-position="true"
            :svg="SVG.ArrowRightSmall"
            :disabled="!nextPage"
            @click="nextPage"
        />
    </InspectionTable>
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