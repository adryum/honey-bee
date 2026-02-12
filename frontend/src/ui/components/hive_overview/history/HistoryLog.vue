<script setup lang="ts">
import { useCssModule } from 'vue';
import { useI18n } from 'vue-i18n';
import IconCubeButton from '../../input/buttons/IconCubeButton.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import HistoryLogEntry from './HistoryLogEntry.vue';
import type { HiveModelDB } from '@/core/stores/Models';

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    hive: HiveModelDB
}>()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label :class="s.label">{{ t("hiveOverview.actionHistory") }}</label>
        <div :class="s.buttons">
            <IconCubeButton :class="s.button" :svg="SVG.Confirm"/>
            <IconCubeButton :class="s.button" :svg="SVG.Confirm"/>
        </div>
    </div>
    <hr :style="{
        position: 'relative',
        height: '1px',
        border: 'none',
        background: 'rgba(0,0,0,.2)',
        margin: 0
    }">
    <div :class="s.fader"></div>
    <hr :class="s.timelapseLine">
    <div :class="s.body">
        <HistoryLogEntry
            v-for="entry in hive.history" 
            :key="entry.id" 
            :entry="entry"
        />
    </div>
</div>
</template>

<style module lang='sass'>
.timelapseLine
    position: absolute
    left: calc(2.5rem - 1px)
    top: 2.8rem
    bottom: 0

    width: 2px
    background: var(--yellow)
    border: none

.container
    position: relative
    display: flex
    flex-direction: column
    overflow: hidden
    gap: .25rem
    background: var(--white)
    padding: .25rem
    box-sizing: border-box
    border-radius: var(--border-radius-small)
    box-shadow: 0 0 1px 0 var(--faint-border)
    font-family: var(--font-family)

    .header
        display: flex
        align-items: center
        width: 100%
        min-height: 2rem
        max-height: 2rem
        height: 2rem
        box-sizing: border-box
        border-radius: var(--border-radius-small)

        .label
            font-size: var(--font-size-medium)
            line-height: 1rem
            padding-left: .5rem

        .buttons
            margin-left: auto
            display: flex
            align-items: center
            gap: .2rem
            height: 100%

            .button
                height: 100%
    .body
        grid-area: data
        display: flex
        flex-direction: column

        gap: .5rem
        margin: .25rem

        box-sizing: border-box
        overflow-y: auto
</style>