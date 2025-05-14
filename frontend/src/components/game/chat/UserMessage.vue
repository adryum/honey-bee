<script setup>
import ProfileIcon from "@/ui/components/ProfileIcon.vue";

defineProps({
  UserMessageModel: Object
})
</script>

<template>
<div class="wrapper">
  <ProfileIcon border-width="5px" :borderColor="UserMessageModel.borderColor" :path-to-icon="UserMessageModel.pathToIcon"/>
  <p :style="{color: UserMessageModel.borderColor}">{{ UserMessageModel.username }}:</p>
  <p>{{ UserMessageModel.message }}</p>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  padding: 8px;

  gap: 10px;
  width: calc(100% - 16px);
  height: 60px;
  background: var(--dark-color-background);
}
.icon {
  aspect-ratio: 1/1;
  border-radius: 100%;
  background: #ffd7b1;
}
.wrapper > p {
  margin: 0;
  font-size: clamp(1rem, 2rem, 3rem);
  color: white;
  align-self: center;
}

</style>
