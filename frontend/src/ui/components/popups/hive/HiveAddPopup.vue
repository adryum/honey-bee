<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import PopupFrame from '../PopupFrame.vue';
import { usePopup, type PopupData } from '@/core/utils/PopupHiarchy';
import Hive from '../../hive/Hive.vue';
import { useFlexibleGrid } from '@/core/utils/others';
import LabeledInputField from '../../input/fields/LabeledInputField.vue';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import LabeledTextareaField from '../../input/fields/LabeledTextareaField.vue';
import ModularDropdown from '../../input/dropdowns/ModularDropdown.vue';
import SelectedTextHead from '../../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import { HiveType } from '@/core/DatabaseEnums';
import { SVG } from '@/assets/svgs/SVGLoader';
import ImageDropZone from '../../input/fields/ImageDropZone.vue';
import IconTextButton from '../../input/buttons/IconTextButton.vue';
import { storeToRefs } from 'pinia';

const s = useCssModule()
const props = defineProps<{
    popupData: PopupData
}>()

const { frameModel, close } = usePopup({
    label: 'Add hive',
    functions: props.popupData.functions,
    info: props.popupData.info
})
const formValidator = useFormValidator()

const hiveStore = useHiveStore()
const { selectedApiary } = storeToRefs(useApiaryStore())
const tabs = ['Create New', 'Move Existing']
const selectedTab = ref(tabs[0])

const name = ref('')
const description = ref('')
const type = ref<HiveType | undefined>(undefined)
const file = ref<File | undefined>(undefined)

function createHive() {
    if (!formValidator.isFormValid.value) return

    hiveStore.createHive({
        name: name.value,
        description: description.value,
        type: type.value!,
        image: file.value,
        apiaryId: selectedApiary.value!.id
    }, 
    {
        onSuccess() {
            close()
        },
        onFailure() {

        }
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
<PopupFrame 
    v-model:frame-model="frameModel"
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
                    v-for="hive in hiveStore.hives"
                    :key="hive.id"
                    :class="s.hive"
                    :hive="hive"
                    :showShadow="true"
                    @click="hiveStore.assignHive(hive, selectedApiary!.id)"
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
                        :z-index="popupData.info.zIndex.value"
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
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
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