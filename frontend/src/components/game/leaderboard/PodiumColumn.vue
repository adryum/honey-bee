<script setup>
import {PodiumPlace} from "@/main.js";
import ProfileIcon from "@/ui/components/ProfileIcon.vue";

defineProps({
  place: Number,
  pathToIcon: String,
  borderWidth: String,
  borderColor: String,
  username: String,
  userScore: Number
})
</script>

<template>
<div class="column">
<!--  User on top-->
  <h1 class="username">{{ username }}</h1>
  <ProfileIcon :pathToIcon="pathToIcon" :borderColor="borderColor" :borderWidth="borderWidth" iconWidth="50%"/>
<!--  Pillar-->
  <div v-if="place === PodiumPlace.First" class="first pillar">{{userScore}}</div>
  <div v-else-if="place === PodiumPlace.Second" class="second pillar">{{userScore}}</div>
  <div v-else-if="place === PodiumPlace.Third" class="third pillar">{{userScore}}</div>
</div>
</template>

<style scoped>
.pillar {
  box-sizing: border-box;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  font-size: 20px;

}
.username {
  margin: 0;
  text-align: center;
}
.column {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.first {
  width: 75%;
  min-height: 150px;
  background: gold;
}
.second {
  width: 75%;
  min-height: 100px;
  background: silver;
}
.third {
  width: 75%;
  min-height: 50px;
  background: saddlebrown;
}
</style>
