<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import Note from '../hive_overview/notes/Note.vue'
import { useFlexibleGrid } from "@/core/utils/others";
import { useNoteStore } from "@/core/stores/NoteStore";
import { storeToRefs } from "pinia";
import { useHiveStore } from "@/core/stores/HiveStore";

const s = useCssModule()
const props = defineProps<{
    searchText: string
}>()

const noteStore = useNoteStore()
const { notes } = storeToRefs(noteStore)
const { selectedHive } = storeToRefs(useHiveStore())
const hiveNotes = computed(() => {
    return notes.value.filter(note => note.hiveId === selectedHive.value!.id)
})
const filteredNotes = computed(() => {
    console.log("search: ", props.searchText);
    return hiveNotes.value.filter(note => 
        note.title.toLowerCase().includes(props.searchText.toLowerCase()) ||
        note.content.toLowerCase().includes(props.searchText.toLowerCase())
    )
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