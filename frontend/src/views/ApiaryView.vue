<script setup lang="ts">
import ApiarySummaryCard from '@/components/apiary/ApiarySummaryCard.vue';
import { getApiaries } from '@/core/repositories/homeRepository';
import { onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import SmallSearchbar from '../components/input_fields/SmallSearchbar.vue';
import IconButton from '../components/buttons/IconTextButton.vue';
import { createComponentInstance, createComponentWithProps } from '../utils/components';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';
import { getSVG, SVGIconRes } from '../core/SVGLoader';

const rApiaries = ref([])
const rSizeMultiplier = ref(30)

async function searchApiaries(filter: string) {
    console.log(filter);
    
    rApiaries.value = await getApiaries(filter)
}

onMounted(async () => {
    rApiaries.value = await getApiaries()
})

const s = useCssModule()
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
            v-for="apiary in rApiaries" 
            :apiary="apiary" :sizeMultiplier="rSizeMultiplier" :onDelete="searchApiaries"/>
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