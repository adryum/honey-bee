<script setup lang="ts">
import { computed, onMounted, reactive, ref, useCssModule, watch } from "vue";
import { Days, getMonthCalendar, type CalendarEntry } from "../../core/Calendar";
import { useWindowSize } from "@vueuse/core";

const s = useCssModule()
const props = withDefaults(defineProps<{
    thisDate: CalendarEntry,
    currentDate: CalendarEntry
    today: CalendarEntry
}>(), {

})

const { width, height } = useWindowSize()
const tasks = ['one', 'two', 'three', 'fout', 'fiver', 'sixer', 'sevener']
const container = ref<HTMLDivElement | null>()
const availableRows = ref(0)

function calculatePossibleListItemCount() {
    if (!container.value) return

    const rect = container.value.getBoundingClientRect()

    const bottomHeight = 22
    const padding = 32
    const topHeight = 19 + 11

    var trueHeight = rect.height - bottomHeight - padding - topHeight
    const itemHeight = 20

    availableRows.value = Math.floor(trueHeight / itemHeight)

    trueHeight -= availableRows.value * 3.2
    availableRows.value = Math.floor(trueHeight / itemHeight)

    console.log(availableRows.value);
    console.log(trueHeight);
}

watch([width, height], ([w, h]) => {
    calculatePossibleListItemCount()
})

onMounted(() => {
    calculatePossibleListItemCount()
})

const isToday = computed(() => {
    return props.today.day === props.thisDate.day 
    && props.today.month === props.thisDate.month
    && props.today.year === props.thisDate.year
})
const isWeekend = computed(() => {
    return props.thisDate.dayName === Days.Sunday
    || props.thisDate.dayName === Days.Saturday
})
</script>

<template>
<div ref="container" 
    :class="[
        s.container, 
        isToday ? s.today : '',
        isWeekend ? s.weekend : '',
        thisDate.month === currentDate.month ? s.thisMonthDate : s.notThisMonthDate
    ]">
    <p :class="s.day">{{ thisDate.day }}</p>
    <ul :class="s.taskList">
        <li v-for="i in availableRows" :class="s.task">
            {{ tasks[i - 1] }}
        </li>
    </ul>
    <p :class="s.hint" v-if="tasks.length > availableRows">{{ tasks.length - availableRows }} more</p>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    padding: 1rem
    box-sizing: border-box
    background: var(--accent)

    transition: .1s
    overflow: hidden

    &:hover
        z-index: 1
        box-shadow: 0 0 10px rgba(0, 0, 0, .5)

    .day
        @include main.f-size-very-small
        font-weight: 600
        margin-bottom: .8rem

    .taskList
        all: unset
        display: flex
        flex-direction: column
        margin-top: auto
        gap: .2rem
        @include main.f-size-tiny

        .task
            all: unset
            
            padding: .2rem .5rem 
            background: var(--base)
            border-left: 4px solid rgba(0, 0, 0, .5)
            box-sizing: border-box

    .hint
        @include main.f-size-tiny
        margin-top: .5rem

.thisMonthDate

.notThisMonthDate
    opacity: .8
    filter: brightness(80%)

.today
    background: var(--light)

.weekend
    background: main.$atumn-dark


</style>