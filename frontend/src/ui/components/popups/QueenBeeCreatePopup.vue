<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';
import Button from '../input/buttons/Button.vue';
import PopupFrame from './PopupFrame.vue'
import SelectionDropdown from '../input/dropdowns/SelectionDropdown.vue';
import type { DropdownItem } from '@/core/Interfaces';
import type { PopupFunctions, PopupInfo } from '@/core/utils/components';
import type { CallbackModel } from '@/core/models/SupperModels';
import type { FieldOptions, FieldValidator } from '@/core/composables/field/useField';
import TitledFieldMultiple from '../input/fields/TitledFieldMultiple.vue';
import { useQueenBeeCreate } from '@/core/composables/hive/useQueenBeeCreate';

export type QueenBeeCreatePopupProps = {
    hiveId: number
}

export type QueenBeeCreateRequestModel = {

}

const s = useCssModule()
const props = defineProps<{
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
    queenBeeCreateProps: QueenBeeCreatePopupProps
    onCreate?: () => {}
}>()
const closeFunction = ref<(() => void) | null>(null)
const { isQueenBeeLoading, createQueenBee } = useQueenBeeCreate();
const species = ref('')
const additionalInfo = ref('')
const dropdownSpeciesItems: DropdownItem[] = [
    { text: "Bigus bitus" },
    { text: "Honey bee" },
]

// validators
const additionalInfoValidator = ref<FieldValidator>()
const speciesValidator = ref<FieldValidator>()
const isEverythingValid = computed(() => {
    return additionalInfoValidator.value?.isValid
    && speciesValidator.value?.isValid
})
const additionalInfoRules: FieldOptions = {
    maxLength: 200
}

function closePopup() {
    if (closeFunction.value) closeFunction.value();
}

async function create() {
    if (!isEverythingValid.value) return

    const createQueenBeeModel: QueenBeeCreateRequestModel = {
        species: species.value,
        additionalInfo: additionalInfo
    }

    const callbackModel: CallbackModel = {
        onSuccess() {
            props.onCreate?.()
            closePopup()
        },
        onFailure(error) {
            
        },
    }

    await createQueenBee(createQueenBeeModel, callbackModel)
}
</script>

<template>
<PopupFrame 
    title="Add Queen" 
    :popup-functions="popupFunctions" 
    :popup-info="popupInfo" 
    @on-close="fun => closeFunction = fun"
>
    <template #body>
        <div :class="s.grid">
            <SelectionDropdown 
                title="Type" 
                :class="s.dropdown" 
                :dropdownItems="dropdownSpeciesItems"
                :is-requiried="true"
                :z-index="popupInfo.zIndex.value"
                v-on:validator="v => speciesValidator = v"
            />
            <TitledFieldMultiple 
                title="Aditional Info"
                :class="s.content" 
                :is-required="false" 
                :fieldRules="additionalInfoRules"
                v-on:validator="v => additionalInfoValidator = v"
                v-model="additionalInfo"
            />
            <div :class="s.buttons">
                <Button 
                    text="cancel" 
                    :class="s.cancel"
                    :is-important="false"
                    @click="closePopup" 
                />
                <Button 
                    text="Create" 
                    :class="s.create"
                    :is-disabled="!isEverythingValid" 
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
    display: flex
    flex-direction: column
    width: 30rem
    gap: 1rem

    .firstRow
        display: flex
        gap: 1rem

        .dropdown
            flex: 1

        .title
            flex: 5

    .buttons
        display: flex
        gap: 1rem

        & > *
            flex: 1
    
</style>