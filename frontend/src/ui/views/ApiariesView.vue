<script setup lang="ts">
import { computed, onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import IconButton from '../components/input/buttons/IconTextButton.vue';
import { onResize } from '@/core/utils/Hooks';
import { SVG } from '@/assets/svgs/SVGLoader';
import Apiary from '../components/apiary/Apiary.vue';
import StringSearchDropdown from "../components/input/dropdowns/StringSearchDropdown.vue";
import { useApiariesQuery } from "@/core/composables/useApiary";
import CreateApiaryModal from "../components/modals/CreateApiaryModal.vue";
import { useRouter } from "vue-router";
import type { ModalBaseModel } from "@/core/composables/useModalBase";

const s = useCssModule()
const router = useRouter()
const createApiaryModal = ref<ModalBaseModel>()
const { apiaries } = useApiariesQuery()
const searchWord = ref<string>('')

const filteredApiaries = computed(() => {
    return apiaries.value?.filter(apiary => 
        apiary.name.toLowerCase().includes(searchWord.value.toLowerCase())
    )
})

const grid = ref<HTMLDivElement>()
const gridColumns = ref(0)
const minHiveWidth = 550

function openApiary(id: number) {
    router.push(`/apiary/${id}/hives`)
}

onResize(grid, (element) => {
    const rect = element.contentRect
    gridColumns.value = Math.floor(rect.width / minHiveWidth)
})
</script>

<template>
    <div :class="s.container">
        <ToolBar 
            label="Apiaries"
            :class="s.toolbar"
        >
            <IconButton
                text="Add apiary"
                :icon="SVG.Plus"
                :class="s.button"
                @click="createApiaryModal?.open()"
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
                @click="openApiary(apiary.id)"
            />
        </div>
        <CreateApiaryModal 
            ref="createApiaryModal"
        />
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
    isolation: isolate

    .toolbar
        z-index: 1

    .appiaries
        display: grid
        gap: 20px

        .apiary
            height: 30rem
            transition: .2s
            &:hover
                transform: translateY(-4px)
</style>