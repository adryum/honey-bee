<script setup lang="ts">
import { ref, useCssModule } from "vue";
import Icon from "../components/Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import CheckboxWText from "../components/input/fields/CheckboxWText.vue";
import LabeledTextareaField from "../components/input/fields/LabeledTextareaField.vue";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";

const s = useCssModule()
const selectedHive = ref<number>(1)

const isAbnormalBehavior = ref<boolean>(false)
const isRunningAway = ref<boolean>(false)
const isNeedAdditionalFeeding = ref<boolean>(false)
const isQueenAlive = ref<boolean>(false)
const isQueenLayingEggs = ref<boolean>(false)
const isQueenLayingEggsIncorrectly = ref<boolean>(false)
const isHiveNeedingMoreHoneyFrames = ref<boolean>(false)
const isHiveNeedingMoreBreedingFrames = ref<boolean>(false)
const isMedicalActionNeeded = ref<boolean>(false)
const isThereAnyHiveDamage = ref<boolean>(false)
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
                :svg="SVG.Apiaries"
                :type="IconType.MEDIUM"
            />
            <label 
                for="apiaryHives"
                :class="s.label"
            >Apple hive </label>

            <button>
                Add note
            </button>
        </div>

        <form
            :class="s.form"
            @submit.prevent="console.log('submited!!')"
        >
            <CheckboxWText
                label="Abnormal bee behavior?"
                v-model:is-true="isAbnormalBehavior"
            />
            <LabeledTextareaField
                v-if="isAbnormalBehavior"
                :class="s.indented"
                label="what kind of behavior?"
                :options="{}"
            />
            
            
            <CheckboxWText
                label="Running away? Spieto?"
                v-model:is-true="isRunningAway"
            />

             <CheckboxWText
                label="Need additional feeding?"
                v-model:is-true="isNeedAdditionalFeeding"
            />


            <CheckboxWText
                label="Queen alive?"
                v-model:is-true="isQueenAlive"
            />
            <CheckboxWText
                v-if="isQueenAlive"
                label="Is queen laying eggs?"
                :class="s.indented"
                v-model:is-true="isQueenLayingEggs"
            />
            <CheckboxWText
                v-if="isQueenAlive"
                label="Is queen laying eggs incorrectly?"
                :class="s.indented"
                v-model:is-true="isQueenLayingEggsIncorrectly"
            />

            <CheckboxWText
                label="Does hive need more honey frames?"
                v-model:is-true="isHiveNeedingMoreHoneyFrames"
            />
            <LabeledTextareaField
                v-if="isHiveNeedingMoreHoneyFrames"
                label="amount:"
                :class="s.indented"
                :options="{}"
            />
            
            <CheckboxWText
                label="Does hive need more breeding frames?"
                v-model:is-true="isHiveNeedingMoreBreedingFrames"
            />
            <LabeledTextareaField
                v-if="isHiveNeedingMoreBreedingFrames"
                label="amount:"
                :class="s.indented"
                :options="{}"
            />

            <CheckboxWText
                label="Is medical action needed?"
                v-model:is-true="isMedicalActionNeeded"
            />
            <LabeledTextareaField
                v-if="isMedicalActionNeeded"
                label="Reason:"
                :class="s.indented"
                :options="{}"
            />

            <CheckboxWText
                label="Is there any hive damage?"
                v-model:is-true="isThereAnyHiveDamage"  
            />
            <LabeledTextareaField
                v-if="isThereAnyHiveDamage"
                label="Additional notes:"
                :class="s.indented"
                :options="{}"
            />

            <IconTextButton
                :svg="SVG.Confirm"
                text="Submit"
                type="submit"
            />
        </form>

    </section>
    <section
        id="apiaryHives"
        :class="s.apiaryHives"
    >
        <div
            :class="s.header"
        >
            <label 
                for="apiaryHives"
                :class="s.label"
            >Applejacks hives: </label>
        </div>

        <div
            :class="s.hiveGrid"
        >
            <div
                v-for="i in 10"
                :class="[
                    s.hive,
                    i < 5 && s.completed,
                    i >= 5 && s.uncomplete,
                    selectedHive === i && s.selected
                ]"
                @click="selectedHive = i"
            >
                <p
                    :class="s.id"
                >{{ i }}</p>
                
            </div>

        </div>
    </section>
</div>
</template>

<style module lang="sass">
.plate
    display: flex
    flex-direction: column
    gap: 1rem
    background: var(--white)

    .form
        display: flex
        flex-direction: column
        gap: 1rem
        padding: 1rem
        box-sizing: border-box


.indented
    margin-left: 2.5rem

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


        .id
            font-family: var(--font-family)
            font-size: var(--font-size-large)
            font-weight: 600
            color: var(--black)

        &.uncomplete
            background: var(--gray)
            box-shadow: inset 0 0  0 2px  color-mix(in srgb, var(--gray) 90%, black )

        &.completed
            background: var(--darker-orange)
            box-shadow: inset 0 0  0 2px  color-mix(in srgb, var(--darker-orange) 90%, black )

        &.selected
            background: #fedd20
            box-shadow: inset 0 0  0 2px  color-mix(in srgb, #fedd20 95%, black )

.header
    display: flex
    margin: 1rem
    gap: 1rem

.label
    +bulletLabel

.apiaryHives
    width: 100%
    height: 100%
    background: var(--white)

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