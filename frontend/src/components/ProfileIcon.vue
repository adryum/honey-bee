<script setup>

defineProps({
  pathToIcon: String,
  borderWidth: String,
  borderColor: String,
})
</script>

<template>
<div class="icon">
  <img class="image" alt="profile image" :src="pathToIcon">
</div>
</template>

<style scoped>
.icon {
  flex-shrink: 0;
  border: v-bind(borderWidth) solid v-bind(borderColor);
  border-radius: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
}
.icon > img {
  width: 100%;
}
</style>
