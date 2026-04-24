<script setup lang="ts">
import { computed, toRef, useCssModule } from "vue";
import type { ApiaryModelDB, HistoryEntryDB } from "@/core/stores/Models";
import ApiaryInfo from "./ApiaryInfo.vue";
import { HiveHistoryGetModel_To_HistoryEntryDB } from "@/core/Convertors";

const s = useCssModule()
const props = defineProps<{
    apiary: ApiaryModelDB
}>()

// const { history } = useHiveHistoryQuery( { apiaryId: toRef(() => props.apiary.id) } )
// const historyEntries = computed<HistoryEntryDB[]>(
//     () => history.value?.map(HiveHistoryGetModel_To_HistoryEntryDB) ?? []
// )
</script>

<template>
<div 
    :class="s.container"
>
    <ApiaryInfo
        :class="s.info"
        :apiary="apiary"
    />
    <!-- <HoneyYieldChart 
        :class="s.profit"
        :hiveId="hive.id"
    /> -->
    <!-- <HistoryLog 
        :class="s.log"
        :entries="historyEntries"
    /> -->
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