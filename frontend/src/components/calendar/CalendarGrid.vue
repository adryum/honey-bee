<script setup lang="ts">
import { reactive, ref, useCssModule } from "vue";
import { Days, getMonthCalendar, type CalendarEntry } from "../../core/Calendar";
import CalendarDate from "./CalendarDate.vue";

const s = useCssModule()
const date = new Date()
const selectedDate = ref<CalendarEntry>({
    year:  2025,
    month: 8,
    day: 23,
    dayName: 'asdasda'
})
const today: CalendarEntry = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    dayName: ''
}
const monthDays = reactive(getMonthCalendar(selectedDate.value.year, selectedDate.value.month).flat())
</script>

<template>
<div :class="s.container">
    <div :class="s.days">
        <p v-for="day in Days">{{ day }}</p>
    </div>
    <div ref="grid" :class="s.grid">
        <CalendarDate v-for="day in monthDays"
            :currentDate="selectedDate"
            :this-date="day"
            :today="today"
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