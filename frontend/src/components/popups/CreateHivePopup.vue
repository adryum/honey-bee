<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from 'vue';
import IconCubeButton from '../input/buttons/IconCubeButton.vue';
import RegistrationInputField from '../input/fields/RegistrationInputField.vue';
import RegistrationButton from '../input/buttons/RegistrationButton.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import PopupFrame from './PopupFrame.vue';
import TitledField from '../input/fields/TitledField.vue';
import SelectionDropdown from '../input/dropdowns/SelectionDropdown.vue';
import Button from '../input/buttons/Button.vue';

const s = useCssModule()
const props = defineProps<{
    unmount?: () => {},
    focusHandler?: (el: HTMLElement) => {}
}>()

const name = ref('')
const location = ref('')
const description = ref('')
const type = ref('')
const image = ref('')
const typeOptions = [
    {
        text: 'Stationary' 
    }, 
    {
        text: 'Tower'
    }, 
    {
        text: 'Movable'
    } 
]

const isEverythingValid = computed(() => {
    return name.value && type.value
})

function createHive() {
    if (!isEverythingValid.value) return

    
}
</script>


<template>
<PopupFrame title="Add hive" :unmount="unmount" :focus-handler="focusHandler">
    <template #body>
        <div :class="s.body">
            <ImageDropZone :class="s.image" :image-src="image"/>
            <div :class="s.fields">
                <TitledField 
                    :class="s.name" 
                    :is-required="true" 
                    title="Name" 
                    v-model="name"/>
                <TitledField 
                    :class="s.name" 
                    :is-required="true" 
                    title="Location" 
                    v-model="location"/>
                <TitledField 
                    :class="s.name" 
                    :is-required="true" 
                    title="Description" 
                    v-model="description"/>
                <SelectionDropdown :class="s.tag" 
                    title="Type" :options="typeOptions" :selection="type"
                />
                <Button :class="s.button" text="Add" @click="createHive"/>
            </div>
        </div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as main
.body
    display: grid
    grid-template-areas: 'img fields' 
    grid-template-columns: 1fr 1fr
    grid-template-rows: 315px
    
    gap: 1rem

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