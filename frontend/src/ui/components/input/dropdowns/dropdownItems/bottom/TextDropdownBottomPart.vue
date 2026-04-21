<script setup lang="ts">
import type { DropdownModel } from "@/core/models/Models";
import { useCssModule } from "vue";

const s = useCssModule()
const props = defineProps<{
    dropdown: DropdownModel
    text: string
}>()
</script>

<template>
<li 
    :class="s.item"
    @click="dropdown.isShown.value = false"
>
    <p :class="s.text">
        {{ text }}
    </p>
</li>
</template>

<style module lang='sass'>
.item
    display:         flex
    align-items:     center
    margin:          0
    padding:         0
    text-decoration: none
    min-height:      2rem
    max-height:      2rem
    height:          2rem
    padding:         0 .9rem
    cursor:          pointer

    font-family: var(--font-family)

    transition: .1s

    border-radius: var(--border-radius-tiny)

    .text
        color: platinum
        opacity: .8
        letter-spacing: .02em
        font-weight: 400
        font-size: var(--font-size-small)

    &:hover
        background: var(--secondary)
</style>