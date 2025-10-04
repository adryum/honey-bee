<script setup lang="ts">
import { useCssModule } from "vue";
import EventLogEntry from "./EventLogEntry.vue";
import EventLogTimeSeparator from './EventLogTimeSeparator.vue'
import { SVGImage, SVGRes } from "@/core/SVGLoader";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <h1>{{ t("hiveOverview.actionHistory") }}</h1>
        <div :class="s.buttons">
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.OpenWindow)"/>
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>
    </div>
    <div :class="s.body">
        <EventLogEntry/>
        <EventLogEntry/>
        <event-log-time-separator />
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
        <event-log-time-separator />
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
        <EventLogEntry/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    background: var(--surface)
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
        background: var(--surface)
        border-top: 4px solid var(--light)
        // border-bottom: 1px solid rgba(0, 0, 0, .1)
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)

        .buttons
            margin-left: auto
            display: flex
            align-items: center
            gap: .2rem
            height: 100%

            .button
                height: 100%
    .body
        flex: 1
        grid-area: data
        display: flex
        flex-direction: column

        padding: 1rem
        gap: .5rem
        box-sizing: border-box
        overflow: auto
</style>