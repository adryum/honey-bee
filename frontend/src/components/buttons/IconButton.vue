<script setup>
import Icon from '../Icon.vue';

defineProps({
    text: {
        type: String,
        default: 'asd'
    }
})
</script>

<template>
<div class="b-container">
    <Icon class="icon" res="fa-solid fa-plus"/>
    <p class="text">{{ text }}</p>
</div>
</template>

<style scoped lang='sass'>
@use '@/assets/_colors.sass' as *
.b-container
    display: flex
    flex-direction: row
    align-items: center

    padding: 4px 16px 4px 4px
    border-radius: 4px
    gap: 8px

    box-sizing: border-box
    background: $base-white
    border: 2px solid white
    box-shadow: 0 0 4px rgba(0, 0, 0, .2)
    transition: .3s

    &:hover
        cursor: pointer
        background: rgba(225, 225, 225, 1)

    .text
        min-width: 3rem
        margin: 0
    
        font-size: 24px
        // padding-bottom: 1px 
        
</style>