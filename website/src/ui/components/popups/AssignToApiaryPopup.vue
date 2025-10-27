<script setup lang="ts">
import { useHiveAssignToApiary } from '@/core/composables/apiary/useApiaryAssignHive';
import type { ApiaryModel } from '@/core/models/Models';
import { createComponentWithProps, type PopupFunctions } from '@/core/utils/components';
import { useCssModule, ref, watch, onMounted } from 'vue';
import SmallSearchbar from '../input/fields/SmallSearchbar.vue';
import { motion } from 'motion-v';
import ApiarySummaryCard from '../apiary/ApiarySummaryCard.vue';
import ToolBar from '../ToolBar.vue';
import PopupFrame from './PopupFrame.vue';

const s = useCssModule()
const props = defineProps<{
    hiveId: number
    onAssign: () => {}
    popupFunctions: PopupFunctions
}>()
const searchWord = ref<string>('')
const components = [
    createComponentWithProps(SmallSearchbar, { onClick: (searchText: string) => searchWord.value = searchText }),
]
const apiaries = ref<ApiaryModel[]>()
const { assignHive, isAssigningHive, searchForApiaries } = useHiveAssignToApiary()

function searchApiaries() {
    apiaries.value = searchForApiaries({
        searchWord: searchWord.value
    })
}

async function onAssignHive(apiaryId: number) {
    await assignHive(props.hiveId, apiaryId)
    props.onAssign();
    searchApiaries()
}

watch(searchWord, () => searchApiaries())
onMounted(() => {
    searchApiaries()
})
</script>

<template>
<PopupFrame title="Move hive" :popup-functions="popupFunctions">
    <template #body>
        <motion.div :class="s.container">
            <ToolBar name="Your apiaries" :components="components" />
            <div :class="s.apiaries">
                <ApiarySummaryCard v-for="apiary in apiaries" 
                    :apiary="apiary"
                    @click="onAssignHive(apiary.id)"/>
                
                <p :class="s.info" v-if="!apiaries?.length">You have no hives matching this criteria</p>
            </div>
        </motion.div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    
    overflow-y: scroll
    padding-right: 1rem 
    gap: 1rem    
    .apiaries
        display: grid 
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
        gap: 1rem

        height: 30rem
        width: 50rem


        .info
            align-self: center
            justify-self: center
</style>