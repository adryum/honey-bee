<script setup lang="ts">
import { SVG } from '@/assets/svgs/SVGLoader';
import { useApiaryMutations } from '@/core/composables/useApiary';
import { useCssModule, ref, watch } from 'vue';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { useHiveMutations, useHivesQuery } from '@/core/composables/useHive';
import { HiveType } from '@/core/DatabaseEnums';
import { useFlexibleGrid } from '@/core/utils/others';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import Hive from '../hive/Hive.vue';
import { useFormValidator } from '@/core/composables/useFormValidator';
import ModalBase from './ModalBase.vue';
import { useModalBase } from '@/core/composables/useModalBase';
import StringMultipleField from '../input/fields/used/StringMultipleField.vue';
import StringField from '../input/fields/used/StringField.vue';
import StringFieldTopPart from '../input/dropdowns/dropdownItems/top/StringFieldTopPart.vue';

const s = useCssModule()
const props = defineProps<{
    apiaryId: number
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { assignHive } = useApiaryMutations()
const { create, isCreatingHive } = useHiveMutations()
const { hives } = useHivesQuery({ apiaryId: undefined })
const { getFormValidee, isFormValid, showThatIsRequired, clear } = useFormValidator()

const tabs = ['Create New', 'Move Existing']
const selectedTab = ref(tabs[0])

const name = ref('')
const description = ref('')
const type = ref<HiveType | undefined>(undefined)
const file = ref<File | undefined>(undefined)

const hiveTypeModels: { name: HiveType, icon: SVG }[] = [
    { name: HiveType.MOVABLE, icon: SVG.Apiary },
    { name: HiveType.STATIONARY, icon: SVG.BeeHive },
]


function createHive() {
    showThatIsRequired()
    if (!isFormValid.value) return

    create({
        name: name.value,
        description: description.value,
        type: type.value!,
        image: file.value,
        apiaryId: props.apiaryId
    }, 
    {
        onSuccess() {
            modal.value?.close()
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

watch(() => exposed.isOpen(), (val) => {
    if (!val) return 
    clear()
})
</script>

<template>
<ModalBase
    ref="modal"
    label="Add Hive"
>
    <template #body>
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
                    <StringField
                        label="Name"
                        :selection="name"
                        :validee="getFormValidee({
                            isValid: () => !!name,
                            onClear: () => name = '',
                            onInitialize: () => name = ''
                        })"
                        @input="value => name = value"
                    />

                    <StringMultipleField
                        label="Description"
                        :selection="description"
                        :validee="getFormValidee({
                            isValid: () => !!description,
                            onClear: () => description = '',
                            onInitialize: () => description = ''
                        })"
                        @input="value => description = value"
                    />
                    
                    <ModularDropdown
                        :teleport-target-id="modal?.id"
                    >
                        <template #head="{ dropdown }">
                            <StringFieldTopPart
                                label="Type"
                                :dropdown="dropdown"
                                :selection="type"
                                :validee="getFormValidee({
                                    isValid: () => !!type,
                                    onClear: () => type = undefined,
                                    onInitialize: () => type = undefined
                                })"
                                @input="value => type = value as HiveType"
                                @click="dropdown.isShown.value = true"
                            />
                        </template>
                        <template #list="{ dropdown }">
                            <IconTextItem
                                v-for="item in hiveTypeModels"
                                :key="item.name"
                                :options="{
                                    svg: item.icon,
                                    text: item.name
                                }"
                                @click="type = item.name; dropdown.isShown.value = false"
                            />
                        </template>
                    </ModularDropdown>

                    <IconTextButton
                        text="Create"
                        :disabled="!isFormValid"
                        :is-submit="true"
                        :hide-icon="true"
                        :is-aligned-center="true"
                        :is-loading="isCreatingHive"
                        @click="createHive"
                    />
                </div>
            </form>
        </div>
        </template>
</ModalBase>
</template>

<style module lang = 'sass'>
.container
    border: none
    padding: 0
    overflow: visible
    width: 50rem
    height: 29.5rem
    
    box-sizing: border-box

    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1)
    background: var(--white)
    border-radius: var(--border-radius-medium)

    .handle
        display: flex
        align-items: center
        height: 2.5rem
        background: var(--orange)
        border-radius: var(--border-radius-medium) var(--border-radius-medium) 0 0
        overflow: hidden
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
            cursor: pointer

            &:hover
                opacity: 1
                background: var(--red)

.existingHiveGrid
    padding-top: 1rem
    overflow-y: scroll
    height: 22rem

.hive
    // width: 20rem
    height: 15rem

.listDivider
    display: flex
    gap: 1rem
    padding-top: 1rem

.image
    flex: 1
    max-height: 22rem
    height: 22rem

.list
    display: flex
    flex-direction: column
    flex: 1
    gap: 1rem


.body
    display: flex
    flex-direction: column
    flex: 1

    padding: 1rem

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
    background: var(--orange) !important
</style>