<script setup>
import HiveWidgetGeneral from '@/components/hive/widgets/HiveWidgetGeneral.vue';
import { ref, useCssModule } from "vue";
import { rUser, getHiveOverview } from "../core/repositories/homeRepository.js"
import { onMounted } from 'vue';
import IconCubeButton from '@/components/buttons/IconCubeButton.vue';
import PathTitle from '@/components/PathTitle.vue';
import HiveWidgetNotes from '@/components/hive/widgets/HiveWidgetNotes.vue';
import Note from '@/components/Note.vue';
import HiveWidgetActivityFeed from '@/components/hive/widgets/activity_feed/HiveWidgetActivityFeed.vue';
import HiveWidgetQueen from '@/components/hive/widgets/HiveWidgetQueen.vue';
import HiveWidgetStimulants from '@/components/hive/widgets/stimulant/HiveWidgetStimulants.vue';
import HiveWidgetSupper from '@/components/hive/widgets/supper/HiveWidgetSupper.vue';
import SupperEntry from '@/components/hive/widgets/supper/SupperEntry.vue';

const props = defineProps({
    hiveId: String,
})

const rHive = ref({})
const rNotes = ref([])
const rQueen = ref({})
const rActivityFeed = ref([])
const rStimulants = ref([])
const rSuppers = ref([])

onMounted(async () => {
    const overview = await getHiveOverview(props.hiveId)
    console.log(overview);
    rHive.value = overview.hive
    rNotes.value = overview.notes
    rQueen.value = overview.queen
})
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <PathTitle :title="rHive.name"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton :class="s['button-special']" res="fa-solid fa-left-long"/>
    </div>

    <div :class="s.grid">
        <HiveWidgetGeneral :class="s.general" :hive="rHive"/>

        <HiveWidgetNotes :class="s.notes" :notes="rNotes"/>

        <HiveWidgetActivityFeed :class="s.feed"/>

        <HiveWidgetQueen :class="s.queen" :queen="rQueen"/>

        <HiveWidgetStimulants :class="s.stimulants"/>

        <HiveWidgetSupper :class="s.suppers">
            <SupperEntry v-for="supper in rSuppers" :supper="supper"/>
        </HiveWidgetSupper>
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

.button-special
    background: main.$button-special

.grid
    flex: 1
    display: grid
    grid-template-areas: 'general general suppers notes' 'general general suppers notes' 'feed queen stimulants notes'
    grid-template-columns: repeat(4, minmax(0, 1fr))
    grid-template-rows: repeat(3, minmax(0, 1fr))
    gap: 1rem

    box-sizing: border-box
    padding: 1rem

    overflow-y: auto

    > *
        width: 100%
        height: 100%
        box-sizing: border-box

    .general
        grid-area: general

    .notes
        grid-area: notes

    .feed
        grid-area: feed

    .queen
        grid-area: queen

    .stimulants
        grid-area: stimulants

    .suppers
        grid-area: suppers

</style>