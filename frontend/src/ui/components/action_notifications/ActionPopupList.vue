<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import { ActionType, useActionsStore } from "@/core/stores/ActionStore";
import PlainMessageActionPopup from "./PlainMessageActionPopup.vue";

const s = useCssModule()
const actionsStore = useActionsStore()

const showedActions = computed(() => {
    return actionsStore.actions.filter(item => item.isVisible)
})
</script>

<template>
<div :class="s.container">
    <PlainMessageActionPopup
        v-for="action in showedActions"
        :key="action.id"
        :action="action"
    />
</div>
</template>

<style module lang='sass'>
.container
    position: fixed
    display: flex
    flex-direction: column
    gap: .5rem
    bottom: 1.5rem
    right: 1.5rem
    width: 30rem
</style>