<script setup>
import ApiaryHiveCount from './ApiaryHiveCount.vue';
import Icon from './Icon.vue';

defineProps({
  apiary: Object
})
</script>

<template>
<div class="apiary-container">
    <div class="title">
        <input :value="apiary.name" />
    </div>
    <div id="edit" class="button"><Icon res="fa-solid fa-pencil"/> </div>
    <div id="options" class="button"><Icon res="fa-solid fa-ellipsis-vertical"/></div>
    <div class="picture">
        <img src="..\assets\images\apiary.jpg" />
    </div>
    <div class="hive-type">
        <div class="name">Hives</div>
        <div class="content">
            <ApiaryHiveCount />
            <ApiaryHiveCount />
            <ApiaryHiveCount />
        </div>
    </div>
</div>
</template>

<style scoped lang="sass">
@use '../assets/_colors.sass' as *
.apiary-container
    display: grid
    grid-template-areas: 'title button1 button2' 'picture hive-type hive-type'
    grid-template-columns: 1fr 4rem 4rem 
    grid-template-rows: 4rem 1fr 
    gap: .5rem

    width: 30rem
    height: 20rem

    box-sizing: border-box
    padding: .5rem
    background: $base-light
    border-radius: 4px

    box-shadow: 0 0 10px rgba(0, 0, 0, .2)

#edit
    grid-area: button1

#options
    grid-area: button2

.button 
    @extend .hover-select
    background: $base-accent
    border-radius: 4px
    box-sizing: border-box

    transition: filter .3s 

.hive-type
    display: flex
    flex-direction: column
    gap: 4px
    grid-area: hive-type
    background: $base-main
    border-radius: 4px
    padding: 4px

    .name
        font-size: 30px
        text-align: center
        border-radius: 2px
        padding: 2px
        background: $base-second

    .content
        display: flex
        flex-direction: column
        justify-content: space-between
        height: 100%
        padding: 10px
        border-radius: 2px
        background: $base-second

.title
    @extend .hover-select
    grid-area: title
    background: $base-second
    border-radius: 4px
    padding: .2rem


    input
        all: unset
        width: 100%
        height: 100%
        background: $base-main
        border-radius: 2px
        font-size: 40px
        text-align: center
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden


.picture
    grid-area: picture
    background: $base-second
    border-radius: 6px
    overflow: hidden
    // border: 2px solid $base-dark
    box-shadow: 0 0 2px rgba(0, 0, 0, .4)

    img
        width: 100%
        height: 100%
        object-fit: cover
        transition: .8s

        &:hover
            scale: 1.1
            filter: brightness(90%)

.hover-select
    transition: filter .3s 
    &:hover
        filter: brightness(90%)
        border: 2px solid $special-dark
</style>
        
