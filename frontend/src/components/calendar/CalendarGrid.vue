<script setup lang="ts">
import { onMounted, reactive, ref, useCssModule } from "vue";
import { getMonthCalendar } from "../../core/Calendar";

const s = useCssModule()
const month = ref<number>(8)
const monthDays = reactive(getMonthCalendar(2025, month.value).flat())

const tasks = ['one', 'two', 'three', 'fout', 'fiver', 'sixer', 'sevener']
const grid = ref<HTMLDivElement | null>()
const availableRows = ref(0)
onMounted(() => {
    if (!grid.value) return
    const rect= grid.value.getBoundingClientRect()
    // grid-template-rows: repeat(6, calc( ((100% - 1.5rem) / 6) - 1px ) )
    var trueHeight = (((rect.height - 20) / 6) - 1) - 16 - 19 - 8 - 14 - 32
    const itemHeight = 16
    console.log(trueHeight);
    

    availableRows.value = Math.floor(trueHeight / itemHeight)

    trueHeight -= availableRows.value * 3.1
    console.log(availableRows.value);
    console.log(trueHeight);
    availableRows.value = Math.floor(trueHeight / itemHeight)
    
})


</script>

<template>
<div :class="s.container">
    <div :class="s.days">
        <p>Monday</p>
        <p>Monday</p>
        <p>Monday</p>
        <p>Monday</p>
        <p>Monday</p>
        <p>Monday</p>
        <p>Monday</p>
    </div>
    <div ref="grid" :class="s.grid">
        <div v-for="day in monthDays" 
            :class="[s.date, month === day.month ? s.thisMonthDate : s.notThisMonthDate]">
            <p :class="s.day">{{ day.day }}</p>
            <ul :class="s.taskList">
                <li v-for="i in availableRows" :class="s.task">
                    {{ tasks[i - 1] }}
                </li>
                
            </ul>
            <p :class="s.hint" v-if="tasks.length > 3">{{ tasks.length - availableRows }} more</p>

        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    flex-direction: column
    gap: 1px
    height: calc( 100vh - 6rem )
    .days
        display: flex
        width: 100%
        min-height: 1.5rem
        gap: 1px

        > *
            display: flex
            align-items: center
            justify-content: center
            flex: 1
            background: var(--accent)

    .grid
        display: grid
        grid-template-columns: repeat(7, 1fr)
        grid-template-rows: repeat(6, calc( (100% / 6) - 1px ) )
        gap: 1px
        height: 100%

        .date
            display: flex
            flex-direction: column
            padding: 1rem
            box-sizing: border-box
            background: var(--accent)
            transition: .1s

            overflow: hidden

            .hint
                @include main.f-size-tiny
                margin-top: auto


            .taskList
                all: unset
                display: flex
                flex-direction: column
                gap: .2rem
                @include main.f-size-tiny


                .task
                    all: unset
                    
                    padding: .2rem .5rem 
                    background: var(--base)
                    border-left: 4px solid rgba(0, 0, 0, .5)
                    box-sizing: border-box

            &:hover
                z-index: 1
                box-shadow: 0 0 10px rgba(0, 0, 0, .5)

            .day
                @include main.f-size-very-small
                font-weight: 600
                margin-bottom: 1rem

        .thisMonthDate

        .notThisMonthDate
            opacity: .8
            filter: brightness(80%)

           
</style>