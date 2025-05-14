<script setup>
import MessageList from "@/ui/components/game/chat/MessageList.vue";

import Podium from "@/ui/components/game/leaderboard/Podium.vue";
import DropdownToggleButton from "@/ui/components/buttons/DropdownToggleButton.vue";
import {ref} from "vue";
import {leaderboardDataArrayToUserMessageModelArray} from "@/core/models/UserMessageModel.js";

defineProps({
  gameStats: Array
})

let isLeaderboardExpanded = ref(false)

function sortStatsByScoreDESC(userArray) {
  let arrayClone = userArray.map((x) => x)
  return arrayClone.sort((userA, userB) => {return userB.score - userA.score})
}
function sortStatsByScoreASC(userArray) {
  let arrayClone = userArray.map((x) => x) // Returns arr with given action performed on each element
  return arrayClone.sort((userA, userB) => {return userA.score - userB.score})
}
function removeHighestScoresFromTop(arr, amount) {
  return sortStatsByScoreDESC(arr).splice(amount)
}
</script>

<template>
<div class="wrapper">
  <div class="title"><strong>LeaderBoard</strong></div>
  <hr class="hr-horizontal">
  <Podium :gameScore="sortStatsByScoreDESC(gameStats)"/>
  <hr class="hr-horizontal">
  <DropdownToggleButton title="Others"
                        :isOpen="isLeaderboardExpanded"
                        @isOpen="(bool) => {isLeaderboardExpanded = bool}"
  />
  <MessageList v-if="isLeaderboardExpanded" :messages="leaderboardDataArrayToUserMessageModelArray(removeHighestScoresFromTop(gameStats,3))"/>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  background: var(--dark-color-background);
}
.separator {
  margin: 0;
  align-self: center;
  height: 2px;
  width: 70%;
  border-radius: 50px;
  background: white;
}
.title {
  padding: 8px;
}
</style>
