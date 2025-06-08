<script setup>
import { useCssModule } from 'vue';

const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <div :class="s.header">
        <slot name="header">

        </slot>
    </div>
    <slot :class="s.body" name="body">

    </slot>
</div>
</template>

<style module lang='sass'>
.container
    display: flex
    flex-direction: column
    background: white
    border-radius: 4px

    .header
        display: flex
        align-items: center
        height: 4rem
        border-radius: 4px

        box-sizing: border-box
        padding: 0 .5rem
        box-shadow: 0 0 10px rgba(0, 0, 0, .2)

        > h1
            all: unset
            font-size: 30px

    // .body
    //     flex: 1
    //     box-sizing: border-box
    //     padding: 1rem
</style>