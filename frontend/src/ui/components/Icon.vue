<script setup lang="ts">
import { IconType, type SVG } from '@/assets/svgs/SVGLoader';
import { computed, shallowRef, useCssModule, watch, type CSSProperties } from 'vue'

const s = useCssModule()
const props = withDefaults(defineProps<{ 
    svg:    SVG
    type?:  IconType
    color?: string
}>(), {
    type: IconType.SMALL
})
// Eager import all SVGs as components at build time
const modules = import.meta.glob('/src/assets/svgs/*.svg', { eager: true }) as Record<string, any>

const map = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path, (mod && mod.default) || mod])
)

const currentPath = `/src/assets/svgs/${props.svg}.svg`
const Icon = shallowRef(map[currentPath] ?? null)

const iconStyle = computed((): CSSProperties => {
    const baseStyle: CSSProperties = props.color ? {
        color: props.color
    } : {}
    var sizeStyle: CSSProperties = {}

    switch (props.type) {
        case IconType.SMALL:
            sizeStyle =  {
                minWidth: '1rem',
                width: '1rem',
                maxWidth: '1rem',
                minHeight: '1rem',
                height: '1rem',
                maxHeight: '1rem'
            }
            break;
        case IconType.MEDIUM:
            sizeStyle = {
                minWidth: '1.5rem',
                width: '1.5rem',
                maxWidth: '1.5rem',
                minHeight: '1.5rem',
                height: '1.5rem',
                maxHeight: '1.5rem'
            }
            break;
        case IconType.BIG:
            sizeStyle = {
                minWidth: '2rem',
                width: '2rem',
                maxWidth: '2rem',
                minHeight: '2rem',
                height: '2rem',
                maxHeight: '2rem'
            }
        case IconType.HUGE:
            sizeStyle = {
                minWidth: '3rem',
                width: '3rem',
                maxWidth: '3rem',
                minHeight: '3rem',
                height: '3rem',
                maxHeight: '3rem'
            }
        case IconType.GIGANTIC:
            sizeStyle = {
                minWidth: '4rem',
                width: '4rem',
                maxWidth: '4rem',
                minHeight: '4rem',
                height: '4rem',
                maxHeight: '4rem'
            }
            break;
    }

    return { ...baseStyle, ...sizeStyle }
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
        :is="Icon" 
    />
</template>

<style module lang="sass">
.icon
    width: 100%
    height: 100%
</style>
