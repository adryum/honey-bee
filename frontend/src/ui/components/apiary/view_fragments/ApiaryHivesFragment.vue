<script setup lang="ts">
import Hive from '@/ui/components/hive/Hive.vue';
import { ref, useCssModule } from "vue";
import { useFlexibleGrid } from '@/core/utils/others.js';
import { useRouter } from 'vue-router';
import type { ApiaryModelDB, HiveModelDB } from '@/core/stores/Models';

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    apiary: ApiaryModelDB
    hives:  HiveModelDB[]
}>()

const grid = ref()
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemMinWidthPx: 400,
    gapPx: 10
})

function openHive(hiveId: number) {
    router.push(`/hive/${hiveId}/general`)
}
</script>

<template>
<div 
    ref="grid"
    :class="s.container"
>
    <div 
        ref="grid"
        :class="s.appiaries" 
        :style="gridStyle" 
    >
        <Hive 
            v-for="hive in hives"  
            class="item" 
            :hive="hive"
            @click="openHive(hive.id)"
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
</style>