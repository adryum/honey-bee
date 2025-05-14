<script setup>
const props = defineProps({
  text: String,
  isOpen: Boolean
})
const emits = defineEmits(['onChange'])


function checkBox() {
  emits("onChange", !props.isOpen)
}
</script>

<template>
<div class="checkbox-container">
  <input @click="checkBox" :value="props.isOpen" type="checkbox"/>
  <p>{{ text }}</p>
</div>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  gap: 10px;
}
.checkbox-container > * {
  margin: 0;
}
input {
  aspect-ratio: 1/1;
  width: 1rem;
}
</style>
