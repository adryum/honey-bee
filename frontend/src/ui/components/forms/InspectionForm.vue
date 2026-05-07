<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import type { InspectionFormUI } from "@/core/stores/Models";
import { computed, useCssModule, watch } from "vue";
import { useVModel } from '@vueuse/core'
import Checkbox from "../input/fields/Checkbox.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import StringMultipleField from "../input/fields/used/StringMultipleField.vue";
import NumberField from "../input/fields/used/NumberField.vue";

const s = useCssModule()

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
        label="Abnormal bee behavior?"
        :readonly="isReviewing"
        :value="form.isAbnormalBehavior"
        @click="form.isAbnormalBehavior = !form.isAbnormalBehavior"
    />
    <StringMultipleField
        v-if="form.isAbnormalBehavior"
        label="Description"
        :selection="form.abnormalBehaviorDescription"
        :readonly="isReviewing"
        @input="value => form.abnormalBehaviorDescription = value"
    />
    
    <Checkbox
        label="Swarming?"
        :readonly="isReviewing"
        :value="form.isSwarming"
        @click="form.isSwarming = !form.isSwarming"
    />

    <Checkbox
        label="Need additional feeding?"
        :readonly="isReviewing"
        :value="form.needAdditionalFeeding"
        @click="form.needAdditionalFeeding = !form.needAdditionalFeeding"
    />


    <Checkbox
        label="Queen alive?"
        :readonly="isReviewing"
        :value="form.isQueenAlive"
        @click="form.isQueenAlive = !form.isQueenAlive"
    />
    <Checkbox
        v-if="form.isQueenAlive"
        :class="s.indented"
        label="Is queen laying eggs?"
        :readonly="isReviewing"
        :value="form.isQueenLayingEggs"
        @click="form.isQueenLayingEggs = !form.isQueenLayingEggs"
    />
    <Checkbox
        v-if="form.isQueenAlive"
        :class="s.indented"
        label="Is queen laying eggs incorrectly?"
        :readonly="isReviewing"
        :value="form.isQueenLayingEggsIncorrectly"
        @click="form.isQueenLayingEggsIncorrectly = !form.isQueenLayingEggsIncorrectly"
    />

    <Checkbox
        label="Does hive need more honey frames?"
        :readonly="isReviewing"
        :value="form.needMoreHoneyFrames"
        @click="form.needMoreHoneyFrames = !form.needMoreHoneyFrames"
    />
    <NumberField
        v-if="form.needMoreHoneyFrames"
        label="Amount"
        :readonly="isReviewing"
        :selection="form.needMoreHoneyFramesAmount"
        @input="value => form.needMoreHoneyFramesAmount = value"
    />
    
    <Checkbox
        label="Does hive need more breeding frames?"
        :readonly="isReviewing"
        :value="form.needMoreBreedingFrames"
        @click="form.needMoreBreedingFrames = !form.needMoreBreedingFrames"
    />
    <NumberField
        v-if="form.needMoreBreedingFrames"
        label="Amount"
        :readonly="isReviewing"
        :selection="form.needMoreBreedingFramesAmount"
        @input="value => form.needMoreBreedingFramesAmount = value"
    />

    <Checkbox
        label="Taking out frames?"
        :readonly="isReviewing"
        :value="form.isTakingOutFrames"
        @click="form.isTakingOutFrames = !form.isTakingOutFrames"
    />
    <NumberField
        v-if="form.isTakingOutFrames"
        label="Honey frame amount"
        :readonly="isReviewing"
        :selection="form.takenHoneyFrames"
        @input="value => form.takenHoneyFrames = value"
    />
    <NumberField
        v-if="form.isTakingOutFrames"
        label="Breeding frame amount"
        :readonly="isReviewing"
        :selection="form.takenBreedingFrames"
        @input="value => form.takenBreedingFrames = value"
    />

    <Checkbox
        label="Is medical action needed?"
        :readonly="isReviewing"
        :value="form.needMedicalAttention"
        @click="form.needMedicalAttention = !form.needMedicalAttention"
    />
    <StringMultipleField
        v-if="form.needMedicalAttention"
        label="Description"
        :selection="form.medicalAttentionDescription"
        :readonly="isReviewing"
        @input="value => form.medicalAttentionDescription = value"
    />

    <Checkbox
        label="Is there any hive damage?"
        :readonly="isReviewing"
        :value="form.hasHiveDamage"
        @click="form.hasHiveDamage = !form.hasHiveDamage"
    />
    <StringMultipleField
        v-if="form.hasHiveDamage"
        label="Description"
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
        :text="submitButtonText || 'Submit'"
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