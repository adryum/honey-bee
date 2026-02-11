<script setup lang="ts">
import { computed, ref, useCssModule, watch } from 'vue';
import Button from '../input/buttons/Button.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import PopupFrame from './PopupFrame.vue'
import { usePopup, type PopupData } from '@/core/utils/PopupHiarchy';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import { useApiaryStore } from '@/core/stores/ApiaryStore';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { SVG } from '@/assets/svgs/SVGLoader';

const s = useCssModule()
const props = defineProps<{
    popupData: PopupData
}>()

const apiaryStore = useApiaryStore()
const formValidator = useFormValidator() 
const { frameModel, close } = usePopup({
    label: "Create hive",
    functions: props.popupData.functions,
    info: props.popupData.info
})

const imageFile = ref<File | undefined>()
const name = ref('')
const description = ref('')

async function create() {
    await apiaryStore.createApiary({
        name:        name.value,
        description: description.value,
        image:       imageFile.value 
    },
    {
        onSuccess() {
            close()
        },
        onFailure() {
            
        }
    })
}

watch(formValidator.isFormValid, (newval) => {
    console.log("is valid: ", newval);
    
}, { immediate: true })  
</script>

<template>
<PopupFrame
    :frame-model="frameModel"
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
                    text="Create" 
                    :class="s.button" 
                    :svg="SVG.Plus"
                    :is-loading="apiaryStore.isCreatingApiary"
                    :disabled="!formValidator.isFormValid.value"
                    @click="create" 
                />
            </div>
            
        </div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
        
.grid
    display: grid
    grid-template-areas: 'img fields' 
    grid-template-columns: 1fr 1fr
    grid-template-rows: 250px
    
    gap: 1rem
    width: 40rem

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
        background: var(--yellow)
</style>