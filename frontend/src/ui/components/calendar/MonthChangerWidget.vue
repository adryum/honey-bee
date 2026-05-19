<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import { useCssModule } from "vue";
import Icon from "../Icon.vue";

const s = useCssModule()
const props = defineProps<{
    selectedDate: Date
}>()

const emits = defineEmits<{
    change: [Date]
}>()
</script>

<template>
<div :class="s.container">
    <button
        :class="[
            s.button
        ]"
        @click="emits('change', new Date())"
    >Today</button>
    <button
        :class="[
            s.button
        ]"
        @click="emits('change', selectedDate.previousMonth())"
    >
        <Icon
            :icon="SVG.ArrowLeftSmall"
        />
    </button>
    
    <p
        :class="s.date"
    >
        {{ selectedDate.toLocaleString('default', { month: 'long' }) }} {{ selectedDate.getFullYear() }}
    </p>
    <button
        :class="[
            s.button
        ]"
        @click="emits('change', selectedDate.nextMonth())"
    >
        <Icon
            :icon="SVG.ArrowRightSmall"
        />
    </button>
</div>
</template>

<style module lang="sass">
.button
    border: none
    background: none
    display:    inline-flex

    font-weight: 500

    align-items: center

    gap:        .5rem
    height:     100%

    font-family: var(--font-family)
    font-size:   var(--font-size-small)

    box-sizing:    border-box
    padding: 0 1rem

    transition: .1s
    cursor: pointer

    &:hover
        background: var(--secondary)

    &.selected
        color: var(--black)
        font-weight: 900

.container
    display: flex
    align-items: center
    align-self: stretch
    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 500
    letter-spacing: .02em
    text-align: center

    .today
        margin-right: .5rem

    .date
        min-width: 10rem

</style>