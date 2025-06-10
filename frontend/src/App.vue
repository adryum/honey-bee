<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideHeader from './components/SideHeader.vue';
import { isAuthenticated } from './core/repositories/registrationRepository';
import { useCssModule, watch } from 'vue';
import router from './router';
import { isEmpty } from './utils/checks';
import { rUser } from './core/repositories/homeRepository';
import CreateApiaryPopup from './components/popups/CreateApiaryPopup.vue';
import { rActivePopups } from './core/popups';
import PopupPlate from './components/popups/PopupPlate.vue';

// banishes user to login realm when authentication gets false
watch(rUser, (newValue) => {
        if (isEmpty(newValue)) {
            console.log('Sent to login')
            router.push('/login')
        }
    },
    {
        immediate: true
    }
)
const s = useCssModule()
</script>   

<template>
  <div :class="s.flex">
    <PopupPlate v-if="rActivePopups.length != 0">
        <component v-for="({component, props}, i) in rActivePopups" :key="i" 
            :is="component" v-bind="props"/>
    </PopupPlate>

    <SideHeader v-if="isAuthenticated()"/>
    <Suspense>
        <RouterView />
    </Suspense>
  </div> 
</template>

<style module lang="sass">
.flex 
    display: flex
    flex-direction: row
</style>
