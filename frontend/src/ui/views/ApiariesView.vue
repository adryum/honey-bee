<script setup lang="ts">
import { computed, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import IconButton from '../components/input/buttons/IconTextButton.vue';
import { onResize } from '@/core/utils/Hooks';
import { SVG } from '@/assets/svgs/SVGLoader';
import Apiary from '../components/apiary/Apiary.vue';
import StringSearchDropdown from "../components/input/dropdowns/StringSearchDropdown.vue";
import { useApiariesQuery } from "@/core/composables/useApiary";
import ApiaryCreateModal from "../components/modals/ApiaryCreateModal.vue";
import { useRouter } from "vue-router";
import type { ModalBaseModel } from "@/core/composables/useModalBase";
import { useAuthStore } from "@/core/stores/useAuthStore";
import { UserRoles } from "@/core/DatabaseEnums";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const router = useRouter()
const { t } = useI18n()

const { requireRole } = useAuthStore()
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
    router.push(`/apiary/${id}/general`)
}

onResize(grid, (element) => {
    const rect = element.contentRect
    gridColumns.value = Math.floor(rect.width / minHiveWidth)
})
</script>

<template>
<div 
    :class="s.container"
    :style="{ maxHeight: `calc(100vh - var(--header-height))` }"
>
        <ToolBar 
            :label="t('apiaries')"
            :tabs="[]"
            :selected-tab="[]"
            :class="s.toolbar"
        >
            <template #header>
                <IconButton
                    v-if="requireRole([UserRoles.ADMINISTRATOR])"
                    :text="t('create-apiary')"
                    :icon="SVG.Plus"
                    :class="s.button"
                    @click="createApiaryModal?.open()"
                />
                <StringSearchDropdown
                    :options="{
                        initialValue: '',
                        placeholder: t('search-apiaries'),
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
            </template>
        </ToolBar>

        <div 
            ref="grid"
            :class="s.apiaries" 
            :style="{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)`}" 
        >
            <Apiary 
                v-for="apiary in filteredApiaries"
                :class="s.apiary" 
                :apiary="apiary"
                @click="openApiary(apiary.id)"
            />
        </div>
        <ApiaryCreateModal 
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
    height: 100%
    max-height: 100%

    padding: 1rem
    box-sizing: border-box
    isolation: isolate
    
    .toolbar
        z-index: 1

    .apiaries
        display: grid
        gap: 20px
        height: 100%
        overflow-y: auto

        .apiary
            height: 30rem
            transition: .2s
            &:hover
                transform: translateY(-4px)
</style>