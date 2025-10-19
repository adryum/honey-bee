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
import type { FieldValidator, FieldOptions } from '@/core/options/FieldOptions';

const s = useCssModule()
const props = defineProps<{
    hive: HiveModel
    popupFunctions: PopupFunctions
}>()
const { updateHive, isHiveLoading, apiaries } = useHiveUpdate()
// temp vals
const tempApiaryId = ref<undefined | number>(undefined)
const tempName = ref('')
const tempLocation = ref('')
const tempDescription = ref('')
const tempType = ref('')
const tempImage = ref<File>()

// valid fields
const isNameValid = ref<FieldValidator>()
const isDescriptionValid = ref<FieldValidator>()
const isTypeValid = ref<FieldValidator>({ isValid: true, error: ""})
const isLocationValid = ref<FieldValidator>()
const isEverythingValid = computed(() => {
    return isNameValid.value?.isValid && isDescriptionValid.value?.isValid && isTypeValid.value?.isValid && isLocationValid.value?.isValid
})

// dropdowns
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

const isDifferent = computed(() => {
    const hive = props.hive
    const isApiaryDifferent = tempApiaryId.value != hive.apiaryId
    const isNameDifferent = tempName.value != hive.name
    const isImageDifferent = Boolean(tempImage.value)
    const isLocationDifferent = tempLocation.value != hive.location
    const isDescriptionDifferent = tempDescription.value != hive.description
    return isApiaryDifferent || isImageDifferent || isNameDifferent || isLocationDifferent || isDescriptionDifferent 
})

async function fireUpdateHive() {
   
    if (!isEverythingValid.value || !isDifferent.value) return

    const hiveUpdateModel: HiveUpdateModel = {
        id: props.hive.id,
        apiaryId: tempApiaryId.value,
        name: tempName.value,
        imageFile: tempImage.value,
        type: tempType.value,
        location: tempLocation.value,
        description: tempDescription.value
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
    console.log("Hive :: : ");
    console.log(props.hive);
    
    // set temp field values
    tempName.value = props.hive.name
    console.log(tempName.value);
    
    tempLocation.value = props.hive.location
    tempDescription.value = props.hive.description
    tempApiaryId.value = props.hive.apiaryId
    tempType.value = props.hive.type
})
const rule = {
    minLength: 20,
} as FieldOptions
const rule2 = {
    isRequired: true,
    minLength:9,
} as FieldOptions
</script>

<template>
<PopupFrame title="Update hive" :popupFunctions="popupFunctions">
    <template #body>
    <motion.div :class="s.grid">
        <ImageDropZone :class="s.image" v-model:image-file="tempImage"/>
        <div :class="s.fields">
            <TitledField 
                :class="s.name" 
                :is-required="true" 
                title="Name"
                :field-options="rule2"
                v-model:text="tempName"
                @validator="e => isNameValid = e"/>
            <TitledField 
                :class="s.location" 
                :is-required="true" 
                title="Location" 
                :field-options="rule"
                v-model:text="tempLocation"
                @validator="e => isLocationValid = e"/>
            <TitledField 
                :class="s.description" 
                :is-required="true" 
                title="Description" 
                v-model:text="tempDescription"
                @validator="e => isDescriptionValid = e"/>
            <SelectionDropdown :class="s.typeDrop" 
                title="Type" :options="typeOptions" v-model:selected="tempType"
            />
            <SelectionDropdown :class="s.apiaryDrop" 
                title="Type" :options="apiaryOptions" v-model:selected="tempApiaryId"
            />
            <Button :style="(isEverythingValid) ? { background: 'rgba(0,0,0, .3)' } : { opacity: 0.5 }" :class="s.button" text="Save" @click="fireUpdateHive"/>
        </div>
    </motion.div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.grid
    display: grid
    grid-template-areas: 'img fields' 
    grid-template-columns: 1fr 1fr
    grid-template-rows: 400px
    
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