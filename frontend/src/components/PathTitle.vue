<script setup>
import { useCssModule } from 'vue';


const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.path"></div>
    <h1 :class="s.title"></h1>
</div>
</template>

<style module lang='sass'>
.container
    
</style>