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
    <hr :style="{
        height: '1px',
        border: 'none',
        background: 'rgba(0,0,0,.2)',
        margin: 0
    }">
    <div :class="s.body">
        <ApexChart :class="s.graph" :series="series" :options="chartOptions" type="area" height="100%"/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    font-family: var(--font-family)
    gap: .25rem
    background: var(--white)
    padding: .25rem
    box-sizing: border-box
    border-radius: var(--border-radius-small)
    box-shadow: 0 0 1px 0 var(--faint-border)

    .header
        display: flex
        align-items: center
        width: 100%
        min-height: 2rem
        max-height: 2rem
        height: 2rem
        box-sizing: border-box
        border-radius: var(--border-radius-small)

        .label
            font-size: var(--font-size-medium)
            line-height: 1rem
            padding-left: .5rem

    .body
        flex: 1
        box-sizing: border-box

        .graph
            box-sizing: border-box

        
</style>