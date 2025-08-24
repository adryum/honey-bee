<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { computed, ref, useCssModule, type CSSProperties } from "vue";
import { motion, type VariantType } from "motion-v"
import { getSVG, SVGIconRes, type SVGIcon } from '../../core/SVGLoader';
import SVGComponent from "../SVGComponent.vue";

const [isExtended, toggleExtension] = useToggle() 
const toggleStyle = computed(() => ({
    transform: `rotateZ(${isExtended.value ? 180 : 0 }deg)`
} satisfies CSSProperties))

interface Tab {
    name: string,
    pagePath: string,
    svg: SVGIcon
}

const tabs: Tab[] = [
    {
        name: 'home',
        pagePath: '/',
        svg: getSVG(SVGIconRes.House, 'black')
    },
    {
        name: 'apiaries',
        pagePath: '/apiaries',
        svg: getSVG(SVGIconRes.Apiaries, 'black')
    },
    {
        name: 'calendar',
        pagePath: '/calendar',
        svg: getSVG(SVGIconRes.Calendar, 'black')
    },
    {
        name: 'bees',
        pagePath: '/bees',
        svg: getSVG(SVGIconRes.Bee, 'black')
    },
    {
        name: 'd',
        pagePath: '/',
        svg: getSVG(SVGIconRes.House)
    },
    {
        name: 'e',
        pagePath: '/',
        svg: getSVG(SVGIconRes.House)
    },
    {
        name: 'f',
        pagePath: '/',
        svg: getSVG(SVGIconRes.House)
    },
    {
        name: 'g',
        pagePath: '/',
        svg: getSVG(SVGIconRes.House)
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
    <button :class="s.extender" :style="toggleStyle" @click="toggleExtension()"><SVGComponent :svg="getSVG(SVGIconRes.ArrowHead, 'black')"/></button>

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
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
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
        position: absolute
        display: flex
        justify-content: center
        align-items: center
        background: colors.$light
        width: 2rem
        height: 2rem

        border-radius: 50px
        bottom: 1rem
        right: -.5rem

        padding: .5rem
        box-sizing: border-box

        cursor: pointer
        transition: .2s
        &:hover
            scale: 1.2

</style>