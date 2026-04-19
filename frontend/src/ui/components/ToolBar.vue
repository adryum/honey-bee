<script setup lang="ts">
import { onMounted, useCssModule } from "vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import IconCubeButton from "./input/buttons/IconCubeButton.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label?: string,
    showBackButton?: boolean
}>(), {
    label: "{ PAGE }",
})

const emits = defineEmits<{
    back: []
}>()
</script>

<template>
<div :class="s.container">
    <IconCubeButton
        v-if="showBackButton"
        :class="s.button"
        :icon="SVG.ArrowLeftSmall"
    />
    <h1 :class="[s.label]">{{ label }}</h1>
    <div :class="s.workComponents">
        <slot>
            
        </slot>
    </div>
</div>
</template>

<style module lang='sass'>
.button
    width: 3rem
    margin-right: 1rem

    cursor: pointer

    &:hover
        background: #e8e6e0
 
.container
    top: 0
    position: sticky
    
    display: flex
    align-items: center
    
    width: 100%
    height: 3.5rem
    min-height: 3.5rem
    max-height: 3.5rem
    font-family: var(--font-family)

    background: var(--white)
    padding: 0 1rem
    box-sizing: border-box
    border-radius: var(--border-radius-tiny)
    box-shadow: 0 0 1px 0 var(--faint-border)

    .workComponents
        margin-left: auto
        display: flex
        gap: .5rem

    .label
        font-size: var(--font-size-large)
        color: var(--black)
        font-weight: 700
        letter-spacing: .02em
        margin: 0
        line-height: 2rem
</style>