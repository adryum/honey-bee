<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRef, useCssModule, watch } from "vue";
import Icon from "../components/Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import InspectionForm from "../components/forms/InspectionForm.vue";
import type { InspectionFormUI } from "@/core/stores/Models";
import { InspectionFormUIArray_To_InspectionCreateRequestModel } from "@/core/Convertors";
import { isValidValue } from "@/core/utils/others";
import { RouterViewPaths } from "@/core/router";
import { useApiaryQuery } from "@/core/composables/useApiary";
import { useInspectionMutation } from "@/core/composables/useInspection";
import { useRouter } from "vue-router";
import { useHivesQuery } from "@/core/composables/hive/useHive";

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    apiaryId: number
}>()

const { apiary } = useApiaryQuery({
    id:             toRef(props.apiaryId),
    getApiaryHives: true,
    getApiary:      true
})
const { hives } = useHivesQuery({
    apiaryIds: computed(() => isValidValue(props.apiaryId) ? [props.apiaryId] : undefined)
}) 
const { create, isCreatingInspection } = useInspectionMutation()
const inspectionForms = ref<InspectionFormUI[]>([])

const selectedForm     = ref<InspectionFormUI | undefined>(undefined)
const selectedFormHive = computed(() => ({ 
    hive:       hives.value?.find(item => item.id === selectedForm.value?.hiveId),
    isLastHive: selectedForm.value?.hiveId === hives.value?.[hives.value.length - 1].id
}))

const emptyForm: InspectionFormUI = {
    id:                           -1,
    hiveId:                       0,
    isAbnormalBehavior:           false,
    isSwarming:                   false,
    needAdditionalFeeding:        false,
    isQueenAlive:                 false,
    isQueenLayingEggs:            false,
    isQueenLayingEggsIncorrectly: false,
    needMoreHoneyFrames:          false,
    needMoreBreedingFrames:       false,
    needMedicalAttention:         false,
    hasHiveDamage:                false,
    isTakingOutFrames:            false,
    abnormalBehaviorDescription:  "",
    medicalAttentionDescription:  "",
    hiveDamageDescription:        "",
    needMoreHoneyFramesAmount:            0,
    needMoreBreedingFramesAmount:         0,
    takenHoneyFrames:             0,
    takenBreedingFrames:          0,
    isSubmited:                   false,
    hasMadeChanges:               false,
}

function hasMadeAnyChanges(form: InspectionFormUI): boolean {
    return form.hasMadeChanges
    || form.isAbnormalBehavior
    || form.isSwarming
    || form.needAdditionalFeeding
    || form.isQueenAlive
    || form.isQueenLayingEggs
    || form.isQueenLayingEggsIncorrectly
    || form.needMoreHoneyFrames
    || form.needMoreBreedingFrames
    || form.needMedicalAttention
    || form.hasHiveDamage
    || form.isTakingOutFrames
}

function initialize() {
    console.log("Before init", props.apiaryId, hives.value);
    
    if (!isValidValue(props.apiaryId) || !isValidValue(hives.value)) return
    console.log("After init", props.apiaryId, hives.value);

    hives.value!.forEach(hive => {
        inspectionForms.value.push({ ...emptyForm, hiveId: hive.id });
    })
    selectHive(hives.value![0].id)
}

function selectHive(id: number) {
    if (selectedForm.value && hasMadeAnyChanges(selectedForm.value)) {
        selectedForm.value.hasMadeChanges = true;
    }

    selectedForm.value = inspectionForms.value.find(form => form.hiveId === id);
}

function saveForm(formModel: InspectionFormUI) {
    const formIndex = inspectionForms.value.findIndex(form => form.hiveId === formModel.hiveId);
    const isLastForm = formIndex === inspectionForms.value.length - 1;

    formModel.isSubmited = true

    if (!isLastForm) {
        selectHive(inspectionForms.value[formIndex + 1].hiveId!)
    } else {
        finishInspection()
    }
}

const isSubmitted = ref(false)
async function finishInspection() {
    if (!isValidValue(props.apiaryId)) return;

    const model = InspectionFormUIArray_To_InspectionCreateRequestModel(
        props.apiaryId,
        inspectionForms.value
    )
    create(model, {
        onSuccess: () => {
            router.push(RouterViewPaths.Inspections)
            isSubmitted.value = true
        }
    })
}

watch(hives, (val) => {
    if (isValidValue(val)) {
        initialize()
    }
}, { immediate: true })
</script>

<template>
<div :class="s.container">
    <section
        :class="s.plate"
    >
        <div
            :class="s.header"
        >
            <Icon
                :icon="SVG.Hive"
                :type="IconType.MEDIUM"
            />
            <label 
                for="apiaryHives"
                :class="s.label"
            >
                {{ selectedFormHive?.hive?.name }}
            </label>

            <IconTextButton
                :class="s.marginLeft"
                :icon="SVG.Plus"
                text="Add note"
            />
        </div>

        <hr :style="{
            minHeight: '1px',
            border: 'none',
            background: 'rgba(0,0,0,.2)',
            margin: 0
        }">

        <InspectionForm
            v-if="selectedForm"
            :class="s.form"
            :submit-button-text="selectedFormHive.isLastHive ? 'Submit inspection' : 'Save and go to the next hive'"
            :allow-submiting="!isCreatingInspection && !isSubmitted"
            @submit="saveForm(selectedForm)"
            v-model:form="selectedForm"
        />

    </section>
    <section
        id="apiaryHives"
        :class="s.apiaryHives"
    >
        <div
            :class="s.header"
        >
            <Icon
                :icon="SVG.Apiary"
                :type="IconType.MEDIUM"
            />
            <label 
                for="apiaryHives"
                :class="s.label"
            >{{ apiary?.name || 'Apiary' }} hives</label>
        </div>

        <hr :style="{
            minHeight: '1px',
            border: 'none',
            background: 'rgba(0,0,0,.2)',
            margin: 0
        }">

        <div
            :class="s.hiveGrid"
        >
            <div
                v-for="form in inspectionForms"
                :class="[
                    s.hive,
                    form.hasMadeChanges ? s.started : s.uncomplete,
                    form.isSubmited && s.completed,
                    selectedForm?.hiveId === form.hiveId && s.selected
                ]"
                @click="selectHive(form.hiveId!)"
            >
                <p
                    :class="[
                        s.id,
                        selectedForm?.hiveId === form.hiveId && s.selected
                    ]"
                >
                    {{ form.hiveId }}
                </p>
                
            </div>

        </div>
    </section>
</div>
</template>

<style module lang="sass">
.marginLeft
    margin-left: auto

.plate
    border-radius: var(--border-radius-small)
    display: flex
    flex-direction: column
    gap: .25rem

    padding: .25rem
    box-sizing: border-box

    background: var(--white)
    height: calc( 100vh - 5.5rem )
    
.form
    overflow-y: scroll
    margin-top: 1rem
    height: 100%
    padding: 0 1rem 1rem 1rem
    box-sizing: border-box

.hiveGrid
    display: inline-flex
    align-content: flex-start
    justify-content: flex-start
    flex-wrap: wrap
    height: 30rem
    width: 100%
    gap: 1rem
    padding: 1rem
    box-sizing: border-box

    .hive
        display: flex
        align-items: center
        justify-content: center

        min-width: 4rem
        min-height: 4rem
        
        border-radius: var(--border-radius-small)
        cursor: pointer

        transition: .1s


        .id
            font-family: var(--font-family)
            font-size: var(--font-size-big)
            font-weight: 500
            color: var(--black)

            &.selected
                color: white

        &.uncomplete
            background: white
            box-shadow: 0 0 0 1px var(--secondary)

        &.started
            background: white
            box-shadow: 0 0 0 1px var(--orange)

        &.completed
            background: var(--secondary)
            box-shadow: 0 0 0 1px var(--secondary)

        &.selected
            background: var(--orange)
            color: white

.header
    position: relative
    display: flex
    align-items: center
    gap: .5rem

    width: 100%
    min-height: 2.5rem
    max-height: 2.5rem

    padding-left: .5rem
    box-sizing: border-box
    font-family: var(--font-family)
    letter-spacing: .02em

    .label
        font-size: var(--font-size-medium)
        font-weight: 500
        letter-spacing: .02em
        text-transform: capitalize

    .buttons
        display: flex
        gap: .2rem
        margin-left: auto

.apiaryHives
    display: flex
    flex-direction: column

    gap: .25rem
    padding: .25rem
    box-sizing: border-box

    width: 100%
    height: 100%
    background: var(--white)
    border-radius: var(--border-radius-small)


.container
    display: grid
    grid-template-columns: 1fr 25rem
    grid-template-rows: 1fr
    gap: 1rem

    padding: 1rem
    box-sizing: border-box
    height: calc( 100vh - var(--header-height))
    width: 100%
</style>