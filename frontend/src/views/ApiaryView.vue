<script setup lang="ts">
import ApiarySummaryCard from '@/components/ApiarySummaryCard.vue';
import { getApiaries } from '@/core/repositories/homeRepository';
import { onMounted, ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import SmallSearchbar from '../components/input_fields/SmallSearchbar.vue';
import IconButton from '../components/buttons/IconButton.vue';
import { createComponentInstance, createComponentWithProps } from '../utils/components';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';

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
        svg: {
            path: "M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z",
            viewBox: "0 0 540 540",
            color: "#FFFFFF"
        },
        onClick: () => {
            createComponentInstance(CreateApiaryPopup)
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
        grid-template-columns: repeat(auto-fit, 520px)
        justify-content: center
        gap: 2rem
</style>