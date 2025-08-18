<script setup lang="ts">
import { ref, useCssModule, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { getSVG, SVGIconRes, type SVGIcon } from '../../core/SVGLoader';
import { onClickOutside, useToggle } from '@vueuse/core';
import IconCubeButton from './IconCubeButton.vue';
import SVGComponent from '../SVGComponent.vue';

export interface IDropdownButton {
    text: string,
    svg: SVGIcon,
    onClick?: () => void
}

const s = useCssModule()
const props = withDefaults(defineProps<{
    svg?: SVGIcon
    onClick?: () => void
    buttons: IDropdownButton[]
}>(), {
    svg: () => getSVG(SVGIconRes.House),
    buttons: () => [{
            text: 'option1',
            svg: getSVG(SVGIconRes.House)
        },
        {
            text: 'option2',
            svg: getSVG(SVGIconRes.House)
        },
    ]
})

const dropdown = ref()
const button = ref()
const selectedChoice = ref<Number>()
const [isShown] = useToggle()
onClickOutside(dropdown, () => isShown.value = false, { ignore: [button]})

function onItemClick(button: IDropdownButton) {
    isShown.value = false
    button.onClick?.()
}

watch(isShown, () => {
    selectedChoice.value = -1
})
</script>

<template>
    <div :class="s.container">
        <IconCubeButton ref="button" @click="isShown = !isShown" :svg="svg"/>
        <AnimatePresence>
        <motion.ol ref="dropdown" @click.stop
            v-if="isShown"
            :class="s.dropdown"
            :initial="{ opacity: 0, x: '5px' }"
            :animate="{ opacity: 1, x: '0px'  }"
            :exit="{ opacity: 0, x: '5px' }"
            >
            <motion.li v-for="(button, i) in buttons" :key="i" 
                :class="s.li" 
                @click="() => onItemClick(button)" 
                @mouseover="selectedChoice = i"
                :while-press="{ scale: 0.9 }">
                <SVGComponent :class="s.icon" :svg="button.svg" />
                <p :class="s.text">{{ button.text }}</p> 

                <motion.div
                    v-if="i === selectedChoice"
                    :class="s.selected"
                    layoutId="selected1"
                    :transition="{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], type: 'spring' }"
                    />
            </motion.li>
    
        </motion.ol>
        </AnimatePresence>

    </div>
</template>

<style module lang='sass'>
@use '/src/assets/_colors.sass' as colors
@use '/src/assets/main.sass' as main
.container
    position: relative
    display: inline-block

    .dropdown
        @include main.font
        position: absolute
        display: inline-flex
        flex-direction: column
        top: 100%
        right: 0
        margin-top: 1rem
        background: var(--accent)
        padding: 1rem
        border-radius: 3px
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .5)

        .li
            all: unset
            position: relative
            display: flex
            @include main.f-size-very-small
            padding: .5rem 1rem
            gap: 1rem

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
                background: colors.$light



</style>