<script setup lang="ts">
import Hive from '../components/hive/Hive.vue';
import { computed, onMounted, ref, useCssModule } from "vue";
import ToolBar from '../components/ToolBar.vue';
import { useFlexibleGrid } from '@/core/utils/others.js';
import { useApiaryStore } from '@/core/stores/ApiaryStore';
import { storeToRefs } from 'pinia';
import { useHiveStore } from '@/core/stores/HiveStore';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import { usePopupCreator } from '@/core/utils/PopupHiarchy';
import HiveAddPopup from '../components/popups/hive/HiveAddPopup.vue';
import StringSearchDropdown from '../components/input/dropdowns/StringSearchDropdown.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import { useInspectionStore } from '@/core/stores/InspectionStore';

const s = useCssModule()
const apiaryStore     = useApiaryStore()
const hiveStore       = useHiveStore()
const inspectionStore = useInspectionStore()
const { hives }          = storeToRefs(hiveStore)
const { selectedApiary } = storeToRefs(apiaryStore)

const filteredHives = computed(() => {
    if (!selectedApiary.value) return []

    return hives.value.filter(hive => 
        hive.apiaryId === selectedApiary.value!.id && hive.name.toLowerCase().includes(searchWord.value.toLowerCase())
    )
})
const searchWord = ref<string>('')
const grid = ref()
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemMinWidthPx: 400,
    gapPx: 10
})

const { create } = usePopupCreator({
    popupComponent: HiveAddPopup, 
    maxCount: 1
})

onMounted(() => {
    console.log("hives", filteredHives.value);
    console.log(!filteredHives.value.isEmpty());
})
</script>

<template>
<div 
    ref="grid"
    :class="s.container"
>
    <ToolBar 
        :label="selectedApiary?.name"
    >
        <IconTextButton
            v-if="selectedApiary && !filteredHives.isEmpty()"
            text="Add inspection"
            :svg="SVG.Plus"
            :class="s.button"
            @click="inspectionStore.startApiaryInspection(selectedApiary.id, selectedApiary.name)"
        />
        <IconTextButton
            text="Add hive"
            :svg="SVG.Plus"
            :class="s.button"
            @click="create"
        />
        <StringSearchDropdown
                :options="{
                    initialValue: '',
                    placeholder: 'Search by name...',
                    showIcon: true,
                    onHoverEffects: true,
                    onInputChange(value: string) {
                        searchWord = value
                    }
                }"   
                :style="{
                    minWidth: '15rem'
                }"
            />
    </ToolBar>
    <div 
        ref="grid"
        :class="s.appiaries" 
        :style="gridStyle" 
    >
        <Hive 
            v-for="hive in filteredHives"  
            class="item" 
            :hive="hive"
            @click="hiveStore.openHive(hive)"
        />
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
.container
    display: flex
    flex-direction: column
    gap: 1rem
    width: 100%

    padding: 1rem
    box-sizing: border-box
</style>