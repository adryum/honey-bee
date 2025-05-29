<script setup>
import Icon from '../Icon.vue';

defineProps({
    res: {
        type: String,
        default: 'fa-regular fa-circle'
    }
})

</script>

<template>
    <Icon class="button" :res="res"/>
</template>

<style scoped lang='sass'>
.button
    height: 100%
    aspect-ratio: 1
    border-radius: 4px

    &:hover
        cursor: pointer
        font-size: 35px
        filter: brightness(80%)
</style>