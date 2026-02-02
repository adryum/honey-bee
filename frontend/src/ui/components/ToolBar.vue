<script setup lang="ts">
import { onMounted, useCssModule } from "vue";
import type { ComponentWithPropsNStyle } from "../../core/utils/components";

const props = withDefaults(defineProps<{
    name?: string,
    components?: ComponentWithPropsNStyle[]
}>(), {
    name: "{ PAGE }",
})

const s = useCssModule()

onMounted(() => console.log(props.components)
)
</script>

<template>
<div :class="s.container">
    <h1 :class="[s.name]">{{ name }}</h1>
    <div :class="s.workComponents">
        <component 
            v-for="(component, i) in components" 
            :key="i"
            :is="component.component"
            :class="[component.props?.class, component.css?.class]"
            :style="[component.props?.style, component.css?.style]"
            v-bind="component.props"
        />
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    position: sticky
    align-items: center
    z-index: 5
    top: 0
    width: 100%
    height: 3rem
    font-family: var(--font-family)

    background: var(--white)
    padding: .5rem 1rem
    padding-right: .5rem
    box-sizing: border-box
    border-radius: var(--border-radius-tiny)
    box-shadow: 0 0 1px 0 var(--faint-border)

    .workComponents
        margin-left: auto
        display: flex
        gap: .5rem

    .name
        font-size: var(--font-size-large)
        color: black
        font-weight: 700
        letter-spacing: .02em
        margin: 0
        line-height: 2rem
</style>