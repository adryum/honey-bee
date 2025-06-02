<script setup>
import { useCssModule } from 'vue';
import Hive from './hive/Hive.vue';
import IconCubeButton from './buttons/IconCubeButton.vue';


const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        Latvia
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton :class="s['button-special']" res="fa-solid fa-left-long"/>
    </div>

    <div :class="s.grid">
        grid
        <Hive/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container 
    display: flex
    flex-direction: column
    width: 100%

    box-sizing: border-box
    margin: 6px

    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #FFECC8

.header
    display: flex
    align-items: center
    gap: .4rem

    height: 5rem

    box-sizing: border-box
    padding: .4rem
    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #EDEDED

    .vt-linebreak
        width: 6px
        height: 100%
        border-radius: 4px
        background: #D9D9D9
        margin-left: auto 

.grid
    height: 100%
    display: grid
    
    box-sizing: border-box
    padding: 1rem

.button-special
    background: main.$button-special
</style>