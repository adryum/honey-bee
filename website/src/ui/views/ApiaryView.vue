<script setup lang="ts">
import ApiarySummaryCard from '../components/apiary/ApiarySummaryCard.vue';
import { onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import SmallSearchbar from '../components/input/fields/SmallSearchbar.vue';
import IconButton from '../components/input/buttons/IconTextButton.vue';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';
import { SVGImage, SVGRes } from '../../core/SVGLoader';
import { createComponentWithProps, createComponentInstance } from '../../core/utils/components';
import { useApiaryView } from '../../core/composables/useApiaryView';
import type { ApiaryModel } from '../../core/models/Models';
import { onResize } from '@/core/utils/Hooks';

const s = useCssModule()
const { searchForApiaries } = useApiaryView()
const apiaries = ref<ApiaryModel[]>()
const searchWord = ref<string>('')
const components = [
    createComponentWithProps(IconButton, { 
        text: 'add apiary',
        svg: new SVGImage(SVGRes.Pluss),
        onClick: () => {
            createComponentInstance(CreateApiaryPopup, {
                onCreate: () => {
                    searchApiaries()
                } 
            }, true)
        }
    }),
    createComponentWithProps(SmallSearchbar, { 
        onClick: (value: string) => {
            searchWord.value = value
            searchApiaries() 
        } 
    }),
]

function searchApiaries() {
    apiaries.value = searchForApiaries({
        searchWord: searchWord.value,
        ignoreDifferentLetterCases: true
    })
}

const grid = ref<HTMLDivElement>()
const gridColumns = ref(0)
const minHiveWidth = 350

onResize(grid, (element) => {
    const rect = element.contentRect
    gridColumns.value = Math.floor(rect.width / minHiveWidth)
})

onMounted(() => {
    apiaries.value = searchForApiaries({})
})
</script>

<template>
    <div :class="s.container">
        <ToolBar name="Apiaries" :components="components"/>
        <div :style="{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }" :class="s.appiaries" ref="grid">
            <ApiarySummaryCard v-for="apiary in apiaries"
                @click="$router.push('/apiaryHives/' + apiary!.id)"
                class="item" 
                :apiary="apiary" :onDelete="searchApiaries"/>
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
        gap: 20px
</style>