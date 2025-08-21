<script setup lang="ts">
import { ref, useCssModule } from "vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import TitledField from "../input/fields/TitledField.vue";
import Button from "../input/buttons/Button.vue";
import { type CalendarDate } from "../../core/Calendar";

const s = useCssModule()
const goToDay = ref<string>()
const goToMonth = ref<string>()
const goToYear = ref<string>()

const props = defineProps<{
    searchableDate: CalendarDate
    today: CalendarDate
    // goTo: (date: CalendarDate) => void
}>()

function goToToday() {
    console.log(props.today.year, props.today.getHumanMonth(), props.today.day);
    
    props.searchableDate.setDate(props.today.year, props.today.getHumanMonth(), props.today.day)
}
</script>

<template>
<div :class="s.container">
    <div :class="s.top">
        <h1 :class="s.month">{{ searchableDate.getMonthName() }} {{ searchableDate.year }}.</h1>
        <IconCubeButton @click="searchableDate.moveMonth(-1)"/>
        <IconCubeButton @click="searchableDate.moveMonth(1)"/>
    </div>
    <TitledField title="Search task"/>
    <div :class="s.goTo">
        <Button text="Go" @click="searchableDate.setDate(Number(goToYear), Number(goToMonth), Number(goToDay))"/>
        <TitledField title="day" v-model="goToDay"/>
        <TitledField title="month" v-model="goToMonth"/>
        <TitledField title="year" v-model="goToYear"/>
    </div>
    <Button text="Today" @click="goToToday"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    flex-direction: column
    gap: 1rem
    background: var(--light)
    padding: 1rem
    box-sizing: border-box

    .top
        display: flex
        align-items: center
        gap: .5rem

        .month
            @include main.f-size-medium
            margin: 0 auto 0 0

    .goTo
        display: flex
        gap: 1rem


</style>