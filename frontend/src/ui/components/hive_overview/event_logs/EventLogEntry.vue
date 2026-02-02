<script setup lang="ts">
import { useCssModule } from "vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1 :class="s.name">Angela</h1>
        <h2 :class="s.time">23:41am</h2>
    </div>
    <p :class="s.content">asdasdasd asd ads ada sdasd asd  sadad a  asd a a adasd a ad a sd asd asd asd asdd asd  sadad a  asd a a adasd a ad a sd asd asd asd asdd asd  sadad a  asd a a adasd a ad a sd asd asd asd asdd</p>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: inline-flex
    background: white
    padding: .25rem
    box-sizing: border-box
    border-radius: 50px
    // overflow: hidden


    .header
        display: flex
        flex-direction: column
        gap: .2rem
        align-items: center
        justify-content: center

        min-width: 20%
        max-width: 20% 
        border-radius: 4px 0 0 4px

        // background: var(--orange)
        font-size: var(--font-size-medium)


        .name
            font-weight: 900
            letter-spacing: 0.02em
    .content
        flex: 1
        // background: var(--gray)
        // border-left: 2px solid var(--faint-border)
        padding: .5rem
        box-sizing: border-box
        line-height: 1rem
        font-size: var(--font-size-medium)
</style>