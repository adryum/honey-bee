<script setup>
import Hive from '@/components/Hive.vue';
import { ref } from "vue";
import { user, getHives } from "../core/repositories/homeRepository.js"
import { onMounted } from 'vue';

const hives = ref([])

onMounted(async () => {
    hives.value = await getHives(user.value['account_code'])
})
</script>

<template>
<div class="view-container">
    <div class="header">

    </div>
    <!-- <div class="content-container"> -->
    <div class="page">
        <Hive v-for="hive in hives" :hive="hive"/>
    </div>
    <!-- </div> -->

</div>
</template>

<style scoped lang='sass'>
@use '../assets/colors.sass' as *

.view-container
    display: grid
    width: 100%
    min-height: 100%
    grid-template-areas: "a header header header b" "space space space space space" "left left body right right"
    grid-template-rows: 6rem 1rem 1fr
    grid-auto-columns: 2rem 4rem 1fr 4rem 2rem
    background: $base-main

.header
    position: sticky
    top: 0

    grid-area: header
    border-radius: 0 0 8px 8px
    background-color: $base-dark
    padding: 0 0 10px
    box-sizing: border-box
    box-shadow: 0 0 1.5px .1px black

// .content-container
//     display: grid
//     // grid-area: body
//     // grid-template-columns: 5rem 1fr 5rem
//     // // grid-template-areas: "left body right"
//     width: 100%
//     height: 100% 


.page
    display: grid
    grid-area: body
    justify-content: center

    grid-template-columns: repeat(auto-fit, 320px )
    gap: 3rem
    width: 100%
    
    padding: 5px
    box-sizing: border-box
    background-color: $base-accent
    box-shadow: 0px 0px 0px 0.1px black

</style>