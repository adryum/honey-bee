<script setup lang="ts">
import { computed, onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import IconButton from '../components/input/buttons/IconTextButton.vue';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';
import { onResize } from '@/core/utils/Hooks';
import { SVG } from '@/assets/svgs/SVGLoader';
import { createPopup } from '@/core/utils/PopupHiarchy';
import { useApiaryStore } from '@/core/stores/ApiaryStore';
import { storeToRefs } from 'pinia';
import Apiary from '../components/apiary/Apiary.vue';
import StringSearchDropdown from "../components/input/dropdowns/StringSearchDropdown.vue";

const s = useCssModule()
const apiaryStore = useApiaryStore()
const { apiaries } = storeToRefs(apiaryStore)

const searchWord = ref<string>('')

const filteredApiaries = computed(() => {
    return apiaries.value.filter(apiary => 
        apiary.name.toLowerCase().includes(searchWord.value.toLowerCase())
    )
})

const grid = ref<HTMLDivElement>()
const gridColumns = ref(0)
const minHiveWidth = 550

onResize(grid, (element) => {
    const rect = element.contentRect
    gridColumns.value = Math.floor(rect.width / minHiveWidth)
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
                :class="s.button"
                @click="createPopup({
                    component: CreateApiaryPopup, 
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
            <Apiary 
                v-for="apiary in filteredApiaries"
                :class="s.apiary" 
                :apiary="apiary"
                @click="apiaryStore.openApiary(apiary.id)"
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