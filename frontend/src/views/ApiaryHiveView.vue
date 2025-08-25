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
import type {  ApiaryResponseModel, HiveResponseModel } from '../core/server/models/ResponseModels.js';

const s = useCssModule()
const hives = ref<HiveResponseModel[] | null>()
const thisApiary = ref<ApiaryResponseModel | null>()
const props = defineProps<{
    id: number
}>()

async function searchHives(searchText: string) {
    // hives.value = await getApiaryHives(props.id, searchText)
}

const components = [
    createComponentWithProps(IconTextButton, { 
        text: 'add apiary',
        svg: getSVG(SVGIconRes.Pluss),
        onClick: () => {
            createComponentInstance(CreateHivePopup, {}, true)
        }
    }),
    createComponentWithProps(SmallSearchbar, { onClick: (searchText: string) => searchHives(searchText) }),
]

onMounted(async () => {
    // thisApiary.value = await getApiary(props.id)
    // hives.value = await getApiaryHives(props.id)
})
</script>

<template>
<div :class="s.container">
        <ToolBar name="Apiaries" :components="components"/>
        <div :class="s.appiaries" ref="page">
            <Hive class="item" 
            v-for="i in 3"/>
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
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr))
        justify-content: center
        gap: 1rem
</style>