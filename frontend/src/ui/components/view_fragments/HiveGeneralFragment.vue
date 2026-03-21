<script setup lang="ts">
import { useCssModule } from "vue";
import Info from "../hive_overview/Info.vue";
import HoneyProfitChart from "../hive_overview/supper/HoneyProfitChart.vue";
import HistoryLog from "../hive_overview/history/HistoryLog.vue";
import type { HiveModelDB } from "@/core/stores/Models";

const s = useCssModule()
const props = defineProps<{
    hive:       HiveModelDB
}>()
</script>

<template>
<div 
    :class="s.container"
>
    <Info 
        :class="s.info"
        :hive="hive"
    />
    <HoneyProfitChart :class="s.profit"/>
    <HistoryLog 
        :class="s.log"
        :hive="hive"
    />
</div>
</template>

<style module lang='sass'>
.heightChecker
    position: absolute
    background: green
    width: 10rem
    height: 100%
    z-index: 10
.container
    position: relative
    display: grid
    grid-template-columns: 1.5fr 1fr 1fr
    grid-template-rows: 1fr 1fr
    grid-template-areas: 'profit profit info' 'profit profit log'
    gap: 1rem

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