<script setup lang="ts">
import { ref, useCssModule} from "vue"
import ToolBar from '../components/ToolBar.vue';
import BeeSummaryCard from '../components/bee/BeeSummaryCard.vue';

const bees = ref([1,2,3,4,5])
const s = useCssModule()

</script>

<template>
    <div :class="s.container">
        <ToolBar name="Bees" :components="[]"/>
        <div :class="s.appiaries" ref="page">
            <BeeSummaryCard  
            v-for="i in bees" 
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
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
        justify-content: center
        gap: 1rem
</style>