<script setup>
import SignUpWidget from "@/ui/components/registration/SignUpWidget.vue";
import BackgroundWidget from "@/ui/components/BackgroundWidget.vue";
import {BackgroundType} from "@/main.js";
</script>

<template>
  <main>
    <BackgroundWidget :type="BackgroundType.DimmedAndBlurred" src="/src/ui/assets/images/honeyCombWall.jpg" alt="honey-comb-wall"/>
    <SignUpWidget/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
}
</style>