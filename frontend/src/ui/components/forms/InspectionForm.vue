<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import type { InspectionFormUI } from "@/core/stores/Models";
import { computed, useCssModule, watch } from "vue";
import { useVModel } from '@vueuse/core'
import Checkbox from "../input/fields/Checkbox.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import StringMultipleField from "../input/fields/used/StringMultipleField.vue";
import NumberField from "../input/fields/used/NumberField.vue";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()

const props = withDefaults(defineProps<{ 
    form :        InspectionFormUI
    submitButtonText?: string
    isReviewing?: boolean
    allowSubmiting?: boolean
}>(), {
    isReviewing: false
})
const emit = defineEmits<{ 
    'update:form': [InspectionFormUI]
    'submit': []
}>()
const form = useVModel(props, 'form', emit)
</script>

<template>
<form
    :class="s.form"
    @submit.prevent=""
>
    <Checkbox
        :label="t('form.inspect_abnormal_behavior')"
        :readonly="isReviewing"
        :value="form.isAbnormalBehavior"
        @click="form.isAbnormalBehavior = !form.isAbnormalBehavior"
    />
    <StringMultipleField
        v-if="form.isAbnormalBehavior"
        :label="t('form.label_description')"
        :selection="form.abnormalBehaviorDescription"
        :readonly="isReviewing"
        @input="value => form.abnormalBehaviorDescription = value"
    />
    
    <Checkbox
        :label="t('form.inspect_swarming')"
        :readonly="isReviewing"
        :value="form.isSwarming"
        @click="form.isSwarming = !form.isSwarming"
    />

    <Checkbox
        :label="t('form.inspect_additional_feeding')"
        :readonly="isReviewing"
        :value="form.needAdditionalFeeding"
        @click="form.needAdditionalFeeding = !form.needAdditionalFeeding"
    />


    <Checkbox
        :label="t('form.inspect_queen_alive')"
        :readonly="isReviewing"
        :value="form.isQueenAlive"
        @click="form.isQueenAlive = !form.isQueenAlive"
    />
    <Checkbox
        v-if="form.isQueenAlive"
        :class="s.indented"
        :label="t('form.inspect_queen_laying')"
        :readonly="isReviewing"
        :value="form.isQueenLayingEggs"
        @click="form.isQueenLayingEggs = !form.isQueenLayingEggs"
    />
    <Checkbox
        v-if="form.isQueenAlive"
        :class="s.indented"
        :label="t('form.inspect_queen_laying_incorrect')"
        :readonly="isReviewing"
        :value="form.isQueenLayingEggsIncorrectly"
        @click="form.isQueenLayingEggsIncorrectly = !form.isQueenLayingEggsIncorrectly"
    />

    <Checkbox
        :label="t('form.inspect_honey_frames_needed')"
        :readonly="isReviewing"
        :value="form.needMoreHoneyFrames"
        @click="form.needMoreHoneyFrames = !form.needMoreHoneyFrames"
    />
    <NumberField
        v-if="form.needMoreHoneyFrames"
        :label="t('form.label_amount')"
        :readonly="isReviewing"
        :selection="form.needMoreHoneyFramesAmount"
        @input="value => form.needMoreHoneyFramesAmount = value"
    />
    
    <Checkbox
        :label="t('form.inspect_breeding_frames_needed')"
        :readonly="isReviewing"
        :value="form.needMoreBreedingFrames"
        @click="form.needMoreBreedingFrames = !form.needMoreBreedingFrames"
    />
    <NumberField
        v-if="form.needMoreBreedingFrames"
        :label="t('form.label_amount')"
        :readonly="isReviewing"
        :selection="form.needMoreBreedingFramesAmount"
        @input="value => form.needMoreBreedingFramesAmount = value"
    />

    <Checkbox
        :label="t('form.inspect_taking_frames')"
        :readonly="isReviewing"
        :value="form.isTakingOutFrames"
        @click="form.isTakingOutFrames = !form.isTakingOutFrames"
    />
    <NumberField
        v-if="form.isTakingOutFrames"
        :label="t('form.inspect_honey_frames_amount')"
        :readonly="isReviewing"
        :selection="form.takenHoneyFrames"
        @input="value => form.takenHoneyFrames = value"
    />
    <NumberField
        v-if="form.isTakingOutFrames"
        :label="t('form.inspect_breeding_frames_amount')"
        :readonly="isReviewing"
        :selection="form.takenBreedingFrames"
        @input="value => form.takenBreedingFrames = value"
    />

    <Checkbox
        :label="t('form.inspect_medical_needed')"
        :readonly="isReviewing"
        :value="form.needMedicalAttention"
        @click="form.needMedicalAttention = !form.needMedicalAttention"
    />
    <StringMultipleField
        v-if="form.needMedicalAttention"
        :label="t('form.label_description')"
        :selection="form.medicalAttentionDescription"
        :readonly="isReviewing"
        @input="value => form.medicalAttentionDescription = value"
    />

    <Checkbox
        :label="t('form.inspect_hive_damage')"
        :readonly="isReviewing"
        :value="form.hasHiveDamage"
        @click="form.hasHiveDamage = !form.hasHiveDamage"
    />
    <StringMultipleField
        v-if="form.hasHiveDamage"
        :label="t('form.label_description')"
        :readonly="isReviewing"
        :selection="form.hiveDamageDescription"
        @input="value => form.hiveDamageDescription = value"
    />

    <IconTextButton
        v-if="!isReviewing"
        :icon="SVG.ArrowRight"
        :is-submit="true"
        :swap-icon-position="true"
        :is-aligned-center="true"
        :style="{marginTop: 'auto'}"
        :disabled="!allowSubmiting"
        :text="submitButtonText || t('button.submit')"
        @click="emit('submit')"
    />
</form>
</template>

<style module lang="sass">
.form
    display: flex
    flex-direction: column
    gap: 1rem

.indented
    margin-left: 2.5rem
</style>