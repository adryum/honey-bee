<script setup lang="ts">
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import { useApiaryMutations } from '@/core/composables/useApiary';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import { useCssModule, ref, watch } from 'vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import Icon from '../Icon.vue';

const s = useCssModule()
const props = defineProps<{
}>()

const dialogRef = ref<HTMLDialogElement>()
const open =  () => dialogRef.value?.showModal()
const close = () => dialogRef.value?.close()
defineExpose({ open, close })

const { create, isCreatingApiary } = useApiaryMutations()
const formValidator = useFormValidator() 

const imageFile = ref<File | undefined>()
const name = ref('')
const description = ref('')

function createApiary() {
    create({
        name:        name.value,
        description: description.value,
        image:       imageFile.value 
    },
    {
        onSuccess: () => {}
    })
}

watch(formValidator.isFormValid, (newval) => {
    console.log("is valid: ", newval);
    
}, { immediate: true })  
</script>

<template>
<dialog
    ref="dialogRef"
    :class="s.container"
>
    <div ref="handle" :class="s.handle">
        <h1 
            :class="s.popupName"
        >
            Add apiary
        </h1>
        <slot name="header">
            
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
    <div :class="s.grid">
        <ImageDropZone 
            :class="s.image"
            v-model:image-file="imageFile" 
        />
        <div :class="s.fields">
            <LabeledInputField
                label="Name"
                :class="s.name" 
                :options="{
                    isRequired: true,
                    formValidator: formValidator
                }"
                v-model:input="name"
            />

            <LabeledTextareaField
                label="Description"
                :class="s.description" 
                :options="{
                    isRequired: true,
                    formValidator: formValidator
                }"
                v-model:input="description"
            />
            <IconTextButton
                :svg="SVG.Plus"
                :class="s.button" 
                :is-submit="true"
                :swap-icon-position="true"
                :is-aligned-center="true"
                :style="{marginTop: 'auto'}"
                :is-loading="isCreatingApiary"
                :disabled="!formValidator.isFormValid.value"
                text="Create"
                @click="createApiary" 
            />
        </div>
        
    </div>
</dialog>
</template>

<style module lang = 'sass'>
.description
    height: 100%

.container
    border: none
    padding: 0
    
    box-sizing: border-box

    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
    background: var(--white)
    border-radius: var(--border-radius-medium)

    .handle
        display: flex
        align-items: center
        height: 2.5rem
        background: var(--yellow)
        
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

            &:hover
                opacity: 1
                background: var(--red)

    .body
        padding: 1rem

.grid
    display: grid
    grid-template-areas: 'img fields' 
    grid-template-columns: 1fr 1fr
    grid-template-rows: 250px
    
    gap: 1rem
    width: 40rem
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