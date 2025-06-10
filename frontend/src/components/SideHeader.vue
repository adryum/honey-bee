<script setup>
// import { pages } from "../core/data.js";
import { ref } from "vue";
import Icon from "./Icon.vue";
import { logOut } from "@/core/repositories/registrationRepository.js"
import { rUser } from "@/core/repositories/homeRepository.js"
defineProps({
    
})

 const pages = [
    { 
        "name" : "Home",
        "res" : "fa-solid fa-house",
        "linkTo": "/"
    },
    { 
        "name" : "Calendar",
        "res" : "fa-solid fa-calendar-days",
        "linkTo": "/calendar"
    },
    { 
        "name" : "Apiaries",
        "res" : "fa-solid fa-list",
        "linkTo": "/apiaries"
    },
    { 
        "name" : "Hives",
        "res" : "fa-brands fa-hive",
        "linkTo": "/hives"
    }
]

const isExtended = ref(false)
function toggleExtention() {
    isExtended.value = !isExtended.value
}

</script>

<template>
<div class="base" :class="{'base-un-extended': !isExtended, 'base-extended': isExtended}">
    
    <div class="count-container">
        <div class="icon"></div>
        <div class="background"><p v-if="isExtended">{{ rUser.name }}</p>
    </div>
    

    </div>
    <hr class="hor-hr" >
    <div v-for="page in pages"
        class="page" 
        :class="{'page-extended': isExtended}"
        @click="$router.push(page.linkTo)" 
    >
        <Icon class="cube" :res="page.res"/>
        <div class="text" v-if="isExtended">
            {{ page.name }}
        </div>
    </div>
    <div style="flex: 1;"></div>
    <hr class="hor-hr" >
    <div class="bottom-container" style="">
        <Icon 
            class="cube" 
            res="fa-solid fa-angle-right" 
            :isExpanded="isExtended"
            @click="toggleExtention"
        />
        <Icon v-if="isExtended"
            class="cube" 
            res="fa-solid fa-arrow-right-from-bracket" 
            :isExpanded="isExtended"
            @click="logOut()"
        />
        <Icon v-if="isExtended"
            class="cube" 
            res="fa-solid fa-gear" 
            :isExpanded="isExtended"
            @click="$router.push('/settings')"
        />
    </div>
</div>
</template>

<style scoped lang='sass'>
@use '../assets/_colors.sass' as *
.count-container
    display: flex
    position: relative
    align-items: center
    width: 100%
    height: 4rem
    
    .icon
        position: absolute
        background: $special-accent
        border-radius: 50%
        height: 100%
        aspect-ratio: 1

    .background
        display: flex
        justify-content: end
        align-items: center
        width: 100%
        height: 70%
        padding-right: 8px
        margin-left: 20px
        border-radius: 20px
        background: $special-base

        p
            margin: 0
            width: 100%
            font-size: 20px
            text-align: center

.base 
    position: sticky
    top: 0

    margin: 0
    padding: .5rem .5rem 0 .5rem
    box-sizing: border-box

    display: flex
    flex-direction: column
    align-items: center
    gap: 1rem
    box-shadow: 0px 0px 2px .1px black

    height: 100vh
    width: 5rem

    background-color: $special-dark
    transition: .3s

.base-un-extended
    

.base-extended
    width: 20rem

    .page
        align-self: flex-start
        display: flex
        align-items: center
        width: 95%
        height: 4rem

        border-radius: 10px
        background: $base-white
        

.bottom-container
    display: flex
    justify-content: space-evenly

    width: 100%
    border-radius: 10px 10px 0 0
    padding: .8rem 0 
    background: $special-accent
.cube
    height: 4rem
    width: 4rem
    border-radius: 4px
    background: $base-white

.hor-hr 
    margin: 0
    border: none
    height: 3px
    border-radius: 10px
    background-color: white
    min-width: 90%

</style>