<script setup lang="ts">
import { toRef, useCssModule } from "vue";
import Info from "@/ui/components/hive/view_fragments/general/Info.vue";
import HoneyYieldChart from "./HoneyYieldChart.vue";
import HistoryLog from "./history/HistoryLog.vue";
import type { HiveModelDB } from "@/core/stores/Models";
import { useHiveActionHistoryQuery } from "@/core/composables/hive/useHiveActionHistory";

const s = useCssModule()
const props = defineProps<{
    hive:       HiveModelDB
}>()

const { history } = useHiveActionHistoryQuery( { hiveId: toRef(() => props.hive.id) } )
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