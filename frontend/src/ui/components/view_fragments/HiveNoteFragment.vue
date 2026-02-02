<script setup lang="ts">
import { ref, useCssModule } from "vue";
import MedicineList from "../hive_overview/medicine/MedicineList.vue";
import Note from '../hive_overview/notes/Note.vue'
import { useFlexibleGrid } from "@/core/utils/others";

const s = useCssModule()
const grid = ref<HTMLDivElement | null>(null)
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemMinWidthPx: 350,
    gapPx: 16
})
</script>

<template>
<div 
    ref="grid"
    :class="s.container"
    :style="gridStyle"
>
    <Note />
    <Note />
    <Note />
    <Note />
    <Note />
    <Note />
    <Note />
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    border-radius: 2px
    align-content: start;

    overflow: auto
</style>