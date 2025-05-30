<script setup>
import ApiarySummaryCard from '@/components/ApiarySummaryCard.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import { createPopup } from '@/core/popups';
import { user, getApiaries } from '@/core/repositories/homeRepository';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import CreateApiaryPopup from "@/components/popups/CreateApiaryPopup.vue";

const rApiaries = ref([])
const rFilterStartWith = ref('')
const rGapMultiplier = ref(50)
const rSizeMultiplier = ref(30)
const rPage = useTemplateRef('page')

async function assignApiaries() {
    rApiaries.value = await getApiaries(user.value['account_code'], rFilterStartWith.value)
}

function changeGap(multiplier) {
    let multi = multiplier / 10
    rPage.value.style.gap = `${1 * multi}rem`
}

watch(rPage, (newV) => {
    if (newV) {
        changeGap(rGapMultiplier.value)
    }
})

onMounted(async () => {
    rApiaries.value = await getApiaries(user.value['account_code'])
})
</script>

<template>
<div class="view-container">
    <div class="header">
        <IconButton @click="createPopup(CreateApiaryPopup, {currentFilter: rFilterStartWith, refreshApiaries: assignApiaries})" text="Add apiary"/>
        <input type="range" min="20" max="100" v-model.number="rSizeMultiplier">
        <input type="range" min="0" max="100" v-model="rGapMultiplier" @input="changeGap(rGapMultiplier)">
        <SearchBar id="search-bar" :onClick="assignApiaries" v-model="rFilterStartWith"/>
    </div>
    <div class="page" ref="page">
        <ApiarySummaryCard class="item" v-for="apiary in rApiaries" :apiary="apiary" :sizeMultiplier="rSizeMultiplier"/>
    </div>
</div>
</template>

<style scoped lang='sass'>
@use '../assets/_colors.sass' as *
.view-container
    width: 100%
    height: 100vh

    display: grid
    grid-template-areas: 'a header header header b' 'a c c c b' 'a k page l b'
    grid-template-columns: 1rem 2rem 1fr 2rem 1rem
    grid-template-rows: 6rem 2rem 1fr

    background: $base-dark

   

.header
    grid-area: header
    background: $special-dark
    box-shadow: 0 6px 8px 0px rgba(0, 0, 0, .3)
    border-radius: 0 0 8px 8px

    display: flex
    align-items: center
    justify-content: end
    gap: 2rem
    padding: 0 1.5rem 0 1.5rem

    z-index: 1

    position: sticky
    top: 0

    #search-bar
        width: 12rem

.page
    grid-area: page
    background: #FFEFD8
    border-radius: 4px 4px 0 0
    border-top: 6px solid  $atumn-dark
    
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: flex-start
    gap: 3rem
    justify-items: center
    padding: 1rem
</style>