<script setup lang="ts">
import { computed, reactive, ref, useCssModule} from "vue"
import CalendarGrid from '../components/calendar/CalendarGrid.vue';
import { CalendarDate } from "../../core/Calendar";
import ToolBar from "../components/ToolBar.vue";
import ModularDropdown from "../components/input/dropdowns/ModularDropdown.vue";
import Icon from "../components/Icon.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useApiariesQuery } from "@/core/composables/useApiary";
import IconCubeButton from "../components/input/buttons/IconCubeButton.vue";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import { useCalendarQuery } from "@/core/composables/useCalendar";
import { useHivesQuery } from "@/core/composables/useHive";

const s = useCssModule()
const date = new Date()
const today: CalendarDate = new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
)
const searchDate = reactive<CalendarDate>(today.copy())

const { apiaries } = useApiariesQuery()
const selectedApiary = ref<{id: number, name: string }>({ id: -1, name: "Selected"})

const { hives } = useHivesQuery({ 
    apiaryId: computed(() => selectedApiary.value.id)
})
const selectedDate = ref(new Date().nextMonth().previousMonth())

// const calendarIds = computed(() => {
//     console.log(hive.calendarId ? [ hive.calendarId] : []);
//     return  hive.calendarId ? [ hive.calendarId] : []
    
// })
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
            label="Main calendar"
        >
            <IconTextButton
                :class="s.today"
                text="Today"
                :hideIcon="true"
                @click="selectedDate = new Date()"
            />
            <IconCubeButton
                :icon="SVG.ArrowLeftSmall"
                @click="selectedDate = selectedDate.previousMonth()"
            />
            <p
                :class="s.date"
            >
                {{ selectedDate.toLocaleString('default', { month: 'long' }) }} {{ selectedDate.getFullYear() }}
            </p>
            <IconCubeButton
                :icon="SVG.ArrowRightSmall"
                @click="selectedDate = selectedDate.nextMonth()"
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
                    >{{ apiary.name }}</p>
                </template>
            </ModularDropdown>
        </ToolBar>
        <CalendarGrid 
            :class="s.calendar" 
            :calendarId="''"
            :otherCalendarIDs="[]"
            :events="events ?? []"
            :looked-at-date="new Date()"
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

    &:hover
        background: #e8e6e0


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
        background: #e8e6e0
        
    &:hover
        background: #e8e6e0
        

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