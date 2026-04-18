<script setup lang="ts" generic="T">
import { useCssModule } from "vue";

const s = useCssModule()
const props = defineProps<{
    tabs:        T[]
    selectedTab: T
}>()

const emits = defineEmits<{
    (e: 'changeTab', tab: T): void
}>()
</script>

<template>
<div :class="s.container">
    <div :class="s.shared">
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
    </div>

    <div 
        :class="[
            s.fragmentSpecific, 
            s.shown
        ]"
    >
        <slot />
    </div>
</div>
</template>

<style module lang="sass">

.container
    box-shadow: 0 0 1px 0 var(--faint-border)
    margin-bottom: 0

    display: flex
    flex-direction: column
    border-radius: var(--border-radius-small)
    background: var(--white)

    .fragmentSpecific
        display: flex
        height: 0
        transition: .1s
        opacity: 0

        box-sizing: border-box
        // box-shadow: inset 0 0 2px 0 var(--faint-border)

        gap: .2rem

        &.shown
            height: 3rem
            max-height: 3rem
            opacity: 1
            padding: .2rem
            padding-top: calc( .2rem + 1px  )

    .shared
        display: flex
        min-height: 2.5rem
        max-height: 2.5rem
        
        font-family: var(--font-family)
        font-size: var(--font-size-medium)
        font-weight: 500
        box-sizing: border-box
        border-bottom: 1px solid var(--faint-border)

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
                backdrop-filter: brightness(90%)

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