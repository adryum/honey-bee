<script setup lang="ts">
import { useCssModule } from "vue";

const s = useCssModule()
</script>

<template>
<p :class="s.container">
    04/07/2004 aka. random piektdiena
</p>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    width: 100%
    text-align: center
    font-weight: 700
    letter-spacing: .02em
    

    border-radius: 2px
    padding: 0.5rem 1rem
    box-sizing: border-box
    font-size: var(--font-size-medium)
    font-family: var(--font-family)
    background: var(--gray)
    box-shadow: inset 0 0 1px 0 var(--faint-border)
</style>