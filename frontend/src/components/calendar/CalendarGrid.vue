<script setup lang="ts">
import { computed, useCssModule } from "vue";
import { CalendarDate, Days, getMonthCalendar } from "../../core/Calendar";
import CalendarDayComponent from "./CalendarDayComponent.vue";

const s = useCssModule()
const props = defineProps<{
    searchDate: CalendarDate
}>()

const currentCalendar = computed(() => {
    return getMonthCalendar(props.searchDate.year, props.searchDate.getHumanMonth()).flat()
})
</script>

<template>
<div :class="s.container">
    <div :class="s.days">
        <p v-for="day in Days">{{ day }}</p>
    </div>
    <div ref="grid" :class="s.grid">
        <CalendarDayComponent v-for="day in currentCalendar"
            :searchDate="searchDate"
            :this-date="day"
        />
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    flex-direction: column
    gap: 1px
    height: calc( 100vh - 6rem )
    
    .days
        display: flex
        width: 100%
        min-height: 1.5rem
        gap: 1px

        > *
            display: flex
            align-items: center
            justify-content: center
            flex: 1
            background: var(--accent)

    .grid
        display: grid
        grid-template-columns: repeat(7, 1fr)
        grid-template-rows: repeat(6, calc( (100% / 6) - 1px * .83) )
        gap: 1px
        height: 100%
</style>