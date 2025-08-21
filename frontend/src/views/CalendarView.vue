<script setup lang="ts">
import { reactive, useCssModule} from "vue"
import CalendarGrid from '../components/calendar/CalendarGrid.vue';
import CalendarToolBarVertical from "../components/calendar/CalendarToolBarVertical.vue";
import { CalendarDate } from "../core/Calendar";

const s = useCssModule()
const date = new Date()
const today: CalendarDate = new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
)
const searchDate = reactive<CalendarDate>(today.copy())
console.log(today);
</script>

<template>
    <div :class="s.container">
        <CalendarGrid :searchDate="searchDate" :class="s.calendar" />
        <CalendarToolBarVertical :today="today" :searchable-date="searchDate" :class="s.calendarBar"/>
    </div>
</template>

<style module lang='sass'>
@use '../assets/_colors.sass' as colors
.container
    display: flex

    padding: 1rem
    gap: 1rem
    height: 100%
    box-sizing: border-box

    .calendar
        flex: 7


    .calendarBar
        flex: 2
</style>