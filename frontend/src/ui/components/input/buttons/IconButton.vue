<script setup lang="ts">
import { useCssModule } from "vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import Icon from "../../Icon.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    svg?: SVG
    transparent?: boolean
    noBorderRadius?: boolean
}>(), {
    svg: SVG.Dollar,
    transparent: false,
    noBorderRadius: false
})
</script>

<template>
<button 
    type="button" 
    :class="[
        transparent ? s.transparent : s.container,
        noBorderRadius && s.noRadiuss
    ]"
>
    <Icon 
        :class="s.icon"
        :type="IconType.SMALL" 
        :svg="svg"
    />
</button>
</template>

<style module lang='sass'>
.noRadiuss
    border-radius: 0 !important

.container
    display: flex
    align-items: center
    justify-content: center

    min-width: 2rem
    min-height: 2rem
    max-width: 2rem
    max-height: 2rem

    box-sizing: border-box


    background: white
    border: 1px solid var(--blue)
    border-radius: var(--border-radius-small)

    cursor: pointer
    transition: .1s
    outline-color: var(--blue)

    &:hover
        filter: brightness(98%)
        outline: 1px solid var(--blue)

.transparent
    display: flex
    align-items: center
    justify-content: center

    min-width: 2rem
    min-height: 2rem
    max-width: 2rem
    max-height: 2rem

    box-sizing: border-box
    border-radius: var(--border-radius-small)

    cursor: pointer
    transition: .1s
    border: none
    background: transparent
    // outline-color: var(--blue)

    &:hover
        // filter: brightness(98%)
        // outline: 1px solid var(--blue)
        background: var(--blue)
</style>