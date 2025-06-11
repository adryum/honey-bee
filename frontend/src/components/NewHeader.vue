<script setup>
import { ref, useCssModule } from 'vue';
import CubeButtonTranspparent from './buttons/CubeButtonTranspparent.vue';
import Icon from './Icon.vue';
import { rUser } from '@/core/repositories/homeRepository';
const currentView = ref()
const isExtended = ref(false)
const s = useCssModule()
</script>

<template>
<div :class='s.container' @click="isExtended = !isExtended">
    <header :class="s.header">
        <!-- <CubeButtonTranspparent :class="s.icon" res="fa-solid fa-chevron-down"/> -->
        <h1>Title</h1>
        <CubeButtonTranspparent :class="s.down" res="fa-solid fa-chevron-down"/>
    </header>
    <div :class="[!isExtended && s.unextended_list, s.list]">
        <button @click="$router.push('/')"><Icon res="fa-solid fa-house"/>Home</button>
        <button @click="$router.push('/calendar')"><Icon res="fa-solid fa-calendar-days"/>Calendar</button>
        <button @click="$router.push('/apiaries')"><Icon res="fa-solid fa-list"/>Apiaries</button>
        <button @click="$router.push('/hives')"><Icon res="fa-brands fa-hive"/>Hives</button>
        <div :class="s.spacer"></div>
        <button v-if="rUser.role === 'Admin'"@click="$router.push('/users')" 
            ><Icon res="fa-solid fa-crown"/>Admin Powers</button>
        <button @click="logOut()"><Icon res="fa-solid fa-arrow-right-from-bracket"/>Log out</button>
        <button @click="$router.push('/settings')"><Icon res="fa-solid fa-gear"/>Settings</button>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    z-index: 100
    .header
        z-index: 2
        position: relative
        display: flex
        align-items: center
        height: 4rem
        background:  white
        width: 100%

        box-sizing: border-box
        padding: 0 1rem
        box-shadow: 0 0 10px rgba(0, 0, 0, .2)

        
        .down
            margin-left: auto

    .list
        z-index: 1
        position: absolute
        display: flex
        flex-direction: column

        width: 100%
        min-height: calc( 100vh - 4rem )
        bottom: 0
        background: White
        
        transition: .2s

        // border-radius: 0 0 8px 8px 
        border-bottom: 3px solid gray

        font-size: main.$font-size-heading

        > button
            all: unset
            display: flex
            gap: 1rem
            align-items: center
            height: 4rem
            box-sizing: border-box
            padding: 0 1rem
            border-bottom: 1px solid gray 

        .spacer
            border-bottom: 1px solid gray 
            margin-top: auto 
    

.unextended_list
   transform: translateY(-100%)

</style> 