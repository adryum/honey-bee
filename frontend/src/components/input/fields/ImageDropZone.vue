<script setup lang="ts">
import { useDropZone } from "@vueuse/core";
import { ref, useCssModule, watch } from "vue";
import Button from "../buttons/Button.vue";
import { motion } from 'motion-v';

const s = useCssModule()
const dropZoneRef = ref()
const { isOverDropZone, files } = useDropZone(dropZoneRef,
    {
        multiple: false,
        dataTypes: ['jpeg', 'image', 'png']
    }
)
const imageSrc = defineModel<string>('imageSrc')
const fileInput = ref<HTMLInputElement | null>(null)

watch(files, () => {
    if (files.value && files.value[0]) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(files.value[0])
        fileReader.onload = () => {
            console.log(fileReader.result as string);
            imageSrc.value = fileReader.result as string // update reactive ref
        }
    } else {
        imageSrc.value = ''
    }
})

function openFilePicker() {
    if (fileInput.value) {
        fileInput.value.click()
    }
}

function handleFiles(event: Event) {
    if (!event.target) return 

    const target = event.target as HTMLInputElement
    files.value = target.files ? Array.from(target.files) : null
}
</script>

<template>
<div :class="s.container">
    <motion.div ref="dropZoneRef" :class="s.dropZone"
        :style="imageSrc ? { padding: 0 } : {}"
        :animate="isOverDropZone ? { rotateZ: '2deg', outlineOffset: '4px' } : { }"
        >
        <motion.div v-if="!imageSrc" 
        :class="s.decorativeDiv"
        :animate="isOverDropZone ? { rotateZ: '-6deg', scale: .6 } : {}"
        ></motion.div>
        <h1 v-if="!imageSrc" :class="s.dropHint">Drop image here!</h1>
        
        <img v-if="imageSrc" :class="s.image" :src="imageSrc" alt="uploaded image">  
    </motion.div>

    <div :class="s.buttons">
        <Button 
            :class="s.choseFileButton"
            @click="openFilePicker"
            :text="imageSrc ? 'select diferent file' : 'select file'" />
        <input
            ref="fileInput"
            type="file"
            style="display: none"
            @change="handleFiles"
        />
        <Button 
            :class="s.choseFileButton"
            @click="imageSrc = ''"
            text="remove" />
    </div>
    
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font

    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 1rem

    .dropZone
        position: relative
        display: flex
        width: 100%
        flex: 1
        outline: solid
        padding: 1rem
        box-sizing: border-box
        overflow: hidden
        border-radius: 3px

        .image
            display: block
            width: 100%
            height: 100%
            object-fit: cover

        .decorativeDiv
            z-index: -1
            position: absolute
            right: 0
            top: 0
            width: 100%
            height: 100%

            border-radius: 3px
            background: var(--base)


        .dropHint
            all: unset
            display: flex
            align-items: center
            justify-content: center
            width: 100%
            height: 100%

            font-size: 40px
            font-weight: 700
            
            text-align: center

    .buttons
        display: flex
        width: 100%
        justify-content: space-between
    .choseFileButton
        max-width: max-content
</style>