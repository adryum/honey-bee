<script setup lang="ts">
import { useCssModule } from "vue";

const props = withDefaults(defineProps<{
    name: string,
    components: []
}>(), {
    name: "Apiaries"
})

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <h1 :class="[s.name]">{{ name }}</h1>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    align-items: center
    top: 0
    position: sticky
    width: 100%
    height: 3rem

    background: #F9EDDC
    padding: 0 1rem
    box-sizing: border-box
    z-index: 1

    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2)

    .name
        @include main.jetbrains-mono
        font-size: 1.5rem
        color: black
        margin: 0
</style>