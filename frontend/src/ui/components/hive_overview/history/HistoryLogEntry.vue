<script setup lang="ts">
import { computed, useCssModule } from "vue";
import Icon from "../../Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { HistoryEntryDB } from "@/core/stores/Models";
import { formatDateWithOrdinal } from "@/core/utils/Utils";
import { HistoryEntryType } from "@/core/DatabaseEnums";

const s = useCssModule()
const props = defineProps<{
    entry: HistoryEntryDB
}>()

const svg = computed(() => {
    switch (props.entry.type) {
        case HistoryEntryType.CALENDAR:   return SVG.Calendar;
        case HistoryEntryType.EDIT:       return SVG.Pencil;
        case HistoryEntryType.INSPECTION: return SVG.Search;
        case HistoryEntryType.NOTE:       return SVG.Clipboard;
             default:                     return SVG.Info;
    }
})
</script>

<template>
<div :class="s.container">
    <div
        :class="s.decorationPoint"
    >
        <Icon
            :icon="svg"
            :type="IconType.SMALL"
        />
    </div>

    <div :class="s.header">
        <h2 :class="s.time">{{ entry.text }}</h2>
        <div :class="s.userInfo">
            <img
                alt="user image"
                :class="s.image" 
                :src="entry.userImage" 
            >
            <h1 :class="s.name">{{ entry.username }}</h1>
        </div>
    </div>
    <p :class="s.content">{{ formatDateWithOrdinal(entry.creationDate, true) }} </p>
</div>
</template>

<style module lang='sass'>

.userInfo
    display: flex 
    align-items: center
    gap: .5rem

.image
    width: 1.5rem 
    height: 1.5rem 
    border-radius: 50px
    object-fit: cover
.decorationPoint
    position: absolute
    display: flex
    justify-content: center
    align-items: center

    top: .2rem
    left: 1.1rem
    // align-self: center
    min-width: 1.75rem
    min-height: 1.75rem
    max-width: 1.75rem
    max-height: 1.75rem
    height: 2rem
    width: 2rem
    border-radius: 50px
    background: var(--black)
    color: white

.header
    display: flex
    // flex-direction: column
    gap: 1rem
    
    // justify-content: center
    padding-top: .1rem

    margin-left: 3.5rem

    height: 1.5rem
    align-items: center

    border-radius: 4px 0 0 4px

    font-size: var(--font-size-small)

    .time
        line-height: 1.5rem
        font-weight: 600
        font-size: var(--font-size-medium)

    .name
        font-weight: 400
        letter-spacing: 0.02em

.container
    position: relative
    display: inline-flex
    flex-direction: column
    padding: .25rem
    box-sizing: border-box
    border-radius: 50px

    gap: .25rem

    .content
        flex: 1
        margin-left: 3.5rem
        box-sizing: border-box
        
        font-weight: 400
        letter-spacing: 0.02em
        font-size: var(--font-size-small)

</style>