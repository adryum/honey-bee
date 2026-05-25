<script setup lang="ts">
import { SVG } from '@/assets/svgs/SVGLoader';
import { useCssModule, ref, computed, watch } from 'vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { useFormValidator } from '@/core/composables/useFormValidator';
import ModalBase from './ModalBase.vue';
import { useModalBase } from '@/core/composables/useModalBase';
import { useCalendarMutation } from '@/core/composables/useCalendar';
import StringField from '../input/fields/used/StringField.vue';
import StringMultipleField from '../input/fields/used/StringMultipleField.vue';
import { useI18n } from 'vue-i18n';

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    calendarId :       string
    otherCalendarIds : string[]
    date :             Date
}>()

const emits = defineEmits<{
    create: []
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { createEvent, isCreatingEvent } = useCalendarMutation()
const { getFormValidee, isFormValid, clear } = useFormValidator()

const title   = ref('')
const content = ref('')

async function create() {
    if (!isFormValid.value || !props.calendarId) return

    createEvent({
        calendarId:  props.calendarId,
        title:       title.value,
        description: content.value,
        start:       props.date.toISOString(),
        end:         props.date.toISOString()
    }, {
        onSuccess: () => {
            emits('create')
            modal.value?.close();
        } 
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
    :label="t('calendar.create_event')"
>
    <template #body>
    <div :class="s.grid">
        <StringField
            :label="t('form.label_title')"
            :class="s.title" 
            :selection="title"
            :validee="getFormValidee({
                isValid: () => !!title,
                onClear: () => title = '',
                onInitialize: () => title = ''
            })"
            @input="value => title = value"
        />

        <StringMultipleField
            :label="t('form.label_content')"
            :selection="content"
            :validee="getFormValidee({
                isValid: () => !!content,
                onClear: () => content = '',
                onInitialize: () => content = ''
            })"
            @input="value => content = value"
        />
       
        <IconTextButton 
            :text="t('button.create')"
            :disabled="!isFormValid" 
            :is-aligned-center="true"
            :is-submit="true"
            :is-loading="isCreatingEvent"
            :icon="SVG.Plus"
            @click="create" 
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