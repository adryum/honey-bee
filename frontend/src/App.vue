<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCssModule } from 'vue';
import SideHeader from './ui/components/navigation/SideHeader.vue';
import TopHeader from './ui/components/navigation/TopHeader.vue';

const s = useCssModule()

</script>   

<template>
    <div :class="s.skelet">
        <TopHeader />
          
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
    background:  color-mix(in srgb, var(--black) 5%, var(--white) )


.flex
    flex: 1
    display: flex
    flex-direction: row
</style>
