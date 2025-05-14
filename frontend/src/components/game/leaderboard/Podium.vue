<script setup>
import PodiumColumn from "@/ui/components/game/leaderboard/PodiumColumn.vue";
import {PodiumPlace} from "@/main.js";

defineProps({
  gameScore: Array
})
</script>

<template>
<div class="podium">
  <PodiumColumn
    :place="PodiumPlace.Second"
    :username="gameScore[1].username"
    borderWidth="5px"
    :borderColor="gameScore[1].borderColor"
    :userScore="gameScore[1].score"
  />
  <PodiumColumn
    :place="PodiumPlace.First"
    :username="gameScore[0].username"
    borderWidth="5px"
    :borderColor="gameScore[0].borderColor"
    :userScore="gameScore[0].score"
  />
  <PodiumColumn
    :place="PodiumPlace.Third"
    :username="gameScore[2].username"
    borderWidth="5px"
    :borderColor="gameScore[2].borderColor"
    :userScore="gameScore[2].score"
  />
</div>
</template>

<style scoped>
.podium {
  display: flex;
  justify-content: center;
}

</style>


