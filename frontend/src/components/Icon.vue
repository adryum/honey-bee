<script setup>
const a = defineProps({
    res: String,
})
</script>

<template>
    <i class="icon" :class="[res]" ></i>
</template>

<style scoped lang='sass'>
.icon
    display: flex
    justify-content: center
    align-items: center

    box-sizing: border-box
    
    aspect-ratio: 1
 
    font-size: 2rem
    transition: .2s

</style>