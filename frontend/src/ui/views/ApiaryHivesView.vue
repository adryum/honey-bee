<script setup lang="ts">
import Hive from '../components/hive/Hive.vue';
import { computed, ref, useCssModule } from "vue";
import ToolBar from '../components/ToolBar.vue';
import { useFlexibleGrid } from '@/core/utils/others.js';
import { useApiaryStore } from '@/core/stores/ApiaryStore';
import { storeToRefs } from 'pinia';
import { useHiveStore } from '@/core/stores/HiveStore';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import { usePopupCreator } from '@/core/utils/PopupHiarchy';
import HiveAddPopup from '../components/popups/hive/HiveAddPopup.vue';

const s = useCssModule()
const apiaryStore = useApiaryStore()
const hiveStore = useHiveStore()    
const { selectedApiary } = storeToRefs(apiaryStore)

const filteredHives = computed(() => {
    if (!selectedApiary.value) return []

    return hiveStore.hives.filter(hive => 
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
</script>

<template>
<div 
    ref="grid"
    :class="s.container"
>
    <ToolBar 
        :name="selectedApiary?.name"
    >
        <IconTextButton
            text="Add hive"
            :class="s.button"
            @click="create"
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