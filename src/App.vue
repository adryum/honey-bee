<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainView from './views/MainView.vue';
import SideHeader from './components/SideHeader.vue';
</script>

<template>

  <div class="flex">
    <SideHeader/>
    <MainView/>
  </div>

<!-- <nav>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
</nav> -->
  <RouterView />
</template>

<style scoped>
.flex {
    display: flex;
    flex-direction: row;
}
</style>
