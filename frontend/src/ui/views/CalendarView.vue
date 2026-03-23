<script setup lang="ts">
import { reactive, useCssModule} from "vue"
import CalendarGrid from '../components/calendar/CalendarGrid.vue';
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
    <div
        :class="s.container"
    >
        <!-- <ToolBar 
            label="Calendar"
        /> -->
        <CalendarGrid 
            :class="s.calendar" 
            :events="[]"
            :looked-at-date="new Date()"
            :is-macdonalds="false"
        />
    </div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors

.container
    padding: 1rem
    box-sizing: border-box

    display: flex
    flex-direction: column
    gap: 1rem
    width: 100%

.calendar
    flex: 1
</style>