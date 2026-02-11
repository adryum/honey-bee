<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, useCssModule, watch } from 'vue';
import SideHeader from './ui/components/navigation/SideHeader.vue';
import TopHeader from './ui/components/navigation/TopHeader.vue';
import { useMainStore } from './core/stores/MainStore';

const s = useCssModule()
const mainstore = useMainStore()    
onMounted(async () => {
    await mainstore.authenticateUser()
})
</script>   

<template>
    <div :class="s.skelet">
        <TopHeader 
          
        />
        <div :class="s.flex">
            <SideHeader />
            <RouterView />
        </div> 
    </div>
</template>

<style module lang="sass">
.skelet
    display: flex
    flex-direction: column

.flex
    flex: 1
    display: flex
    flex-direction: row
</style>
