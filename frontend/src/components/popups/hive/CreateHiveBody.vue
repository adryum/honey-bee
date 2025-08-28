<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';

import { motion } from 'motion-v';
import TitledField from '../../input/fields/TitledField.vue';
import ImageDropZone from '../../input/fields/ImageDropZone.vue';
import SelectionDropdown from '../../input/dropdowns/SelectionDropdown.vue';
import Button from '../../input/buttons/Button.vue';

const s = useCssModule()

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
<motion.div :class="s.grid">
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
</motion.div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.grid
    display: grid
    grid-template-areas: 'img fields' 
    grid-template-columns: 1fr 1fr
    grid-template-rows: 315px
    
    gap: 1rem
    width: 50rem


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