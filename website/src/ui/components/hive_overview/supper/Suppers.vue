<script setup lang="ts">
import { ref, useCssModule } from "vue";

const s = useCssModule()
const series = ref([{ name: 'series1', data: [31,40,28,51,42,109,100] }]);

const chartOptions = ref({
    chart: {
        type: 'area',
        height: '100%',
        animations: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    colors: ['#ffbf44'], // <-- change line colors here

    fill: {
        type: 'gradient',
        gradient: {
        shadeIntensity: .7,
        opacityFrom: 0.4,
        opacityTo: 0.4,
        stops: [0, 90, 100]
        }
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
        format: 'dd/MM/yy HH:mm'
        },
    },
});
</script>

<template>
<div id="inenesums" :class="s.container">
    <div :class="s.header">
        <label :class="s.label" for="inenesums">
            Iensesums
        </label>
    </div>
    <div :class="s.body">
        <ApexChart :class="s.body" :series="series" :options="chartOptions" type="area" height="100%"/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    font-family: var(--font-family)
    gap: .5rem

    .header
        position: relative
        display: flex
        align-items: center
        width: 100%
        min-height: 2.5rem
        max-height: 2.5rem
        padding: .25rem 0.5rem
        box-sizing: border-box
        background: white
        border-radius: var(--border-radius-small)

        .label
            font-size: var(--font-size-medium)

    .body
        flex: 1
        display: flex
        box-sizing: border-box
        padding: .5rem 0

        background: var(--white)
        border-radius: var(--border-radius-small)
        
</style>