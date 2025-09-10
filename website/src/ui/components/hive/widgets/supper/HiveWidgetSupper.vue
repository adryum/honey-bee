<script setup>
import { useCssModule, useSlots } from 'vue';
import Widget from '@/components/Widget.vue';

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
        <h1>Suppers</h1>
    </template>

    <template #body>
        <slot :class="s.column"></slot>
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