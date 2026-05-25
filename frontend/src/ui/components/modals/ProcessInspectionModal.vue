<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import ModalBase from "./ModalBase.vue";
import { useFormValidator } from "@/core/composables/useFormValidator";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useModalBase } from "@/core/composables/useModalBase";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import { useInspectionMutation, useInspectionQuery } from "@/core/composables/useInspection";
import StringField from "../input/fields/used/StringField.vue";
import { useHiveMutations } from "@/core/composables/hive/useHive";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    inspectionId: number
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { getFormValidee, isFormValid } = useFormValidator()
const { inspection } = useInspectionQuery({ 
    id:            props.inspectionId,
    allowFetching: computed(() => exposed.isOpen()) 
})

const { createYield, isCreatingYields } = useHiveMutations()
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
                if (!form.hive) return

                const honeyAmount = Number(honeyAveragePerFrame.value) * form.takenHoneyFrames;
                createYield({
                    amount:       honeyAmount,
                    inspectionId: props.inspectionId,
                    hiveId:       form.hive.id
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
    :label="t('modal.process_inspection_title')"
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
                    {{ t('inspection.label_id') }}
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
                    {{ t('inspection.label_apiary') }}
                </label>
                <p 
                    id="created"
                    :class="s.gridValues"    
                >#{{ inspection?.apiaryId }} {{ inspection?.apiaryName }}</p>


                <label 
                    for="type"
                    :class="s.gridLabels"
                >{{ t('inspection.label_created') }}</label>
                <p 
                    id="type"
                    :class="s.gridValues"    
                >{{ inspection ? inspection.creationDate.toDateString() : "" }}</p>


                <label 
                    for="loacaion"
                    :class="s.gridLabels"
                >{{ t('inspection.label_hive_count') }}</label>
                <p 
                    id="loacaion"
                    :class="s.gridValues"
                >{{ inspection?.forms.length }}</p>

                <label 
                    for="loacaion"
                    :class="s.gridLabels"
                >{{ t('inspection.label_honey_frames') }}</label>
                <p 
                    id="loacaion"
                    :class="s.gridValues"
                    :style="!!!takenHoneyFrames && { color: 'var(--red)' }"
                >{{ takenHoneyFrames }}</p>

                <label 
                    for="loacaion"
                    :class="s.gridLabels"
                >{{ t('inspection.label_honey_average') }}</label>
                <p 
                    id="loacaion"
                    :class="s.gridValues"
                    :style="!!!takenHoneyFrames && { color: 'var(--red)' }"
                >{{ honeyAveragePerFrame }}</p>
            </div>
    

            <div :class="s.fields">
                <StringField
                    :label="t('form.label_honey_kg')"
                    :class="s.field"
                    :selection="procesedHoney"
                    :style="!!!takenHoneyFrames && {
                        opacity: 0.5,
                        pointerEvents: 'none'
                    }"
                    :validee="getFormValidee({
                        isValid: () => !!procesedHoney,
                        onClear: () => procesedHoney = '',
                        onInitialize: () => procesedHoney = ''
                    })"
                    @input="value => procesedHoney = value"
                />
                
            </div>
            <IconTextButton 
                :text="t('button.process')"
                :disabled="!isFormValid" 
                :icon="SVG.Plus"
                :is-submit="true"
                :is-aligned-center="true"
                :hide-icon="true"
                :is-loading="isCreatingYields"
                @click="processInspection"
            />
        </div>
    </template>
</ModalBase>
</template>

<style module lang="sass">
.field
    width: 100%

.grid
    margin-top: auto
    display: grid
    grid-template-columns: 12rem 1fr
    gap: 1rem

.gridLabels
    font-size: var(--font-size-medium)
    font-weight: 300
    color: var(--faint-text)
    letter-spacing: .02em

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
        gap: .5rem
       
</style>