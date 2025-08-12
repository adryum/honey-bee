<script setup lang="ts">
import { useCssModule } from "vue";
import type { SVG } from "../core/Interfaces";
defineProps<{
    svg: SVG
}>()
const s = useCssModule()
</script>

<template>
<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svg.viewBox">
    <path :fill="svg.color" :d="svg.path"/>
</svg>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
</style>