<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from "vue";
import Icon from "../components/Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import InspectionForm from "../components/forms/InspectionForm.vue";
import type { InspectionFormDB, InspectionFormUI } from "@/core/stores/Models";
import { InspectionFormDB_To_InspectionFormUI } from "@/core/Convertors";
import { useInspectionQuery, useInspectionMutation } from "@/core/composables/useInspection";
import { watchOnce } from "@vueuse/core";
import { useRouter } from "vue-router";

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    id: number
}>()

const {  } = useInspectionMutation()
const { inspection } = useInspectionQuery({ id: props.id, allowFetching: ref(true) })

const forms            = computed(() => inspection.value?.forms || [])
const selectedForm     = ref<InspectionFormDB | undefined>()
const selectedFormUI   = ref<InspectionFormUI | undefined>()
const previousPagePath = ref<string | undefined>()

function selectForm(id: number) {
    selectedForm.value = forms.value.find(form => form.id === id)

    if (selectedForm.value) {
        selectedFormUI.value = InspectionFormDB_To_InspectionFormUI(selectedForm.value)
    }
}

watchOnce(inspection, () => {
    selectForm(forms.value[0]?.id)
    console.log(inspection.value);
})
onMounted(() => {
    previousPagePath.value = window.history.state.back
    selectForm(forms.value[0]?.id)
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
                :icon="SVG.Hive"
                :type="IconType.MEDIUM"
            />
            <label 
                for="apiaryHives"
                :class="s.label"
            >
                {{ selectedForm?.hive ? `#${selectedForm.hive.id} ${selectedForm.hive.name}` : "Unknown hive" }}
            </label>

            <IconTextButton
                :class="s.marginLeft"
                :icon="SVG.Logout"
                text="Exit"
                @click="router.push(previousPagePath || '/')"
            />
        </div>

        <hr :style="{
            minHeight: '1px',
            border: 'none',
            background: 'rgba(0,0,0,.2)',
            margin: 0
        }">

        <InspectionForm
            v-if="selectedFormUI"
            :class="s.form"
            :isReviewing="true"
            v-model:form="selectedFormUI"
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
            >{{ inspection?.apiaryName || 'Apiary' }} hives</label>
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
                v-for="form in forms"
                :class="[
                    s.hive,
                    s.uncomplete,
                    selectedForm?.hive?.id === form.hive?.id && s.selected
                ]"
                @click="selectForm(form.id)"
            >
                <p
                    :class="[
                        s.id,
                        selectedForm?.hive?.id === form.hive?.id && s.selected
                    ]"
                >
                    {{ form.hive?.id ?? "N/A" }}
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
    height: calc( 100vh - var(--header-height) )
    width: 100%
</style>