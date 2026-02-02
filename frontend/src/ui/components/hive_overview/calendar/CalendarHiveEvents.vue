<script setup lang="ts">
import { useCssModule } from "vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import CalendarHiveEventEntry from './CalendarHiveEventEntry.vue'
import { useI18n } from "vue-i18n";
import { ScreenSize, useScreenSize } from "@/core/ScreenSizes";
import { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
const { t } = useI18n()
const { screenSize, biggerThan } = useScreenSize()

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>{{ t("hiveOverview.calendarEvents") }}</h1>

        <div :class="s.navigator">
            <IconCubeButton :class="[s.iconButton, s.left]" :svg="SVG.Confirm"/>
            <p>current date 2025.</p>
            <IconCubeButton :class="s.iconButton" :svg="SVG.Confirm"/>
            <IconCubeButton :class="s.iconButton" :svg="SVG.Confirm"/>
        </div>
    </div>
    <div :class="s.body">
        <div :class="s.entry">
            <div :class="s.title">
                <div :class="s.date">
                    <h1 :class="s.dateNumber">25</h1>
                    <h2 :class="s.dateMonth"> sep.</h2>
                </div>
                <p :class="s.today">Today</p>
                <p :class="s.eventCount">3 e.</p>
            </div>
            <div :class="s.tasks">
                <!-- <CalendarHiveEventEntry />
                <CalendarHiveEventEntry />
                <CalendarHiveEventEntry />
                <CalendarHiveEventEntry />
                <CalendarHiveEventEntry /> -->
            </div>
        </div>
        <div :class="s.entry">
            <div :class="s.title">
                <div :class="s.date">
                    <h1 :class="s.dateNumber">25</h1>
                    <h2 :class="s.dateMonth"> sep.</h2>
                </div>
                <p :class="s.today">Today</p>
                <p :class="s.eventCount">3 e.</p>
            </div>
            <div :class="s.tasks">
                <CalendarHiveEventEntry />
            </div>
        </div>
        <div v-if="biggerThan(ScreenSize.XXL)" :class="s.entry">
            <div :class="s.title">
                <div :class="s.date">
                    <h1 :class="s.dateNumber">25</h1>
                    <h2 :class="s.dateMonth"> sep.</h2>
                </div>
                <p :class="s.today">Today</p>
                <p :class="s.eventCount">3 e.</p>
            </div>
            <div :class="s.tasks">
            </div>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main

.container
    display: flex
    flex-direction: column
    overflow: hidden

    .header
        @include main.button-font
        position: relative
        display: flex
        align-items: center
        width: 100%
        min-height: 2.5rem
        max-height: 2.5rem
        padding: .25rem 0.5rem
        box-sizing: border-box
        background: white
        border-top: 4px solid var(--light-gray)
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)

        .navigator
            margin-left: auto
            display: flex
            align-items: center
            gap: .2rem
            height: 100%

            .iconButton
                height: 100%

                &.left
                    rotate: 180deg 0 0 1

    .body
        @include main.font
        flex: 1
        grid-area: data
        display: flex
        align-items: flex-end

        max-height: calc(100% - 2.5rem)

        padding-top: .5rem
        gap: 1rem
        box-sizing: border-box
        overflow: auto

        .entry
            flex: 1
            display: flex
            flex-direction: column
            gap: .5rem
            border-radius: 3px
            overflow: hidden
            box-sizing: border-box

            height: 100%

            .title
                display: flex
                justify-content: space-between
                align-items: flex-end
                line-height: 14px
                
                box-sizing: border-box
                padding: .5rem 1rem
                border-radius: 3px

                @include main.f-size-very-small
                font-weight: 900
                text-transform: uppercase
                background-color: white

                .today
                    @include main.f-size-very-small
                    font-weight: 900
                    color: var(--light-gray)

                .date
                    .dateNumber
                        @include main.f-size-small
                        font-weight: 700
                    .dateMonth
                        @include main.f-size-very-small

            
            .tasks
                display: flex
                flex-direction: column
                gap: .5rem
                height: 100%
                overflow: auto

                
</style>