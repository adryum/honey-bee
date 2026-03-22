<script setup lang="ts">
import Hive from '../components/hive/Hive.vue';
import { computed, onMounted, ref, useCssModule } from "vue";
import ToolBar from '../components/ToolBar.vue';
import { useFlexibleGrid } from '@/core/utils/others.js';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import StringSearchDropdown from '../components/input/dropdowns/StringSearchDropdown.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import { useApiaryQuery } from '@/core/composables/useApiary';
import { useRouter } from 'vue-router';
import CreateHiveModal from '../components/modals/CreateHiveModal.vue';

const s = useCssModule()
const props = defineProps<{
    apiaryId: number
}>()

const dialog = ref<InstanceType<typeof CreateHiveModal>>()

const { apiary, hives } = useApiaryQuery({
    id:             computed(() => props.apiaryId),
    getApiary:      true,
    getApiaryHives: true
})
const router = useRouter()

const filteredHives = computed(() => {
    return hives.value?.filter(hive => 
        hive.name.toLowerCase().includes(searchWord.value.toLowerCase())
    ) ?? []
})

const searchWord = ref<string>('')
const grid = ref()
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemMinWidthPx: 400,
    gapPx: 10
})

function startInspection(apiaryId: number) {
    router.push(`/inspection/conduct/apiary/${apiaryId}/`)
}

function openHive(hiveId: number) {
    router.push(`/hive/${hiveId}/general`)
}
</script>

<template>
<div 
    ref="grid"
    :class="s.container"
>
    <ToolBar 
        :label="apiary?.name"
    >
        <IconTextButton
            v-if="apiary && !filteredHives.isEmpty()"
            text="Add inspection"
            :svg="SVG.Plus"
            :class="s.button"
            @click="startInspection(apiary.id)"
        />
        <IconTextButton
            text="Add hive"
            :svg="SVG.Plus"
            :class="s.button"
            @click="dialog?.open()"
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
        :style="gridStyle" 
    >
        <Hive 
            v-for="hive in filteredHives"  
            class="item" 
            :hive="hive"
            @click="openHive(hive.id)"
        />
    </div>
    <CreateHiveModal
        ref="dialog"
        :apiary-id="apiaryId"
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
</style>