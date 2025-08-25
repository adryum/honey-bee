<script setup lang="ts">
import ApiarySummaryCard from '@/components/apiary/ApiarySummaryCard.vue';
import { onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import SmallSearchbar from '../components/input/fields/SmallSearchbar.vue';
import IconButton from '../components/input/buttons/IconTextButton.vue';
import { createComponentInstance, createComponentWithProps } from '../utils/components';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';
import { getSVG, SVGIconRes } from '../core/SVGLoader';
import type { ApiaryResponseModel } from '../core/server/models/ResponseModels';
import { ApiaryRepository } from '../core/repositories/ApiaryRepository';

const s = useCssModule()
const apiaries = ref<ApiaryResponseModel[]>([])

onMounted(async () => {
    apiaries.value = await ApiaryRepository.getApiaries()
})

async function searchApiaries(filter: string) {
    apiaries.value = await ApiaryRepository.getApiaries(filter)
}

const components = [
    createComponentWithProps(IconButton, { 
        text: 'add apiary',
        svg: getSVG(SVGIconRes.Pluss),
        onClick: () => {
            createComponentInstance(CreateApiaryPopup, {}, true)
        }
    }),
    createComponentWithProps(SmallSearchbar, { onClick: (value: string) => searchApiaries(value) }),
]

</script>

<template>
    <div :class="s.container">
        <ToolBar name="Apiaries" :components="components"/>
        <div :class="s.appiaries" ref="page">
            <ApiarySummaryCard class="item" 
            v-for="apiary in apiaries" 
            :apiary="apiary":onDelete="searchApiaries"/>
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