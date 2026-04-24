<script setup lang="ts">
import { computed, useCssModule} from "vue"
import { useCalendarQuery } from "@/core/composables/useCalendar";
import { CalendarDate } from "@/core/Calendar";
import type { HiveModelDB } from "@/core/stores/Models";
import CalendarGrid from "@/ui/components/calendar/CalendarGrid.vue";
import { useHiveHistoryMutations } from "@/core/composables/useHiveHistory";
import { HistoryEntryType } from "@/core/DatabaseEnums";

const s = useCssModule()
const props = defineProps<{
    hive: HiveModelDB
    selectedDate: Date
}>()

const { create } = useHiveHistoryMutations()
const calendarIds = computed(() => {
    console.log(props.hive.calendarId ? [props.hive.calendarId] : []);
    return props.hive.calendarId ? [props.hive.calendarId] : []
    
})
const { events } = useCalendarQuery({
    calendarIds: calendarIds,
    month: computed(() => props.selectedDate.getMonth() + 1),
    year: computed(() => props.selectedDate.getFullYear())
})

const today: CalendarDate = new CalendarDate(
    props.selectedDate.getFullYear(),
    props.selectedDate.getMonth() + 1,
    props.selectedDate.getDate(),
)

function onCreateEvent() {
    create({
        hiveId: props.hive.id,
        text: "Created calendar task",
        type: HistoryEntryType.CALENDAR
    })
}
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
            :calendar-id="hive.calendarId" 
            :otherCalendarIDs="calendarIds"
            :events="events ?? []"
            :looked-at-date="selectedDate"
            :is-macdonalds="false"
            :allowEventCreation="true"
            @create="onCreateEvent"
        />
    </div>
</template>

<style module lang='sass'>

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