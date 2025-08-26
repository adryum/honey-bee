<script setup lang="ts">
import Hive from '@/components/hive/Hive.vue';
import { ref, useCssModule } from "vue";
import { onMounted } from 'vue';
import ToolBar from '../components/ToolBar.vue';
import { getSVG, SVGIconRes } from '../core/SVGLoader.js';
import { createComponentWithProps, createComponentInstance } from '../utils/components.js';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import CreateHivePopup from '../components/popups/CreateHivePopup.vue';
import SmallSearchbar from '../components/input/fields/SmallSearchbar.vue';
import type {  ApiaryHivesResponseModel, ApiaryResponseModel, HiveResponseModel } from '../core/server/models/ResponseModels.js';
import { ApiaryRepository } from '../core/repositories/ApiaryRepository.js';

const s = useCssModule()
const hives = ref<ApiaryHivesResponseModel | undefined>()
const apiary = ref<ApiaryResponseModel | null>()
const props = defineProps<{
    apiaryId: string
}>()

async function searchHives(searchText: string) {
    hives.value = await ApiaryRepository.getApiaryHives(Number(props.apiaryId), searchText)
}

onMounted(async () => {
    apiary.value = await ApiaryRepository.getApiary(Number(props.apiaryId))
    hives.value = await ApiaryRepository.getApiaryHives(Number(props.apiaryId))
})

const components = [
    createComponentWithProps(IconTextButton, { 
        text: 'add hive',
        svg: getSVG(SVGIconRes.Pluss),
        onClick: () => {
            createComponentInstance(CreateHivePopup, {}, true)
        }
    }),
    createComponentWithProps(SmallSearchbar, { onClick: (searchText: string) => searchHives(searchText) }),
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