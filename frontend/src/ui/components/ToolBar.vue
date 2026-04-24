<script setup lang="ts" generic="T">
import { SVG } from "@/assets/svgs/SVGLoader";
import { computed, useCssModule, useSlots } from "vue";
import IconCubeButton from "./input/buttons/IconCubeButton.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label?: string,
    showBackButton?: boolean
    tabs?:        T[]
    selectedTab?: T
}>(), {
    label: "{ PAGE }",
})

const emits = defineEmits<{
    back: []
    changeTab: [tab: T]
}>()

const slots = useSlots()

const hasHeader = computed(() => !!slots.header?.()?.length)
const hasFooter = computed(() => !!slots.footer?.()?.length)

</script>

<template>
<div :class="s.container">
    <div
        :class="s.header"
    >
        <IconCubeButton
            v-if="showBackButton"
            :class="s.backButton"
            :icon="SVG.ArrowLeftSmall"
            @click="emits('back')"
        />
        <h1 :class="[s.label]">{{ label }}</h1>

        <button 
            v-for="loopTab in tabs" 
            :class="[
                s.button, 
                loopTab === selectedTab && s.selected
            ]"
            @click="emits('changeTab', loopTab)"
        >
            {{ String(loopTab).toSentenceCase() }}
        </button>

        <div
            :class="s.headerSlot"
        >
            <slot name="header">
                
            </slot>
        </div>
    </div>

    <div
        :class="[
            s.footer,
            hasFooter && s.openFooter
        ]"
    >
        <slot name="footer">
            
        </slot>
    </div>
    
</div>
</template>

<style module lang='sass'>
.backButton
    height: 100%
    max-height: 100%
    width: 2rem
.headerSlot
    display: inline-flex
    margin-left: auto
    margin-right: 1rem
.header
    display: flex
    align-items: center

    width: 100%
    min-height: 3rem
    max-height: 3rem
    height: 3rem
    // box-sizing: border-box


    .label
        margin: 0
        padding: 0 1rem
        box-sizing: border-box

        max-width: 15rem
        min-width: 15rem
        
        font-size: var(--font-size-large)
        color: var(--black)
        font-weight: 700
        letter-spacing: .02em
        line-height: 2rem

.footer
    display: flex
    width: 100%
    align-items: center
    min-height: 0

    &.openFooter
        min-height: 3rem

.container
    top: 0
    position: sticky
    
    display: flex
    flex-direction: column
    align-items: center
    
    // width: 100%

    font-family: var(--font-family)

    background: var(--white)

    border-radius: var(--border-radius-small)
    box-shadow: 0 0 1px 0 var(--faint-border)

    .workComponents
        margin-left: auto
        display: flex
        gap: .5rem
       


.button
    all: unset
    position: relative
    min-height: 100%
    box-sizing: border-box
    padding: .5rem 1rem
    cursor: pointer
    transition: .2s
    color: var(--faint-text)

    font-weight: 500
    letter-spacing: .04em

    &::before
        position: absolute
        content: ''
        width: 100%
        height: 2px
        
        left: 0
        bottom: -1px
        transition: .2s

    &.selected
        color: var(--black)
        
        &::before
            background: var(--orange)

    &:hover
        color: var(--black)
        background: var(--secondary)

.verticalSpacer
    all: unset
    display: flex
    align-self: center
    margin: .5rem
    min-width: 1px
    max-width: 1px
    height: calc(100% - 1rem)
    background: rgba(0, 0, 0, .2)
    border-radius: 100px
</style>