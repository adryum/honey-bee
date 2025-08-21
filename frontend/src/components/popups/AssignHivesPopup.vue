<script setup>
import { onMounted, ref, useCssModule } from 'vue';
import IconCubeButton from '../input/buttons/IconCubeButton.vue';
import { removePopup } from '@/core/popups';
import { assignHiveToApiary, getHives, rUser } from '@/core/repositories/homeRepository';
import Hive from '../hive/Hive.vue';
import PathTitle from '../PathTitle.vue';

const props = defineProps({
    id: String,
    apiaryId: String,
    currentFilter: String,
    refreshHives: Function
})

const assignedHives = ref([])
const unassignedHives = ref([])

function onAssignment() {
    props.refreshHives()
    refreshPopup()
}

async function refreshPopup() {
    const hives = await getHives()

    assignedHives.value = hives.filter((item) => item['apiary_id'] && item['apiary_id'] != props.apiaryId)
    unassignedHives.value = hives.filter((item) => !item['apiary_id'])
}

const s = useCssModule()
onMounted(async () => refreshPopup())
</script>


<template>
    <div :class="s.container">
    <div :class="s.header">
        <PathTitle title="Hives"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton @click="removePopup(id)" :class="s['button-special']" res="fa-solid fa-xmark"/>
    </div>

    <Suspense>
    <div :class="s.grid">
        <HorizontalHr v-if="assignedHives.length > 0" text="Assigned hives"/>
        <Hive v-for="(hive, i) in assignedHives" :key="i"
            @click="assignHiveToApiary(hive.id, apiaryId, onAssignment)"
            :hive="hive"
        />
        <HorizontalHr v-if="unassignedHives.length > 0" text="Unassigned hives"/>
        <Hive v-for="(hive, i) in unassignedHives" :key="i"
            @click="assignHiveToApiary(hive.id, apiaryId, onAssignment)"
            :hive="hive"
        />
    </div>
</Suspense>
</div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as main
.container 
    display: flex
    flex-direction: column
    width: 80vw
    height: 80vh

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

    overflow-y: scroll

.button-special
    background: main.$button-special
@media (max-width: 600px) 
    .container
        width: 100%
</style>