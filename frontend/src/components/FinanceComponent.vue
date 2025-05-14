<script setup>
import ItemCard from "@/ui/components/cards/ItemCard.vue";

defineProps({
  apiaryList: Array
})
</script>

<template>
  <ItemCard v-for="i in 1" :key="i"/>
</template>

<style scoped>

</style>
