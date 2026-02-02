<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue'
import { motion } from 'motion-v';
import TitledField from '../../input/fields/TitledField.vue';
import ImageDropZone from '../../input/fields/ImageDropZone.vue';
import SelectionDropdown from '../../input/dropdowns/SelectionDropdown.vue';
import Button from '../../input/buttons/Button.vue';
import type { DropdownItem } from '@/core/Interfaces';
import { useHiveCreate } from '@/core/composables/hive/useHiveCreate';
import type { HiveCreateModel } from '@/core/models/HiveModels';

const s = useCssModule()
const props = defineProps<{
    apiaryId: number
    onAssign: () => {}
}>()
const { isHiveLoading, createHive, assignHive } = useHiveCreate()
const name = ref('')
const location = ref('')
const description = ref('')
const type = ref('')
const image = ref<File>()
const typeOptions: DropdownItem[] = [
    {
        text: 'Stationary',
        color: ''
    }, 
    {
        text: 'Tower',
        color: ''
    }, 
    {
        text: 'Movable',
        color: ''
    } 
]

const isEverythingValid = computed(() => {
    return Boolean(name.value && type.value)
})

async function startCreatingHive() {
    console.log(isEverythingValid.value);
    const request1: HiveCreateModel = {
        name: name.value,
        location: location.value,
        description: description.value,
        type: type.value,
        image: image.value
    } 
    console.log(request1);
    
    
    if (!isEverythingValid.value) return

    const request: HiveCreateModel = {
        name: name.value,
        location: location.value,
        description: description.value,
        type: type.value,
        image: image.value
    } 
    console.log("create pressed", request);

    const response = await createHive(
        request,
        {
            onSuccess(hive) {
                
            },
            onFailure(error) {
                
            },
        }
        
    )
    
    if (response) {
        await assignHive(response.id, props.apiaryId)
        props.onAssign()
    }
}
</script>


<template>
<motion.div :class="s.grid">
    <ImageDropZone :class="s.image" v-model:image-file="image"/>
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
            title="Type" :dropdownItems="typeOptions" v-model:selected="type"
        />
        <Button :class="s.button" text="Add" @click="startCreatingHive"/>
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