<script setup lang="ts">
import { ref, useCssModule, watch } from 'vue';
import Button from '../input/buttons/Button.vue';
import PopupFrame from './PopupFrame.vue'
import type { DropdownItem } from '@/core/Interfaces';
import { useNoteCreate } from '@/core/composables/hive/useCreateNote';
import type { NoteCreateRequestModel } from '@/core/models/NoteModels';
import type { CallbackModel } from '@/core/models/SupperModels';
import { usePopup, type PopupData } from '@/core/utils/PopupHiarchy';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import StringSearchDropdown from '../input/dropdowns/StringSearchDropdown.vue';
import { NoteTypes } from '@/core/DatabaseEnums';
import LabeledStringSearchDropdown from '../input/dropdowns/LabeledStringSearchDropdown.vue';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import TransparentIconButton from '../input/buttons/TransparentIconButton.vue';
import Icon from '../Icon.vue';
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import IconButton from '../input/buttons/IconButton.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/IconTextItem.vue';

const s = useCssModule()
const props = defineProps<{
    popupData: PopupData
}>()
const { frameModel, close } = usePopup({
    label: 'Add note',
    functions: props.popupData.functions,
    info: props.popupData.info
})
const { isNoteLoading, createNote } = useNoteCreate();
const type = ref('')
const title = ref('')
const content = ref('')
const dropdownOptions: DropdownItem[] = [
    { text: "Information" },
    { text: "Warning" },
]

const formValidator = useFormValidator()
async function create() {
    if (!formValidator.isFormValid.value) return

    const createNoteModel: NoteCreateRequestModel = {
        type: type.value,
        title: title.value,
        content: content.value
    }

    const callbackModel: CallbackModel = {
        onSuccess() {
            close()
        },
        onFailure(error) {
            
        },
    }

    await createNote(createNoteModel, callbackModel)
}

watch(formValidator.isFormValid, (newval) => {
    console.log(newval);
    
}, {immediate: true})
</script>

<template>
<PopupFrame 
    v-model:frame-model="frameModel"
>
    <template #body>
        <div :class="s.grid">
            <LabeledInputField
                label="Title"
                :class="s.title" 
                :options="{
                    formValidator: formValidator,
                    isRequired: true
                }"
                v-model:input="title"
            />
            <LabeledTextareaField
                label="Content"
                :options="{
                    formValidator: formValidator,
                    isRequired: true
                }"
                v-model:input="content"
            />
            <LabeledStringSearchDropdown
                label="Type"
                :big="true"
                :options="{
                    validatorOptions: {
                        formValidator: formValidator,
                        isRequired: true,
                        mustBeOneOfSuggestions: true
                    },
                    items: [NoteTypes.INFORMATIONAL, NoteTypes.WARNING],
                    openOnEmptyInput: true,
                    zIndex: props.popupData.info.zIndex
                }"
                @on-selection="value => type = value || ''"
            />

            <ModularDropdown>
                <template #head>
                    <div :class="s.head">
                        <p :class="s.text">Selection</p>
                        <IconButton
                            :class="s.button"
                            :svg="SVG.DropdownArrow"
                            :type="IconType.SMALL"
                            :transparent="true"
                        />
                    </div>
                </template>
                <template #body>
                    <IconTextItem
                        :options="{
                            svg: SVG.Apiaries,
                            text: NoteTypes.INFORMATIONAL.toSentenceCase()
                        }"
                    />
                </template>
            </ModularDropdown>

            <div :class="s.buttons">
                <Button 
                    text="cancel" 
                    :class="s.cancel"
                    :is-important="false"
                    @click="close" 
                />
                <Button 
                    text="Create" 
                    :class="s.create"
                    :is-disabled="!formValidator.isFormValid.value" 
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

.head
    position: relative
    display: flex
    align-items: center
    height: 2.5rem
    padding: .75rem .9rem

    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 500


    box-sizing: border-box
    box-shadow: inset 0 0 0 1px #E0E0E0
    border-radius: var(--border-radius-small)

    .text
        line-height: 1rem

    .button
        position: absolute
        right: .5rem
        height: 2rem
        width: 2rem

        
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