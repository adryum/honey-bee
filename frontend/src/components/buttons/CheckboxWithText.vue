<script setup>
const model = defineModel()
const props = defineProps({
  text: String,
})
</script>

<template>
<div class="checkbox-container">
  <input type="checkbox" v-model="model"/>
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
