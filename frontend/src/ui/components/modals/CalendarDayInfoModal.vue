<script setup lang="ts">
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import { ref, useCssModule } from "vue";
import Icon from "../Icon.vue";
import CalendarTaskExpandable from "./CalendarTaskExpandable.vue";
import ModalPlate from "./ModalPlate.vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import type { CalendarDayModel, HiveModelDB } from "@/core/stores/Models";
import { useModalBase, type ModalBaseModel } from "@/core/composables/useModalBase";
import CalendarCreateEventModal from "./CalendarCreateEventModal.vue";

const s = useCssModule()
const props = defineProps<{
    calendarIds: string[]
    dayModel:    CalendarDayModel
}>()

defineEmits<{
    clickOutside: [],
    close: []
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const createEventModal = ref<ModalBaseModel>()

</script>

<template>
<ModalPlate
    ref="modal"
    label="Add Apiary"
    :style="{ backdropFilter: 'brightness(.6)'}"
    @clickOutside="$emit('clickOutside')"
>
        <div
            :class="s.dayOverview" 
            @click.stop=""
        >
            <div 
                :class="s.titleWrapper"
            >
                <Icon
                    :svg="SVG.Calendar"
                    :type="IconType.BIG"
                />
                <label 
                    :class="s.title"
                >
                    {{ dayModel.date.toDateString() }}
                    <!-- 23th Febuary 2024 -->
                </label>
                <IconCubeButton
                    :style="{
                        marginLeft: 'auto'
                    }"
                    @click="$emit('close')"
                />
            </div>

            <label 
                for="tasks"
                :class="s.label"
            >
                Actions
            </label>

            <div 
                :class="s.titleWrapper"
            >
                <button 
                    :class="s.button"
                    @click="createEventModal?.open"
                >
                    <Icon
                        :svg="SVG.Plus"
                        :type="IconType.SMALL"
                    />
                    <p>
                        Add task
                    </p>
                </button>
            </div>
            
            <label 
                for="tasks"
                :class="s.label"
            >
                Tasks
            </label>

            <div :class="s.taskList">
                <p 
                    v-if="dayModel.events.length === 0"
                    :class="s.noTasksText"
                >
                    No tasks for this day
                </p>
                <CalendarTaskExpandable
                    v-for="task in dayModel.events"
                    :task="task"
                />
            </div>
        </div>

        <CalendarCreateEventModal
            ref="createEventModal"
            :date="dayModel.date"
            :calendarIds="calendarIds"
        />
</ModalPlate>

</template>

<style module lang = 'sass'>
.dayOverview
    display:        flex
    flex-direction: column
    gap:            1rem
    background:     white
    padding:        1rem
    margin-left:    auto
    width:          40rem
    box-sizing:     border-box
    height:         100%

.daySettings
    display:        flex
    flex-direction: column
    gap:            1rem
    background:     white
    border-radius:  var(--border-radius-medium)
    padding:        1rem

.label
    +bulletLabel

.button
    border:        none
    background:    none
    display:       flex
    gap:           .5rem
    align-items:   center
    padding:       0 .5rem
    height:        2.5rem
    border-radius: var(--border-radius-small)
    transition:    .3s
    background:    var(--light-gray)
    cursor:        pointer
    box-shadow:    0 0 0 2px var(--gray)

    font-family: var(--font-family)
    font-size:   var(--font-size-small)
    opacity:     1
    font-weight: 500
    color:       var(--black)
    line-height: 2rem

    &:hover
        background: var(--white)
        box-shadow: 0 0 0 2px var(--orange)


.title
    font-family: var(--font-family)
    font-size:   var(--font-size-large)
    opacity:     1
    font-weight: 500
    color:       var(--black)
    line-height: 3rem

.titleWrapper
    display:     flex
    gap:         .5rem
    align-items: center

.taskList
    display:        inline-flex
    flex-direction: column
    overflow-y:     scroll
    gap:            1rem
    min-height:     4rem
    padding:        1px
    background:     rgb(245, 245, 245)
    border-radius:  var(--border-radius-small)


    .noTasksText
        +bulletLabel
        font-size: var(--font-size-large)
        font-weight: 600
        opacity: 1
        color: #71797E
        margin: auto

</style>