<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCssModule } from 'vue';
import SideHeader from './ui/components/navigation/SideHeader.vue';
import TopHeader from './ui/components/navigation/TopHeader.vue';
import { useAuthStore } from './core/stores/useAuthStore';
import ActionPopupList from './ui/components/action_notifications/ActionPopupList.vue';

const s = useCssModule()
const store = useAuthStore()

</script>   

<template>
    <div :class="s.skelet">
        <TopHeader 
            v-if="store.user"
        />
          
        <div :class="s.flex">
            <SideHeader
                v-if="store.user"
            />
            <RouterView />
            <ActionPopupList />
        </div> 
    </div>
</template>

<style module lang="sass">
.skelet
    display: flex
    flex-direction: column
    background: var(--background)

.flex
    flex: 1
    display: flex
    flex-direction: row
</style>
