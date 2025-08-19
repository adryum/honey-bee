<script setup lang="ts">
import { onMounted, ref, useCssModule} from "vue"
import SmallSearchbar from '../components/input_fields/SmallSearchbar.vue';
import IconButton from '../components/buttons/IconTextButton.vue';
import { createComponentInstance, createComponentWithProps } from '../utils/components';
import CreateApiaryPopup from '../components/popups/CreateApiaryPopup.vue';
import { getSVG, SVGIconRes } from '../core/SVGLoader';
import CalendarGrid from '../components/calendar/CalendarGrid.vue';
import CalendarToolBarVertical from "../components/calendar/CalendarToolBarVertical.vue";

const rApiaries = ref([])
const rSizeMultiplier = ref(30)

const s = useCssModule()
const components = [
    createComponentWithProps(IconButton, { 
        text: 'add apiary',
        svg: getSVG(SVGIconRes.Pluss),
        onClick: () => {
            createComponentInstance(CreateApiaryPopup, {}, true)
        }
    }),
]

</script>

<template>
    <div :class="s.container">
        <CalendarGrid :class="s.calendar" />
        <CalendarToolBarVertical :class="s.calendarBar"/>
    </div>
</template>

<style module lang='sass'>
@use '../assets/_colors.sass' as colors
.container
    display: flex

    padding: 1rem
    gap: 1rem
    height: 100%
    box-sizing: border-box

    .calendar
        flex: 7


    .calendarBar
        flex: 2
</style>