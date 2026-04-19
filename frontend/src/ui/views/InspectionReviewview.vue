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
const { inspection } = useInspectionQuery({ id: props.id })

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
                {{ selectedForm?.hiveName }}
            </label>

            <IconTextButton
                :class="s.marginLeft"
                :icon="SVG.Logout"
                text="Exit"
                @click="router.push(previousPagePath || '/')"
            />
        </div>

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

        <div
            :class="s.hiveGrid"
        >
            <div
                v-for="form in forms"
                :class="[
                    s.hive,
                    s.uncomplete,
                    selectedForm?.hiveId === form.hiveId && s.selected
                ]"
                @click="selectForm(form.id)"
            >
                <p
                    :class="[
                        s.id,
                        selectedForm?.hiveId === form.hiveId && s.selected
                    ]"
                >
                    {{ form.hiveId ?? "N/A" }}
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
    height: calc( 100vh - 5.5rem )

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
    

.apiaryHives
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