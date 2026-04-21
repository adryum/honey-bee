<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import { useCssModule } from "vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";

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
    <IconTextButton
        :class="s.today"
        text="Today"
        :hideIcon="true"
        @click="emits('change', new Date())"
    />
    <IconCubeButton
        :icon="SVG.ArrowLeftSmall"
        @click="emits('change', selectedDate.previousMonth())"
    />
    <p
        :class="s.date"
    >
        {{ selectedDate.toLocaleString('default', { month: 'long' }) }} {{ selectedDate.getFullYear() }}
    </p>
    <IconCubeButton
        :icon="SVG.ArrowRightSmall"
        @click="emits('change', selectedDate.nextMonth())"
    />
</div>
</template>

<style module lang="sass">
.container
    display: flex
    align-items: center
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