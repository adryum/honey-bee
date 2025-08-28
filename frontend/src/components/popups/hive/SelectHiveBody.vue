<script setup lang="ts">
import { onMounted, ref, useCssModule } from 'vue';
import { motion } from 'motion-v';
import type { HiveModel } from '../../../core/models/Models';
import { HiveRepository } from '../../../core/repositories/HiveRepository';
import Hive from '../../hive/Hive.vue';
import ToolBar from '../../ToolBar.vue';
import { getSVG, SVGIconRes } from '../../../core/SVGLoader';
import { createComponentWithProps, createComponentInstance } from '../../../utils/components';
import SmallSearchbar from '../../input/fields/SmallSearchbar.vue';

const s = useCssModule()
const searchWord = ref<string>('')
const hives = ref<HiveModel[]>()
const components = [
    createComponentWithProps(SmallSearchbar, { onClick: async (searchText: string) => await getHives(searchText) }),
]

onMounted(async () => {
    await getHives(searchWord.value)
})

async function getHives(searchWord: string) {
    hives.value = await HiveRepository.getHives(searchWord)
}
</script>


<template>
    <motion.div :class="s.container">
        <ToolBar name="Your hives" :components="components" />
        <div :class="s.hives">
            <Hive v-for="hive in hives" :key="hive.id" :hive="hive" :show-apiary="true"/>
            <p :class="s.info" v-if="hives?.isEmpty">You have no hives matching this criteria</p>
        </div>
    </motion.div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    
    gap: 1rem    
    .hives
        display: grid 
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
        gap: 1rem

        height: 30rem
        width: 80rem

        overflow-y: scroll
        .info
            align-self: center
            justify-self: center
</style>