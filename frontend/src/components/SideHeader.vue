<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { computed, ref, useCssModule, type CSSProperties } from "vue";
import { easeInOut, motion, type Variants, type VariantType } from "motion-v"
import type { SVG } from "../core/Interfaces";
import SVGComponent from "./SVGComponent.vue";

const [isExtended, toggleExtension] = useToggle() 
const toggleStyle = computed(() => ({
    transform: `rotateZ(${isExtended.value ? 0 : 180 }deg)`
} satisfies CSSProperties))

interface Tab {
    name: string,
    pagePath: string,
    svg: SVG
}

const tabs: Tab[] = [
    {
        name: 'home',
        pagePath: '/',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    },
    {
        name: 'apiaries',
        pagePath: '/apiaries',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    },
    {
        name: 'b',
        pagePath: '/',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    },
    {
        name: 'c',
        pagePath: '/',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    },
    {
        name: 'd',
        pagePath: '/',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    },
    {
        name: 'e',
        pagePath: '/',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    },
    {
        name: 'f',
        pagePath: '/',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    },
    {
        name: 'g',
        pagePath: '/',
        svg: {
            path: 'M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z',
            color: '#000000',
            viewBox: '0 0 512 512'
        }
    }
]
const selectedTab = ref(tabs[0])

const containerVariants: Record<string, VariantType> = {
    expanded: { minWidth: '15rem' },
    collapsed: { minWidth: '4rem', transition: { delay: .1 }}
}

const tabVariants: Record<string, VariantType> = {
    expanded:  { opacity: 1, y: 0, transition: { delay: .2, duration: .3  } },
    collapsed: { opacity: 0, y: 5, transition: {  duration: .15 } }
}

const s = useCssModule()
</script>
<template>
  <motion.div
    :class="s.container"
    :variants="containerVariants"
    :animate="isExtended ? 'expanded' : 'collapsed'"
  >
    <div :class="s.tip"></div>
    <button :class="s.extender" :style="toggleStyle" @click="toggleExtension()">></button>

    <ul :class="s.list">
      <motion.li
        v-for="(tab, i) in tabs"
        :key="i"  
        :class="s.tab"
        :while-press="{ scale: 0.9, transition: { duration: 0.1 } }"
        @click="selectedTab = tab; $router.push(tab.pagePath)"
      >
        <SVGComponent :class="s.icon" :svg="tab.svg" />

        <motion.h2
          :class="[s.text, 'button-text']"
          :variants="tabVariants"
          :initial="'collapsed'"
          :animate="isExtended ? 'expanded' : 'collapsed'"
          style="display: inline-block;"
        >
          {{ tab.name }}
        </motion.h2>

        <motion.div
          v-if="selectedTab.name === tab.name"
          :class="s.selected"
          layoutId="selected"
          :transition="{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], type: 'spring' }"
        />
      </motion.li>
    </ul>
  </motion.div>
</template>

<style module lang='sass'>
@use '../assets/_colors.sass' as colors
@use '../assets/main.sass' as main
.container
    top: 0
    position: sticky
    display: flex
    flex-direction: column
    width: 4rem
    height: 100vh
    background: colors.$accent

    .tip
        height: 4rem
        width: 100%
        background: colors.$light

    .list
        all: unset
        display: flex
        flex-direction: column
        padding: 1rem .5rem
        gap: .3rem
        width: auto

        .tab
            z-index: 0
            all: unset
            position: relative

            display: flex
            align-items: center
            
            width: 100%
            height: 40px
            padding: .5rem
            box-sizing: border-box
            background-color: transparent
            border-radius: 5px
            cursor: pointer
            transition: .1s ease-out

            &:hover
                background-color: colors.$base

            .icon
                display: flex
                align-items: center
                justify-content: center
                z-index: 2
                height: 100%
                aspect-ratio: 1
                margin-left: .25rem 

            .text
                z-index: 2
                position: absolute
                margin-left: 3rem
           
            .selected
                z-index: 1
                position: absolute
                right: 0
                height: 100%
                width: 100%

                border-radius: 5px
                background: colors.$light

    .extender
        all: unset
        display: flex
        justify-content: center
        align-items: center
        position: absolute
        background: colors.$light
        width: 2rem
        height: 2rem

        border-radius: 50px
        bottom: 1rem
        right: -1rem

        cursor: pointer
        transition: .2s
        &:hover
            scale: 1.2

</style>