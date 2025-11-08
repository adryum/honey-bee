<script setup lang="ts">
import { reactive, useCssModule} from "vue"
import CalendarGrid from '../components/calendar/CalendarGrid.vue';
import CalendarToolBarVertical from "../components/calendar/CalendarToolBarVertical.vue";
import { CalendarDate } from "../../core/Calendar";

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
    <CalendarGrid :searchDate="searchDate" :class="s.calendar" />
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors

.calendar
    flex: 1
</style>