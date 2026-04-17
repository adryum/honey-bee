<script setup lang="ts">
import { computed, reactive, toRef, useCssModule} from "vue"
import { useCalendarQuery } from "@/core/composables/useCalendar";
import { CalendarDate } from "@/core/Calendar";
import type { HiveModelDB } from "@/core/stores/Models";
import CalendarGrid from "../calendar/CalendarGrid.vue";

const s = useCssModule()
const props = defineProps<{
    hive: HiveModelDB
}>()

const calendarIds = computed(() => props.hive.calendarId ? [props.hive.calendarId] : [])
const { events } = useCalendarQuery({
    calendarIds: calendarIds
})
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
            :calendarIds="calendarIds"
            :events="events"
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