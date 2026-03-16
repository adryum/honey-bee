<script setup lang="ts">
import { onMounted, reactive, ref, useCssModule } from "vue";
import Icon from "../components/Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import InspectionForm from "../components/forms/InspectionForm.vue";
import type { InspectionFormDB, InspectionFormUI } from "@/core/stores/Models";

const s = useCssModule()
const props = withDefaults(defineProps<{
    hives: { id: number, name: string }[]
}>(), {
    hives: () => [
        { id: 1, name: "#231 Apple hive" },
        { id: 2, name: "#232 Banana hive" },
        { id: 3, name: "#233 Cherry hive" },
        { id: 4, name: "#231 Coconut hive" },
        { id: 5, name: "#232 Pineapple hive" },
        { id: 6, name: "#233 Orange hive" },

    ]
})
const inspectionForms = ref<InspectionFormUI[]>([])
const selectedForm = ref<InspectionFormUI | undefined>(undefined)

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
    neededHoneyFrames:            0,
    neededBreedingFrames:         0,
    takenHoneyFrames:             0,
    takenBreedingFrames:          0,
    isSubmited:                     false,
    hasMadeChanges:                  false
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
    props.hives.forEach(hive => {
        inspectionForms.value.push({ ...emptyForm, hiveId: hive.id });
    })
    selectHive(props.hives[0].id)
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
        selectHive(inspectionForms.value[formIndex + 1].hiveId)
    } else {
        finishInspection()
    }
}

function finishInspection() {
    
}

onMounted(() => {
    initialize()
})

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
                :svg="SVG.Hive"
                :type="IconType.MEDIUM"
            />
            <label 
                for="apiaryHives"
                :class="s.label"
            >
                {{ hives.find(hive => hive.id === selectedForm?.hiveId)?.name }}
            </label>

            <IconTextButton
                :class="s.marginLeft"
                :svg="SVG.Plus"
                text="Add note"
            />
        </div>

        <InspectionForm
            v-if="selectedForm"
            :class="s.form"
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
                :svg="SVG.Apiary"
                :type="IconType.MEDIUM"
            />
            <label 
                for="apiaryHives"
                :class="s.label"
            >Applejacks hives</label>
        </div>

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
                @click="selectHive(form.hiveId)"
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

    background: var(--white)
    height: calc( 100vh - 5rem )

.form
    overflow-y: scroll
    height: 100%

.hiveGrid
    display: inline-flex
    align-content: flex-start
    justify-content: flex-start
    flex-wrap: wrap
    height: 30rem
    width: 100%
    gap: 1rem
    padding: 1rem
    padding-top: 0 
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
            box-shadow: 0 0 0 1px var(--gray)

        &.started
            background: white
            box-shadow: 0 0 0 1px var(--orange)

        &.completed
            background: var(--light-gray)
            box-shadow: 0 0 0 1px var(--gray)

        &.selected
            background: var(--orange)
            color: white

.header
    display: flex
    align-items: center
    margin: 1rem
    height: 2rem
    min-height: 2rem
    max-height: 2rem
    gap: .5rem

.label
    +bulletLabel

.apiaryHives
    width: 100%
    height: 100%
    background: var(--white)
    border-radius: var(--border-radius-small)

.container
    display: grid
    grid-template-columns: 1fr 25rem
    grid-template-rows: 1fr
    gap: .5rem

    padding: 1rem
    box-sizing: border-box
    height: calc( 100vh - 3rem )
    width: 100%
</style>