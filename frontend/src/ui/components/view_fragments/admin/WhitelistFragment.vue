<script setup lang="ts">
import { useCssModule } from "vue";
import WhitelistTable from "../../tables/WhitelistTable.vue";
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <WhitelistTable/>
</div>
</template>

<style module lang="sass">
.container
    display:        flex
    flex-direction: column
    gap:            1rem
</style>