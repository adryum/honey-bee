<script setup lang="ts">
import { useCssModule } from "vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    Toolbar
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    background: var(--light)
</style>