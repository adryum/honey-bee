<script setup lang="ts">
import { useCssModule } from "vue";
import type { ComponentWithProps } from "../utils/components";

const props = withDefaults(defineProps<{
    name?: string,
    components?: ComponentWithProps[]
}>(), {
    name: "{ PAGE }",
})

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <h1 :class="[s.name]">{{ name }}</h1>
    <div :class="s.workComponents">
        <component v-for="component in components" :is="component.component" v-bind="component.props"/>
    </div>
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

    .workComponents
        margin-left: auto
        display: flex
        gap: .5rem

    .name
        @include main.font
        font-size: 1.5rem
        color: black
        margin: 0
</style>