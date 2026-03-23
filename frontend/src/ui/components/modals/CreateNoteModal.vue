<script setup lang="ts">
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import { useCssModule, ref, watch } from 'vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import Icon from '../Icon.vue';
import { useNoteMutations } from '@/core/composables/useNote';
import type { NoteCreateModelRequest } from '@/core/api/Models';
import { getRandomId, isValidValue } from '@/core/utils/others';
import { NoteTypes } from '@/core/DatabaseEnums';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import SelectedTextHead from '../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';

const s = useCssModule()
const props = defineProps<{
    hiveId: number
}>()

const id = getRandomId("modal")
const dialogRef = ref<HTMLDialogElement>()
const open =  () => dialogRef.value?.showModal()
const close = () => dialogRef.value?.close()
defineExpose({ open, close })


const { create } = useNoteMutations()

const type = ref<NoteTypes | undefined>(undefined)
const title = ref('')
const content = ref('')

const formValidator = useFormValidator()
async function createNote() {
    if (!formValidator.isFormValid.value && !isValidValue(props.hiveId)) return

    const createNoteModel: NoteCreateModelRequest = {
        type:    type.value!,
        title:   title.value,
        content: content.value,
        hiveId:  props.hiveId
    }

    create(createNoteModel, {
        onSuccess: () => close()
    })
}

watch(formValidator.isFormValid, (newval) => {
    console.log(newval);
    
}, {immediate: true})
</script>

<template>
<dialog
    :id="id"
    ref="dialogRef"
    :class="s.container"
>
    <div ref="handle" :class="s.handle">
        <h1 
            :class="s.popupName"
        >
            Add Note
        </h1>
        <slot name="header">
            
        </slot>
        <button 
            :class="s.button"
            @click="close" 
        >
            <Icon 
                :class="s.icon" 
                :type="IconType.SMALL"
                :svg="SVG.Cross" 
            /> 
        </button> 
    </div>


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
        <ModularDropdown
            label="Type"
            :teleport-target-id="id"
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
        <LabeledTextareaField
            label="Content"
            :style="{ height: '100%' }"
            :options="{
                formValidator: formValidator,
                isRequired: true
            }"
            v-model:input="content"
        />
        <IconTextButton 
            text="Create"
            :is-disabled="!formValidator.isFormValid.value" 
            :is-aligned-center="true"
            :is-submit="true"
            :svg="SVG.Plus"
            @click="createNote" 
        />
    </div>
</dialog>
</template>

<style module lang = 'sass'>
.container
    border: none
    padding: 0
    overflow: visible
    width: 30rem
    height: 25.5rem
    
    box-sizing: border-box

    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
    background: var(--white)
    border-radius: var(--border-radius-medium)

    .handle
        display: flex
        align-items: center
        height: 2.5rem
        background: var(--yellow)
        border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0
        overflow: hidden
        // padding: .5rem
        padding-left: 1rem
        // border-bottom: 2px solid var(--blue)

        .popupName
            all: unset
            text-transform: capitalize
            font-family: var(--font-family)
            font-size: var(--font-size-medium)
            letter-spacing: 0.02em
            line-height: 1rem
            font-weight: 700

        .button
            all: unset
            display: flex
            align-items: center
            justify-content: center

            margin-left: auto
            height: 100%
            width: 4rem

            transition: .1s
            cursor: pointer

            &:hover
                opacity: 1
                background: var(--red)
.grid
    display: flex
    flex-direction: column
    flex: 1
    gap: 1rem
    padding: 1rem
    height: calc( 25.5rem - 2.5rem - 2rem)

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