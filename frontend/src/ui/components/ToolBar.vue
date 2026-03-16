<script setup lang="ts">
import { onMounted, useCssModule } from "vue";

const props = withDefaults(defineProps<{
    name?: string,
}>(), {
    name: "{ PAGE }",
})

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <h1 :class="[s.name]">{{ name }}</h1>
    <div :class="s.workComponents">
        <slot>
            
        </slot>
    </div>
</div>
</template>

<style module lang='sass'>
 
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

    .name
        font-size: var(--font-size-large)
        color: black
        font-weight: 700
        letter-spacing: .02em
        margin: 0
        line-height: 2rem
</style>