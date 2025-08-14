<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideHeader from './components/SideHeader.vue';
import { isAuthenticated } from './core/repositories/registrationRepository';
import { onMounted, ref, useCssModule, watch } from 'vue';
import router from './router';
import { isEmpty } from './utils/checks';
import { rUser } from './core/repositories/homeRepository';
import CreateApiaryPopup from './components/popups/CreateApiaryPopup.vue';
import { rActivePopups } from './core/popups';
import PopupPlate from './components/popups/PopupPlate.vue';
import TopHeader from './components/TopHeader.vue';

const mediaQuery = window.matchMedia('(max-width: 600px)')
const isMobile = ref(false)

function updateIsMobile(event) {
    isMobile.value = event.matches
    console.log('Media query changed:', event.matches)
}

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
onMounted(() => {
    isMobile.value = mediaQuery.matches
    mediaQuery.addEventListener('change', updateIsMobile)
})
const s = useCssModule()
</script>   

<template>
    <div :class="s.skelet">
        <SideHeader v-if="isAuthenticated() && !isMobile"/>
        <div :class="s.flex">
            <PopupPlate v-if="rActivePopups.length != 0">
                <component v-for="({component, props}, i) in rActivePopups" :key="i" 
                    :is="component" v-bind="props"/>
            </PopupPlate>
            
            <TopHeader/>

            <Suspense>
                <RouterView />
            </Suspense>
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
