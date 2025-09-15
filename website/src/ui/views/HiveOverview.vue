<script setup lang="ts">
import { ref, useCssModule } from "vue";

const props = defineProps({
    hiveId: String,
})

const s = useCssModule()
</script>

<template>
<div :class="s.container">
   <div :class="s.generalInfo">
        <div :class="s.header">Info</div>
        <div :class="s.body">
            <div :class="s.imageSide"></div>
            <div :class="s.dataSide">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
   </div>


   <div :class="s.notes">
        <div :class="s.header">Notes</div>
        <div :class="s.body">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
   </div>


   <div :class="s.eventLog">
        <div :class="s.header">Events</div>
        <div :class="s.body">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
   </div>

   <div :class="s.queenBee">
        <div :class="s.header">Queen</div>
        <div :class="s.body">
            <div></div>
        </div>
   </div>

   <div :class="s.suppers">
        <div :class="s.header">suppers</div>
        <div :class="s.body">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
   </div>


   <div :class="s.upcomingEvents">
        <div :class="s.header">Upcoming calendar events</div>
        <div :class="s.body">
            <div></div>
            <div></div>
            <div></div>
        </div>
   </div>

   <div :class="s.stimulants">
        <div :class="s.header">Active drugs</div>
        <div :class="s.body">
            <div></div>
            <div></div>
            <div></div>
        </div>
   </div>

</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container 
    flex: 1
    display: grid
    grid-template-areas: "genInfo genInfo genInfo genInfo upcomingEvents upcomingEvents upcomingEvents upcomingEvents notes notes" "eventLog eventLog stimulants stimulants suppers suppers queen queen notes notes"
    grid-template-columns: repeat(10, 1fr)
    grid-template-rows: repeat(2, 1fr)

    padding: 1rem
    gap: 1rem
    box-sizing: border-box

    .stimulants
        display: flex
        flex-direction: column
        grid-area: stimulants
        background: rgba(0, 0, 0, .3)

        .header
            width: 100%
            height: 2rem
            background: rgba(0, 0, 0, .3)
        
        .body
            flex: 1
            grid-area: data
            display: flex
            flex-direction: column

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            > *
                flex: 1
                background: rgba(0, 0, 0, .3)

    .upcomingEvents
        display: flex
        flex-direction: column
        grid-area: upcomingEvents
        background: rgba(0, 0, 0, .3)

        .header
            width: 100%
            height: 2rem
            background: rgba(0, 0, 0, .3)
        
        .body
            flex: 1
            grid-area: data
            display: flex

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            > *
                flex: 1
                background: rgba(0, 0, 0, .3)

    .suppers
        display: flex
        flex-direction: column
        grid-area: suppers
        background: rgba(0, 0, 0, .3)

        .header
            width: 100%
            height: 2rem
            background: rgba(0, 0, 0, .3)
        
        .body
            flex: 1
            grid-area: data
            display: flex
            flex-direction: column

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            > *
                flex: 1
                background: rgba(0, 0, 0, .3)

    .queenBee
        display: flex
        flex-direction: column
        grid-area: queen
        background: rgba(0, 0, 0, .3)

        .header
            width: 100%
            height: 2rem
            background: rgba(0, 0, 0, .3)
        
        .body
            flex: 1
            grid-area: data
            display: flex
            flex-direction: column

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            > *
                flex: 1
                background: rgba(0, 0, 0, .3)


    .eventLog
        display: flex
        flex-direction: column
        grid-area: eventLog
        background: rgba(0, 0, 0, .3)

        .header
            width: 100%
            height: 2rem
            background: rgba(0, 0, 0, .3)
        
        .body
            flex: 1
            grid-area: data
            display: flex
            flex-direction: column

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            > *
                flex: 1
                background: rgba(0, 0, 0, .3)

    .notes
        display: flex
        flex-direction: column
        grid-area: notes
        background: rgba(0, 0, 0, .3)

        .header
            width: 100%
            height: 2rem
            background: rgba(0, 0, 0, .3)
        
        .body
            flex: 1
            grid-area: data
            display: flex
            flex-direction: column

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            > *
                flex: 1
                background: rgba(0, 0, 0, .3)

    .generalInfo
        display: flex
        flex-direction: column
        grid-area: genInfo
        background: rgba(0, 0, 0, .3)

        .header
            width: 100%
            height: 2rem
            background: rgba(0, 0, 0, .3)
        
        .body
            flex: 1
            display: grid
            grid-template-areas: "image data"
            grid-template-columns: repeat(2, 1fr)

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            .imageSide
                grid-area: image
                background: rgba(0, 0, 0, .3)

            .dataSide
                grid-area: data
                display: flex
                flex-direction: column

                gap: 1rem
                box-sizing: border-box
                > *
                    flex: 1
                    background: rgba(0, 0, 0, .3)


    
</style>