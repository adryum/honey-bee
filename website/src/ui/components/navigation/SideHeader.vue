<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { computed, onMounted, reactive, ref, useCssModule, type CSSProperties } from "vue";
import { motion, type VariantType } from "motion-v"
import SVGComponent from "../SVGComponent.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import router from "@/core/router";

const s = useCssModule()
const [isExtended, toggleExtension] = useToggle() 
const toggleStyle = computed(() => ({
    transform: `rotateZ(${isExtended.value ? 180 : 0 }deg)`
} satisfies CSSProperties))

interface Tab {
    name: string,
    pagePath: string,
    svg: SVGImage
}

const tabs: Tab[] = [
    {
        name: 'home',
        pagePath: '/',
        svg: new SVGImage(SVGRes.House)
    },
    {
        name: 'apiaries',
        pagePath: '/apiaries',
        svg: new SVGImage(SVGRes.Apiaries, 'black')
    },
    {
        name: 'calendar',
        pagePath: '/calendar',
        svg: new SVGImage(SVGRes.Calendar, 'black')
    },
    {
        name: 'bees',
        pagePath: '/bees',
        svg: new SVGImage(SVGRes.Bee, 'black')
    },
    {
        name: 'd',
        pagePath: '/',
        svg: new SVGImage(SVGRes.House)
    },
    {
        name: 'e',
        pagePath: '/',
        svg: new SVGImage(SVGRes.House)
    },
    {
        name: 'f',
        pagePath: '/',
        svg: new SVGImage(SVGRes.House)
    },
    {
        name: 'g',
        pagePath: '/',
        svg: new SVGImage(SVGRes.House)
    }
]
const selectedTab = ref(tabs[0])

const containerVariants: Record<string, VariantType> = {
    expanded: { minWidth: '15rem' },
    collapsed: { minWidth: '4rem', transition: { delay: .1 }}
}

const tabVariants: Record<string, VariantType> = {
    expanded:  { opacity: 1, display: 'flex', y: 0, transition: { delay: .2, duration: .3  } },
    collapsed: { opacity: 0, display: 'none', y: 5, transition: {  duration: .15 } }
}

function onTabSelect(tab: Tab) {
    router.push(tab.pagePath)
    
    // changes svg color
    selectedTab.value.svg.color = 'black'
    selectedTab.value = tab
    tab.svg.color = 'white'
}

onMounted(() => {
    onTabSelect(tabs[0])
})

</script>
<template>
  <motion.div
    :class="s.container"
    :variants="containerVariants"
    :animate="isExtended ? 'expanded' : 'collapsed'"
  >
    <div :class="s.tip"></div>
    <button :class="s.extender" :style="toggleStyle" @click="toggleExtension()"><SVGComponent :svg="new SVGImage(SVGRes.ArrowHead, 'black')"/></button>

    <ul :class="s.list">
      <motion.li
        v-for="(tab, i) in tabs"
        :key="i"  
        :class="s.tab"
        :while-press="{ scale: 0.9, transition: { duration: 0.1 } }"
        @click="onTabSelect(tab); "
        >
        <SVGComponent :class="s.icon" :svg="tab.svg" />

        <motion.h2
          :class="[s.text, 'button-text']"
          :variants="tabVariants"
          :initial="'collapsed'"
          :animate="isExtended ? 'expanded' : 'collapsed'"
          :style="{ color: tab.svg.color.value }"
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
    background: var(--surface)

    .tip
        height: 3rem
        width: 100%
        background: #ffaa66

    .list
        all: unset
        display: flex
        flex-direction: column
        padding: 1rem .5rem 

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
                background-color: rgba(0, 0, 0, .1)

            .icon
                display: flex
                align-items: center
                justify-content: center
                z-index: 2
                height: 100%
                aspect-ratio: 1
                margin-left: .25rem 
                transition: .9s ease-out


            .text
                z-index: 2
                position: absolute
                margin-left: 3rem
                transition: .2s ease

           
            .selected
                z-index: 1
                position: absolute
                right: 0
                height: 100%
                width: 200%

                border-radius: 3px
                background: #ffaa66

    .extender
        all: unset
        position: absolute
        display: flex
        justify-content: center
        align-items: center
        background: var(--accent)
        width: 2rem
        height: 2rem

        border-radius: 50px
        bottom: 1rem
        right: -.7rem

        padding: .5rem
        box-sizing: border-box

        cursor: pointer
        transition: .2s
        &:hover
            scale: 1.2

</style>