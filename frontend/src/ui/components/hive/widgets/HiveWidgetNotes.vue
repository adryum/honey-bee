<script setup>
import { useCssModule } from 'vue';
import Widget from '@/components/Widget.vue';
import Note from '@/components/Note.vue';

const props = defineProps({
    notes: Array
})

const s = useCssModule()
</script>

<template>
<Widget>
    <template #header>
        <h1>Notes</h1>
    </template>

    <template #body>
        <div v-if="notes.length" :class="s.column">
            <Note v-for="note in notes" :note="note"/>
        </div>
    </template>
</Widget>
</template>

<style module lang='sass'>
.column
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    gap: 1rem

    box-sizing: border-box
    padding: 1rem
    // overflow-y: scroll
</style>