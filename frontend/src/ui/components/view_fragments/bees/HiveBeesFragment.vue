<script setup lang="ts">
import { ref, useCssModule } from "vue";
import type { BeeHistoryModelDB, BeeModelDB, HiveModelDB, MoreAboutSpeciesModel } from "@/core/stores/Models";
import QueenInfo from "./QueenInfo.vue";
import QueenHistory from "./QueenHistory.vue";
import MoreAboutSpecies from "./MoreAboutSpecies.vue";

const s = useCssModule()
const props = defineProps<{
    hive: HiveModelDB
}>()

const bee = ref<BeeModelDB>({
    id:              -1,
    species:         "Bigus bitusus III",
    image:           "",
    lifeExpectancy:  "3 years",
    age:             "2 years 2 months",
    bornDate:        new Date(),
    addedToHiveDate: new Date()
})
const beeHistory = ref<BeeHistoryModelDB[]>([{
    id: -1,
    species: "Bigus Bitusus III",
    placedHereAt: "",
    timeInHive: ""
}])
const moreAboutSpecies = ref<MoreAboutSpeciesModel>({
    species: "Bigus bitusus III",
    description: "<i>Apis mellifera</i>, or the western honey bee, is a social insect species known for producing honey and pollinating plants. It has a golden-brown body with black stripes, a hairy thorax, and specialized hind legs for collecting pollen. Colonies can contain tens of thousands of individuals, including a queen, workers, and drones.",
    behavior: "This species is generally calm and non-aggressive, focusing mainly on foraging and maintaining the hive. However, it becomes defensive if the hive is threatened and may sting in response. Worker bees communicate using the waggle dance to share information about food sources.",
    preferences: "<i>Apis mellifera</i> prefers environments with abundant flowering plants such as meadows, farms, and gardens. It feeds primarily on nectar for energy and pollen for protein, and also requires water to regulate hive temperature. The species adapts well to different climates as long as food sources are available."
})
</script>

<template>
<div :class="s.container">
    <QueenInfo
        :class="s.info"
        :bee="bee"
    />
    <QueenHistory 
        :class="s.history"
        :previous-bees="beeHistory"
    />
    <MoreAboutSpecies
        :class="s.description"
        :moreInfo="moreAboutSpecies"
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