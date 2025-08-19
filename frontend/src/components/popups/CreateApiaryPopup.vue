<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, useCssModule } from 'vue';
import { useDraggable } from '@vueuse/core';
import TitledField from '../input_fields/TitledField.vue';
import Button from '../buttons/Button.vue';
import ImageDropZone from '../input_fields/ImageDropZone.vue';
import { AnimatePresence, motion } from 'motion-v';
import TransparentIconButton from '../buttons/TransparentIconButton.vue';
import { getSVG, SVGIconRes } from '../../core/SVGLoader';
const s = useCssModule()
const props = defineProps<{
    unmount?: () => {},
    focusHandler?: (el: HTMLElement) => {}
}>()
const container = ref()
const handle = ref()
const isExiting = ref(true)

function startExiting() {
  isExiting.value = false
}

function exit() {
    if (!isExiting.value)
        props.unmount?.()
}

const { style } = useDraggable(container, {
    handle: handle,
    initialValue: { x: 0, y: 0  }
})

const rName = ref('')
const rLocation = ref('')
const rDescription = ref('')

async function onCreate(name: string, location: string, description: string): Promise<void> {
    // const result = await createApiary(props.currentFilter, name, location, description)
 
    // if (result === 201) {
    //     // only on successful result 
    //     props.refreshApiaries()
    //     removePopup(props.id)
    // } else {
    //     // err handling

    // }
}

const parentEl = ref<HTMLElement>()

onMounted(() => {
    const instance = getCurrentInstance();
    parentEl.value = instance?.proxy?.$el.parentElement as HTMLElement;
})

const isValid = computed(() => {
    return rName.value && rLocation.value
})

</script>

<template>
<AnimatePresence  >
<motion.div v-if="isExiting" 
    :class="s.wrapper"
    :initial="{y: 5 , opacity: 0, }"
    :animate="{y: 0, opacity: 1, transition: {duration: .1}}"
    :exit="{y: 200 , opacity: 0}"
    @motioncomplete="exit"
  >
<div @mousedown="() => focusHandler?.(parentEl!)" ref="container" :style="style" :class="s.container" >
    <div ref="handle" :class="s.handle">
        <h1 :class="s.popupName">Add appiary</h1>
        <TransparentIconButton :svg="getSVG(SVGIconRes.Cross)" @click="startExiting" :class="s.button"/>
    </div>

    <div :class="s.grid">
        <ImageDropZone :class="s.image"  />
        
        <div :class="s.fields">
            <TitledField 
                :class="s.name" 
                :is-required="true" 
                title="Name" 
                v-model="rName"/>
            <TitledField 
                :class="s.location" 
                title="Location" 
                v-model="rLocation" 
                />
            <TitledField 
                :class="s.description" 
                title="Description" 
                v-model="rDescription"/>
            <Button 
                :class="s.button" 
                @click="isValid ? onCreate(rName, rLocation, rDescription) : {}" 
                text="Create" />
        </div>
        
    </div>
</div>
</motion.div>
</AnimatePresence>
</template>

<style module lang='sass'>
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

    width: 40rem

    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5)
    background: var(--light)


    .handle
        display: flex
        align-items: center
        height: 2rem
        background: var(--base)
        
        padding-left: .5rem

        .popupName
            all: unset
            @include main.font
            @include main.f-size-very-small
            font-weight: 500


        .button
            margin-left: auto

    .grid
        display: grid
        grid-template-areas: 'img fields' 
        grid-template-columns: 1fr 1fr
        grid-template-rows: 250px
        
        gap: 1rem
        padding: 1rem

        .fields
            display: flex
            flex-direction: column
            grid-area: fields
            gap: 1rem


        .image
            grid-area: img
            width: 100%
            height: 100%
            object-fit: cover

        .button
            margin-top: auto
</style>