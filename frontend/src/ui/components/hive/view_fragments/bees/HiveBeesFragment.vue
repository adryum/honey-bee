<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import type { QueenHistoryModelDB, QueenModelDB, HiveModelDB, MoreAboutSpeciesModel } from "@/core/stores/Models";
import QueenInfo from "./QueenInfo.vue";
import QueenHistory from "./QueenHistory.vue";
import MoreAboutSpecies from "./MoreAboutSpecies.vue";
import { useQueensQuery } from "@/core/composables/useQueen";
import { useSpeciesQuery } from "@/core/composables/useSpecies";

const s = useCssModule()
const props = defineProps<{
    hive: HiveModelDB
}>()

const { queens } = useQueensQuery({
    queenIds: undefined,
    hiveIds: computed(() => [props.hive.id])
})
const queen = computed(() => {
    console.log(queens.value?.[0]);
    
    return queens.value?.[0]}
)
const { species } = useSpeciesQuery()
const queenSpecies = computed(() => species.value?.find(item => item.id === queen.value?.species.id))

const beeHistory = ref<QueenHistoryModelDB[]>([{
    id: -1,
    species: "Bigus Bitusus III",
    placedHereAt: "",
    timeInHive: ""
}])
</script>

<template>
<div :class="s.container">
    <QueenInfo
        :class="s.info"
        :queen="queen"
        :hive-id="hive.id"
    />
    <QueenHistory 
        :class="s.history"
        :previous-bees="beeHistory"
    />
    <MoreAboutSpecies
        :class="s.description"
        :species="queenSpecies"
    />
</div>
</template>

<style module lang="sass">
.container
    position: relative
    display: grid
    grid-template-columns: .5fr  1fr
    grid-template-rows: 1.5fr 1fr
    grid-template-areas: 'info history' 'info description'
    gap: 1rem
    height: 100%

    .image
        grid-area: image

        .imageEl
            width: 100%
            height: 100%

    .info
        grid-area: info
    .history
        grid-area: history
    .description
        grid-area: description
</style>