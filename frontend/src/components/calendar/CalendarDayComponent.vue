<script setup lang="ts">
import { computed, onMounted, ref, useCssModule, watch } from "vue";
import { CalendarDate } from "../../core/Calendar";
import { useWindowSize } from "@vueuse/core";

const s = useCssModule()
const props = withDefaults(defineProps<{
    thisDate: CalendarDate,
    searchDate: CalendarDate
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
</script>

<template>
<div ref="container" 
    :class="[
        s.container, 
        thisDate.isToday() ? s.today : '',
        thisDate.isWeekend() && thisDate.isThisMonth(searchDate.month ) ? s.weekend : '',
        thisDate.isThisMonth(searchDate.month ) ? s.thisMonthDate : s.notThisMonthDate
    ]"> 
    <p :class="s.day">{{ thisDate.day }}{{ thisDate.isToday() ? " Today" : "" }} </p>
    <ul :class="s.taskList">
        <li v-for="i in availableRows" :class="s.task">
            {{ tasks[i - 1] }}
        </li>
    </ul>
    <p :class="s.hint" v-if="tasks.length > availableRows">{{ tasks.length - availableRows }} more</p>

    <div v-if="!thisDate.isThisMonth(searchDate.month)" :class="s.patern"></div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    position: relative
    display: flex
    flex-direction: column
    padding: 1rem
    box-sizing: border-box
    background: var(--light)

    transition: .1s
    overflow: hidden

    .patern
        z-index: auto
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%

        opacity: 0.6
        background: repeating-linear-gradient( -45deg, var(--base) 1px, var(--base) 5px, transparent 5px, transparent 35px )



    &:hover
        z-index: 1
        box-shadow: 0 0 10px rgba(0, 0, 0, .5)

    .day
        @include main.f-size-very-small
        font-weight: 600
        margin-bottom: .8rem

    .taskList
        all: unset
        position: relative
        z-index: 1
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
    opacity: 0.3
    background: var(--accent)

.today
    background: var(--light)
    border: 5px solid rgba(20, 180, 20, .8)

.weekend
    background: var(--accent)
</style>