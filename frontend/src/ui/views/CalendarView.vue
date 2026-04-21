<script setup lang="ts">
import { computed, reactive, ref, useCssModule} from "vue"
import CalendarGrid from '../components/calendar/CalendarGrid.vue';
import ToolBar from "../components/ToolBar.vue";
import ModularDropdown from "../components/input/dropdowns/ModularDropdown.vue";
import Icon from "../components/Icon.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useApiariesQuery, useApiaryQuery } from "@/core/composables/useApiary";
import IconCubeButton from "../components/input/buttons/IconCubeButton.vue";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import { useCalendarQuery } from "@/core/composables/useCalendar";
import MonthChangerWidget from "../components/calendar/MonthChangerWidget.vue";

const s = useCssModule()
const selectedApiary = ref<{id: number, name: string }>({ id: -1, name: "Selected"})
const selectedDate = ref(new Date().nextMonth().previousMonth())

const { apiaries } = useApiariesQuery()

const { hives } = useApiaryQuery({
    id:             computed(() => selectedApiary.value.id),
    getApiaryHives: true
})

const { events } = useCalendarQuery({
    calendarIds: computed(() => hives.value?.map(item => item.calendarId) ?? []),
    month: computed(() =>  selectedDate.value.getMonth() + 1),
    year: computed(() =>  selectedDate.value.getFullYear())
})
</script>

<template>
    <div
        :class="s.container"
    >
        <ToolBar 
            label="General calendar"
        >
            <MonthChangerWidget
                :selectedDate="selectedDate"
                @change="date => selectedDate = date"
            />
            <ModularDropdown>
                <template #head="{ dropdown }">
                    <div 
                        :class="[
                            s.header,
                            dropdown.isShown.value && s.open
                        ]"
                        @click="dropdown.isShown.value = !dropdown.isShown.value"
                    >
                        <div
                            :class="s.column"
                        >
                            <div
                                :class="s.label"
                            >
                                <p
                                >
                                    Apiary
                                </p>
                            </div>
                            <p>{{ selectedApiary.name === "" ? "Selected" : selectedApiary.name }}</p>
                        </div>
                        <Icon
                            :class="s.icon"
                            :icon="SVG.DropdownArrow"
                        />
                    </div>
                </template>
                <template #list="{ dropdown }">
                    <p
                        v-for="apiary in apiaries"
                        :class="s.item"
                        @click="selectedApiary = { id: apiary.id, name: apiary.name }; dropdown.isShown.value = !dropdown.isShown.value"
                    >
                        {{ apiary.name }}
                        <p :class="s.hives">
                            <Icon
                                :icon="SVG.Hive"
                            />
                            {{ apiary.hiveCount }}
                        </p>
                    </p>
                </template>
            </ModularDropdown>
        </ToolBar>
        <CalendarGrid 
            :class="s.calendar" 
            :calendarId="''"
            :otherCalendarIDs="[]"
            :events="events ?? []"
            :looked-at-date="selectedDate"
            :allowEventCreation="false"
            :is-macdonalds="false"
        />
    </div>
</template>

<style module lang='sass'>

.dateSelector
    display: flex
    align-items: center
    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 500
    letter-spacing: .02em
    width: 12rem
    text-align: center

    .today
        margin-right: .5rem

    .date
        min-width: 10rem

.item
    display: flex
    gap: .5rem
    height: 3rem
    display: flex
    align-items: center

    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 400
    letter-spacing: .02em

    padding: .5rem 1rem
    box-sizing: border-box

    cursor: pointer
    transition: .1s

    .hives
        margin-left: auto
        gap: .5rem
        display: flex
        align-items: center

    &:hover
        background: var(--secondary)

.header
    display: flex
    width: 15rem
    height: 3rem

    border-radius: var(--border-radius-tiny)

    cursor: pointer
    transition: .1s

    padding: .25rem 1rem .25rem 1rem
    box-sizing: border-box

    .column
        display: flex
        flex-direction: column
        width: 100%


    &.open
        background: var(--secondary)
        
    &:hover
        background: var(--secondary)
        

    .label
        display: flex
        align-items: center
        justify-content: space-between
        height: 1rem

        font-size: var(--font-size-tiny)
        font-weight: 700
        letter-spacing: .02em

    .icon
        align-self: center

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