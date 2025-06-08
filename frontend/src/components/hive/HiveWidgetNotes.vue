<script setup>
import { useCssModule } from 'vue';
import Widget from '../Widget.vue';
import WidgetParagraph from '../WidgetParagraph.vue';
import Note from '../Note.vue';

const props = defineProps({
    location: {
        type: String,
        default: 'NO LOCATION'
    },
    description: {
        type: String,
        default: 'NO Description'
    } 
})

const s = useCssModule()
</script>

<template>
<Widget>
    <template #header>
        <h1>Notes</h1>
    </template>

    <template #body>
        <div :class="s.grid">
            <slot></slot>
        </div>
    </template>
</Widget>
</template>

<style module lang='sass'>
.grid
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    gap: 1rem

    box-sizing: border-box
    padding: 1rem
    // overflow-y: scroll
</style>