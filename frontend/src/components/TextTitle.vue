<script setup>
let model = defineModel()
defineProps({
    isDisabled: Boolean
})
</script>

<template>
    <div class="container">
        <div class="decor-line"></div>
        <input class="input" v-model="model" :disabled="isDisabled"/>
    </div>
</template>

<style scoped lang='sass'>
.container
    position: relative
    display: flex
    flex-direction: column
    height: 3.3rem

.input 
    all: unset
    position: relative
    width: 100%
    font-size: 40px
    text-align: center
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden

.decor-line
    position: absolute
    bottom: 0
    width: 100%
    height: 4px
    border-radius: 10px
    background: #9A7A68
</style>