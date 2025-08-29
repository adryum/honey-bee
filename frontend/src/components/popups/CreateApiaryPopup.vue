<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';
import TitledField from '../input/fields/TitledField.vue';
import Button from '../input/buttons/Button.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import PopupFrame from './PopupFrame.vue'
import { ApiaryRepository } from '../../core/repositories/ApiaryRepository';

const s = useCssModule()
const props = defineProps<{
    onCreate?: () => {}, 
    unmount?: () => {},
    focusHandler?: (el: HTMLElement) => {}
}>()

const imageFile = ref<File | null>(null)
const name = ref('')
const location = ref('')
const description = ref('')

async function create() {
    console.log(imageFile.value);

    await ApiaryRepository.createApiary(
        name.value,
        location.value,
        description.value,
        imageFile.value
    );

    props.onCreate?.()
    
    props.unmount?.();
}

const isValid = computed(() => {
    return name.value
})
</script>

<template>
<PopupFrame title="Create apiary" :unmount="unmount" :focus-handler="focusHandler">
    <template #body>
        <div :class="s.grid">
            <ImageDropZone v-model:image-file="imageFile" :class="s.image"/>
            
            <div :class="s.fields">
                <TitledField 
                    :class="s.name" 
                    :is-required="true" 
                    title="Name" 
                    v-model="name"/>
                <TitledField 
                    :class="s.location" 
                    title="Location" 
                    v-model="location" 
                    />
                <TitledField 
                    :class="s.description" 
                    title="Description" 
                    v-model="description"/>
                <Button 
                    :class="s.button" 
                    @click="create" 
                    text="Create" />
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
</style>