<script setup lang="ts">
import { ref, useCssModule, watch } from 'vue';
import Button from '../input/buttons/Button.vue';
import PopupFrame from './PopupFrame.vue'
import type { CallbackModel } from '@/core/models/SupperModels';
import { usePopup, type PopupData } from '@/core/utils/PopupHiarchy';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import { NoteTypes } from '@/core/DatabaseEnums';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import SelectedTextHead from '../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import type { NoteCreateModelRequest } from '@/core/api/Models';
import { isValidValue } from '@/core/utils/others';

const s = useCssModule()
const props = defineProps<{
    popupData: PopupData
}>()

const noteStore = useNoteStore()
const hiveStore = useHiveStore()
const { frameModel, close } = usePopup({
    label: 'Add note',
    functions: props.popupData.functions,
    info: props.popupData.info
})
const type = ref<NoteTypes | undefined>(undefined)
const title = ref('')
const content = ref('')

const formValidator = useFormValidator()
async function create() {
    if (!formValidator.isFormValid.value && !isValidValue(hiveStore.selectedHive?.id)) return

    const createNoteModel: NoteCreateModelRequest = {
        type: type.value!,
        title: title.value,
        content: content.value,
        hiveId: hiveStore.selectedHive?.id!
    }

    const callbackModel: CallbackModel = {
        onSuccess() {
            close()
        },
        onFailure() {
            
        },
    }

    await noteStore.createNote(createNoteModel, callbackModel)
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
            <ModularDropdown
                label="Type"
                :z-index="popupData.info.zIndex.value"
            >
                <template #head="{ dropdown }">
                    <SelectedTextHead
                        :selection="type"
                        :dropdown="dropdown"
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

.dropItem
    width: 100%


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