<script setup>
import {BackgroundType} from "@/main.js";

defineProps({
  src: String,
  alt: String,
  type: Number
})

function getClass(type) {
  return {
    'background blurred': type === BackgroundType.Blurred,
    'background dimmed': type === BackgroundType.Dim,
    'background blurred dimmed': type === BackgroundType.DimmedAndBlurred
  }
}
</script>

<template>
  <img :class="getClass(type)" :src="src" :alt="alt">
</template>

<style scoped>
.blurred {
  filter: blur(4px);
}
.dimmed {
  filter: brightness(65%);
}
.blurred.dimmed {
  filter: blur(4px) brightness(65%);
}
.background {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
