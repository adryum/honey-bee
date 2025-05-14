<script setup>
import ApiaryCard from "@/ui/components/cards/ApiaryCard.vue";

defineProps({
  apiaryList: Array
})
</script>

<template>
  <ApiaryCard v-for="i in 10" :key="i"/>
</template>

<style scoped>

</style>
