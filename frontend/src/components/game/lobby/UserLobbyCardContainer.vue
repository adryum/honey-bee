<script setup>

import UserLobbyCard from "@/ui/components/game/lobby/UserLobbyCard.vue";
</script>

<template>
<div class="container">
  <UserLobbyCard class="pop-out-centered-shadow cut-rounded-border"/>
  <UserLobbyCard class="pop-out-centered-shadow cut-rounded-border"/>
</div>
</template>

<style scoped>
.container {
  perspective: 1000px;
  overflow-y: scroll;
}
</style>
