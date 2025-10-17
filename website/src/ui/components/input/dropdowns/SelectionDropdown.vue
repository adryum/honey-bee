<script setup lang="ts">
import { computed, ref, useCssModule, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { SVGImage, SVGRes } from '@/core/SVGLoader';
import { onClickOutside, useToggle } from '@vueuse/core';
import SVGComponent from '../../SVGComponent.vue';
import type { DropdownOptions } from '../../../../core/Interfaces';

const s = useCssModule()
const selected = defineModel('selected')
const props = withDefaults(defineProps<{
    title: string
    svg?: SVGImage
    onClick?: () => void
    options: DropdownOptions[]
}>(), {
    svg: () => new SVGImage(SVGRes.House),
    options: () => [{
            text: 'option1',
            svg: new SVGImage(SVGRes.House),
            color: ''
        },
        {
            text: 'option2',
            svg: new SVGImage(SVGRes.House),
            color: ''
        },
    ]
})
const dropdown = ref()
const field = ref()
const selectedChoice = ref<Number>()
const [isShown] = useToggle()
const allOptions = computed(() => [
    { text: "None" } as DropdownOptions,
    ...props.options,
])
const MotionSVG = motion.create(SVGComponent)

onClickOutside(dropdown, () => isShown.value = false, { ignore: [field]})

watch(isShown, () => {
    selectedChoice.value = -1
})

function onItemClick(button: DropdownOptions) {
    isShown.value = false
    selected.value = button.text
}
</script>

<template>
    <div :class="s.container">
        <h2 :class="s.title">{{ title }}</h2>

        <div :class="s.field"
            ref="field"
            @click="isShown = !isShown"
            :style="isShown ? 'border-radius: 3px 3px 0 0' : ''"
        >
            <p :class="s.selection">{{ selected }}</p>
            <MotionSVG 
                :initial="{ rotateZ: 270 }" 
                :animate="isShown ? { rotateZ: 270 } : { rotateZ: 90 }" :class="s.icon" :svg="new SVGImage(SVGRes.ArrowHead)"/>
        </div>
        
        <AnimatePresence>
        <motion.ol ref="dropdown" v-if="isShown"
            :class="s.dropdown"
            :initial="{ opacity: 0, y: '-5px' }"
            :animate="{ opacity: 1, y: '0px'  }"
            :exit="{ opacity: 0, y: '-5px' }"
            @click.stop
            >
            <motion.li v-for="(option, i) in allOptions" :key="i" 
                :class="s.li" 
                @click="() => onItemClick(option)" 
                @mouseover="selectedChoice = i"
                :animate="option.text === selected ? { backgroundColor: 'var(--light)'} : {}"
                :while-hover="option.text != selected ? { transition: { duration: .1 }, backgroundColor: 'var(--base)'} : {}"
                :while-press="{ scale: 0.9 }">
                <SVGComponent :class="s.icon" :svg="option.svg" />
                <p :class="s.text">{{ option.text }}</p> 
            </motion.li>
    
        </motion.ol>
        </AnimatePresence>

    </div>
</template>

<style module lang='sass'>
@use '/src/assets/_colors.sass' as colors
@use '/src/assets/main.sass' as main
.container
    @include main.font
    position: relative
    display: flex
    flex-direction: column
    gap: .2rem

    .title
        all: unset
        @include main.f-size-very-small
        font-weight: 500

    .field
        z-index: 1
        display: flex
        align-items: center
        height: 2rem
        background: white
        border-radius: 2px
        // box-shadow: inset 0 -2px rgba(0,0,0, .3)
        border: 1px solid rgba(0,0,0,.1)
        cursor: pointer

        transition: .2s

        .selection
            padding-left: .5rem 
        .icon
            margin-left: auto 
            aspect-ratio: 1
            height: 100%
            padding: .3rem
            box-sizing: border-box

    .dropdown
        all: unset
        z-index: 0
        @include main.button-font
        position: absolute
        display: inline-flex
        flex-direction: column
        top: 100%
        right: 0
        left: 0
        
        background: var(--surface)
        padding: 1rem
        border-radius: 0 0 3px 3px
        // box-shadow: 0px 0px 10px rgba(0, 0, 0, .5)
        border: 1px solid rgba(0,0,0,.1)


        .li
            all: unset
            position: relative
            display: flex
            @include main.f-size-very-small
            padding: .5rem 1rem
            border-radius: 3px
            gap: 1rem
            cursor: pointer
            background: var(--surface)

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