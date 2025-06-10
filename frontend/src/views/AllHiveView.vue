<script setup>
import Hive from '@/components/hive/Hive.vue';
import { ref, useCssModule } from "vue";
import { rUser, getHives } from "../core/repositories/homeRepository.js"
import { onMounted } from 'vue';
import IconCubeButton from '@/components/buttons/IconCubeButton.vue';
import PathTitle from '@/components/PathTitle.vue';
import HorizontalHr from '@/components/HorizontalHr.vue';

const hives = ref([])
const assignedHives = ref([])
const unassignedHives = ref([])

onMounted(async () => {
    hives.value = await getHives()
    
    assignedHives.value = hives.value.filter((item) => item['apiary_id'])
    unassignedHives.value = hives.value.filter((item) => !item['apiary_id'])
})
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <PathTitle title="Hives"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton :class="s['button-special']" res="fa-solid fa-left-long"/>
    </div>

    <div :class="s.grid">
        <Hive v-for="(hive, i) in assignedHives" :key="i"
            @click="$router.push('/hives/' + hive.id)"    
            :hive="hive"
        />
        <HorizontalHr v-if="unassignedHives.length > 0" text="Unassigned hives"/>
        <Hive v-for="(hive, i) in unassignedHives" :key="i"
            @click="$router.push('/hives/' + hive.id)" 
            :hive="hive"
        />
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container 
    display: flex
    flex-direction: column
    width: 100%
    height: calc( 100vh - 12px )
    overflow: hidden

    box-sizing: border-box
    margin: 6px

    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #FFECC8

hr
    width: 100%
.header
    // top: 0
    // position: sticky
    display: flex
    align-items: center
    gap: .4rem

    height: 5rem

    box-sizing: border-box
    padding: .4rem
    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #EDEDED

    .vt-linebreak
        width: 6px
        height: 100%
        border-radius: 4px
        background: #D9D9D9
        margin-left: auto 

.grid
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: flex-start
    gap: 3rem
    justify-items: center
    padding: 1rem

    overflow-y: auto

.button-special
    background: main.$button-special
</style>