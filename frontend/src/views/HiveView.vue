<script setup lang="ts">
import { ref, useCssModule } from "vue";

const props = defineProps({
    hiveId: String,
})

const rHive = ref({})
const rNotes = ref([])
const rQueen = ref({})
const rActivityFeed = ref([])
const rStimulants = ref([])
const rSuppers = ref([])

// onMounted(async () => {
//     const overview = await getHiveOverview(props.hiveId)
//     console.log(overview);
//     rHive.value = overview.hive
//     rNotes.value = overview.notes
//     rQueen.value = overview.queen
// })
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <!-- <div :class="s.header">
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
    </div> -->
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

@media (max-width: 600px) 
    .container
        width: auto
    
    .grid
        display: flex
        flex-direction: column
</style>