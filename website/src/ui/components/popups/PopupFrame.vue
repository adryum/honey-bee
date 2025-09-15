<script setup lang="ts">
import { useDraggable } from '@vueuse/core';
import { AnimatePresence, motion } from 'motion-v';
import { getCurrentInstance, onMounted, ref, useCssModule } from 'vue';
import TransparentIconButton from '../input/buttons/TransparentIconButton.vue';
import { getSVG, SVGIconRes } from '../../../core/SVGLoader';

const s = useCssModule()
const container = ref()
const handle = ref()
const isExiting = ref(false)
const parentEl = ref<HTMLElement>()
const props = defineProps<{
    title: string,
    isResizable?: boolean,
    unmount?: () => {},
    focusHandler?: (el: HTMLElement) => {}
}>()

onMounted(() => {
    const instance = getCurrentInstance();
    parentEl.value = instance?.proxy?.$el.parentElement as HTMLElement;
})

const { style } = useDraggable(container, {
    handle: handle,
    initialValue: { x: 100, y: 100  }
})

function startExiting() {
  isExiting.value = true
}

function exit() {
    if (isExiting.value)
        props.unmount?.()
}
</script>

<template>
<AnimatePresence>
    <motion.div v-if="!isExiting" 
        :class="s.wrapper"
        :initial="{y: 5 , opacity: 0, }"
        :animate="{y: 0, opacity: 1, transition: {duration: .1}}"
        :exit="{y: 200 , opacity: 0}"
        @motioncomplete="exit"
        >
        <div @mousedown="() => focusHandler?.(parentEl!)" 
            ref="container"
            :style="style"
            :class="[s.container]" 
            >
            <div ref="handle" :class="s.handle">
                <h1 :class="s.popupName">{{ title }}</h1>
                <slot name="header">
                    
                </slot>
                <TransparentIconButton :svg="getSVG(SVGIconRes.Cross, 'black')" @click="startExiting" :class="s.button"/>
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
    transition: .5s

.container 
    position: fixed
    display: flex
    flex-direction: column

    box-sizing: border-box

    box-shadow: 0px 0px 50px 2px rgba(0, 0, 0, 0.4)
    background: var(--base)
    border: 1px solid rgba(0, 0, 0, 0.4)
    
    max-height: 90vh
    max-width: 90vw

    .handle
        display: flex
        align-items: center
        height: 2rem
        background: rgba(0, 0, 0, 0.2)
        
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
