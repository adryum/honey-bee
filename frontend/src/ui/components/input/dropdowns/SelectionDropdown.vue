<script setup lang="ts">
import { computed, onMounted, reactive, ref, Teleport, useCssModule, watch } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import type { DropdownItem } from '../../../../core/Interfaces';
import type { FieldValidator } from '@/core/composables/field/useField';
import { useFloatingUI } from '@/core/composables/field/useFloatingUI';
import { SVG } from '@/assets/svgs/SVGLoader';
import Icon from '../../Icon.vue';

const s = useCssModule()
const props = withDefaults(defineProps<{
    title: string
    zIndex?: number
    isRequiried?: boolean
    svg?: SVG
    dropdownItems: DropdownItem[]
    onClick?: () => void
}>(), {
    zIndex: 0,
    isRequiried: false,
    svg: SVG.Confirm,
    options: () => [
        {
            text: 'option',
            svg: SVG.Confirm,
            color: ''
        },
    ]
})
const selected = defineModel('selected')
const dropdown = ref()
const dropdownList = ref()
const isListShown = ref(false)
const selectedChoiceHover = ref<Number>()
const allDropdownItems = computed(() => [
    ...props.dropdownItems,
])
const MotionSVG = motion.create(Icon)

const validator = reactive<FieldValidator>({ isValid: true, error: ""})
const emit = defineEmits<{
    validator: [FieldValidator]
}>()

function onItemClick(button: DropdownItem) {
    isListShown.value = false
    selected.value = button.text

    const fun = button.onClick
    if (fun) fun()
}

function validateInput() {
    validator.isValid = Boolean(selected.value)
    emit('validator', validator)
}

watch(selected, (newVal) => {
    if (props.isRequiried) {
        validateInput()
    } else  {
        validator.isValid = true
        validator.error = ""
        emit('validator', validator)
    }
}, { immediate: true })

onMounted(async () => {
    useFloatingUI({
        anchorElement: dropdown, 
        floatingElement: dropdownList, 
        isShown: isListShown, 
        zIndex: props.zIndex
    })
})
</script>

<template>
    <div :class="s.container">
        <div :class="s.title">
            <h2>{{ title }}</h2>
            <p v-if="isRequiried" :class="s.isRequired"> *  {{ validator.error }}</p>
        </div>

        <div :class="[s.field, !validator.isValid && s.notValid] "
            ref="dropdown"
            @click="isListShown = !isListShown"
            :style="isListShown ? 'border-radius: 3px 3px 0 0' : ''"
        >
            <p :class="s.selection">{{ selected }}</p>
            <MotionSVG 
                :initial="{ rotateZ: 270 }" 
                :animate="isListShown ? { rotateZ: 270 } : { rotateZ: 90 }" :class="s.icon" :svg="SVG.Confirm"/>
        </div>
        
        <Teleport to="body"><AnimatePresence><motion.ol  ref="dropdownList" v-if="isListShown"
            class="selection-dropdown"
            :initial="{ opacity: 0, y: '-1px' }"
            :animate="{ opacity: 1, y: '0px', transition: { duration: .1 } }"
            :exit="{ opacity: 0, y: '-1px', transition: { duration: .05 }}"
            @click.stop
        >
            <motion.li v-for="(item, i) in allDropdownItems" :key="i" 
                class="li" 
                @click="() => onItemClick(item)" 
                @mouseover="selectedChoiceHover = i"
                :animate="item.text === selected ? { backgroundColor: 'var(--light-gray)'} : {}"
                :while-hover="item.text != selected ? { transition: { duration: .1 }, filter: 'brightness(90%)'} : {}"
                :while-press="{ scale: 0.9 }"
            >
                <SVGComponent class="icon" :svg="item.svg" />
                <p class="text">{{ item.text }}</p> 
            </motion.li>
    
        </motion.ol></AnimatePresence></Teleport>

    </div>
</template>

<style lang="sass">
@use '/src/assets/_colors.sass' as colors
@use '/src/assets/main.sass' as main
.selection-dropdown
    all: unset
    @include main.button-font
    position: absolute
    display: inline-flex
    flex-direction: column
    background: white
    padding: .5rem
    gap: .25rem
    border-radius: 0 0 2px 2px
    border: 1px solid rgba(0,0,0,.1)
    border-top: none

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
        background: white

            

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

        .isRequired
            color: red
            font-weight: 400

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

        &.notValid
            border: 1px solid rgba(250,0,0,1)

        .selection
            padding-left: .5rem 
        .icon
            margin-left: auto 
            aspect-ratio: 1
            height: 100%
            padding: .3rem
            box-sizing: border-box

    
</style>