<script setup lang="ts">
import { useDraggable } from '@vueuse/core';
import { ref, useCssModule } from 'vue';
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import type { PopupFrameModel } from '@/core/utils/PopupHiarchy';

const s = useCssModule()
const props = defineProps<{
    isResizable?: boolean,
}>()
const frameModel = defineModel<PopupFrameModel | undefined>('frameModel')
const container = ref()
const handle = ref()

const { style } = useDraggable(container, {
    handle: handle,
    initialValue: { x: 100, y: 100  }
})
</script>

<template>
    <div 
        :class="s.wrapper"
    >
        <div @mousedown="frameModel?.functions.focus" 
            ref="container"
            :style="style"
            :class="[s.container]" 
            >
            <div ref="handle" :class="s.handle">
                <h1 :class="s.popupName">{{ frameModel?.label ?? 'NO_LABEL' }}</h1>
                <slot name="header">
                    
                </slot>
                <button 
                    :class="s.button"
                    @click="frameModel?.functions.unmount()" 
                >
                    <SVGIcon 
                        :class="s.icon" 
                        :type="IconType.SMALL"
                        :svg="SVG.Cross" 
                    /> 
                </button> 
            </div>

            <div :class="s.body">
                <slot name="body">

                </slot>
            </div>
        </div>
    </div>
</template>

<style module lang="sass">
.wrapper
    top: 0
    position: fixed

.container 
    position: fixed
    display: flex
    flex-direction: column

    box-sizing: border-box

    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
    // background: var(--blue)
    background: var(--white)
    // padding: .5rem

    border-radius: var(--border-radius-medium)
    
    max-height: 90vh
    max-width: 90vw
    overflow: hidden

    .handle
        display: flex
        align-items: center
        height: 2.5rem
        background: var(--blue)
        
        // padding: .5rem
        padding-left: 1rem
        // border-bottom: 2px solid var(--blue)

        .popupName
            all: unset
            text-transform: capitalize;
            font-family: var(--font-family)
            font-size: var(--font-size-medium)
            letter-spacing: 0.02em
            line-height: 1rem
            font-weight: 700

        .button
            all: unset
            display: flex
            align-items: center
            justify-content: center

            margin-left: auto
            height: 100%
            width: 4rem

            transition: .1s

            &:hover
                opacity: 1
                background: var(--red)

    .body
        padding: 1rem
    
</style>
