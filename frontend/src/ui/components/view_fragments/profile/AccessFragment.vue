<script setup lang="ts">
import { useApiaryStore } from "@/core/stores/ApiaryStore";
import { storeToRefs } from "pinia";
import { ref, useCssModule } from "vue";
import Apiary from "../../apiary/Apiary.vue";
import { useFlexibleGrid } from "@/core/utils/others";

const s = useCssModule()
const apiaryStore = useApiaryStore()
const { apiaries } = storeToRefs(apiaryStore)

const grid = ref()
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemMinWidthPx: 300,
    gapPx: 10
})
</script>

<template>
<div :class="s.container">

    <p
        :class="s.label"
    >
        Apiaries
    </p>
    <div 
        ref="grid"
        :style="gridStyle"
        :class="s.grid"
    >
        <Apiary
            v-for="apiary in apiaries"
            :key="apiary.id"
            :apiary="apiary"
            :class="s.item"
        />
        <Apiary
            v-for="apiary in apiaries"
            :key="apiary.id"
            :apiary="apiary"
            :class="s.item"
        />
    </div>
</div>
</template>

<style module lang="sass">

.label
    +bulletLabel
    display: flex
    margin: 1rem 0 

.grid

    .item
        height: 15rem

.container
    height: 100%

    background: var(--white)
    padding: 0 1rem 1rem 1rem 
</style>