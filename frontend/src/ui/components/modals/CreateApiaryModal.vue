<script setup lang="ts">
import { SVG } from '@/assets/svgs/SVGLoader';
import { useApiaryMutations } from '@/core/composables/useApiary';
import { useCssModule, ref } from 'vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { useFormValidator } from '@/core/composables/useFormValidator';
import ModalBase from './ModalBase.vue';
import { useModalBase } from '@/core/composables/useModalBase';

const s = useCssModule()
const props = defineProps<{
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { create, isCreatingApiary } = useApiaryMutations()
const { getFormValidee, isFormValid } = useFormValidator()

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
        onSuccess: () => modal.value?.close()
    })
}
</script>

<template>
<ModalBase
    ref="modal"
    label="Add Apiary"
>
    <template #body>
    <div :class="s.grid">
        <ImageDropZone 
            :class="s.image"
            v-model:image-file="imageFile" 
        />
        <div :class="s.fields">
            <LabeledInputField
                label="Name"
                :class="s.name" 
                :validee="getFormValidee(() => !!name)"
                v-model:input="name"
            />

            <LabeledTextareaField
                label="Description"
                :class="s.description" 
                :validee="getFormValidee(() => true)"
                v-model:input="description"
            />
            <IconTextButton
                :icon="SVG.Plus"
                :class="s.button" 
                :is-submit="true"
                :swap-icon-position="true"
                :is-aligned-center="true"
                :style="{marginTop: 'auto'}"
                :is-loading="isCreatingApiary"
                :disabled="!isFormValid"
                text="Create"
                @click="createApiary" 
            />
        </div>
        
    </div>
    </template>
</ModalBase>
</template>

<style module lang = 'sass'>
.description
    height: 100%

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