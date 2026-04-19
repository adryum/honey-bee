<script setup lang="ts">
import { useCssModule } from 'vue';
import { useI18n } from 'vue-i18n';
import HistoryLogEntry from './HistoryLogEntry.vue';
import type { HistoryEntryDB } from '@/core/stores/Models';

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    entries: HistoryEntryDB[]
}>()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <label :class="s.label">{{ t("hiveOverview.actionHistory") }}</label>
        <!-- <div :class="s.buttons">
            <IconCubeButton :class="s.button" :icon="SVG.Checkmark"/>
            <IconCubeButton :class="s.button" :icon="SVG.Checkmark"/>
        </div> -->
    </div>
    <hr :style="{
        position: 'relative',
        minHeight: '1px',
        border: 'none',
        background: 'rgba(0,0,0,.2)',
        margin: 0
    }">
    <div :class="s.fader"></div>
    <hr :class="s.timelapseLine">
    <div :class="s.body">
        <HistoryLogEntry
            v-for="entry in entries" 
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
    top: 3.3rem
    bottom: 0

    width: 2px
    background: rgba(0,0,0,.2)
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
    min-height: 0

    .header
        display: flex
        align-items: center
        width: 100%
        min-height: 2.5rem
        max-height: 2.5rem
        height: 2.5rem
        box-sizing: border-box
        border-radius: var(--border-radius-small)

        .label
            font-size: var(--font-size-medium)
            font-weight: 500
            letter-spacing: .02em
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

        gap: 1.5rem
        margin: .25rem

        box-sizing: border-box
        overflow-y: auto
</style>