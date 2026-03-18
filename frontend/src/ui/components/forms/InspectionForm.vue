<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import type { InspectionFormUI } from "@/core/stores/Models";
import { useCssModule } from "vue";
import { useVModel } from '@vueuse/core'
import CheckboxWText from "../input/fields/CheckboxWText.vue";
import LabeledTextareaField from "../input/fields/LabeledTextareaField.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";

const s = useCssModule()

const props = withDefaults(defineProps<{ 
    form :       InspectionFormUI
    isReviewing?: boolean
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
    <CheckboxWText
        label="Abnormal bee behavior?"
        :disabled="isReviewing"
        v-model:is-true="form.isAbnormalBehavior"
    />
    <LabeledTextareaField
        v-if="form.isAbnormalBehavior"
        :class="s.indented"
        :options="{}"
        v-model:input="form.abnormalBehaviorDescription"
    />
    
    
    <CheckboxWText
        label="Swarming?"
        :disabled="isReviewing"
        v-model:is-true="form.isSwarming"
    />

        <CheckboxWText
        label="Need additional feeding?"
        :disabled="isReviewing"
        v-model:is-true="form.needAdditionalFeeding"
    />


    <CheckboxWText
        label="Queen alive?"
        :disabled="isReviewing"
        v-model:is-true="form.isQueenAlive"
    />
    <CheckboxWText
        v-if="form.isQueenAlive"
        label="Is queen laying eggs?"
        :disabled="isReviewing"
        :class="s.indented"
        v-model:is-true="form.isQueenLayingEggs"
    />
    <CheckboxWText
        v-if="form.isQueenAlive"
        label="Is queen laying eggs incorrectly?"
        :disabled="isReviewing"
        :class="s.indented"
        v-model:is-true="form.isQueenLayingEggsIncorrectly"
    />

    <CheckboxWText
        label="Does hive need more honey frames?"
        :disabled="isReviewing"
        v-model:is-true="form.needMoreHoneyFrames"
    />
    <LabeledTextareaField
        v-if="form.needMoreHoneyFrames"
        :class="s.indented"
        :options="{}"
        v-model:input="form.needMoreHoneyFramesAmount"
    />
    
    <CheckboxWText
        label="Does hive need more breeding frames?"
        :disabled="isReviewing"
        v-model:is-true="form.needMoreBreedingFrames"
    />
    <LabeledTextareaField
        v-if="form.needMoreBreedingFrames"
        :class="s.indented"
        :options="{}"
        v-model="form.needMoreBreedingFramesAmount"
    />

    <CheckboxWText
        label="Taking out frames?"
        :disabled="isReviewing"
        v-model:is-true="form.isTakingOutFrames"  
    />
    <LabeledTextareaField
        v-if="form.isTakingOutFrames"
        label="Honey frames"
        :class="s.indented"
        :options="{}"
        v-model:input="form.takenHoneyFrames"
    />
    <LabeledTextareaField
        v-if="form.isTakingOutFrames"
        label="Breeding frames"
        :class="s.indented"
        :options="{}"
        v-model:input="form.takenBreedingFrames"
    />

    <CheckboxWText
        label="Is medical action needed?"
        :disabled="isReviewing"
        v-model:is-true="form.needMedicalAttention"
    />
    <LabeledTextareaField
        v-if="form.needMedicalAttention"
        :class="s.indented"
        :options="{}"
        v-model:input="form.medicalAttentionDescription"
    />

    <CheckboxWText
        label="Is there any hive damage?"
        :disabled="isReviewing"
        v-model:is-true="form.hasHiveDamage"  
    />
    <LabeledTextareaField
        v-if="form.hasHiveDamage"
        :class="s.indented"
        :options="{}"
        v-model:input="form.hiveDamageDescription"
    />

    <IconTextButton
        v-if="!isReviewing"
        :svg="SVG.ArrowRight"
        :is-submit="true"
        :swap-icon-position="true"
        :is-aligned-center="true"
        :style="{marginTop: 'auto'}"
        text="Save and go to the next hive"
        @click="emit('submit')"
    />
</form>
</template>

<style module lang="sass">
.form
    display: flex
    flex-direction: column
    gap: 1rem
    padding: 1rem
    box-sizing: border-box

.indented
    margin-left: 2.5rem
</style>