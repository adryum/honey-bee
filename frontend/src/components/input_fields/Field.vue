<script setup lang="ts">
import { ref, useCssModule } from "vue";
import { motion } from 'motion-v';

const s = useCssModule()
const text = defineModel<string>({ default: ''})
const props = withDefaults(defineProps<{
    hint?: string
}>(),
{
    hint: '...',
})
</script>

<template>
<div :class="s.container">
    <input :class="s.text" :placeholder="hint" v-model="text"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    align-items: center
    background: white
    border-radius: 3px
    box-shadow: inset 0 -2px rgba(0,0,0, .3)
    box-sizing: border-box

    .text
        all: unset
        @include main.font
        padding: 0 .5rem
        height: 100%
        width: 100%
        color: black
</style>