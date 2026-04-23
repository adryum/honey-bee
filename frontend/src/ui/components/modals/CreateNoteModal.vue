<script setup lang="ts">
import { SVG } from '@/assets/svgs/SVGLoader';
import { useCssModule, ref, computed, watch } from 'vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import { useNoteMutations } from '@/core/composables/useNote';
import type { NoteCreateModelRequest } from '@/core/api/Models';
import { isValidValue } from '@/core/utils/others';
import { NoteTypes } from '@/core/DatabaseEnums';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import SelectedTextHead from '../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import { useFormValidator } from '@/core/composables/useFormValidator';
import ModalBase from './ModalBase.vue';
import { useModalBase } from '@/core/composables/useModalBase';
import StringField from '../input/fields/used/StringField.vue';
import StringMultipleField from '../input/fields/used/StringMultipleField.vue';
import StringFieldTopPart from '../input/dropdowns/dropdownItems/top/StringFieldTopPart.vue';

const s = useCssModule()
const props = defineProps<{
    hiveId: number
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { create } = useNoteMutations()
const { getFormValidee, isFormValid, clear } = useFormValidator()

const type    = ref<NoteTypes | undefined>(undefined)
const title   = ref('')
const content = ref('')

async function createNote() {
    if (!isFormValid.value || !isValidValue(props.hiveId)) return

    const createNoteModel: NoteCreateModelRequest = {
        type:    type.value!,
        title:   title.value,
        content: content.value,
        hiveId:  props.hiveId
    }

    create(createNoteModel, {
        onSuccess: () => modal.value?.close()
    })
}

watch(() => exposed.isOpen(), (val) => {
    if (!val) return 
    clear()
})
</script>

<template>
<ModalBase
    ref="modal"
    label="Add Note"
>
    <template #body>
    <div :class="s.grid">
        <StringField
            label="Title"
            :class="s.title" 
            :selection="title"
            :validee="getFormValidee({
                isValid: () => !!title,
                onClear: () => title = '',
                onInitialize: () => title = ''
            })"
            @input="value => title = value"
        />
        
        <ModularDropdown
            :teleport-target-id="modal?.id"
        >
            <template #head="{ dropdown }">
                <StringFieldTopPart
                    label="Type"
                    :dropdown="dropdown"
                    :selection="type"
                    :validee="getFormValidee({
                        isValid: () => !!type,
                        onClear: () => type = undefined,
                        onInitialize: () => type = undefined
                    })"
                    @click="dropdown.isShown.value = true"
                />
            </template>
            <template #list="{ dropdown }">
                <IconTextItem
                    v-for="item in Object.values(NoteTypes).filter(type => type !== NoteTypes.NOT_A_TYPE)"
                    :key="item"
                    :options="{
                        svg: SVG.Apiaries,
                        text: item.toSentenceCase()
                    }"
                    @click="type = item; dropdown.isShown.value = false"
                />
            </template>
        </ModularDropdown>

        <StringMultipleField
            label="Content"
            :selection="content"
            :validee="getFormValidee({
                isValid: () => !!content,
                onClear: () => content = '',
                onInitialize: () => content = ''
            })"
            @input="value => content = value"
        />

        <IconTextButton 
            text="Create"
            :disabled="!isFormValid" 
            :is-aligned-center="true"
            :is-submit="true"
            :icon="SVG.Plus"
            @click="createNote" 
        />
    </div>
    </template>
</ModalBase>
</template>

<style module lang = 'sass'>
.grid
    display: flex
    flex-direction: column
    flex: 1
    gap: 1rem
    padding: 1rem
    height: calc( 25.5rem - 2.5rem - 2rem)
    width: 30rem

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