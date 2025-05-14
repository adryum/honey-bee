<script setup>
import { useTemplateRef} from "vue";

const props = defineProps({
  selectedTab: Number,
  topTabs : Array,
  bottomTabs : Array,
  isSidebarExtended : Boolean
})
const emits = defineEmits(['onClick'])
function selectTab(tabNumber) {
  console.log(tabNumber)
  emits('onClick', tabNumber)
}

function toggleSidebar() {
  emits('onSidebarToggle', !props.isSidebarExtended)
}

const sidebar = useTemplateRef('sidebar')
</script>

<template>
<div ref="sidebar" :class="isSidebarExtended ? 'slide-in' : 'slide-out'" class="container">
  <h1>Honey Bee</h1>

<!--  <div class="image-div"><img src="/src/ui/assets/images/gas.jpg" alt="asd"/></div>-->
  <ul v-for="(tab, index) in topTabs" :key="index"
      :class="{'selected' : (topTabs[index].tabNumber === selectedTab)}"
      @click="selectTab(topTabs[index].tabNumber)"
  >
    <i :class="topTabs[index].iconClass"></i>
    {{ tab.name }}
  </ul>

  <hr class="bottom-pusher">
  <div class="view-links">
    <router-link to="about">About</router-link>
    <router-link to="contact">Contact</router-link>
    <router-link to="settings">Settings</router-link>
  </div>
  <button class="toggle-button" @click="toggleSidebar">{{ (isSidebarExtended) ? "Close" : "Open" }}</button>
</div>
</template>

<style scoped>
.slide-in {
  animation: slide-in-the-view;
  animation-duration: .3s;
  animation-fill-mode: forwards;
}
.slide-out {
  animation: slide-out-of-view;
  animation-duration: .3s;
  animation-fill-mode: forwards;
}
@keyframes slide-out-of-view {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);

  }
}
@keyframes slide-in-the-view {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
h1 {
  display: flex;
  align-items: center;
  margin: 0;
  height: 5rem;
  padding-left: 30px;
}
.container {

  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  box-sizing: border-box;

  height: 100%;
  background: linear-gradient( #ffe0bc, #ffd3a6);
}
.image-div {
  object-fit: cover;
}
.image-div > img {
  width: 100%;
  height: 100%;
}
.view-links > * {
  color: black;
  text-decoration: none;
  padding-left: 40px;
}
ul, .view-links > * {
  gap: 10px;
  font-family: Ebrima;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 20px;
  height: 4rem;
  border-radius: 0 50px 50px 0;
}
ul:hover:not(.selected), .view-links > *:hover {
  background: rgba(180, 180, 0, .3);
}
.bottom-pusher {
  margin-top: auto;
}
.selected {
  background: linear-gradient(90deg, coral, orange);
}
.toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;

  position: absolute;
  right: -4rem;

  height: 5rem;
  width: 4.5rem;

  border-radius: 30px 50% 50% 20px;
  border: none;
  background: linear-gradient(30deg, #9e7373, #bf6161);
  cursor: pointer;
}
</style>
