<script setup lang="ts">
import { useCssModule } from "vue";
import Info from "../hive_overview/Info.vue";
import HoneyProfitChart from "../hive_overview/supper/HoneyProfitChart.vue";
import EventLog from "../hive_overview/event_logs/EventLog.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <!-- <div :class="s.image">
        <img :class="s.imageEl" src="@/assets/images/apiary.jpg" alt="">
    </div> -->
    <Info :class="s.info"/>
    <HoneyProfitChart :class="s.profit"/>
    <EventLog :class="s.log"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
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