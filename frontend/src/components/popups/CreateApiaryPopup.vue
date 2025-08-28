<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';
import TitledField from '../input/fields/TitledField.vue';
import Button from '../input/buttons/Button.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import PopupFrame from './PopupFrame.vue'

const s = useCssModule()
const props = defineProps<{
    unmount?: () => {},
    focusHandler?: (el: HTMLElement) => {}
}>()

const imageSrc = ref('')
const name = ref('')
const location = ref('')
const description = ref('')

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

const isValid = computed(() => {
    return name.value && location.value
})
</script>

<template>
<PopupFrame title="Create apiary" :unmount="unmount" :focus-handler="focusHandler">
    <template #body>
        <div :class="s.grid">
            <ImageDropZone :image-src="imageSrc" :class="s.image"/>
            
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
                    @click="isValid ? onCreate(name, location, description) : {}" 
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