<script setup>
import { useCssModule } from 'vue';

defineProps({
    name: {
        type: String,
        default: 'No Name'
    },
    frames: {
        type: Number,
        default: 4
    },
    weight: {
        type: Number,
        default: 34
    },
    type: {
        type: String,
        default: 'NONE'
    }
})

const s = useCssModule()
</script>

<template>
<div :class="s.container">
   <div :class="s.header">
        <img :class="s.wood" src="@/assets/images/Wood2.jpg">
        <p>{{ name }}</p>
   </div>

   <div :class="s.body">
        <img :class="s.wood" src="@/assets/images/Wood1.png">
        <img :class="s['hive-img']" src="@/assets/images/Hive1.jpg">
        <div :class="s.list">
            <div :class="s.drawer">
                <img :class="s.wood" src="@/assets/images/Wood2.jpg">
                <p>Frames: {{ frames }}</p>
            </div>
            <div :class="s.drawer">
                <img :class="s.wood" src="@/assets/images/Wood2.jpg">
                <p>Weight: {{ weight }}kg</p>
            </div>
            <div :class="s.drawer">
                <img :class="s.wood" src="@/assets/images/Wood2.jpg">
                <p>Type: {{ type }}</p>
            </div>
        </div>
   </div>
</div>
</template>

<style module lang='sass'>
.container
    display: grid
    grid-template-areas: 'center center center' 'ls2 body rs2'
    grid-template-columns: 0.07fr 1fr 0.07fr
    grid-template-rows: .3fr .6fr

    width: 20rem
    height: 15rem

.header
    position: relative
    grid-area: center
    display: flex
    align-items: center
    justify-content: center

    font-size: 35px
    color: white
    background: #633A00
    border-radius: 4px
    overflow: hidden
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)

.body
    position: relative
    grid-area: body
    display: grid
    grid-template-areas: 'left right'
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr

    box-sizing: border-box
    padding: .4rem
    gap: .4rem

    font-size: 15px
    color: white
    background: #31230A

    border-radius: 0 0 4px 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    overflow: hidden

    .hive-img
        grid-area: left
        width: 100%
        height: 100%
        object-fit: cover
        border-radius: 4px
        z-index: 1
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)

    .list
        height: 100%
        grid-area: right
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center

        box-sizing: border-box
        padding: .4rem 0
        z-index: 1

        .drawer
            position: relative
            display: flex
            width: 95%
            height: 25%
            align-items: center

            box-sizing: border-box
            padding: 0 .4rem 

            border-radius: 4px
            overflow: hidden

            z-index: 1
            background: #633A00
    
p
    all: unset
    z-index: 1

.wood
    position: absolute
    width: 100%
    height: 100%
    object-fit: cover
    opacity: .2
    left: 0
</style>