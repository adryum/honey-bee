<script setup>
import ApiarySummaryCard from '@/components/ApiarySummaryCard.vue';
import { rUser, getApiaries } from '@/core/repositories/homeRepository';
import { onMounted, ref, useCssModule, useTemplateRef, watch } from 'vue';
import ToolBar from '../components/ToolBar.vue';

const rApiaries = ref([])
const rSearchFilter = ref('')
const rGapMultiplier = ref(50)
const rSizeMultiplier = ref(30)
const rPage = useTemplateRef('page')

async function searchApiaries() {
    rApiaries.value = await getApiaries(rSearchFilter.value)
}

onMounted(async () => {
    rApiaries.value = await getApiaries()
})

const s = useCssModule()
</script>

<template>
    <div :class="s.container">
        <ToolBar />
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
        grid-template-columns: repeat(3, 550px)
        justify-content: space-between
        gap: 4rem

    

</style>