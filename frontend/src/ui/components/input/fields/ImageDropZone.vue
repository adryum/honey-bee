<script setup lang="ts">
import { useDropZone } from "@vueuse/core";
import { ref, useCssModule, watch } from "vue";
import { motion } from 'motion-v';
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import Icon from "../../Icon.vue";
import IconTextButton from "../buttons/IconTextButton.vue";

const s = useCssModule()
const dropZoneRef = ref()
const { isOverDropZone, files } = useDropZone(dropZoneRef,
    {
        multiple: false,
        dataTypes: ['jpeg', 'image', 'png']
    }
)
const imageFile = defineModel<File | null>('imageFile'); // the uploaded file
const imageSrc = ref<string | null>(null); // the preview URL
const fileInput = ref<HTMLInputElement | null>(null)

watch(files, () => {
    const file = files.value?.[0] ?? null;

    if (file) {
        
        imageFile.value = file; // store the actual file
        imageSrc.value = URL.createObjectURL(file); // preview URL
        console.log(imageFile.value);
    } else {
        imageFile.value = null;
        imageSrc.value = null;
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
    <motion.div 
        ref="dropZoneRef" 
        :class="s.dropZone"
        :style="imageSrc ? { padding: 0, outline: 'none' } : {}"
        :animate="isOverDropZone ? { rotateZ: '2deg', outlineOffset: '4px',  scale: .9} : { }"
        @click="openFilePicker"
    >
        <motion.div v-if="!imageSrc" 
            :class="s.decorativeDiv"
            :animate="isOverDropZone ? { rotateZ: '-6deg', scale: .6, borderRadius: '10px' } : {}"
            ></motion.div>
        <img v-if="imageSrc" :class="s.image" :src="imageSrc" alt="uploaded image">  
            
        <div
            v-if="!imageSrc" 
            :class="s.addImageText"
        >
            <Icon
                :icon="SVG.Image"
                :type="IconType.GIGANTIC"
            />
            <h1 
                :class="s.dropHint"
            >
                Click or drop image here!
            </h1>
        </div>
    </motion.div>
    <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="handleFiles"
    />
    <IconTextButton
        v-if="imageSrc"
        :class="s.choseFileButton"
        :is-submit="true"
        :icon="SVG.Cross"
        text="Clear"
        @click="imageSrc = ''"
    />
    <!-- <div :class="s.buttons">
        <Button 
            :class="s.choseFileButton"
            @click="openFilePicker"
            :text="imageSrc ? 'select diferent file' : 'select file'" />
    </div> -->
    
</div>
</template>

<style module lang='sass'>
.addImageText
    position: absolute
    display: flex
    flex-direction: column
    gap: 2rem
    align-items: center
    justify-content: center

    height: 10rem
    align-self: center

    color: #4d505f

    .dropHint
        font-family: var(--font-family)
        font-size: var(--font-size-medium)
        font-weight: 700

.container
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 1rem
    max-height: 100%

    .dropZone
        display: flex
        width: 100%
        max-height: 100%

        flex: 1
        padding: 1rem
        box-sizing: border-box
        border-radius: 3px
        cursor: pointer
        justify-content: center
        outline: 4px dotted
        outline-offset: -4px
        outline-color: #4d505f
        border-radius: var(--border-radius-large)

        .image
            display: block
            width: 100%
            height: 100%
            object-fit: cover
            border-radius: var(--border-radius-large)

        .decorativeDiv
            z-index: -1
            position: absolute
            right: 0
            top: 0
            width: 100%
            height: 100%

            border-radius: 3px
            background: white

  

    .buttons
        display: flex
        width: 100%
        justify-content: space-between
    .choseFileButton
        top: .5rem
        right: .5rem
        position: absolute
        max-width: max-content
</style>