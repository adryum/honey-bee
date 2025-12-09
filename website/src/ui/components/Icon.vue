<script setup lang="ts">
import type { SVG } from '@/assets/svgs/SVGLoader';
import { shallowRef, useCssModule, watch } from 'vue'

const s = useCssModule()
const props = defineProps<{ svg: SVG }>()

// Eager import all SVGs as components at build time
const modules = import.meta.glob('/src/assets/svgs/*.svg', { eager: true }) as Record<string, any>

const map = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path, (mod && mod.default) || mod])
)

const currentPath = `/src/assets/svgs/${props.svg}.svg`
const Icon = shallowRef(map[currentPath] ?? null)

watch(() => props.svg, (newVal) => {
    const newPath = `/src/assets/svgs/${newVal}.svg`
    if (map[newPath]) {
        Icon.value = map[newPath]
    } else {
        console.warn(`SVG not found: ${newPath}`)
    }
})
</script>

<template>
  <component :class="s.icon" :is="Icon" />
</template>

<style module lang="sass">
.icon
    width: 100%
    height: 100%
</style>
