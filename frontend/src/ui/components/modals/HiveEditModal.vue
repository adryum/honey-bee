<script setup lang="ts">
import { SVG } from '@/assets/svgs/SVGLoader';
import { useApiaryMutations } from '@/core/composables/useApiary';
import { useCssModule, ref, watch } from 'vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { useFormValidator } from '@/core/composables/useFormValidator';
import ModalBase from './ModalBase.vue';
import { useModalBase } from '@/core/composables/useModalBase';
import { useHiveMutations } from '@/core/composables/useHive';
import { HiveType } from '@/core/DatabaseEnums';
import type { HiveModelDB } from '@/core/stores/Models';
import StringField from '../input/fields/used/StringField.vue';
import StringMultipleField from '../input/fields/used/StringMultipleField.vue';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import StringFieldTopPart from '../input/dropdowns/dropdownItems/top/StringFieldTopPart.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';

const s = useCssModule()
const props = defineProps<{
    hive: HiveModelDB
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { update, isUpdatingHive } = useHiveMutations()
const { getFormValidee, isFormValid, initialize } = useFormValidator()

const imageFile = ref<File | undefined>()
const name = ref('')
const type = ref<HiveType | undefined>()
const description = ref('')
const hiveTypeModels: { name: HiveType, icon: SVG }[] = [
    { name: HiveType.MOVABLE, icon: SVG.Apiary },
    { name: HiveType.STATIONARY, icon: SVG.BeeHive },
]

function createHive() {
    if (!type.value) return

    update({
        id:          props.hive.id,
        name:        name.value,
        description: description.value,
        image:       imageFile.value,
        type:        type.value,
        apiaryId:    props.hive.apiaryId
    },
    {
        onSuccess: () => modal.value?.close()
    })
}

watch(() => exposed.isOpen(), (val) => {
    if (!val) return 
    initialize()
})
</script>

<template>
<ModalBase
    ref="modal"
    label="Edit hive"
>
    <template #body>
    <div :class="s.grid">
        <ImageDropZone 
            :class="s.image"
            v-model:image-file="imageFile" 
        />
        <div :class="s.fields">
            <StringField
                label="Name"
                :selection="name"
                :validee="getFormValidee({
                    isValid: () => !!name,
                    onClear: () => name = '',
                    onInitialize: () => name = hive.name
                })"
                @input="value => name = value"
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
                            onInitialize: () => type = hive.type
                        })"
                        @click="dropdown.isShown.value = true"
                    />
                </template>
                <template #list="{ dropdown }">
                    <IconTextItem
                        v-for="item in hiveTypeModels"
                        :key="item.name"
                        :options="{
                            svg: item.icon,
                            text: item.name
                        }"
                        @click="type = item.name; dropdown.isShown.value = false"
                    />
                </template>
            </ModularDropdown>

            <StringMultipleField
                label="Description"
                :selection="description"
                :validee="getFormValidee({
                    isValid: () => true,
                    onClear: () => description = '',
                    onInitialize: () => description = hive.description
                })"
                @input="value => description = value"
            />

            <IconTextButton
                :icon="SVG.Plus"
                :class="s.button" 
                :is-submit="true"
                :is-aligned-center="true"
                :style="{marginTop: 'auto'}"
                :is-loading="isUpdatingHive"
                :disabled="!isFormValid"
                :hide-icon="true"
                text="Update"
                @click="createHive" 
            />
        </div>
        
    </div>
    </template>
</ModalBase>
</template>

<style module lang = 'sass'>
.description
    height: 100%

.grid
    display: grid
    grid-template-areas: 'img fields' 
    grid-template-columns: 1fr 1fr
    grid-template-rows: 250px
    
    gap: 1rem
    width: 40rem
    padding: 1rem

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