<script setup>
import Icon from './Icon.vue';

const model = defineModel()

defineProps({
    onClick: {
        type: Function,
        default() {
            console.log('click is not defined');
        }
    }
})
</script>

<template>
<form @submit.prevent="onClick()" class="count-container">
    <input v-model="model"></input>
    <div class="icon"
        @click="onClick()"><Icon res="fa-solid fa-magnifying-glass"/></div>
</form>
</template>

<style scoped lang='sass'>
@use '../assets/_colors.sass' as *
.count-container
    display: flex
    position: relative
    align-items: center
    width: 100%
    height: 3rem
    
    .icon
        position: absolute
        right: 0
        background: $base-white
        border-radius: 50%
        height: 100%
        aspect-ratio: 1
        box-sizing: border-box
        box-shadow: 0 0 4px rgba(0, 0, 0, .2)

        &:hover
            filter: brightness(90%)

    input
        all: unset
        width: 100%
        height: 70%
        padding-left: 8px
        padding-right: 3.5rem
        border-radius: 50px
        background: $base-main
        box-shadow: 0 0 4px rgba(0, 0, 0, .2)
</style>