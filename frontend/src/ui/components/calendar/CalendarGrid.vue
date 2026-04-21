<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import { Days } from "../../../core/Calendar";
import CalendarDayComponent from "./CalendarDayComponent.vue";
import type { CalendarDayModel, CalendarEventDB } from "@/core/stores/Models";

const s = useCssModule()
const props = withDefaults(defineProps<{
    calendarId:       string
    otherCalendarIDs: string[]
    events:           CalendarEventDB[]
    lookedAtDate:     Date
    isMacdonalds:     boolean
    allowEventCreation: boolean
}>(), {
    lookedAtDate: () => new Date()
})

const emits = defineEmits<{
    create: []
}>()

const macdonadsWeekDays = [
    Days.Sunday,
    Days.Monday,
    Days.Tuesday,
    Days.Wednesday,
    Days.Thursday,
    Days.Friday,
    Days.Saturday,
]
const normalWeekDays = [
    Days.Monday,
    Days.Tuesday,
    Days.Wednesday,
    Days.Thursday,
    Days.Friday,
    Days.Saturday,
    Days.Sunday,
]
const weekDays = computed(() => {
    return props.isMacdonalds ? macdonadsWeekDays : normalWeekDays
})

const currentMonthDays = computed((): CalendarDayModel[] => {
    const date = props.lookedAtDate
    // const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const calendarDays = getCalendarMonthWithDayPadding(year, month, !props.isMacdonalds) 

    return calendarDays.map<CalendarDayModel>(date=> ({
        date:   date,
        events: props.events.filter(event => date.in(event.start, event.end)) || []
    })) 
})



// function getDatesInMonth(
//     year: number, 
//     month: number
// ) {
//     const dates = [];
//     // Start at the 1st of the month
//     const date = new Date(year, month, 1, 12, 0 ,0);

//     // While we are still in the same month...
//     while (date.getMonth() === month) {
//         dates.push(new Date(date)); // Push a copy of the current date
//         date.setDate(date.getDate() + 1); // Move to the next day
//     }

//     return dates;
// }

function getCalendarMonthWithDayPadding(
    year: number, 
    month: number, 
    startOnMonday: boolean = false
) {
  const dates = [];
  
  // 1. Get the first day of the month (noon to avoid TZ issues)
  const firstDayOfMonth = new Date(year, month, 1, 12, 0, 0);
  
  // 2. Calculate the "Back-shift"
  // .getDay() is 0 (Sun) to 6 (Sat)
  const dayOfWeek = firstDayOfMonth.getDay(); 
  
  let diff;
  if (startOnMonday) {
    // European: Mon=0, Tue=1 ... Sun=6
    diff = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
  } else {
    // American: Sun=0, Mon=1 ... Sat=6
    diff = dayOfWeek;
  }

  // 3. Set our start point
  const current = new Date(firstDayOfMonth);
  current.setDate(current.getDate() - diff);

  // 4. Always grab exactly 42 days (6 rows * 7 columns)
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
</script>

<template>
<div :class="s.container">
    <div :class="s.days">
        <p 
            v-for="day in weekDays"
            :class="s.day"
            :style="day === 'Saturday' || day === 'Sunday' ? { background: 'var(--secondary)' } : { background: 'var(--white)' }"
        >
            {{ day }}
        </p>
    </div>
    <div ref="grid" :class="s.grid">
        <CalendarDayComponent 
            v-for="day in currentMonthDays"
            :selectedDate="lookedAtDate"
            :calendarId="calendarId"
            :otherCalendarIds="otherCalendarIDs"
            :day="day"
            :allowEventCreation="allowEventCreation"
            @create="emits('create')"
        />
    </div>
</div>
</template>

<style module lang='sass'>
 
.container
    display: flex
    flex-direction: column
    gap: 3px
    height: calc( 100vh - 6rem )
    
    .days
        display: flex
        width: 100%
        min-height: 2rem
        gap: 1px

        font-family: var(--font-family)
        font-size: var(--font-size-medium)
        font-weight: 500
        letter-spacing: .02em

        .day
            display: flex
            align-items: center
            justify-content: center
            flex: 1
            color: var(--black)
            background: var(--secondary)
            border-radius: var(--border-radius-tiny)


    .grid
        display: grid
        grid-template-columns: repeat(7, 1fr)
        grid-template-rows: repeat(6, calc( (100% / 6) - 1px * .83) )
        gap: 1px
        height: 100%
        isolation: isolate
</style>