<script setup lang="ts">
import { useCssModule } from "vue";
import MedicineList from "../hive_overview/medicine/MedicineList.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <MedicineList :class="s.list"/>
    <div :class="s.table"></div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: grid
    grid-template-columns: 20rem 1fr
    gap: 1rem

    .list

    .table
        border-radius: 2px
        background: white
</style>