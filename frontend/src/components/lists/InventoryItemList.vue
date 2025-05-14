<script setup>
import ItemCard from "@/ui/components/cards/ItemCard.vue";

defineProps({
  apiaryList: Array,
  selectedProperties: Array
})

const itemList = [
  {
    "name" : "Item",
    "availableAmount" : 4,
    "imageSRC" : "/src/ui/assets/images/axe.jpg"
  },
  {
    "name" : "Item",
    "availableAmount" : 4,
    "imageSRC" : "/src/ui/assets/images/axe.jpg"
  },
  {
    "name" : "Item",
    "availableAmount" : 4,
    "imageSRC" : "/src/ui/assets/images/axe.jpg"
  },
  {
    "name" : "Item",
    "availableAmount" : 4,
    "imageSRC" : "/src/ui/assets/images/axe.jpg"
  },
  {
    "name" : "Item",
    "availableAmount" : 4,
    "imageSRC" : "/src/ui/assets/images/axe.jpg"
  },
]
</script>

<template>
  <div class="container">
    <ItemCard v-for="(item, index) in itemList"
              :key="index"
              :src="item.imageSRC"
              :name="item.name"
    />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20rem);
  grid-template-rows: repeat(auto-fill, 25rem);


  margin: 10px;
  gap: 10px;
}
</style>
