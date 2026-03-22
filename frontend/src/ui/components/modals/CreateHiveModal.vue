<script setup lang="ts">
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import { useApiaryMutations } from '@/core/composables/useApiary';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import { useCssModule, ref, watch, toRef } from 'vue';
import LabeledTextareaField from '../input/fields/LabeledTextareaField.vue';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import Icon from '../Icon.vue';
import { useHiveMutations, useHivesQuery } from '@/core/composables/useHive';
import { HiveType } from '@/core/DatabaseEnums';
import { useFlexibleGrid } from '@/core/utils/others';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import SelectedTextHead from '../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';

const s = useCssModule()
const props = defineProps<{
    apiaryId: number
}>()

const dialogRef = ref<HTMLDialogElement>()
const open =  () => dialogRef.value?.show()
const close = () => dialogRef.value?.close()
defineExpose({ open, close })

const formValidator = useFormValidator()

const { create } = useHiveMutations()
const { hives } = useHivesQuery({ apiaryId: undefined })
const { assignHive } = useApiaryMutations()

const tabs = ['Create New', 'Move Existing']
const selectedTab = ref(tabs[0])

const name = ref('')
const description = ref('')
const type = ref<HiveType | undefined>(undefined)
const file = ref<File | undefined>(undefined)

function createHive() {
    if (!formValidator.isFormValid.value) return

    create({
        name: name.value,
        description: description.value,
        type: type.value!,
        image: file.value,
        apiaryId: props.apiaryId
    }, 
    {
        onSuccess() {
            close()
        },
    })
    
}

function switchTab(tab: string) {
    selectedTab.value = tab
}

const grid = ref()
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemMinWidthPx: 200,
    gapPx: 4
})
</script>

<template>
<dialog
    ref="dialogRef"
    :class="s.container"
>
    <div ref="handle" :class="s.handle">
        <h1 
            :class="s.popupName"
        >
            Add apiary
        </h1>
        <slot name="header">
            
        </slot>
        <button 
            :class="s.button"
            @click="close" 
        >
            <Icon 
                :class="s.icon" 
                :type="IconType.SMALL"
                :svg="SVG.Cross" 
            /> 
        </button> 
    </div>
    <div :class="s.body">
            <div :class="s.header">
                <p 
                    :class="[
                        s.addType,
                        selectedTab === tabs[0] && s.selected
                    ]"
                    @click="switchTab(tabs[0])"
                >
                    Create new
                </p>
                <p 
                    :class="[
                        s.addType,
                        selectedTab === tabs[1] && s.selected
                    ]"
                    @click="switchTab(tabs[1])"
                >
                    Add existing
                </p>
            </div>

            <div 
                v-show="selectedTab === tabs[1]"
                ref="grid"
                :class="s.existingHiveGrid"
                :style="gridStyle"
            >
                <Hive
                    v-for="hive in hives"
                    :key="hive.id"
                    :class="s.hive"
                    :hive="hive"
                    :showShadow="true"
                    @click="assignHive({
                        hiveId: hive.id,
                        apiaryId: apiaryId
                    })"
                />
            </div>

            <form 
                v-if="selectedTab === tabs[0]"
                :class="s.listDivider"
                @submit.prevent
            >
                <ImageDropZone 
                    :class="s.image"
                    v-model:image-file="file"
                />
                <div :class="s.list">
                    <LabeledInputField
                        label="Name"
                        :options="{
                            isRequired: true,
                            formValidator: formValidator
                        }"
                        v-model:input="name"
                    />
                    <LabeledTextareaField
                        label="Description"
                        :options="{
                            isRequired: true,
                            formValidator: formValidator
                        }"
                        v-model:input="description"
                    />
                    <ModularDropdown
                        label="Type"
                        :z-index="9999991000"
                    >
                        <template #head="{ dropdown }">
                            <SelectedTextHead
                                :selection="type"
                                :dropdown="dropdown"
                            />
                        </template>
                        <template #list="{ dropdown }">
                            <IconTextItem
                                v-for="item in Object.values(HiveType).filter(type => type !== HiveType.NOT_A_TYPE)"
                                :options="{
                                    svg: SVG.Apiaries,
                                    text: item.toSentenceCase()
                                }"
                                @click="type = item; dropdown.isShown.value = false"
                            />
                        </template>
                    </ModularDropdown>

                    <IconTextButton
                        text="Create"
                        :style="{ background: 'var(--yellow)' }"
                        :disabled="!formValidator.isFormValid.value"
                        @click="createHive"
                    />
                </div>
            </form>
        </div>
</dialog>
</template>

<style module lang = 'sass'>
.container
    border: none
    padding: 0
    
    box-sizing: border-box

    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
    background: var(--white)
    border-radius: var(--border-radius-medium)

    .handle
        display: flex
        align-items: center
        height: 2.5rem
        background: var(--yellow)
        
        // padding: .5rem
        padding-left: 1rem
        // border-bottom: 2px solid var(--blue)

        .popupName
            all: unset
            text-transform: capitalize
            font-family: var(--font-family)
            font-size: var(--font-size-medium)
            letter-spacing: 0.02em
            line-height: 1rem
            font-weight: 700

        .button
            all: unset
            display: flex
            align-items: center
            justify-content: center

            margin-left: auto
            height: 100%
            width: 4rem

            transition: .1s

            &:hover
                opacity: 1
                background: var(--red)

    .body
        padding: 1rem

.existingHiveGrid
    padding-top: 1rem
    overflow-y: scroll

.hive
    // width: 20rem
    height: 15rem

.listDivider
    display: flex
    gap: 1rem
    padding-top: 1rem

    .image
        flex: 1
        max-height: 30rem


.list
    display: flex
    flex-direction: column
    flex: 1
    gap: 1rem

.body
    display: flex
    flex-direction: column
    height: 100%
    max-height: 30rem
    height: 22rem

    font-size: var(--font-size-medium)
    font-family: var(--font-family)

    width: 50rem

    .header
        display: flex
        height: 2rem
        min-height: 2rem
        border-bottom: 2px solid rgba(0, 0, 0, .4)

        .addType
            display: flex
            align-items: center
            justify-content: center

            flex: 1
            cursor: pointer
            z-index: 2

            box-sizing: border-box
            padding: 0 .5rem
            background: white

            font-size: var(--font-size-medium)

            &:hover
                filter: brightness(90%)  


            .text
                z-index: 2
                position: relative


.selected
    background: var(--yellow) !important
</style>