<script setup lang="ts">
import ApiarySummaryCard from '../components/apiary/ApiarySummaryCard.vue';
import { onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import SmallSearchbar from '../components/input/fields/SmallSearchbar.vue';
import IconButton from '../components/input/buttons/IconTextButton.vue';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';
import { useApiaryView } from '../../core/composables/apiary/useApiaryView';
import type { ApiaryModel } from '../../core/models/Models';
import { onResize } from '@/core/utils/Hooks';
import StringSearchDropdown from '../components/input/dropdowns/StringSearchDropdown.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import { createPopup } from '@/core/utils/PopupHiarchy';

const s = useCssModule()
const { searchForApiaries } = useApiaryView()
const apiaries = ref<ApiaryModel[]>()
const searchWord = ref<string>('')

function searchApiaries() {
    apiaries.value = searchForApiaries({
        searchWord: searchWord.value,
        ignoreDifferentLetterCases: true
    })
}

const grid = ref<HTMLDivElement>()
const gridColumns = ref(0)
const minHiveWidth = 550

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
        <ToolBar 
            name="Apiaries"
        >
            <IconButton
                text="Add apiary"
                :svg="SVG.Key"
                @click="createPopup({
                    component: CreateApiaryPopup, 
                    props: {
                        onCreate: () => {
                            searchApiaries()
                        } 
                    }
                })"
            />
            <StringSearchDropdown
                :options="{
                    initialValue: '',
                    placeholder: 'Search by name...',
                    showIcon: true,
                    onHoverEffects: true,
                    onInputChange(value: string) {
                        searchWord = value
                        searchApiaries() 
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
            :style="{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }" 
        >
            <ApiarySummaryCard 
                v-for="apiary in apiaries"
                :class="s.apiary" 
                :apiary="apiary" :onDelete="searchApiaries"
                @click="$router.push('/apiaryHives/' + apiary!.id)"
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

    .appiaries
        display: grid
        gap: 20px

        .apiary
            transition: .2s
            &:hover
                transform: translateY(-4px)
</style>