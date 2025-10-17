<script setup lang="ts">
import { useCssModule } from "vue";

const s = useCssModule()
const text = defineModel<string | number>({ default: ''})
const props = withDefaults(defineProps<{
    hint?: string
}>(),
{
    hint: '...',
})
</script>

<template>
<div :class="s.container">
    <textarea :class="s.text" :rows="10" :placeholder="hint" v-model="text"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    align-items: center
    background: white
    border: 1px solid rgba(0,0,0,.1)
    box-sizing: border-box

    .text
        all: unset
        @include main.font
        padding: 0 .5rem
        height: 100%
        width: 100%
        color: black
</style>