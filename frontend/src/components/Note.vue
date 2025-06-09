<script setup>
import { useCssModule } from 'vue';
import CubeButtonTranspparent from './buttons/CubeButtonTranspparent.vue';
defineProps({
    note: Object
})

const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <div :class="s.header">
        <h1>{{ note.title }}</h1>
        <h2>Created by {{ note.author }}</h2>
        <CubeButtonTranspparent :class="s.more" res="fa-solid fa-ellipsis-vertical"/>
    </div>
    <p>{{ note.content }}</p>
    <h3 :class="s.date">{{ note['creation_date'] }}</h3>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    gap: 1.5rem

    box-sizing: border-box
    padding: .5rem
    border-bottom: 4px solid #FFD426
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)
    border-radius: 4px
    background: white

    transition: .3s

    &:hover
        cursor: pointer
        box-shadow: 3px 3px 10px rgba(0, 0, 0, .2)

    .header
        position: relative
        display: flex
        flex-direction: column

        h1
            all: unset    
            font-size: main.$font-size-heading
        h2
            all: unset    
            font-size: main.$font-size-text
            color: #707070

        .more
            right: 0
            position: absolute
    p
        font-size: main.$font-size-text
        color: #707070
        overflow-wrap: break-word

    .date
        all: unset    
        font-size: main.$font-size-special
</style>