<script setup lang="ts">
import { onMounted, ref, useCssModule, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useToggle } from '@vueuse/core';
import SVGComponent from '../../SVGComponent.vue';
import IconCubeButton from '../buttons/IconCubeButton.vue';
import type { DropdownItem as DropdownItem } from '../../../../core/Interfaces';
import { SVGImage, SVGRes } from '@/core/SVGLoader';
import { useFloatingUI } from '@/core/composables/field/useFloatingUI';

const s = useCssModule()
const props = withDefaults(defineProps<{
    svg?: SVGImage
    onClick?: () => void
    dropdownItems?: DropdownItem[]
}>(), {
    svg: () => new SVGImage(SVGRes.House),
    dropdownItems: () => [{
            text: 'option1',
            svg: new SVGImage(SVGRes.House),
            color: 'black'
        },
        {
            text: 'option2',
            svg: new SVGImage(SVGRes.House),
            color: 'red'
        },
    ]
})

const dropdown = ref()
const button = ref()
const selectedChoice = ref<Number>()
const [isShown] = useToggle()

function onItemClick(button: DropdownItem) {
    isShown.value = false
    button.onClick?.()
}

watch(isShown, () => {
    selectedChoice.value = -1
})

onMounted(async () => {
    useFloatingUI(button, dropdown, isShown, 0, false, 10)
})
</script>

<template>
    <div :class="s.container">
        <IconCubeButton ref="button" @click="isShown = !isShown" :svg="svg"/>
        <AnimatePresence><Teleport to="body">
        <motion.ol ref="dropdown" @click.stop
            v-if="isShown"
            class="dropdown"
            :initial="{ opacity: 0, x: '5px' }"
            :animate="{ opacity: 1, x: '0px'  }"
            :exit="{ opacity: 0, x: '5px' }"
            >
            <motion.li v-for="(button, i) in dropdownItems" :key="i" 
                class="li" 
                @click="() => onItemClick(button)" 
                :while-press="{ scale: 0.9 }"
                :while-hover="{ backgroundColor: 'var(--base)', transition: { duration: .1 } }"
            >
                <SVGComponent class="icon" :svg="button.svg" />
                <p class="text" :style="{ color: button.color ?? 'black' }">{{ button.text }}</p> 
            </motion.li>
    
        </motion.ol></Teleport>
        </AnimatePresence>

    </div>
</template>

<style module lang='sass'>
@use '/src/assets/_colors.sass' as colors
@use '/src/assets/main.sass' as main
.container
    position: relative
    display: inline-block

    
</style>