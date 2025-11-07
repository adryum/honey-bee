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
    @include main.f-size-very-small
    @include main.font
    display: flex
    background: white
    padding: .5rem
    border-radius: 2px

    .header
        display: flex
        flex-direction: column
        gap: .2rem

        min-width: 30%
        max-width: 30% 

        .name
            font-weight: 900
            letter-spacing: 0.02em
    .content
        flex: 1
</style>