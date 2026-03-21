<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from 'vue'
import ImageDropZone from '../../input/fields/ImageDropZone.vue';
import PopupFrame from '../PopupFrame.vue';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import { HiveType } from '@/core/DatabaseEnums';
import { type PopupData, usePopup } from '@/core/utils/PopupHiarchy';
import { storeToRefs } from 'pinia';
import IconTextButton from '../../input/buttons/IconTextButton.vue';
import LabeledInputField from '../../input/fields/LabeledInputField.vue';
import LabeledTextareaField from '../../input/fields/LabeledTextareaField.vue';
import ModularDropdown from '../../input/dropdowns/ModularDropdown.vue';
import SelectedTextHead from '../../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import type { ApiaryModelDB, HiveModelDB } from '@/core/stores/Models';

const s = useCssModule()
const props = defineProps<{
    popupData: PopupData,
    hive: HiveModelDB
}>()

const { frameModel, close } = usePopup({
    label: 'Add hive',
    functions: props.popupData.functions,
    info: props.popupData.info
})
const formValidator = useFormValidator()

const hiveStore = useHiveStore()
const { selectedApiary, apiaries } = storeToRefs(useApiaryStore())

const name = ref('')
const description = ref('')
const type = ref<HiveType | undefined>(undefined)
const apiaryValue = ref<ApiaryModelDB | undefined>(undefined)
const file = ref<File | undefined>(undefined)

const isDifferent = computed(() => {
    return name.value !== props.hive.name ||
        description.value !== props.hive.description ||
        type.value !== props.hive.type ||
        file.value !== undefined ||
        apiaryValue.value?.id !== props.hive.apiaryId
})

function createHive() {
    if (!formValidator.isFormValid.value) return

    hiveStore.updateHive({
        id: props.hive.id,
        name: name.value,
        description: description.value,
        type: type.value!,
        image: file.value,
        apiaryId: apiaryValue.value?.id
    }, 
    {
        onSuccess() {
            close()
        },
        onFailure() {

        }
    })
}

onMounted(() => { 
    name.value = props.hive.name
    description.value = props.hive.description
    type.value = props.hive.type
    apiaryValue.value = apiaries.value.find(item => item.id === props.hive.apiaryId)
})
</script>

<template>
<PopupFrame 
    v-model:frame-model="frameModel"
>
    <template #body>
        <form 
            :class="s.form"
            @submit.prevent
        >
            <ImageDropZone 
                :class="s.image"
                v-model:image-file="file"
            />
            <div :class="s.list">
                <LabeledInputField
                    label="Name"
                    :options="{
                        isRequired: true,
                        formValidator: formValidator
                    }"
                    v-model:input="name"
                />
                <LabeledTextareaField
                    label="Description"
                    :options="{
                        isRequired: true,
                        formValidator: formValidator
                    }"
                    v-model:input="description"
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
                            v-for="item in Object.values(HiveType).filter(type => type !== HiveType.NOT_A_TYPE)"
                            :options="{
                                svg: SVG.Apiaries,
                                text: item.toSentenceCase()
                            }"
                            @click="type = item; dropdown.isShown.value = false"
                        />
                    </template>
                </ModularDropdown>
                <ModularDropdown
                    label="Apiary"
                    :z-index="popupData.info.zIndex.value"
                >
                    <template #head="{ dropdown }">
                        <SelectedTextHead
                            :selection="apiaryValue?.name"
                            :dropdown="dropdown"
                        />
                    </template>
                    <template #list="{ dropdown }">
                        <IconTextItem
                            v-for="apiary in apiaries"
                            :options="{
                                svg: SVG.Apiaries,
                                text: apiary.name
                            }"
                            @click="apiaryValue = apiary; dropdown.isShown.value = false"
                        />
                    </template>
                </ModularDropdown>

                <IconTextButton
                    text="Save"
                    :style="{ background: 'var(--yellow)' }"
                    :disabled="!formValidator.isFormValid.value || !isDifferent"
                    @click="createHive"
                />
            </div>
        </form>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
.form
    display: flex
    gap: 2rem
    max-height: 35rem
    width: 50rem

.image
    width: 50%

.list
    display: flex
    flex-direction: column
    gap: 1.5rem
    width: 60%
</style>