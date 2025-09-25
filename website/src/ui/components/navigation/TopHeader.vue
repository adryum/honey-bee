<script setup lang="ts">
import { useCssModule } from 'vue';


const s = useCssModule()
</script>

<template>
<div :class='s.container'>

</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
@use '@/assets/_colors.sass' as colors
.container
    width: 100%
    min-height: 3rem

    background: hsl(60, 100, 100)
</style>