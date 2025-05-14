<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideHeader from './components/SideHeader.vue';
import { isAuthenticated } from './core/repositories/registration';
import { watch } from 'vue';
import router from './router';

watch(isAuthenticated, (newValue) => {
        console.log(newValue)
        if (!newValue) {
            console.log('Sent to login')
            router.push('/login')
        }
    },
    {
        immediate: true
    }
)
</script>

<template>
  <div class="flex">
    <SideHeader v-if="isAuthenticated"/>
    <RouterView />
  </div> 
</template>

<style scoped>
.flex {
    display: flex;
    flex-direction: row;
}
</style>
