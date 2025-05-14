<script setup>
import {TabNumber} from "@/main.js";

defineProps({
  tabChoices: Object,
  selectedTab: Number,
})

const emits = defineEmits(['onCreateItem'])
</script>

<template>
  <div class="container">
    <div class="display-flex-row" v-if="selectedTab === TabNumber.Inventory">
      <button @click="emits('onCreateItem')">+</button>
      <button>X</button>
    </div>
    <div class="display-flex-row" v-if="selectedTab === TabNumber.Home">
      <button @click="$router.push('login')" ><i class="fa-solid fa-right-to-bracket"></i></button>
    </div>
    <button><i class="fa-solid fa-moon"></i></button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 5rem;
  background: linear-gradient(90deg, orange, #ff8c0b);
}
button {
  font-size: 40px;
  aspect-ratio: 1/1;
  background: transparent;
  backdrop-filter: brightness(80%);
}
.chooser {
  display: flex;
}
h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin: 0 auto 0 21rem;
}
.header-container {
  position: absolute;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: var(--header-height);
  z-index: 100;
}
.top-header-part {
  flex: 1;
  width: 100%;
  background: linear-gradient(90deg, #c66c06, #fff200);
}
.bottom-header-part {
  display: flex;
  justify-content: space-evenly;

  width: 100%;
  background: #323030;
}
.choice {
  display: flex;
  justify-content: center;
  flex: auto;
  font-size: 2vw;
  color: #ffd7b1;
  text-decoration: none;
  box-shadow: black 2px 2px 8px 0;

  /* removes default styling */
  padding: 0;
  border: none;
  background: #323030;
}
.choice:hover {
  box-shadow: black 2px 2px 8px 0 inset;
}
.selected {
  filter: brightness(80%);
  box-shadow: black 2px 2px 8px 0 inset;
}
</style>
