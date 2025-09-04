<script setup lang="ts">
import Hive from '@/components/hive/Hive.vue';
import { ref, useCssModule } from "vue";
import { onMounted } from 'vue';
import ToolBar from '../components/ToolBar.vue';
import { getSVG, SVGIconRes } from '../core/SVGLoader.js';
import { createComponentWithProps, createComponentInstance } from '../utils/components.js';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import SmallSearchbar from '../components/input/fields/SmallSearchbar.vue';
import type {  ApiaryHivesResponseModel, ApiaryResponseModel, HiveResponseModel } from '../core/server/models/ResponseModels.js';
import { ApiaryRepository } from '../core/repositories/ApiaryRepository.js';
import AddHivePopup from '../components/popups/hive/AddHivePopup.vue';
import { useHiveStore } from '../core/view_models/HiveViewModel.js';
import type { HiveModel, HiveSearchModel } from '../core/models/Models.js';

const s = useCssModule()
const props = defineProps<{
    apiaryId: number
}>()
const hiveStore = useHiveStore()
const hives = ref<HiveModel[]>([...hiveStore.getApiaryHives(props.apiaryId)]) 
const apiary = ref<ApiaryResponseModel | null>()
const searchWord = ref<string>('')

async function searchHives() {
    const request: HiveSearchModel =  {
        searchWord: searchWord.value,
        apiaryId: props.apiaryId,
        ignoreDifferentLetterCases: true
    }

    hives.value = hiveStore.searchForHives(request)
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
</script>

<template>
<div :class="s.container">
        <ToolBar :name="apiary?.name" :components="components"/>
        <div :class="s.appiaries" ref="page">
            <Hive v-for="hive in hives"  class="item" 
                :hive="hive"/>
        </div>
</div>
</template>

<style module lang='sass'>
@use '../assets/_colors.sass' as colors
.container
    display: flex
    flex-direction: column
    gap: 1rem
    width: 100%

    padding: 1rem
    box-sizing: border-box

    .appiaries
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))
        justify-content: center
        gap: 1rem
</style>