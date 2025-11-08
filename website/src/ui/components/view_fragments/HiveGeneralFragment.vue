<script setup lang="ts">
import { useCssModule } from "vue";
import Info from "../hive_overview/Info.vue";
import Suppers from "../hive_overview/supper/Suppers.vue";
import EventLog from "../hive_overview/event_logs/EventLog.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <Info :class="s.list"/>
    <Suppers />
    <EventLog />
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    grid-template-areas: 'info profit' 'log else'
    gap: 1rem

    .list

    .table
        border-radius: 2px
        background: white
</style>