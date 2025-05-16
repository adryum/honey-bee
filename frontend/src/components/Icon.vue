<script setup>
const a = defineProps({
    res: String,
    isExpanded: Boolean
})
</script>

<template>
    <i class="icon" :class="[res, {'expanded' : isExpanded}]" ></i>
</template>

<style scoped lang='sass'>
.icon
    display: flex
    justify-content: center
    align-items: center

    padding: .2rem
    box-sizing: border-box
    height: 100%
    width: 100%
    
    font-size: 2rem
    transition: .2s
.expanded
    transform: rotateZ(180deg)
</style>