<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import type { InspectionFormUI } from "@/core/stores/Models";
import { computed, useCssModule, watch } from "vue";
import { useVModel } from '@vueuse/core'
import CheckboxWText from "../input/fields/CheckboxWText.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import StringMultipleField from "../input/fields/used/StringMultipleField.vue";
import NumberField from "../input/fields/used/NumberField.vue";

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
const lockedInteractionStyle = computed(() => props.isReviewing ? { pointerEvents: 'none' } : {})

const form = useVModel(props, 'form', emit)
</script>

<template>
<form
    :class="s.form"
    @submit.prevent=""
>
    <CheckboxWText
        label="Abnormal bee behavior?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.isAbnormalBehavior"
    />
    <StringMultipleField
        v-if="form.isAbnormalBehavior"
        label="Description"
        :style="lockedInteractionStyle"
        :selection="form.abnormalBehaviorDescription"
        @input="value => form.abnormalBehaviorDescription = value"
    />
    
    <CheckboxWText
        label="Swarming?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.isSwarming"
    />

    <CheckboxWText
        label="Need additional feeding?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.needAdditionalFeeding"
    />


    <CheckboxWText
        label="Queen alive?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.isQueenAlive"
    />
    <CheckboxWText
        v-if="form.isQueenAlive"
        label="Is queen laying eggs?"
        :style="lockedInteractionStyle"
        :class="s.indented"
        v-model:is-true="form.isQueenLayingEggs"
    />
    <CheckboxWText
        v-if="form.isQueenAlive"
        label="Is queen laying eggs incorrectly?"
        :style="lockedInteractionStyle"
        :class="s.indented"
        v-model:is-true="form.isQueenLayingEggsIncorrectly"
    />

    <CheckboxWText
        label="Does hive need more honey frames?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.needMoreHoneyFrames"
    />
    <NumberField
        v-if="form.needMoreHoneyFrames"
        label="Amount"
        :style="lockedInteractionStyle"
        :selection="form.needMoreHoneyFramesAmount"
        @input="value => form.needMoreHoneyFramesAmount = value"
    />
    
    <CheckboxWText
        label="Does hive need more breeding frames?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.needMoreBreedingFrames"
    />
    <NumberField
        v-if="form.needMoreBreedingFrames"
        label="Amount"
        :style="lockedInteractionStyle"
        :selection="form.needMoreBreedingFramesAmount"
        @input="value => form.needMoreBreedingFramesAmount = value"
    />

    <CheckboxWText
        label="Taking out frames?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.isTakingOutFrames"  
    />
    <NumberField
        v-if="form.isTakingOutFrames"
        label="Honey frame amount"
        :style="lockedInteractionStyle"
        :selection="form.takenHoneyFrames"
        @input="value => form.takenHoneyFrames = value"
    />
    <NumberField
        v-if="form.isTakingOutFrames"
        label="Breeding frame amount"
        :style="lockedInteractionStyle"
        :selection="form.takenBreedingFrames"
        @input="value => form.takenBreedingFrames = value"
    />

    <CheckboxWText
        label="Is medical action needed?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.needMedicalAttention"
    />
    <StringMultipleField
        v-if="form.needMedicalAttention"
        label="Description"
        :style="lockedInteractionStyle"
        :selection="form.medicalAttentionDescription"
        @input="value => form.medicalAttentionDescription = value"
    />

    <CheckboxWText
        label="Is there any hive damage?"
        :style="lockedInteractionStyle"
        v-model:is-true="form.hasHiveDamage"  
    />
    <StringMultipleField
        v-if="form.hasHiveDamage"
        label="Description"
        :style="lockedInteractionStyle"
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