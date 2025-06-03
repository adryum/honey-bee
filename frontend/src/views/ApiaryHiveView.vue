<script setup>
import Hive from '@/components/hive/Hive.vue';
import { ref, useCssModule } from "vue";
import { user, getApiaryHives, getApiaries, getHives, getApiary } from "../core/repositories/homeRepository.js"
import { onMounted } from 'vue';
import IconCubeButton from '@/components/buttons/IconCubeButton.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import { createPopup } from '@/core/popups.js';
import AssignHivesPopup from '@/components/popups/AssignHivesPopup.vue';

const props = defineProps({
    id: Number
})

const hives = ref([])
const rApiary = ref({})

async function searchApiaryHives() {
    hives.value = await getApiaryHives(user.value['account_code'], props.id)
}

onMounted(async () => {
    rApiary.value = await getApiary(user.value['account_code'], props.id)
    hives.value = await getApiaryHives(user.value['account_code'], props.id)
})
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <div>
            <div>Path</div>
            {{ rApiary.name }}
        </div>
        <div :class="s['vt-linebreak']"></div>
        <IconButton @click="createPopup(AssignHivesPopup, {apiaryId: id, currentFilter: rSearchFilter, refreshHives: searchApiaryHives})" text="Add hive"/>
        <IconCubeButton :class="s['button-special']" res="fa-solid fa-left-long"/>
    </div>

    <div :class="s.grid">
        <Hive v-for="(hive, i) in hives" :key="i"
            :name="hive.name"
            :weight="hive.weight"
            :frames="hive.frames"
            :type="hive.type"
            ></Hive>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container 
    display: flex
    flex-direction: column
    width: 100%

    box-sizing: border-box
    margin: 6px

    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #FFECC8

.header
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

.button-special
    background: main.$button-special
</style>