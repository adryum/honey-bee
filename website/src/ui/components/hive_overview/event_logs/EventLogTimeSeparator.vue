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
    @include main.font
    @include main.f-size-very-small
    width: 100%
    text-align: center
    font-weight: 900
    letter-spacing: .02em
    

    border-radius: 2px
    padding: 0.5rem 1rem
    box-sizing: border-box
    background: var(--surface)
    // border-bottom: 8px solid var(--orange) 
    // border-left: 8px solid var(--orange) 
    
</style>