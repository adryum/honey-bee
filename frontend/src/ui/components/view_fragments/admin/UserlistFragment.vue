<script setup lang="ts">
import { useCssModule } from "vue";
import UserTable from "../../tables/UserTable.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <UserTable />
</div>
</template>

<style module lang="sass">
.container
    display:        flex
    flex-direction: column
    gap:            1rem
</style>