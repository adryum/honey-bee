<script setup lang="ts">
import { ref, useCssModule } from "vue";
import { motion } from 'motion-v';
import SVGComponent from "../../SVGComponent.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";

const s = useCssModule()
const text = defineModel('text')
const props = withDefaults(defineProps<{
    hint?: string
    actionText?: string
    onClick?: (value: string) => void
}>(),
{
    hint: '...',
    actionText: 'Search',
    onClick: () => {}
})
const isExtended = ref(true)
const searchWord = () => {}
const toggleSearch = () => {
    isExtended.value = !isExtended.value
    text.value = ""
}
</script>

<template>
<div :class="s.container">
    <div v-if="isExtended"
        :class="s.extendedPart"
    >
        <input
            :class="s.text"
            :placeholder="hint"
            v-model="text"
        />
        <button 
            :class="s.close"    
            @click="toggleSearch"
        >
            <SVGComponent :class="s.svg" :svg="new SVGImage(SVGRes.Cross)"/>
        </button>
    </div>
        
    <button
        :class="s.action"
        :style="isExtended ? { backdropFilter: 'brightness(90%)', borderRadius: '0 3px 3px 0' } : { borderRadius: '3px' }"    
        @click="isExtended ? searchWord() : toggleSearch()"
    >
        <SVGComponent :class="s.svg" :svg="new SVGImage(SVGRes.Apiaries)"/>
    </button>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    align-items: center
    background: white
    border-radius: 3px
    box-sizing: border-box
    max-width: 12rem

    .extendedPart
        display: flex
        align-items: center
        border: 1px solid rgba(0,0,0,.1)
        box-sizing: border-box
        min-height: 28px
        max-height: 28px
        
        .text
            all: unset
            width: 100%
            box-sizing: border-box
            padding: 0 .5rem
            
            color: black

        .close
            all: unset
            min-height: 26px
            min-width: 26px
            max-height: 26px
            max-width: 26px
            padding: .3rem
            box-sizing: border-box
            cursor: pointer
            transition: .1s

            &:hover
                backdrop-filter: brightness(90%)

    .action
        all: unset
        min-width: 28px
        min-height: 28px
        max-height: 28px
        max-width: 28px

        padding: .3rem
        box-sizing: border-box
        border-radius: 0 3px 3px 0
        cursor: pointer
        transition: .1s

        &:hover
            backdrop-filter: brightness(90%)

.svg
    width: 100%
    height: 100%
</style>