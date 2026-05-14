<script setup lang="ts">
import { computed, toRef, useCssModule } from "vue";
import Info from "@/ui/components/hive/view_fragments/general/Info.vue";
import HistoryLog from "./history/HistoryLog.vue";
import type { HiveModelDB } from "@/core/stores/Models";
import { useHiveActionHistoryQuery } from "@/core/composables/hive/useHiveActionHistory";
import { HiveYieldGetModels_To_LineGraphLineModels } from "@/core/Convertors";
import { useHiveQuery } from "@/core/composables/hive/useHive";
import LineGraph from "@/ui/components/charts/LineGraph.vue";

const s = useCssModule()
const props = defineProps<{
    hive:       HiveModelDB
}>()

const { history } = useHiveActionHistoryQuery( { hiveId: toRef(() => props.hive.id) } )
const { yields } = useHiveQuery({
    id: computed(() => props.hive.id),
    getHiveYields: {
        fromISO: new Date().firstDayOfMonth().toISOString(),
        toISO:   new Date().lastDayOfMonth().toISOString(),
    }
})
const convertedYields = computed(() => {
    return yields.value 
        ? HiveYieldGetModels_To_LineGraphLineModels(yields.value)
        : []  
    } 
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
    <LineGraph
        :class="s.profit"
        :entries="convertedYields"
    />
    <!-- <HoneyYieldChart 
        :class="s.profit"
        :hiveId="hive.id"
    /> -->
    <HistoryLog 
        :class="s.log"
        :entries="history ?? []"
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
    overflow: hidden

    .info
        grid-area: info
    .profit
        grid-area: profit
    .log
        grid-area: log
</style>