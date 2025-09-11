<script setup lang="ts">
import Hive from '../components/hive/Hive.vue';
import { onMounted, ref, useCssModule, watch } from "vue";
import ToolBar from '../components/ToolBar.vue';
import { getSVG, SVGIconRes } from '../../core/SVGLoader.js';
import { createComponentWithProps, createComponentInstance } from '../../core/utils/components.js';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import SmallSearchbar from '../components/input/fields/SmallSearchbar.vue';
import type {  ApiaryResponseModel } from '../../core/api/models/ResponseModels.js';
import AddHivePopup from '../components/popups/hive/AddHivePopup.vue';
import { useHiveStore } from '../../core/stores/HiveStore.js';
import type { HiveModel, HiveSearchOptions } from '../../core/models/Models.js';
import { useApiaryView } from '@/core/composables/useApiaryView.js';
import { useApiaryHiveView } from '@/core/composables/useApiaryHiveView.js';

const s = useCssModule()
const props = defineProps<{
    apiaryId: number
}>()
const { apiaryHives, updateHives } = useApiaryHiveView()
const { searchForApiaries } = useApiaryView()
const apiaryName = ref(searchForApiaries({
    id: props.apiaryId
})[0].name)

const searchWord = ref<string>('')

async function searchHives() {
    const options: HiveSearchOptions =  {
        searchWord: searchWord.value,
        apiaryId: props.apiaryId,
        ignoreDifferentLetterCases: true
    }

    updateHives({
        apiaryId: props.apiaryId,
        options: options
    })
}

const components = [
    createComponentWithProps(IconTextButton, { 
        text: 'add hive',
        svg: getSVG(SVGIconRes.Pluss),
        onClick: () => {
            createComponentInstance(AddHivePopup, { apiaryId: props.apiaryId, onAssign: searchHives }, true)
        }
    }),
    createComponentWithProps(SmallSearchbar, { onClick: (searchText: string) => {
            searchWord.value = searchText
            searchHives()
        }
    }),
]

onMounted(() => {
    updateHives({
        apiaryId: props.apiaryId,
        options: {}
    })
})
</script>

<template>
<div :class="s.container">
        <ToolBar :name="apiaryName" :components="components"/>
        <div :class="s.appiaries" ref="page">
            <Hive v-for="hive in apiaryHives"  class="item" 
                :hive="hive"/>
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

    .appiaries
        display: grid
        grid-template-columns: repeat(auto-fit, 400px)
        justify-content: center
        gap: 2rem
</style>