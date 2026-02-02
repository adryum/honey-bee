<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCssModule, watch } from 'vue';
import router from './core/router';
import { RegistrationRepository } from './core/repositories/RegistrationRepository';
import SideHeader from './ui/components/navigation/SideHeader.vue';
import TopHeader from './ui/components/navigation/TopHeader.vue';

const s = useCssModule()
const isAuthenticated = RegistrationRepository.isAuthenticated

watch(isAuthenticated, (newVal: any) => {
    console.log(`new auth value : ${newVal}`);
    
    if (!newVal) {
        console.log('Pushed to login');
        router.push('/login')
    }
}, { immediate: true })
</script>   

<template>
    <div :class="s.skelet">
        <SideHeader v-if="isAuthenticated"/>
        <div :class="s.flex">
            <TopHeader v-if="isAuthenticated"/>
            <RouterView />
        </div> 
    </div>
</template>

<style module lang="sass">
.skelet
    display: flex
    flex-direction: row

.flex
    flex: 1
    display: flex
    flex-direction: column
</style>
