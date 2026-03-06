<script setup lang="ts">
import { useCssModule } from "vue";
import UserTable from "../../tables/UserTable.vue";

const s = useCssModule()

</script>

<template>
<div :class="s.container">
    <div
        :class="s.toolbar"
    >
    </div>
    <UserTable />
</div>
</template>

<style module lang="sass">
.toolbar
    display:       flex
    align-items:   center
    height:        3rem
    background:    var(--white)
    padding:       0 .5rem
    border-radius: 0 var(--border-radius-small) var(--border-radius-small) var(--border-radius-small)

.container
    display:        flex
    flex-direction: column
    gap:            1rem
</style>