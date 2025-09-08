<script setup lang="ts">
import { ref, useCssModule, watch } from 'vue';
import { motion } from 'motion-v';
import Hive from '../../hive/Hive.vue';
import ToolBar from '../../ToolBar.vue';
import { useHiveStore } from '../../../../core/stores/HiveStore';
import type { HiveModel } from '../../../../core/models/Models';
import { createComponentWithProps } from '../../../../core/utils/components';
import SmallSearchbar from '../../input/fields/SmallSearchbar.vue'

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
    <motion.div :class="s.container">
        <ToolBar name="Your hives" :components="components" />
        <div :class="s.hives">
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
    
    overflow-y: scroll
    padding-right: 1rem 
    gap: 1rem    
    .hives
        display: grid 
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
        gap: 1rem

        height: 30rem
        width: 50rem

        .info
            align-self: center
            justify-self: center
</style>