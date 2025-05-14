<script setup>
import { pages } from "../core/data.js";
import { ref } from "vue";
import Icon from "./Icon.vue";
import { logOut } from "@/core/repositories/registration.js"
defineProps({
    
})

const isExtended = ref(false)
function toggleExtention() {
    isExtended.value = !isExtended.value
}

</script>

<template>
<div class="base" :class="{'base-extended': isExtended}">
    <div class="profile-picture cube-button"></div>
    <hr class="hor-hr" >
    <div class="page" :class="{'page-extended': isExtended}" v-for="page in pages">
        <Icon class="cube" :res="page.res"/>
        <div class="text" v-if="isExtended">
            {{ page.name }}
        </div>
    </div>
    <div style="flex: 1;"></div>
    <hr class="hor-hr" >
    <Icon 
        class="cube-button" 
        res="fa-solid fa-angle-right" 
        :isExpanded="isExtended"
        @click="toggleExtention"
    />
    <Icon 
        class="cube-button" 
        res="fa-solid fa-angle-right" 
        :isExpanded="isExtended"
        @click="logOut()"
    />
    <RouterLink to='/about'/>
    <div class="cube-button">Settings</div>
</div>
</template>

<style scoped lang='sass'>
.base 
    margin: 0
    padding: .5rem
    box-sizing: border-box
    display: flex
    flex-direction: column
    align-items: center
    gap: 1rem
    box-shadow: 1px 0px 5px black

    height: 100vh
    width: 5rem

    background-color: rgb(129, 127, 127)
    transition: .3s
.base-extended
    width: 20rem

.page 
    display: flex
    flex-direction: row
    align-items: center
    border-radius: .3rem
    height: 4rem
    width: 100%
    background-color: aliceblue

    transition: 0.2s

    .text 
        width: 0px
        font-size: 2rem
        transition-delay: 1s
        opacity: 0
        

    
.page-extended
    aspect-ratio: none
    &:hover 
        scale: 1.02
    
    .text
        opacity: 1


.cube
    border-radius: .3rem
    height: 4rem
    width: 4rem
    background-color: aliceblue
    transition: 0.2s

.cube-button
    @extend .cube

    &:hover 
        scale: 1.05
        filter: brightness(80%)

.profile-picture 
    border-radius: 50%

.hor-hr 
    border: none
    height: 1px
    background-color: white
    min-width: 80%

</style>