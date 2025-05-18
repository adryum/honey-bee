<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideHeader from './components/SideHeader.vue';
import { isAuthenticated } from './core/repositories/registrationRepository';
import { watch } from 'vue';
import router from './router';
import { isEmpty } from './utils/checks';
import { user } from './core/repositories/homeRepository';

// banishes user to login realm when authentication gets false
watch(user, (newValue) => {
        if (isEmpty(newValue)) {
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
        <SideHeader v-if="isAuthenticated()"/>
    <Suspense>
        <RouterView />
    </Suspense>
  </div> 
</template>

<style scoped lang="sass">
.flex 
    display: flex
    flex-direction: row
</style>
