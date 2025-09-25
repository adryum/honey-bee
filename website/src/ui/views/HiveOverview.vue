<script setup lang="ts">
import { ref, useCssModule } from "vue";
import TitledField from "../components/input/fields/TitledField.vue";

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
            <div :class="s.imageSide">
                <img src="@/assets/images/apiary.jpg" alt="">
            </div>
            <div :class="s.dataSide">
                <TitledField title="Name"/>
                <TitledField title="Location"/>
                <TitledField title="Description"/>
            </div>
        </div>
   </div>

   <div :class="s.notes">
        <div :class="s.header">Notes</div>
        <div :class="s.body">
            <div :class="s.note">
                <div :class="s.top">
                    <h2 :class="s.informative">Information</h2>
                    <p :class="s.date">22 sep. 2046.</p>
                </div>
                <h1 :class="s.title">Do that thing!</h1>
                <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
            </div>
            <div :class="s.note">
                <div :class="s.top">
                    <h2 :class="s.informative">Information</h2>
                    <p :class="s.date">22 sep. 2046.</p>
                </div>
                <h1 :class="s.title">Do that thing!</h1>
                <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
            </div>
            <div :class="s.note">
                <div :class="s.top">
                    <h2 :class="s.informative">Information</h2>
                    <p :class="s.date">22 sep. 2046.</p>
                </div>
                <h1 :class="s.title">Do that thing!</h1>
                <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
            </div>
            <div :class="s.note">
                <div :class="s.top">
                    <h2 :class="s.informative">Information</h2>
                    <p :class="s.date">22 sep. 2046.</p>
                </div>
                <h1 :class="s.title">Do that thing!</h1>
                <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
            </div>
            <div :class="s.note">
                <div :class="s.top">
                    <h2 :class="s.informative">Information</h2>
                    <p :class="s.date">22 sep. 2046.</p>
                </div>
                <h1 :class="s.title">Do that thing!</h1>
                <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
            </div>
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
            <div :class="[s.column, s.otherday]">
                <div :class="s.topHeader">
                    <div :class="s.title">Yesterday</div>
                    <div :class="s.date">
                        <h1 :class="s.dateNumber">23</h1>
                        <h2 :class="s.dateMonth">sep.</h2>
                    </div>
                    
                </div>
                <div :class="s.tasks">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div :class="[s.column, s.today]">
                <div :class="s.topHeader">
                    <div :class="s.title">Today!</div>
                    <div :class="s.date">
                        <h1 :class="s.dateNumber">24</h1>
                        <h2 :class="s.dateMonth">sep.</h2>
                    </div>
                    
                </div>
                <div :class="s.tasks">
                    <div :class="s.task">
                        <h1 :class="s.title">Do that thing!</h1>
                        <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
                    </div>
                    <div :class="s.task">
                        <h1 :class="s.title">Feed hungry bees</h1>
                        <p :class="s.content">They need to be fed with only the most potent elixir from our rarest flowers!</p>
                    </div>
                </div>
            </div>
            <div :class="[s.column, s.otherday]">
                <div :class="s.topHeader">
                    <div :class="s.title">Tomorow</div>
                    <div :class="s.date">
                        <h1 :class="s.dateNumber">25</h1>
                        <h2 :class="s.dateMonth">sep.</h2>
                    </div>
                    
                </div>
                <div :class="s.tasks">
                    <div :class="s.task">
                        <h1 :class="s.title">Do that thing!</h1>
                        <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!!</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
   </div>

   <div :class="s.stimulants">
        <div :class="s.header">Active drugs</div>
        <div :class="s.body">
            <div :class="s.entry">
                <div :class="s.imageContainer">
                    <img src="@/assets/images/apiary.jpg" alt="">
                </div>

                <div :class="s.info">
                    <h1 :class="s.name">Trens</h1>
                    <div :class="s.tags">
                        <div :class="s.tag">
                            <h2 :class="s.title">Since</h2>
                            <p :class="s.date">22.sep.</p>
                        </div>
                        <div :class="s.tag">
                            <h2 :class="s.title">Till</h2>
                            <p :class="s.date">22.sep.</p>
                        </div>
                        <div :class="s.tag">
                            <h2 :class="s.title">Next</h2>
                            <p :class="s.date">22.sep.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="s.entry">
                <div :class="s.imageContainer">
                    <img src="@/assets/images/apiary.jpg" alt="">
                </div>

                <div :class="s.info">
                    <h1 :class="s.name">Želejas lācīši</h1>
                    <div :class="s.tags">
                        <div :class="s.tag">
                            <h2 :class="s.title">Since</h2>
                            <p :class="s.date">22.sep.</p>
                        </div>
                        <div :class="s.tag">
                            <h2 :class="s.title">Till</h2>
                            <p :class="s.date">22.sep.</p>
                        </div>
                        <div :class="s.tag">
                            <h2 :class="s.title">Next</h2>
                            <p :class="s.date">22.sep.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
   </div>

</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
@use '@/assets/_base.sass' as base
.header
    @include main.button-font
    position: relative
    display: flex
    align-items: center
    width: 100%
    min-height: 2rem
    padding: 0 0.5rem
    box-sizing: border-box
    background: var(--surface)
    border-top: 4px solid var(--light)
    // border-bottom: 1px solid rgba(0, 0, 0, .1)
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)

.body
    background: var(--surface)

.container 
    flex: 1
    display: grid

    padding: 1rem
    gap: 1rem
    box-sizing: border-box

    @media (min-width: base.$xl) 
        grid-template-areas:"genInfo genInfo genInfo upcomingEvents upcomingEvents upcomingEvents" "stimulants stimulants suppers suppers queen queen " "eventLog eventLog notes notes notes notes"
        grid-template-rows: repeat(3, 400px)
        grid-template-columns: repeat(6, 1fr)
    
    @media (min-width: base.$xxl) 
        grid-template-columns: repeat(10, 1fr)
        grid-template-areas: "genInfo genInfo genInfo genInfo upcomingEvents upcomingEvents upcomingEvents upcomingEvents notes notes" "eventLog eventLog stimulants stimulants suppers suppers queen queen notes notes"
        grid-template-rows: repeat(2, 1fr)

    > *
        border-radius: 0 0 3px 3px
        overflow: hidden

    .stimulants
        display: flex
        flex-direction: column
        grid-area: stimulants
        
        .body
            @include main.font

            flex: 1
            grid-area: data
            display: flex
            flex-direction: column

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            .entry
                display: flex
                width: 100%

                background: white
                border-radius: 3px
                overflow: hidden


                .imageContainer
                    min-width: 20%
                    height: 100%

                    img
                        width: 100%
                        height: 100%
                        object-fit: cover


                .info
                    display: flex
                    flex-direction: column
                    gap: .5rem
                    width: 100%

                    box-sizing: border-box
                    padding: 1rem

                    .name
                        @include main.f-size-small
                        font-weight: 700
                        

                    .tags
                        display: flex
                        width: 100%
                        background: var(--accent)
                        gap: 1px
                        border-left: 1px solid var(--accent)
                        border-right: 1px solid var(--accent)

                        .tag
                            flex: 1
                            display: flex
                            flex-direction: column
                            gap: .2rem

                            box-sizing: border-box
                            padding: 0 .5rem
                            background: white

                            .title
                                @include main.f-size-tiny
                                font-weight: 900
                                letter-spacing: 0.02em

                            .date
                                @include main.f-size-very-small


    .upcomingEvents
        display: flex
        flex-direction: column
        grid-area: upcomingEvents

        overflow: hidden

        .body
            @include main.font
            flex: 1
            grid-area: data
            display: flex
            align-items: flex-end

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            .column
                flex: 1
                border-radius: 3px
                overflow: hidden
                border: 1px solid var(--light)

                display: flex
                flex-direction: column
                gap: 1rem

                padding: 1rem
                box-sizing: border-box
                .tasks
                    display: flex
                    flex-direction: column
                    gap: 1rem
                    overflow: auto

                    .task
                        display: flex
                        flex-direction: column
                        gap: .5rem
                        padding: .5rem
                        border-radius: 0 0 6px 6px

                        box-sizing: border-box
                        background: white
                        border-top: 6px solid var(--accent)

                        .title
                            @include main.f-size-very-small
                            font-weight: 900

                        .content
                            @include main.f-size-very-small

                .topHeader
                    display: flex
                    flex-direction: column
                    gap: .5rem

                    .title
                        display: flex
                        align-items: center
                        justify-content: center
                        padding: 0.25rem .5rem
                        box-sizing: border-box
                        width: 100%
                        border-radius: 3px

                        @include main.f-size-very-small
                        @include main.mono-font
                        font-weight: 900
                        text-transform: uppercase;
                        background: var(--light)

                    .date
                        display: flex
                        gap: .5rem
                        align-items: center

                        .dateNumber
                            @include main.f-size-medium
                            font-weight: 700
                        .dateMonth
                            @include main.f-size-small

            .otherday
                height: 95%
                transition: 0.2s
                &:hover
                    opacity: 1

                .topHeader

                    .title
                        display: flex
                        align-items: center
                        justify-content: center
                        padding: 0.25rem .5rem
                        box-sizing: border-box
                        width: 100%
                        border-radius: 3px

                        @include main.f-size-very-small
                        @include main.mono-font
                        font-weight: 900
                        text-transform: uppercase;
                        background: var(--accent)

            .today
                height: 100%
                


    .suppers
        display: flex
        flex-direction: column
        grid-area: suppers
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
        @include main.font

        .body
            flex: 1
            grid-area: data
            display: flex
            flex-direction: column

            padding: 1rem
            gap: 1rem
            box-sizing: border-box

            .note
                display: flex
                flex-direction: column

                gap: .5rem
                padding: .5rem

                box-sizing: border-box
                background: white
                border-left: 6px solid var(--accent)
                border-radius: 0 6px 6px 0

                .top
                    @include main.mono-font
                    @include main.f-size-tiny

                    display: flex
                    justify-content: space-between

                    .informative
                        font-weight: 900
                        letter-spacing: .02em
                        text-transform: uppercase;

                    .date
                        font-weight: 500



                .title
                    @include main.f-size-very-small
                    font-weight: 900
                    padding-left: 1rem

                .content
                    @include main.f-size-very-small
                    padding-left: 1rem




    .generalInfo
        display: flex
        flex-direction: column
        grid-area: genInfo

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
                overflow: hidden
                background: rgba(0, 0, 0, .3)

                img
                    width: 100%
                    height: 100%
                    object-fit: cover

            .dataSide
                grid-area: data
                display: flex
                flex-direction: column

                gap: 1rem
                box-sizing: border-box
</style>