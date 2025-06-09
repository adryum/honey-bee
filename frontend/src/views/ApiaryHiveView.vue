<script setup>
import Hive from '@/components/hive/Hive.vue';
import { ref, useCssModule } from "vue";
import { user as rUser, getApiaryHives, getApiary, unassignHive } from "../core/repositories/homeRepository.js"
import { onMounted } from 'vue';
import IconCubeButton from '@/components/buttons/IconCubeButton.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import { createPopup } from '@/core/popups.js';
import AssignHivesPopup from '@/components/popups/AssignHivesPopup.vue';
import PathTitle from '@/components/PathTitle.vue';
import AreYouSurePopup from '@/components/popups/AreYouSurePopup.vue';

const props = defineProps({
    id: String
})

const rHives = ref([])
const rApiary = ref({})
const rIsRemovingHives = ref(false)

async function searchApiaryHives() {
    rHives.value = await getApiaryHives(rUser.value['account_code'], props.id)
}

function handleHiveClick(hive) {
    if (rIsRemovingHives.value) {
        createPopup(AreYouSurePopup, {
            title: 'Remove Hive',
            description: `Are you sure you want to remove ${hive.name}?`,
            onAsyncYes: async () => { 
                await unassignHive(rUser.value['account_code'], hive.id)
                await searchApiaryHives()
            }
        })
    }
}

onMounted(async () => {
    rApiary.value = await getApiary(rUser.value['account_code'], props.id)
    rHives.value = await getApiaryHives(rUser.value['account_code'], props.id)
})
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <PathTitle :title="rApiary.name"/>
        <div :class="s['vt-linebreak']"></div>
        <IconButton @click="rIsRemovingHives = !rIsRemovingHives" text="Remove hives"/>
        <IconButton @click="createPopup(AssignHivesPopup, {apiaryId: id, currentFilter: rSearchFilter, refreshHives: searchApiaryHives})" text="Add hive"/>
        <IconCubeButton @click="$router.back()" :class="s['button-special']" res="fa-solid fa-left-long"/>
    </div>

    <div :class="s.grid">
        <Hive v-for="(hive, i) in rHives" :key="i"
            @click="handleHiveClick(hive)"
            :id="hive.id"
            :name="hive.name"
            :weight="hive.weight"
            :frames="hive.frames"
            :type="hive.type"
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