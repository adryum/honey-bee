<script setup lang="ts">
import { computed, toRef, useCssModule } from "vue";
import Info from "@/ui/components/hive/view_fragments/general/Info.vue";
import HoneyYieldChart from "./HoneyYieldChart.vue";
import HistoryLog from "./history/HistoryLog.vue";
import type { HistoryEntryDB, HiveModelDB } from "@/core/stores/Models";
import { useHiveHistoryQuery } from "@/core/composables/useHiveHistory";
import { HiveHistoryGetModel_To_HistoryEntryDB } from "@/core/Convertors";

const s = useCssModule()
const props = defineProps<{
    hive:       HiveModelDB
}>()

const { history } = useHiveHistoryQuery( { hiveId: toRef(() => props.hive.id) } )
const historyEntries = computed<HistoryEntryDB[]>(
    () => history.value?.map(HiveHistoryGetModel_To_HistoryEntryDB) ?? []
)
</script>

<template>
<div 
    :class="s.container"
>
    <Info 
        :class="s.info"
        :hive="hive"
    />
    <HoneyYieldChart 
        :class="s.profit"
        :hiveId="hive.id"
    />
    <HistoryLog 
        :class="s.log"
        :entries="historyEntries"
    />
</div>
</template>

<style module lang='sass'>
.container
    position: relative
    display: grid
    grid-template-columns: 1.5fr 1fr 1fr
    grid-template-rows: 1fr 1fr
    grid-template-areas: 'profit profit info' 'profit profit log'
    gap: 1rem
    height: 100%

    .image
        grid-area: image

        .imageEl
            width: 100%
            height: 100%

    .info
        grid-area: info
    .profit
        grid-area: profit
    .log
        grid-area: log
</style>