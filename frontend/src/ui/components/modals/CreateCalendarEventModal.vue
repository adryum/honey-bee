<script setup lang="ts">
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import { ref, useCssModule } from "vue";
import Icon from "../Icon.vue";
import CalendarTaskExpandable from "./CalendarTaskExpandable.vue";
import ModalPlate from "./ModalPlate.vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import type { CalendarDayModel, HiveModelDB } from "@/core/stores/Models";
import { usePopupCreator } from "@/core/utils/PopupHiarchy";
import CalendarCreateEventPopup from "../popups/CalendarCreateEventPopup.vue";

const s = useCssModule()
const props = defineProps<{
    hive: HiveModelDB
    dayModel: CalendarDayModel
}>()
defineEmits<{
    clickOutside: [],
    close: []
}>()

const { create } = usePopupCreator({
    popupComponent: CalendarCreateEventPopup,
    maxCount: 1,
    props: {
        hive: props.hive,
        selectedDate: props.dayModel.date
    }
})
</script>

<template>
<ModalPlate
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
                v-if="hive"
                for="tasks"
                :class="s.label"
            >
                Actions
            </label>

            <div 
                :class="s.titleWrapper"
            >
                <button 
                    v-if="hive"
                    :class="s.button"
                    @click="create"
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
</ModalPlate>

</template>

<style module lang = 'sass'>
.dayOverview
    display:        flex
    flex-direction: column
    gap:            1rem
    background:     white
    border-radius:  var(--border-radius-medium)
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
        box-shadow: 0 0 0 2px var(--yellow)


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