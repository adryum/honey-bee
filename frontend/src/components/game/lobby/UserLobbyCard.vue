<script setup>
import ProfileIcon from "@/ui/components/ProfileIcon.vue";
</script>

<template>
<div class="card">
  <div class="top">
    <div class="readiness-bar"></div>
    <button>...</button>
  </div>
  <ProfileIcon class="icon" border-width="5px" border-color="red"/>
  <div class="username title"><strong>USERNAME</strong></div>
  <div class="level"><strong>Level</strong></div>
</div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 10px;
  width: 15em;
  height: 20em;
  background: var(--lighter-dark-color);
  transform: rotateX(2deg);
}
.top {
  display: flex;
  margin-top: 8px;
  gap: 10px;
  height: 30px;
  width: 100%;
}
.top > button {
  flex: 1;
  border-radius: 8px 0 0  8px;
  border: none;
  aspect-ratio: 1/1;
}
.icon {
  width: 60%;
}
.readiness-bar {
  flex: 5;
  background: green;
  border-radius: 0 16px 16px 0;
}
.username {
  font-size: 2rem;
}
.level {
  font-size: 1.5rem;
  color: var(--font-color-main)
}
</style>
