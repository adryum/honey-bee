<script setup lang="ts">
import { ref, useCssModule } from "vue";
import ToolBar from "../components/ToolBar.vue";
import InspectionTable from "../components/tables/InspectionTable.vue";
import { useInspectionsQuery, type InspectionFilters } from "@/core/composables/useInspection";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{}>()

const filters = ref<InspectionFilters>({
    page:   1,
    limit:  20,
    hiveId: undefined,
    ids:    undefined
})
const { inspectionTableEntries, nextPage, prevPage } = useInspectionsQuery(filters)
</script>

<template>
<div 
    :class="s.container"
    :style="{ maxHeight: `calc(100vh - var(--header-height))` }"
>
    <ToolBar
        :class="s.navbar"
        :label="t('inspections.page_title')"
    />
    <InspectionTable
        :class="s.table"
        :entries="inspectionTableEntries ?? []"
        :page="filters.page!"
        :limit="filters.limit!"
    >
        <IconTextButton 
            :text="t('pagination.previous')"
            :icon="SVG.ArrowLeftSmall"
            :disabled="(filters?.page) === 1"
            @click="prevPage"
        />
        <IconTextButton 
            :text="t('pagination.next')"
            :swap-icon-position="true"
            :icon="SVG.ArrowRightSmall"
            :disabled="!nextPage"
            @click="nextPage"
        />
    </InspectionTable>
</div>
</template>

<style module lang="sass">
.container
    display: flex
    flex-direction: column

    box-sizing: border-box
    width: 100%
    height: 100%
    overflow: hidden

.navbar
    margin: 1rem

.table
    margin: 1rem
    margin-top: 0
</style>