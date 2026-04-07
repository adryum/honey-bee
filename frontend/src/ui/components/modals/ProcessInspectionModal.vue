<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import ModalBase from "./ModalBase.vue";
import { useFormValidator } from "@/core/composables/useFormValidator";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useModalBase } from "@/core/composables/useModalBase";
import LabeledInputField from "../input/fields/LabeledInputField.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import { useInspectionMutation, useInspectionQuery } from "@/core/composables/useInspection";
import { formatDateWithOrdinal } from "@/core/utils/Utils";
import { useHiveHoneyProductionMutations } from "@/core/composables/useHiveHoneyProduction";

const s = useCssModule()
const props = defineProps<{
    inspectionId: number
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { getFormValidee, isFormValid } = useFormValidator()
const { inspection } = useInspectionQuery({ id: props.inspectionId })
const { create } = useHiveHoneyProductionMutations()
const { processInspection: process } = useInspectionMutation()

const procesedHoney = ref('')

const takenHoneyFrames = computed(() => inspection.value?.forms.reduce((acc, form) => acc + form.takenHoneyFrames, 0) ?? 0)
const honeyAveragePerFrame = computed(() => {
    const totalHoney = Number(procesedHoney.value);
    const frameCount = takenHoneyFrames.value;
    const result = frameCount > 0 ? totalHoney / frameCount : 0;
    return result.toFixed(2);
})
        
async function processInspection() {
    process(props.inspectionId,{
        onSuccess: () => {

            inspection.value?.forms.forEach(form => {
                const honeyAmount = Number(honeyAveragePerFrame.value) * form.takenHoneyFrames;
                create({
                    amount:       honeyAmount,
                    inspectionId: props.inspectionId,
                    hiveId:       form.hiveId
                }, {
                    onSuccess: () => {
                        console.log("Success!");
                        
                    },
                    onError: () => {
                        console.error("Error occurred while creating honey production entry.");
                    }
                })
            })

            modal.value?.close()
        }
    })
}
</script>

<template>
<ModalBase
    ref="modal"
    label="Process Inspection"
>
    <template #body>
        <div :class="s.body">
            <div 
                :class="s.grid"
            >
                <label 
                    for="apiary"
                    :class="s.gridLabels"
                >
                    Inspection ID: 
                </label>
                <p 
                    id="apiary"
                    :class="s.gridValues"    
                >
                    {{ props.inspectionId }}
                </p>


                <label 
                    for="created"
                    :class="s.gridLabels"
                >
                    Apiary: 
                </label>
                <p 
                    id="created"
                    :class="s.gridValues"    
                >#{{ inspection?.apiaryId }} {{ inspection?.apiaryName }}</p>


                <label 
                    for="type"
                    :class="s.gridLabels"
                >Created at: </label>
                <p 
                    id="type"
                    :class="s.gridValues"    
                >{{ formatDateWithOrdinal(inspection?.creationDate ?? "") }}</p>


                <label 
                    for="loacaion"
                    :class="s.gridLabels"
                >Hive count: </label>
                <p 
                    id="loacaion"
                    :class="s.gridValues"
                >{{ inspection?.forms.length }}</p>

                <label 
                    for="loacaion"
                    :class="s.gridLabels"
                >Taken honey frames:  </label>
                <p 
                    id="loacaion"
                    :class="s.gridValues"
                    :style="!!!takenHoneyFrames && { color: 'var(--red)' }"
                >{{ takenHoneyFrames }}</p>

                <label 
                    for="loacaion"
                    :class="s.gridLabels"
                >Honey average per frame:  </label>
                <p 
                    id="loacaion"
                    :class="s.gridValues"
                    :style="!!!takenHoneyFrames && { color: 'var(--red)' }"
                >{{ honeyAveragePerFrame }}</p>
            </div>
    

            <div :class="s.fields">
                <LabeledInputField 
                    label="Process honey in KG"
                    :class="s.email"
                    :validee="getFormValidee(() => !!procesedHoney)"
                    :style="!!!takenHoneyFrames && {
                        opacity: 0.5,
                        pointerEvents: 'none'
                    }"
                    v-model:input="procesedHoney"
                />
                
            </div>
            <IconTextButton 
                text="Process"
                :disabled="!isFormValid" 
                :svg="SVG.Plus"
                :is-submit="true"
                :is-aligned-center="true"
                :hide-icon="true"
                @click="processInspection"
            />
        </div>
    </template>
</ModalBase>
</template>

<style module lang="sass">

.grid
    margin-top: auto
    display: grid
    grid-template-columns: 12rem 1fr
    gap: 1rem

.gridLabels
    font-size: var(--font-size-medium)
    font-weight: 300
    color: var(--black)
    letter-spacing: .02em
    opacity: .8

.gridValues
    font-size: var(--font-size-medium)
    font-weight: 500
    color: var(--black)
    letter-spacing: .02em


.container

.body
    display: flex
    flex-direction: column
    gap: 1rem
    width: 35rem
    padding: 1rem

    .fields
        display: flex
        margin-top: 1rem
        gap: .5rem
        .email
            width: 100%
        .role
            width: 100%

        .button
            margin-top: auto
</style>