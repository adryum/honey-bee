<script setup>
import { onMounted, useTemplateRef, watch } from 'vue';
import ApiaryHiveCount from './ApiaryHiveCount.vue';
import Icon from './Icon.vue';
import TextTitle from './input_fields/TextTitle.vue';
import IconCubeButton from './buttons/IconCubeButton.vue';
import { deleteApiary, user } from '@/core/repositories/homeRepository';

const props = defineProps({
  apiary: Object,
  sizeMultiplier: Number,
  onDelete: Function
})
const rContainer = useTemplateRef('container')

watch(rContainer, (newV) => {
    if (newV) {
        newV.style.width = `${props.sizeMultiplier}rem`
    }
})

watch(() => props.sizeMultiplier, (newValue) => {
    if (newValue && rContainer.value) {
        rContainer.value.style.width = `${newValue}rem`
    }
})

const hiveTxt = "Hives"
</script>
<template>
<div id="apiary-container" ref="container">
    <div class="header">
        <TextTitle class="title" v-model="apiary.name"/>
        <div class="buttons">
            <IconCubeButton @click="deleteApiary(user.account_code, apiary['id'], onDelete)" res="fa-solid fa-trash"/>
            <div class="button" style="background: #FFBC50;"><Icon res="fa-solid fa-ellipsis-vertical"/></div> 
        </div>
    </div>
    <div class="content">

        <div class="picture">
            <img src="..\assets\images\apiary.jpg" />
        </div> 
        <div class="hive-type">
            <div class="content">
                <TextTitle v-model="hiveTxt" :isDisabled="true"/>
                <ApiaryHiveCount />
                <ApiaryHiveCount />
                <ApiaryHiveCount />
            </div>
        </div> 
    </div>
    
     
</div>
</template>

<style scoped lang="sass">
@use '../assets/_colors.sass' as *
#apiary-container
    display: grid
    grid-template-areas: 'header header header' 'l content r'
    grid-template-columns: .4rem 1fr .4rem 
    grid-template-rows: 4.5rem 1fr 
   
    aspect-ratio: 1.5 / 1.0 
    
    border-radius: 4px

    // box-shadow: 0 0 7px rgba(0, 0, 0, .2)
.header
    // @extend .hover-select
    grid-area: header
    display: flex
    gap: .4rem
    background: #BCA89E
    border-radius: 4px
    padding: 6px .8rem 6px .8rem
    box-shadow: 0 0 2px rgba(0, 0, 0, .2)

    .title
        flex: 2
    .buttons
        display: flex
        flex: .8
        justify-content: space-between

    .button 
        // @extend .hover-select
        background: $base-accent
        height: 100%
        aspect-ratio: 1
        border-radius: 4px
        box-sizing: border-box
        // box-shadow: 0 0 2px rgba(0, 0, 0, .2)
        transition: filter .3s 

.content
    grid-area: content
    background: $base-light

    display: flex
    gap: .4rem
    border-radius: 0 0 4px 4px
    padding: .4rem
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1)

.hive-type
    flex: .8
    display: flex
    flex-direction: column
    gap: 4px
    grid-area: hive-type

    .content
        display: flex
        flex-direction: column
        justify-content: space-between
        height: 100%
        padding: 0 10px 10px 10px
        border-radius: 2px
        background: $base-second
        box-shadow: 0 0 2px rgba(0, 0, 0, .2)


.picture
    flex: 2
    background: $base-second
    border-radius: 6px
    overflow: hidden
    // border: 2px solid $base-dark
    box-shadow: 0 0 2px rgba(0, 0, 0, .2)

    img
        width: 100%
        height: 100%
        object-fit: cover
        transition: .8s

        &:hover
            scale: 1.1
            filter: brightness(90%)

// .hover-select
//     transition: filter .3s
//     &:hover
//         filter: brightness(90%)
//         border: 2px solid $special-dark
</style>
        
