<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { computed, onMounted, reactive, ref, useCssModule, type CSSProperties } from "vue";
import { motion, type VariantType } from "motion-v"
import { RouterViewPaths } from "@/core/router";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import Icon from "../Icon.vue";
import { useRouter } from "vue-router";

const s = useCssModule()
const [isExtended, toggleExtension] = useToggle() 
const router = useRouter()
const toggleStyle = computed(() => ({
    transform: `rotateZ(${isExtended.value ? 180 : 0 }deg)`
} satisfies CSSProperties))

interface Tab {
    name: string,
    pagePath: string,
    svg: SVG
}

const tabs: Tab[] = [
    {
        name: 'Home',
        pagePath: '/',
        svg: SVG.Home
    },
    {
        name: 'Apiaries',
        pagePath: '/apiaries',
        svg: SVG.Apiary
    },
    // {
    //     name: 'Calendar',
    //     pagePath: '/calendar',
    //     svg: SVG.Calendar
    // },
    {
        name: 'Inspections',
        pagePath: RouterViewPaths.Inspections,
        svg: SVG.Clipboard
    },
  
]
const selectedTab = ref(tabs[0])

const containerVariants: Record<string, VariantType> = {
    expanded: { minWidth: '15rem' },
    collapsed: { maxWidth: '3.5rem', minWidth: '2rem', transition: { delay: .1 }}
}

const tabVariants: Record<string, VariantType> = {
    expanded:  { opacity: 1, display: 'flex', y: 0, transition: { delay: .2, duration: .3  } },
    collapsed: { opacity: 0, display: 'none', y: 5, transition: {  duration: .15 } }
}

function onTabSelect(tab: Tab) {
    router.push(tab.pagePath)
    
    selectedTab.value = tab
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
    <button :class="s.extender" :style="toggleStyle" @click="toggleExtension()">
        <!-- icon here -->
    </button>

    <ul :class="s.list">
      <motion.li
        v-for="(tab, i) in tabs"
        id="icon"
        :key="i"  
        :class="s.tab"
        :while-press="{ scale: 0.9, transition: { duration: 0.1 } }"
        @click="onTabSelect(tab); "
        >
        <div :class="s.iconWrapper">
            <Icon 
                :class="[s.icon, selectedTab.name === tab.name && s.selected]" 
                :type="IconType.MEDIUM" 
                :icon="tab.svg"
            />
        </div>

        <motion.label
            for="icon"
            :class="[
                s.text, 
                'button-text',
                selectedTab.name === tab.name && s.selected
            ]"
            :variants="tabVariants"
            :initial="'collapsed'"
            :animate="isExtended ? 'expanded' : 'collapsed'"
        >
          {{ tab.name }}
        </motion.label>

        <motion.div
          v-if="selectedTab.name === tab.name"
          :class="s.selectedBookmark"
          layoutId="selected"
          :transition="{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], type: 'spring' }"
        />
      </motion.li>
    </ul>
  </motion.div>
</template>

<style module lang='sass'>
.container
    top: 3rem
    position: sticky
    display: flex
    flex-direction: column
    width: 6rem
    height: calc(100vh - var(--header-height))
    // background: var(--black)

    // background: var(--white)

    .tip
        height: 3rem
        width: 100%
        background: var(--white)
        border-bottom: 2px solid var(--light-gray)

    .list
        all: unset
        display: flex
        flex-direction: column
        padding: 1rem .5rem 
        gap: .2rem

        .tab
            z-index: 0
            all: unset
            position: relative

            display: flex
            align-items: center
            
            width: 100%
            gap: 1rem
            height: 2.5rem
            // height: 40px
            // padding: .5rem 
            box-sizing: border-box
            background-color: transparent
            border-radius: 5px
            cursor: pointer
            transition: .1s ease-out

            &:hover
                background-color: rgba(0, 0, 0, .1)

            .iconWrapper
                display: flex
                align-items: center
                justify-content: center
                
                min-width: 2.5rem
                min-height: 2.5rem
                width: 2.5rem
                height: 2.5rem

                .icon
                    z-index: 2
                    transition: .2s

                    &.selected
                        color: white

                        scale: 1.2


            .text
                z-index: 2
                position: absolute
                font-size: var(--font-size-medium)
                font-weight: 500
                letter-spacing: .02em
                font-family: var(--font-family)
                margin-left: 3rem
                transition: .2s ease

                &.selected
                    color: white

           
            .selectedBookmark
                z-index: 1
                position: absolute
                right: 0
                height: 100%
                width: 200%

                border-radius: 3px
                background: var(--orange)

    .extender
        all: unset
        position: absolute
        display: flex
        justify-content: center
        align-items: center
        background: var(--orange)
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