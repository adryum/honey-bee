<script setup lang="ts">
import { computed, toRef, useCssModule } from "vue";
import type { ApiaryModelDB } from "@/core/stores/Models";
import ApiaryInfo from "./ApiaryInfo.vue";
import { useApiaryHistoryQuery } from "@/core/composables/useApiaryHistory";
import HistoryLog from "@/ui/components/hive/view_fragments/general/history/HistoryLog.vue";
import LineGraph from "@/ui/components/charts/LineGraph.vue";
import { useApiaryQuery } from "@/core/composables/useApiary";
import { HiveYieldGetModels_To_LineGraphLineModels } from "@/core/Convertors";

const s = useCssModule()
const props = defineProps<{
    apiary: ApiaryModelDB
}>()

const { history } = useApiaryHistoryQuery( { apiaryId: toRef(() => props.apiary.id) } )
const { hiveYields } = useApiaryQuery({
    id:            computed(() => props.apiary.id),
    getHiveYields: {
        fromISO: new Date().firstDayOfMonth().toISOString(),
        toISO: new Date().lastDayOfMonth().toISOString(),
    }
})

const convertedYields = computed(() => hiveYields.value 
    ? HiveYieldGetModels_To_LineGraphLineModels(hiveYields.value)
    : []
)
</script>

<template>
<div 
    :class="s.container"
>
    <ApiaryInfo
        :class="s.info"
        :apiary="apiary"
    />
    <LineGraph
        :class="s.profit"
        :entries="convertedYields"
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