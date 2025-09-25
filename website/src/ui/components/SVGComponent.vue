<script setup lang="ts">
import { useCssModule } from "vue";
import { SVGRes, SVGImage } from "../../core/SVGLoader";
withDefaults(defineProps<{
    svg?: SVGImage
}>(),
{
    svg: () => new SVGImage(SVGRes.Apiaries)
})
const s = useCssModule()
</script>

<template>
<svg :class="s.svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" :viewBox="svg.body.value.viewBox">
    <path :class="s.path" :fill="svg.color.value" :d="svg.body.value.path"/>
</svg>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main

.svg
    display: flex
    align-items: center
    justify-content: center

.path
    width: 100%
    min-height: 5rem
    transition: .2s ease
</style>