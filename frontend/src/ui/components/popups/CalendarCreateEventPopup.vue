<script setup lang="ts">
import { ref, useCssModule } from 'vue'
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import { useHiveStore } from '@/core/stores/HiveStore';
import { type PopupData, usePopup } from '@/core/utils/PopupHiarchy';
import { storeToRefs } from 'pinia';
import PopupFrame from './PopupFrame.vue';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { useMainStore } from '@/core/stores/MainStore';

const s = useCssModule()
const props = defineProps<{
    popupData: PopupData,
    selectedDate: Date
}>()

const { frameModel, close } = usePopup({
    label: 'Create event',
    functions: props.popupData.functions,
    info: props.popupData.info
})
const formValidator = useFormValidator()

const hiveStore = useHiveStore()
const { user } = storeToRefs(useMainStore())

const start = ref('')
const end = ref('')
const title = ref('')
const description = ref('')

function createEvent() {
    if (!formValidator.isFormValid.value) return

    hiveStore.createCalendarEvent({
        hiveId: hiveStore.selectedHive!.id,
        calendarId:  hiveStore.selectedHive!.calendarId,
        start: props?.selectedDate?.toISOString() ?? start.value,
        end: props?.selectedDate?.toISOString() ?? end.value,
        title: title.value,
        description: description.value,
        creatorEmail: user.value?.email!
    }, 
    {
        onSuccess() {
            close()
        },
        onFailure() {

        }
    })
}
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
            <div
                v-if="!props.selectedDate" 
                :class="s.row"
            >
                <LabeledInputField
                    label="Start"
                    :options="{
                        isRequired: true,
                        formValidator: formValidator
                    }"
                    v-model:input="start"
                />
                <LabeledInputField
                    label="End"
                    :options="{
                        isRequired: true,
                        formValidator: formValidator
                    }"
                    v-model:input="end"
                />
            </div>
            <LabeledInputField
                label="Name"
                :options="{
                    isRequired: true,
                    formValidator: formValidator
                }"
                v-model:input="title"
            />
            <LabeledTextareaField
                label="Description"
                :options="{
                    isRequired: true,
                    formValidator: formValidator
                }"
                v-model:input="description"
            />
                <!-- <ModularDropdown
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
                </ModularDropdown> -->
                
            <IconTextButton
                text="Save"
                :style="{ background: 'var(--yellow)' }"
                :disabled="!formValidator.isFormValid.value"
                @click="createEvent"
            />
        </form>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
.form
    display: flex
    flex-direction: column
    gap: 1.5rem
    max-height: 35rem
    width: 30rem
    height: 25rem

.image
    width: 50%

.row
    display: flex
    flex-direction: row
    gap: 1.5rem
</style>