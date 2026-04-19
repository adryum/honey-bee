<script setup lang="ts">
import { SVG } from '@/assets/svgs/SVGLoader';
import { useCssModule, ref, computed } from 'vue';
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

const s = useCssModule()
const props = defineProps<{
    hiveId: number
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { create } = useNoteMutations()
const { getFormValidee, isFormValid } = useFormValidator()

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
</script>

<template>
<ModalBase
    ref="modal"
    label="Add Note"
>
    <template #body>
    <div :class="s.grid">
        <LabeledInputField
            label="Title"
            :class="s.title" 
            :validee="getFormValidee(() => !!title)"
            v-model:input="title"
        />
        <ModularDropdown
            label="Type"
            :teleport-target-id="modal?.id"
        >
            <template #head="{ dropdown }">
                <SelectedTextHead
                    :selection="type"
                    :dropdown="dropdown"
                    :validee="getFormValidee(() => !!type)"
                />
            </template>
            <template #list="{ dropdown }">
                <IconTextItem
                    v-for="item in Object.values(NoteTypes).filter(type => type !== NoteTypes.NOT_A_TYPE)"
                    :options="{
                        svg: SVG.Apiaries,
                        text: item.toSentenceCase()
                    }"
                    @click="type = item; dropdown.isShown.value = false"
                />
            </template>
        </ModularDropdown>
        <LabeledTextareaField
            label="Content"
            :style="{ height: '100%' }"
            :validee="getFormValidee(() => !!content)"
            v-model:input="content"
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