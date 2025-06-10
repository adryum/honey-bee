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
    <div :class="s.body">
        <slot name="body">
            <div :class="s.empty">Empty</div>
        </slot>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    background: white
    border-radius: 4px

    .header
        display: flex
        align-items: center
        min-height: 3.5rem
        border-radius: 4px

        box-sizing: border-box
        padding: 0 .5rem
        box-shadow: 0 0 10px rgba(0, 0, 0, .2)

        > h1
            all: unset
            font-size: main.$font-size-big

    .body
        display: flex
        height: calc(100% - 3.5rem)

.empty
    flex: 1
    display: flex
    align-items: center
    justify-content: center

    font-size: main.$font-size-special
    box-sizing: border-box
    padding: 1rem
</style>