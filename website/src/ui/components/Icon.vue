<script setup lang="ts">
import { IconType, type SVG } from '@/assets/svgs/SVGLoader';
import { computed, shallowRef, useCssModule, watch, type CSSProperties } from 'vue'

const s = useCssModule()
const props = defineProps<{ 
    svg: SVG
    type: IconType
}>()

// Eager import all SVGs as components at build time
const modules = import.meta.glob('/src/assets/svgs/*.svg', { eager: true }) as Record<string, any>

const map = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path, (mod && mod.default) || mod])
)

const currentPath = `/src/assets/svgs/${props.svg}.svg`
const Icon = shallowRef(map[currentPath] ?? null)
const iconStyle = computed((): CSSProperties => {
    switch (props.type) {
        case IconType.SMALL:
            return {
                minWidth: '1rem',
                width: '1rem',
                maxWidth: '1rem',
                minHeight: '1rem',
                height: '1rem',
                maxHeight: '1rem'
            }
        case IconType.MEDIUM:
            return {
                minWidth: '1.5rem',
                width: '1.5rem',
                maxWidth: '1.5rem',
                minHeight: '1.5rem',
                height: '1.5rem',
                maxHeight: '1.5rem'
            }
        case IconType.BIG:
            return {
                minWidth: '2rem',
                width: '2rem',
                maxWidth: '2rem',
                minHeight: '2rem',
                height: '2rem',
                maxHeight: '2rem'
            }
    
        default:
            return {}
    }
})

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
  <component 
    :class="s.icon"
    :style="iconStyle"
    :is="Icon" />
</template>

<style module lang="sass">
.icon
    width: 100%
    height: 100%
</style>
