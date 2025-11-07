<script setup lang="ts">
import { useDraggable } from '@vueuse/core';
import { AnimatePresence, motion } from 'motion-v';
import { onMounted, ref, useCssModule } from 'vue';
import TransparentIconButton from '../input/buttons/TransparentIconButton.vue';
import { SVGImage, SVGRes } from '../../../core/SVGLoader';
import type { PopupFunctions, PopupInfo } from '@/core/utils/components';

const s = useCssModule()
const container = ref()
const handle = ref()
const isExiting = ref(false)
const hasEntered = ref(false)
const props = defineProps<{
    title: string,
    isResizable?: boolean,
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
}>()

const { style } = useDraggable(container, {
    handle: handle,
    initialValue: { x: 100, y: 100  }
})
const emit = defineEmits<{
    onClose: [() => void]
}>()

function startExiting() {
  isExiting.value = true
  console.log("Closing popup")
}

function handleMotions() {
    if (isExiting.value)
        props.popupFunctions.unmount()

    if (!hasEntered.value)
        hasEntered.value = true
}

onMounted(() => {
  emit('onClose', startExiting)
})
</script>

<template>
<AnimatePresence>
    <motion.div v-if="!isExiting" 
        :class="s.wrapper"
        :initial="{y: -100 , opacity: 0}"
        :animate="{y: 0, opacity: 1, transition: {duration: .1}} "
        :exit="{y: 800 , opacity: 0}"
        @motioncomplete="handleMotions"
        >
        <div @mousedown="popupFunctions.focus" 
            ref="container"
            :style="style"
            :class="[s.container]" 
            >
            <div ref="handle" :class="s.handle">
                <h1 :class="s.popupName">{{ title }}</h1>
                <slot name="header">
                    
                </slot>
                <TransparentIconButton :svg="new SVGImage(SVGRes.Cross, 'black')" @click="startExiting" :class="s.button"/>
            </div>

            <div :class="s.body">
                <slot name="body">

                </slot>
            </div>
        </div>
    </motion.div>
</AnimatePresence>
</template>

<style module lang="sass">
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
.wrapper
    top: 0
    position: fixed

.container 
    position: fixed
    display: flex
    flex-direction: column

    box-sizing: border-box

    box-shadow: 0px 0px 50px 2px rgba(0, 0, 0, 0.4)
    background: var(--surface)
    border-radius: 2px
    // border: 1px solid  var(--light)
    
    max-height: 90vh
    max-width: 90vw
    overflow: hidden

    .handle
        display: flex
        align-items: center
        height: 2rem
        background: var(--accent)
        
        padding-left: .5rem

        .popupName
            all: unset
            @include main.mono-font
            text-transform: uppercase;

            @include main.f-size-very-small
            font-weight: 900


        .button
            margin-left: auto

    .body
        padding: 1rem
    
</style>
