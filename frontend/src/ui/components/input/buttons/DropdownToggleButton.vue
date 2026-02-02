<script setup>

const props = defineProps({
  title: String,
  isOpen: Boolean
})

const emits = defineEmits(["isOpen"])

function toggleBool() {
  emits("isOpen", !props.isOpen)
}
</script>

<template>
  <div class="top">
    <div class="title"><strong>{{ title }}</strong></div>
    <button @click="toggleBool">X</button>
  </div>
</template>

<style scoped>
.top {
  display: flex;
  padding: 8px;
  background: var(--light-grayer-dark-color);
}
.top > button {
  aspect-ratio: 1/1;
  width: 50px;
  margin-left: auto;
}
</style>
