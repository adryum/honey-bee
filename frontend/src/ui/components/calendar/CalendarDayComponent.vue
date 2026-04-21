<script setup lang="ts">
import { computed, onMounted, ref, useCssModule, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import type { CalendarDayModel } from "@/core/stores/Models";
import CalendarDayInfoModal from "../modals/CalendarDayInfoModal.vue";
import type { ModalBaseModel } from "@/core/composables/useModalBase";

const s = useCssModule()
const props = defineProps<{
    selectedDate:     Date
    calendarId:       string
    otherCalendarIds: string[]
    day:              CalendarDayModel
}>()

const emits = defineEmits<{
    create: []
}>()

const isToday = computed(() => props.day.date.isToday())
const isThisMonth = computed(() => props.day.date.isThisMonth(props.selectedDate))
const isWeekend = computed(() => props.day.date.isWeekend())


const { width, height } = useWindowSize()
const container = ref<HTMLDivElement | null>()
const availableRows = ref(0)

const infoModal = ref<ModalBaseModel>()

// function onClick() {
//     infoModal.value.
//     showModal.value = !showModal.value
//     console.log("Clicked on close!");
    
// }

function calculatePossibleListItemCount() {
    if (!container.value) return

    const rect = container.value.getBoundingClientRect()

    const bottomHeight = 22

    const topHeight = 19 + 11

    var trueHeight = rect.height - bottomHeight - topHeight
    const itemHeight = 16

    availableRows.value = Math.floor(trueHeight / itemHeight)

    trueHeight -= availableRows.value * 3.2
    availableRows.value = Math.floor(trueHeight / itemHeight)

    // console.log(availableRows.value);
    // console.log(trueHeight);
}

watch([width, height], ([w, h]) => {
    calculatePossibleListItemCount()
})

onMounted(() => {
    calculatePossibleListItemCount()
})
</script>

<template>
<div 
    ref="container" 
    :class="[
        s.container, 
        isToday && s.today,
        isWeekend && s.weekend,
        !isThisMonth && s.notThisMonthDate
    ]"
    @click="infoModal?.open"
> 
    <div 
        :class="s.header"
    >
        <p 
            :class="s.dayLabel"
        >
            {{ day.date.getUTCDate() + (isToday ? " ( Today )" : "") }} 
        </p>

        <p 
            :class="s.right"
        >
            {{ day.events.length > availableRows ? `+${day.events.length - availableRows} tasks` : "" }} 
        </p>
    </div>
    
    <ul 
        :class="s.taskList"
    >
        <p
            v-for="event in day.events.slice(0, availableRows)"
            :class="[
                s.task,
                isToday && s.today,
            ]"
        >{{ event.title }}</p>
        
    </ul>
    <CalendarDayInfoModal
        ref="infoModal"
        :calendar-id="calendarId"
        :other-calendar-ids="otherCalendarIds"
        :day-model="day"
        @clickOutside="infoModal?.close"
        @close="infoModal?.close"
        @create="emits('create')"
    />
</div>
</template>

<style module lang='sass'>
.header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: .5rem

    font-family: var(--font-family)
    font-size: var(--font-size-small)
    font-weight: 500
    letter-spacing: .02em

    .dayLabel

    .right

.container
    position: relative
    display: flex
    flex-direction: column
    padding: 1rem
    box-sizing: border-box
    background: white

    transition: .1s
    border-radius: var(--border-radius-small)
    overflow: hidden

    &:hover
        z-index: 1
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.10)
        transform: translateY(-2px)
        // filter: brightness(.80)
        // color: var(--black) !important

        // background: green
        // transform: scale(1.01)

    .day
        font-size: var(--font-size-medium)
        font-weight: 500
        margin-bottom: .8rem
        letter-spacing: .02em

    .taskList
        all: unset
        position: relative
        z-index: 1
        display: flex
        flex-direction: column
        margin-top: auto
        gap: .2rem

        .button
            all: unset
            margin: 0
            padding: 0
            position: relative

            display: flex
            align-items: center
            justify-content: center
            width: 2rem
            height: 2rem
            min-width: 2rem
            min-height: 2rem
            max-height: 2rem
            max-width: 2rem


            background: beige
            border-radius: var(--border-radius-small)
            box-shadow: 0 1px 1px 0 var(--faint-border)

            .number
                position: absolute
                top: -.3rem
                right: -.1rem
                line-height: 1rem
                font-weight: 500
            

        .task
            all: unset
            position: relative

            align-items: center


            font-family: var(--font-family)
            font-size: var(--font-size-small)
            font-weight: 600
            letter-spacing: .02em

            height: 1.5rem
            line-height: 1.5rem

            padding: 0 .5rem 
            box-sizing: border-box
            // border-radius: var(--border-radius-tiny)
            
            color: var(--black)
            // background: var(--orange)

            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis


            border-left: 2px solid var(--orange)
            &.today
                background: white !important
                color: var(--black)
            // background: var(--secondary)
            // font-size: var(--font-size-small)

    .hint
        margin-top: .5rem

.thisMonthDate

.notThisMonthDate
    opacity: .6

.today
    background: var(--orange) !important
    // border: 5px solid rgba(20, 180, 20, .2)

.weekend
    background: var(--secondary)
    // #E4E2DB
    // color: white
</style>