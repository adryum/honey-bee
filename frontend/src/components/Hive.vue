<script setup>
defineProps({
    hive: Object
})
</script>

<template>
<div class="hive-container">
    <div class="name">{{ hive ? hive.name : 'NONAME' }}</div>
    <img class="picture" :src="hive ? hive.res : ''"/>
    <button class="options-button">...</button>
    <button class="open-button">open</button>
</div>
</template>

<style scoped lang='sass'>
.hive-container
    display: grid
    grid-template-rows: 1fr 1fr 1fr 1fr
    grid-template-columns: 1fr 1fr 1fr 1fr
    grid-template-areas: "name name name name" "pic pic pic more" "pic pic pic open" "pic pic pic open"
    width: 20rem
    height: 20rem
    background: lightgray
    padding: .2rem
    box-sizing: border-box
    box-shadow: 0px 0px 1px black

.name
    @extend .text-settings
    grid-area: name
    background: red
    margin-bottom: .2rem
.picture
    margin: 0 .2rem 0 0
    grid-area: pic
    background: gray
.options-button
    @extend .text-settings
    all: unset
    border-radius: 10px
    margin: 0 0 .2rem 0
    grid-area: more
    background: gray

    &:hover
        filter: brightness(90%)
.open-button
    @extend .text-settings
    all: unset

    grid-area: open
    background: rgb(20, 120, 190)
    border-radius: 5rem

    writing-mode: vertical-lr
    text-orientation: upright

    &:hover
        filter: brightness(90%)
    

.text-settings
    display: flex
    justify-content: center
    align-items: center
    font-size: 30px
    font-weight: bold
    
</style>