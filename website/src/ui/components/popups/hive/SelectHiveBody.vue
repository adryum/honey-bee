<script setup lang="ts">
import { computed, onMounted, ref, useCssModule, watch, type Ref } from 'vue';
import { motion } from 'motion-v';
import Hive from '../../hive/Hive.vue';
import ToolBar from '../../ToolBar.vue';
import { useHiveStore } from '../../../../core/stores/HiveStore';
import type { HiveModel } from '../../../../core/models/Models';
import { createComponentWithProps } from '../../../../core/utils/components';
import SmallSearchbar from '../../input/fields/SmallSearchbar.vue'
import { useFlexibleGrid } from '@/core/utils/others';
import { onResize } from '@/core/utils/Hooks';

const s = useCssModule()
const props = defineProps<{
    apiaryId: number
    onAssign: () => {}
}>()
const hiveStore = useHiveStore()
const hives = ref<HiveModel[]>([...hiveStore.hives])
const searchWord = ref<string>('')
const components = [
    createComponentWithProps(SmallSearchbar, { onClick: (searchText: string) => searchWord.value = searchText }),
]

const grid = ref<HTMLDivElement | null>(null)
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemWidth: 250,
    gap: '10px'
})

function searchHives() {
    hives.value = hiveStore.searchForHives({
        searchWord: searchWord.value
    })
}

async function assignHive(hiveId: number) {
    await hiveStore.assignHive(hiveId, props.apiaryId)
    props.onAssign();
    searchHives()
}

watch(searchWord, () => searchHives())
</script>

<template>
    <motion.div ref="container" :class="s.container">
        <ToolBar name="Your hives" :components="components" />
        <div ref="grid" :style="gridStyle" :class="s.grid">
            <Hive v-for="hive in hives" :key="hive.id" 
            @click="assignHive(hive.id)" :hive="hive" :show-apiary="true"/>
            <p :class="s.info" v-if="!hives.length">You have no hives matching this criteria</p>
        </div>
    </motion.div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    aspect-ratio: 16 / 9
    
    width: 60rem
    height: auto
    resize: both
    max-width: 100%
    max-height: 70vh
    box-sizing: border-box
    
    overflow-y: scroll
    padding-right: 1rem 
    gap: 1rem    

    .grid
        .info
            align-self: center
            justify-self: center
</style>