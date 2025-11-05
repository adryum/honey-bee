<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from 'vue'
import { motion } from 'motion-v';
import TitledField from '../../input/fields/TitledField.vue';
import ImageDropZone from '../../input/fields/ImageDropZone.vue';
import SelectionDropdown from '../../input/dropdowns/SelectionDropdown.vue';
import Button from '../../input/buttons/Button.vue';
import type { DropdownItem } from '../../../../core/Interfaces';
import type { HiveModel, HiveUpdateModel } from '@/core/models/HiveModels';
import PopupFrame from '../PopupFrame.vue';
import type { PopupFunctions, PopupInfo } from '@/core/utils/components';
import { useHiveUpdate } from '@/core/composables/hive/useHiveUpdate';
import type { FieldValidator, FieldOptions } from '@/core/composables/field/useField';
import TitledFieldMultiple from '../../input/fields/TitledFieldMultiple.vue';
import type { CallbackModel } from '@/core/models/SupperModels';

const s = useCssModule()
const props = defineProps<{
    hive: HiveModel
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
}>()
const { updateHive, isHiveLoading, apiaries } = useHiveUpdate()
// temp vals
const tempApiaryId = ref<number | undefined>(undefined)
const tempApiaryName = ref<string | undefined>(undefined)
const tempName = ref<string>('')
const tempLocation = ref<string>('')
const tempDescription = ref<string>('')
const tempType = ref<string>('')
const tempImage = ref<File>()

//  field validators
const nameValidator = ref<FieldValidator>()
const descriptionValidator = ref<FieldValidator>()
const typeValidator = ref<FieldValidator>({ isValid: true, error: ""})
const locationValidator = ref<FieldValidator>()
const isEverythingValid = computed(() => {
    return nameValidator.value?.isValid 
    && descriptionValidator.value?.isValid 
    && typeValidator.value?.isValid 
    && locationValidator.value?.isValid
    && Boolean(tempApiaryId.value) && tempApiaryId.value! > -1
})

const ruleName: FieldOptions = {
    isRequired: true,
    minLength: 3,
    maxLength: 20,
}
const ruleDescription: FieldOptions = {
    maxLength: 250,
}

// dropdowns
const typeOptions: DropdownItem[] = [
    { text: 'Stationary' }, 
    { text: 'Tower' }, 
    { text: 'Movable' } 
]
const apiaryOptions: DropdownItem[] = [
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
    const isTypeDifferent = tempType.value != hive.type
    const isImageDifferent = Boolean(tempImage.value)
    const isLocationDifferent = tempLocation.value != hive.location
    const isDescriptionDifferent = tempDescription.value != hive.description
    
    return isApiaryDifferent 
    || isImageDifferent 
    || isNameDifferent 
    || isLocationDifferent 
    || isDescriptionDifferent 
    || isTypeDifferent
})

async function fireUpdateHive() {
   
    if (!isEverythingValid.value || !isDifferent.value) return

    const hiveUpdateModel: HiveUpdateModel = {
        id: props.hive.id,
        apiaryId: tempApiaryId.value!,
        name: tempName.value,
        imageFile: tempImage.value,
        type: tempType.value,
        location: tempLocation.value,
        description: tempDescription.value
    }

    const callbackModel: CallbackModel = {
        onSuccess: function (message: string): void {

        },
        onFailure: function (error: unknown): void {

        }
    }

    await updateHive(hiveUpdateModel, callbackModel)
}

onMounted(() => {
    // set temp field values
    tempName.value = props.hive.name
    tempLocation.value = props.hive.location
    tempDescription.value = props.hive.description
    tempApiaryId.value = props.hive.apiaryId
    tempApiaryName.value = props.hive.apiaryName
    tempType.value = props.hive.type
})
</script>

<template>
<PopupFrame title="Update hive" :popupFunctions="popupFunctions" :popupInfo="popupInfo">
    <template #body>
        <motion.div :class="s.grid">
            <ImageDropZone :class="s.image" v-model:image-file="tempImage"/>
            <div :class="s.fields">
                <div :class="s.field">
                    
                    <TitledField 
                        title="Name"
                        :class="s.name" 
                        :field-options="ruleName"
                        v-model:text="tempName"
                        v-on:validator="e => nameValidator = e"
                    />
                    
                    <div :class="s.dropdowns">
                        <SelectionDropdown 
                            title="Type" 
                            :class="s.typeDrop" 
                            :dropdownItems="typeOptions" 
                            :z-index="popupInfo.zIndex.value"
                            v-model:selected="tempType" 
                        />
                        <SelectionDropdown 
                            title="Apiary" 
                            :class="s.apiaryDrop" 
                            :dropdownItems="apiaryOptions" 
                            :z-index="popupInfo.zIndex.value"
                            v-model:selected="tempApiaryName" 
                        /> 
                    </div>
                    <TitledField 
                        title="Location"
                        v-model:text="tempLocation"
                        :class="s.location" 
                        v-on:validator="e => locationValidator = e"
                    />
                    <TitledFieldMultiple
                        title="Description" 
                        :class="s.description"
                        :fieldRules="ruleDescription"
                        v-model:text="tempDescription"
                        v-on:validator="e => descriptionValidator = e"
                    />
                </div>
                <div :class="s.buttonPart">
                    <Button 
                        text="Save" 
                        :isDisabled="!isEverythingValid || !isDifferent" 
                        :class="s.button"
                        @click="fireUpdateHive"
                    />
                </div>
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
    grid-template-rows: 350px
    
    gap: 1rem
    width: 50rem

    .fields
        grid-area: fields
        display: grid
        grid-template-areas: 'fields' 'button'
        grid-template-rows: 1fr 2rem
        gap: 1rem

        .field
            grid-area: fields
            gap: 1rem
            display: flex
            flex-direction: column
            overflow-y: auto

            .dropdowns
                display: grid
                grid-template-columns: 1fr 1fr
                gap: 1rem


        .buttonPart
            grid-area: button
            display: flex
            .button
                flex: 1
    .image
        grid-area: img
        width: 100%
        height: 100%
        object-fit: cover
</style>