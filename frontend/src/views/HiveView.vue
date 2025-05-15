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
    <div class="content-container">
        <div class="page">
            <Hive v-for="hive in hives" :hive="hive"/>
        </div>
    </div>

</div>
</template>

<style scoped lang='sass'>

.view-container
    width: 100%
    min-height: 100%

    .header
        position: sticky
        top: 0

        height: 6rem
        grid-area: header
        background-color: rgba(60, 80, 90, 1)
        margin: 0 0 10px

.content-container
    display: grid
    grid-template-columns: 5rem 1fr 5rem
    grid-template-areas: "left body right"
    width: 100%

    .page
        display: grid
        grid-area: body
        justify-content: center
    
        grid-template-columns: repeat(auto-fit, 320px )
        gap: 3rem
        width: 100%
        
        padding: 5px
        box-sizing: border-box
        background-color: aliceblue
        box-shadow: 0px 0px 2px 0.1px black
    
</style>