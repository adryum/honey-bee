<script setup lang="ts">
import type { ModalBaseModel } from "@/core/composables/useModalBase";
import { getRandomId } from "@/core/utils/others";
import { computed, ref, useCssModule } from "vue";
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
   <slot />
</dialog>
</template>

<style module lang="sass">
.container
    border:     none
    padding:    0
    overflow:   visible
    width:      100vw
    height:     100vh
    max-width:  100vw
    max-height: 100vh
    margin:     0
    inset:      0
    box-sizing: border-box
    background: transparent
    
    &::backdrop
        display: none
</style>