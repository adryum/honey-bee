<script setup lang="ts">
import { useCssModule } from "vue";
import { SVGIconRes, type SVGIcon } from "../../core/SVGLoader";
withDefaults(defineProps<{
    svg?: SVGIcon
}>(),
{
    svg: () => ({
        res: SVGIconRes.Apiaries,
        path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
        color: '#000000',
        viewBox: '0 0 512 512'
    })
})
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