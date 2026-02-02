<script setup lang="ts">
import { onMounted, ref, useCssModule, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { useToggle } from '@vueuse/core';
import IconCubeButton from '../buttons/IconCubeButton.vue';
import type { DropdownItem as DropdownItem } from '../../../../core/Interfaces';
import { useFloatingUI } from '@/core/composables/field/useFloatingUI';
import { SVG } from '@/assets/svgs/SVGLoader';
import Icon from '../../Icon.vue';

const s = useCssModule()
const props = withDefaults(defineProps<{
    svg?: SVG
    onClick?: () => void
    dropdownItems?: DropdownItem[]
}>(), {
    svg: SVG.Confirm,
    dropdownItems: () => [{
            text: 'option1',
            svg: SVG.Confirm,
            color: 'black'
        },
        {
            text: 'option2',
            svg: SVG.Confirm,
            color: 'red'
        },
    ]
})

const dropdown = ref()
const button = ref()
const selectedChoice = ref<Number>()
const isShown = ref(false)

function onItemClick(button: DropdownItem) {
    isShown.value = false
    button.onClick?.()
}

watch(isShown, () => {
    selectedChoice.value = -1
})

onMounted(async () => {
    useFloatingUI({
        anchorElement: button, 
        floatingElement: dropdown,
        isShown: isShown,
        floaterOffset: 0, 
        zIndex: 10
    })
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
            >
                <Icon class="icon" :svg="button.svg" />
                <p class="text" :style="{ color: button.color ?? 'black' }">{{ button.text }}</p> 
            </motion.li>
    
        </motion.ol></Teleport>
        </AnimatePresence>

    </div>
</template>

<style lang="sass">
@use '/src/assets/_colors.sass' as colors
@use '/src/assets/main.sass' as main
.dropdown
    all: unset
    @include main.button-font
    position: absolute
    display: inline-flex
    flex-direction: column
    background: white
    padding: .5rem
    gap: .25rem
    border-radius: 6px
    border: 1px solid rgba(0,0,0,.2)

    .li
        all: unset
        position: relative
        display: flex
        @include main.f-size-very-small
        padding: .5rem 1rem
        border-radius: 6px
        gap: 1rem
        cursor: pointer
        transition: .1s
        // background: var(--surface)

        &:hover
            backdrop-filter: brightness(90%)
            

        .icon
            z-index: 2
            width: 1rem
            aspect-ratio: 1

        .text
            position: relative
            z-index: 2
            box-sizing: border-box

        .selected
            z-index: 1
            position: absolute
            top: 0
            right: 0
            height: 100%
            width: 100%

            border-radius: 3px
            background: var(--surface)
</style>

<style module lang='sass'>
@use '/src/assets/_colors.sass' as colors
@use '/src/assets/main.sass' as main
.container
    position: relative
    display: inline-block    
</style>