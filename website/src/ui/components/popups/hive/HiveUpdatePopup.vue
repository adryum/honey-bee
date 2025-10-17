<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from 'vue'
import { motion } from 'motion-v';
import TitledField from '../../input/fields/TitledField.vue';
import ImageDropZone from '../../input/fields/ImageDropZone.vue';
import SelectionDropdown from '../../input/dropdowns/SelectionDropdown.vue';
import Button from '../../input/buttons/Button.vue';
import type { DropdownOptions } from '../../../../core/Interfaces';
import type { HiveModel, HiveUpdateModel } from '@/core/models/HiveModels';
import PopupFrame from '../PopupFrame.vue';
import type { PopupFunctions } from '@/core/utils/components';
import { useHiveUpdate } from '@/core/composables/useHiveUpdate';

const s = useCssModule()
const props = defineProps<{
    hive: HiveModel
    popupFunctions: PopupFunctions
}>()
const { updateHive, isHiveLoading, apiaries } = useHiveUpdate()
const tempApiaryId = ref<undefined | number>(undefined)
const tempName = ref('')
const tempLocation = ref('')
const tempDescription = ref('')
const tempType = ref('')
const tempImage = ref<File>()
const typeOptions: DropdownOptions[] = [
    { text: 'Stationary' }, 
    { text: 'Tower' }, 
    { text: 'Movable' } 
]
const apiaryOptions: DropdownOptions[] = [
    ...apiaries.value.map(apiary => 
        ({ 
            text: apiary.name,
            onClick: () => tempApiaryId.value = apiary.id
        })
    )
]

const isEverythingValid = computed(() => {
    return Boolean(tempName.value && tempType.value)
})

async function fireUpdateHive() {
   
    if (!isEverythingValid.value) return
    const hive = props.hive

    const hiveUpdateModel: HiveUpdateModel = {
        id: hive.id,
        apiaryId: (tempApiaryId.value != hive.apiaryId) ? tempApiaryId.value : undefined,
        name: (tempName.value != hive.name) ? tempName.value : undefined,
        imageFile: (tempImage.value) ? tempImage.value : undefined,
        type: (tempType.value != hive.type) ? tempType.value : undefined,
        location: (tempLocation.value != hive.location) ? tempLocation.value : undefined,
        description: (tempDescription.value != hive.description) ? tempDescription.value : undefined
    }

    await updateHive(
        hiveUpdateModel,
        {
            onSuccess(hive) {
                
            },
            onFailure(error) {
                
            },
        }
        
    )
}

onMounted(() => {
    tempApiaryId.value != props.hive.apiaryId
    tempName.value = props.hive.name
    tempLocation.value = props.hive.location
    tempDescription.value = props.hive.description
    tempType.value = props.hive.type
})
</script>

<template>
<PopupFrame title="Update hive" :popupFunctions="popupFunctions">
    <motion.div :class="s.grid">
        <ImageDropZone :class="s.image" v-model:image-file="tempImage"/>
        <div :class="s.fields">
            <TitledField 
                :class="s.name" 
                :is-required="true" 
                title="Name" 
                v-model="tempName"/>
            <TitledField 
                :class="s.name" 
                :is-required="true" 
                title="Location" 
                v-model="tempLocation"/>
            <TitledField 
                :class="s.name" 
                :is-required="true" 
                title="Description" 
                v-model="tempDescription"/>
            <SelectionDropdown :class="s.tag" 
                title="Type" :options="typeOptions" v-model:selected="tempType"
            />
            <SelectionDropdown :class="s.tag" 
                title="Type" :options="apiaryOptions" v-model:selected="tempApiaryId"
            />
            <Button :style="{ background: 'rgba(0,0,0, .3)' }" :class="s.button" text="Add" @click="fireUpdateHive"/>
        </div>
    </motion.div>
</PopupFrame>
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