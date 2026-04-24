<script setup lang="ts">
import { computed, ref, toRef, useCssModule } from "vue";
import Note from './Note.vue'
import { useFlexibleGrid } from "@/core/utils/others";
import { useNotes } from "@/core/composables/useNote";

const s = useCssModule()
const props = defineProps<{
    hiveId:     number
    searchText: string
}>()

const { notes } = useNotes({ 
    hiveId: toRef(() => props.hiveId) 
})

const filteredNotes = computed(() => {
    return notes.value?.filter(note => 
        note.title.toLowerCase().includes(props.searchText.toLowerCase()) ||
        note.content.toLowerCase().includes(props.searchText.toLowerCase())
    ) ?? []
})

const grid = ref()
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef: grid,
    itemMinWidthPx: 350,
    gapPx: 16
})
</script>

<template>
<div 
    ref="grid"
    :class="s.container"
    :style="gridStyle"
>
    <Note 
        v-for="note in filteredNotes"
        :key="note.id"
        :class="s.note"
        :note="note"
    />
</div>
</template>

<style module lang='sass'>
.note
    height: 15rem
.container
    border-radius: 2px
    align-content: start;

    overflow: auto
</style>