<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';
import TitledField from '../input/fields/TitledField.vue';
import Button from '../input/buttons/Button.vue';
import PopupFrame from './PopupFrame.vue'
import { useCreateSupper } from '@/core/composables/hive/useCreateSupper';
import SelectionDropdown from '../input/dropdowns/SelectionDropdown.vue';
import type { DropdownItem } from '@/core/Interfaces';
import { isNumber } from '@/core/utils/others';
import type { FieldOptions, FieldValidator } from '@/core/composables/field/useField';
import type { PopupFunctions, PopupInfo } from '@/core/utils/PopupHiarchy';

const s = useCssModule()
const props = defineProps<{
    onCreate?: () => {}, 
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
}>()

const { isSupperLoading, createSupper } = useCreateSupper();
const closeFunction = ref<(() => void) | null>(null)
const type = ref('')
const typeValidator = ref<FieldValidator>()
const frameValidator = ref<FieldValidator>()
const frameCount = ref(0)
const dropdownOptions = [
    { text: "Deep" },
    { text: "Medium" },
    { text: "Small" },
] as DropdownItem[]

const frameOptions: FieldOptions = {
    onlyNumbers: true,
    isRequired: true
}
const isEverythingValid = computed(() => {
    console.log(typeValidator.value?.isValid);
    console.log(frameCount.value > 0);
    
    return typeValidator.value?.isValid && frameValidator.value?.isValid && frameCount.value > -1
})

function closePopup() {
    if (closeFunction.value) closeFunction.value();
}

async function create() {
    if (!isEverythingValid.value) return

    await createSupper(
        {
            type: type.value,
            frames: frameCount.value
        },
        {
            onSuccess() {
                props.onCreate?.()
                closePopup()
            },
            onFailure(error) {
                
            },
        }
    )
}
</script>

<template>
<PopupFrame 
    title="Create supper" 
    :popup-functions="popupFunctions" 
    :popup-info="popupInfo" 
    v-on:close="(fun: (() => void) | null) => closeFunction = fun"
>
    <template #body>
        <div :class="s.grid">
            <SelectionDropdown 
                title="Type" 
                v-model:selected="type"
                :class="s.dropdown" 
                :dropdownItems="dropdownOptions" 
                :z-index="popupInfo.zIndex.value" 
                :is-requiried="true"
                @validator="validator => typeValidator = validator" 
            />
            <TitledField 
                title="Frames"
                v-model:text="frameCount"
                :class="s.frames" 
                :is-required="true" 
                :field-options="frameOptions"
                @validator="validator => frameValidator = validator"
            />
            <Button 
                text="Create" 
                :class="s.create" 
                :is-disabled="!isEverythingValid"
                @click="create" 
            />
            <Button 
                text="cancel"
                :class="s.cancel" 
                :is-important="false" 
                @click="closePopup" 
            />
        </div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
        
.grid
    display: grid
    grid-template-areas: 'drop frames' 'cancel create' 
    grid-template-columns: repeat(2, 10rem)
    
    gap: 1rem

    .dropdown
        grid-area: drop

    .fields
        grid-area: fields

    .cancel
        grid-area: cancel

    .create
        grid-area: create
</style>