<script setup lang="ts">
import { useCssModule } from "vue";
import type { ComponentWithProps } from "../../core/utils/components";

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
    position: sticky
    z-index: 5
    align-items: center
    top: 0
    width: 100%
    height: 3rem

    background: var(--light)
    padding: .5rem 1rem
    box-sizing: border-box

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