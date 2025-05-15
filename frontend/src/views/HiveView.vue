<script setup>
import Hive from '@/components/Hive.vue';


</script>

<template>

<div class="view-container">
    <div class="header">

    </div>
    <div class="content-container">
        <div class="page">
            <Hive v-for="hive in hives"/>
            <Hive/>
            <Hive/>
            <Hive/>
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
        grid-area: body
        display: grid
        gap: 3rem

        background-color: aliceblue
        box-shadow: 0px 0px 2px 0.1px black

    
</style>