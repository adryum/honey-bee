<script setup lang="ts">
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { ModalBaseModel } from "@/core/composables/useModalBase";
import { computed, ref, useCssModule } from "vue";
import Icon from "../Icon.vue";
import { getRandomId } from "@/core/utils/Utils";

const s = useCssModule()
const props = defineProps<{
    label: string
}>()

const id = ref(getRandomId("modal"))

const dialogRef = ref<HTMLDialogElement>()
const open      = () => dialogRef.value?.showModal()
const close     = () => dialogRef.value?.close()

defineExpose<ModalBaseModel>({ 
    id, 
    open, 
    close, 
    isOpen: computed(() => dialogRef.value?.open ?? false)
})
</script>

<template>
<dialog
    :id="id"
    ref="dialogRef"
    :class="s.container"
>
    <div ref="handle" :class="s.handle">
        <h1 
            :class="s.popupName"
        >
            {{ props.label }}
        </h1>
        <slot 
            name="header"
        >
            
        </slot>
        <button 
            :class="s.button"
            @click="close" 
        >
            <Icon 
                :class="s.icon" 
                :type="IconType.SMALL"
                :svg="SVG.Cross" 
            /> 
        </button> 
    </div>
    <slot 
        name="body"
    >
        
    </slot>
</dialog>
</template>

<style module lang="sass">
.container
    border: none
    padding: 0
    overflow: visible

    
    box-sizing: border-box

    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
    background: var(--white)
    border-radius: var(--border-radius-medium)

    .handle
        display: flex
        align-items: center
        height: 2.5rem
        background: var(--orange)
        border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0
        overflow: hidden
        // padding: .5rem
        padding-left: 1rem
        // border-bottom: 2px solid var(--blue)

        .popupName
            all: unset
            text-transform: capitalize
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
            cursor: pointer

            &:hover
                opacity: 1
                background: var(--red)
</style>