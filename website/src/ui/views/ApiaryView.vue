<script setup lang="ts">
import ApiarySummaryCard from '../components/apiary/ApiarySummaryCard.vue';
import { onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import SmallSearchbar from '../components/input/fields/SmallSearchbar.vue';
import IconButton from '../components/input/buttons/IconTextButton.vue';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';
import { getSVG, SVGIconRes } from '../../core/SVGLoader';
import { createComponentWithProps, createComponentInstance } from '../../core/utils/components';
import { useApiaryView } from '../../core/composables/useApiaryView';
import type { ApiaryModel } from '../../core/models/Models';

const s = useCssModule()
const { searchForApiaries } = useApiaryView()
const apiaries = ref<ApiaryModel[]>()
const searchWord = ref<string>('')
const components = [
    createComponentWithProps(IconButton, { 
        text: 'add apiary',
        svg: getSVG(SVGIconRes.Pluss),
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

onMounted(() => {
    apiaries.value = searchForApiaries({})
})

function searchApiaries() {
    apiaries.value = searchForApiaries({
        searchWord: searchWord.value,
        ignoreDifferentLetterCases: true
    })
}

</script>

<template>
    <div :class="s.container">
        <ToolBar name="Apiaries" :components="components"/>
        <div :class="s.appiaries" ref="page">
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
        grid-template-columns: repeat(auto-fit, minmax(500px, 592px))
        justify-content: center
        gap: 1rem
</style>