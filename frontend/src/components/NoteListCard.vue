<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="task-card">
    <div class="time">{{time}}</div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style scoped>
.task-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 3em;
  font-weight: 700;
  text-align: center;

  border-radius: 4px;
  background: white;
  transition: ease-in-out 0.2s;
}
.task-card:hover {
  transform: translateX(10px);
}
.time {
  position: absolute;
  top: 0;
  right: 0;
  font-size: .5em;
  padding: 0.25em;
}
</style>
