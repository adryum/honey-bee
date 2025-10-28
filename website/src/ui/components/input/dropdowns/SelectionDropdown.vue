<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, Teleport, toRef, useCssModule, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { SVGImage, SVGRes } from '@/core/SVGLoader';
import { onClickOutside, useToggle } from '@vueuse/core';
import SVGComponent from '../../SVGComponent.vue';
import type { DropdownOptions } from '../../../../core/Interfaces';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/vue';

const s = useCssModule()
const props = withDefaults(defineProps<{
    title: string
    zIndex?: number
    svg?: SVGImage
    onClick?: () => void
    options: DropdownOptions[]
}>(), {
    zIndex: 0,
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
const selected = defineModel('selected')

const dropdown = ref()
const dropdownList = ref()
const isListShown = ref(false)
const selectedChoiceHover = ref<Number>()
const allOptions = computed(() => [
    { text: "None" } as DropdownOptions,
    ...props.options,
])
const MotionSVG = motion.create(SVGComponent)

onClickOutside(dropdownList, () => isListShown.value = false, { ignore: [dropdown]})

var cleanup: () => void
function onShow() {
    const listDomEl = dropdownList.value?.$el as HTMLElement
    console.log(listDomEl);
    
    cleanup = autoUpdate(dropdown.value, listDomEl, () => {
        computePosition(dropdown.value, listDomEl, {
            middleware: [
                flip(),      // flip to the opposite side if not enough space
            ]
        }).then(({x, y}) => {
            Object.assign(listDomEl.style, {
                left: `${x}px`,
                top: `${y}px`,
                width: `${dropdown.value!.offsetWidth}px`,
                boxSizing: 'border-box',
                zIndex: props.zIndex
            });
        });
    });
}

function onItemClick(button: DropdownOptions) {
    isListShown.value = false
    selected.value = button.text
}

watch(isListShown, async (newValue, oldValue) => {
    if (newValue === oldValue) return

    if (newValue) {
        console.log('show');
        await nextTick() // wait for dropdownList to exist in the DOM
        onShow()
    } else {
        cleanup()
        selectedChoiceHover.value = -1
    }
})

onUnmounted(() => cleanup?.())
</script>

<template>
    <div :class="s.container">
        <h2 :class="s.title">{{ title }}</h2>

        <div :class="s.field"
            ref="dropdown"
            @click="isListShown = !isListShown"
            :style="isListShown ? 'border-radius: 3px 3px 0 0' : ''"
        >
            <p :class="s.selection">{{ selected }}</p>
            <MotionSVG 
                :initial="{ rotateZ: 270 }" 
                :animate="isListShown ? { rotateZ: 270 } : { rotateZ: 90 }" :class="s.icon" :svg="new SVGImage(SVGRes.ArrowHead)"/>
        </div>
        
        <Teleport to="body"><AnimatePresence><motion.ol  ref="dropdownList" v-if="isListShown"
            class="dropdown"
            :initial="{ opacity: 0, y: '-1px' }"
            :animate="{ opacity: 1, y: '0px', transition: { duration: .1 } }"
            :exit="{ opacity: 0, y: '-1px', transition: { duration: .05 }}"
            @click.stop
        >
            <motion.li v-for="(option, i) in allOptions" :key="i" 
                class="li" 
                @click="() => onItemClick(option)" 
                @mouseover="selectedChoiceHover = i"
                :animate="option.text === selected ? { backgroundColor: 'var(--light)'} : {}"
                :while-hover="option.text != selected ? { transition: { duration: .1 }, backgroundColor: 'var(--base)'} : {}"
                :while-press="{ scale: 0.9 }"
            >
                <SVGComponent class="icon" :svg="option.svg" />
                <p class="text">{{ option.text }}</p> 
            </motion.li>
    
        </motion.ol></AnimatePresence></Teleport>

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
    top: 100%
    width: inherit
    
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

    
</style>