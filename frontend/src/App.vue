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
import NewHeader from './components/NewHeader.vue';

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
  <div :class="s.flex">
    <PopupPlate v-if="rActivePopups.length != 0">
        <component v-for="({component, props}, i) in rActivePopups" :key="i" 
            :is="component" v-bind="props"/>
    </PopupPlate>

    <NewHeader v-if="isAuthenticated() && isMobile"/>
    <SideHeader v-if="isAuthenticated() && !isMobile"/>
    <Suspense>
        <RouterView />
    </Suspense>
  </div> 
</template>

<style module lang="sass">
@media (min-width: 600px)
    .flex 
        display: flex
        flex-direction: row

@media (max-width: 600px) 
    .flex 
        display: flex
        flex-direction: column

</style>
