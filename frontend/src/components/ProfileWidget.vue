<script setup>
import ProfileIcon from "@/ui/components/ProfileIcon.vue";

defineProps({
  pathToIcon: String,
  username: String,
  borderColor: String,
})
</script>

<template>
  <div class="wrapper">
    <div class="upper-part">
      <profile-icon :borderColor="borderColor" :pathToIcon="pathToIcon" border-width="5px"/>
      <div class="name"><h1>{{ username }}</h1></div>
    </div>
    <div class="experience"></div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;

  height: 150px;
  background: var(--lighter-dark-color);
}
.upper-part {
  margin: 6px;
  display: flex;
  flex: 2;
  gap: 10px;
  overflow: hidden;
}
img {
  border: 5px solid v-bind(borderColor);
  aspect-ratio: 1/1;
  border-radius: 100%;
  background: cadetblue;
}
.name {
  margin: auto;
}
.name > h1 {
  color: var(--font-color-main);
  font-size: clamp(1.5rem,2vw, 3.5rem);
  margin: 0;
}
.experience {
  flex: 1;
  align-self: center;
  width: calc(100% - 12px);
  background: #789197;
}
</style>
