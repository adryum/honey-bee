<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';
import TitledField from '../input/fields/TitledField.vue';
import Button from '../input/buttons/Button.vue';
import PopupFrame from './PopupFrame.vue'
import SelectionDropdown from '../input/dropdowns/SelectionDropdown.vue';
import type { DropdownOptions } from '@/core/Interfaces';
import type { PopupFunctions, PopupInfo } from '@/core/utils/components';
import { useNoteCreate } from '@/core/composables/hive/useCreateNote';
import type { NoteCreateRequestModel } from '@/core/models/NoteModels';
import type { CallbackModel } from '@/core/models/SupperModels';
import type { FieldOptions, FieldValidator } from '@/core/composables/field/useField';
import TitledFieldMultiple from '../input/fields/TitledFieldMultiple.vue';

const s = useCssModule()
const props = defineProps<{
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
    onCreate?: () => {}
}>()
const { isNoteLoading, createNote } = useNoteCreate();
const closeFunction = ref<(() => void) | null>(null)
const type = ref('')
const title = ref('')
const content = ref('')
const dropdownOptions: DropdownOptions[] = [
    { text: "Information" },
    { text: "Warning" },
]

// validators
const titleValidator = ref<FieldValidator>()
const contentValidator = ref<FieldValidator>()
const typeValidator = ref<FieldValidator>()
const isEverythingValid = computed(() => {
    return titleValidator.value?.isValid 
    && contentValidator.value?.isValid
    && typeValidator.value?.isValid
})

const titleRule: FieldOptions = {
    isRequired: true,
    maxLength: 40
}
const contentRule: FieldOptions = {
    isRequired: true,
    maxLength: 200
}

function closePopup() {
    if (closeFunction.value) closeFunction.value();
}

async function create() {
    if (!isEverythingValid.value) return

    const createNoteModel: NoteCreateRequestModel = {
        type: type.value,
        title: title.value,
        content: content.value
    }

    const callbackModel: CallbackModel = {
        onSuccess() {
            props.onCreate?.()
            closePopup()
        },
        onFailure(error) {
            
        },
    }

    await createNote(createNoteModel, callbackModel)
}
</script>

<template>
<PopupFrame 
    title="Create Note" 
    :popup-functions="popupFunctions" 
    :popup-info="popupInfo" 
    v-on:close="(fun) => closeFunction = fun"
>
    <template #body>
        <div :class="s.grid">
            <TitledField 
                title="Title"
                :class="s.title" 
                :is-required="true"
                :field-options="titleRule"
                v-on:validator="v => titleValidator = v"
                v-model="title"
            />
            <TitledFieldMultiple 
                title="Content"
                :class="s.content" 
                :is-required="true" 
                :field-options="contentRule"
                v-on:validator="v => contentValidator = v"
                v-model="content"
            />
            <SelectionDropdown 
                title="Type" 
                :class="s.dropdown" 
                :options="dropdownOptions"
                :is-requiried="true"
                :z-index="popupInfo.zIndex.value"
                v-on:validator="v => typeValidator = v"
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