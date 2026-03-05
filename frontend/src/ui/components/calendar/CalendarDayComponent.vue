<script setup lang="ts">
import { computed, onMounted, ref, useCssModule, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import Icon from "../Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { CalendarDayModel } from "@/core/stores/Models";
import CreateCalendarEventModal from "../modals/CreateCalendarEventModal.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    day: CalendarDayModel
}>(), {

})

const isToday = computed(() => {
    const date = props.day.date 
    return date.toDateString() === new Date().toDateString()
})
const isWeekend = computed(() => {
    const date = props.day.date 
    const day = date.getDay() 
    return day === 0 || day === 6
})
const isThisMonth = computed(() => {
    const date = props.day.date 
    return date.getMonth() === new Date().getMonth()
})

const { width, height } = useWindowSize()
const container = ref<HTMLDivElement | null>()
const availableRows = ref(0)

var showModal = ref(false)
function onClick() {
    showModal.value = !showModal.value
    console.log("Clicked on close!");
    
}

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
<div 
    ref="container" 
    :class="[
        s.container, 
        isToday && s.today,
        isWeekend && s.weekend,
        !isThisMonth && s.notThisMonthDate
    ]"
    @click="onClick"
> 
    <p 
        :class="s.dayLabel"
    >
        {{ day.date.getUTCDate() + (isToday ? " ( Today )" : "") }} 
    </p>
    <ul 
        :class="s.taskList"
    >
        <button 
            v-for="event in day.events"
            :class="s.button"
        >
            <Icon :class="s.icon" :type="IconType.SMALL" :svg="SVG.Dollar" />
            <p :class="s.number">2</p>
        </button>
        
    </ul>
    <CreateCalendarEventModal
        v-if="showModal"
        :day-model="day"
        @clickOutside="onClick"
        @close="onClick"
    />
</div>
</template>

<style module lang='sass'>
.dayLabel
    +bulletLabel
 
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
        box-shadow: 0 0 0 1px rgba(200,200,200,1)
        // background: green
        transform: scale(1.01)

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
            
            padding: .2rem .5rem 
            background: var(--gray)
            border-left: 4px solid rgba(0, 0, 0, .5)
            box-sizing: border-box

    .hint
        margin-top: .5rem

.thisMonthDate

.notThisMonthDate
    opacity: 0.6
    background: var(--light-gray)


.today
    background: var(--yellow)
    // border: 5px solid rgba(20, 180, 20, .2)

.weekend
    background: var(--faint-border)
</style>