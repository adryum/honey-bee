<script setup lang="ts">
import { SVG } from '@/assets/svgs/SVGLoader';
import { useApiaryMutations } from '@/core/composables/useApiary';
import { useCssModule, ref, onMounted, watch, watchEffect, isRef } from 'vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { useFormValidator } from '@/core/composables/useFormValidator';
import ModalBase from './ModalBase.vue';
import { useModalBase } from '@/core/composables/useModalBase';
import StringField from '../input/fields/used/StringField.vue';
import StringMultipleField from '../input/fields/used/StringMultipleField.vue';

const s = useCssModule()
const props = defineProps<{
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { create, isCreatingApiary } = useApiaryMutations()
const { getFormValidee, isFormValid, clear } = useFormValidator()

const imageFile = ref<File | undefined>()
const name = ref<string | undefined>()
const description = ref<string | undefined>()

function createApiary() {
    if (!name.value) return

    create({
        name:        name.value,
        description: description.value,
        image:       imageFile.value 
    },
    {
        onSuccess: () => modal.value?.close()
    })
}

watch(() => exposed.isOpen(), (val) => {
    if (!val) return 
    clear()
})
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
            <StringField
                label="Name"
                :selection="name"
                :validee="getFormValidee({
                    isValid: () => !!name,
                    onClear: () => name = undefined,
                    onInitialize: () => name = undefined
                })"
                @input="value => name = value"
            />

            <StringMultipleField
                label="Description"
                :selection="description"
                :validee="getFormValidee({
                    isValid: () => !!description,
                    onClear: () => description = undefined,
                    onInitialize: () => description = undefined
                })"
                @input="value => description = value"
            />

            <IconTextButton
                :class="s.button" 
                :is-submit="true"
                :is-aligned-center="true"
                :style="{marginTop: 'auto'}"
                :is-loading="isCreatingApiary"
                :disabled="!isFormValid"
                :hide-icon="true"
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