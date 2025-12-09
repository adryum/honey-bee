<script setup lang="ts">
import { SVGImage, SVGRes } from '@/core/SVGLoader';
import { useCssModule } from 'vue';
import { useI18n } from 'vue-i18n';
import IconCubeButton from '../../input/buttons/IconCubeButton.vue';
import EventLogEntry from '@/ui/components/hive_overview/event_logs/EventLogEntry.vue';
import EventLogTimeSeparator from '@/ui/components/hive_overview/event_logs/EventLogTimeSeparator.vue';

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
        <EventLogTimeSeparator />
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
        border-radius: 2px
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

        padding-top: .5rem
        gap: .5rem
        box-sizing: border-box
        overflow: auto
</style>