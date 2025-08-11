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
.container
    width: 100%
    min-height: 4rem

    background: #F9EDDC
</style>