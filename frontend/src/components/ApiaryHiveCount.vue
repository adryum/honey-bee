<script setup>

</script>

<template>
<div class="count-container">
    <div class="icon"></div>
    <div class="background"><p>???</p></div>
    
</div>
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
        background: orange
        border-radius: 50%
        height: 100%
        aspect-ratio: 1

.background
    display: flex
    justify-content: end
    align-items: center
    width: 100%
    height: 70%
    padding-right: 8px
    border-radius: 50px
    background: $base-main

    p
        margin: 0
        font-size: 20px
        text-align: end
</style>