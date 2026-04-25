<script setup lang="ts">
import type { LineGraphLineModel } from "@/core/stores/Models";
import { computed, onMounted, ref, useCssModule } from "vue";

const s = useCssModule()
const props = defineProps<{
    entries: LineGraphLineModel[]
}>()

const chart = ref<any>(null)
    
const allDates = computed(() =>
    [...new Set(props.entries.flatMap(e => e.data.map(d => d.timestamp)))].sort()
)

const series = computed(() =>
    props.entries.map(entry => {
        const dateMap = new Map(entry.data.map(data => [data.timestamp, data.value]));
        return {
            name: entry.name,
            data: allDates.value.map(date => dateMap.get(date) ?? null)
        };
    })
)

const chartOptions = computed(() => ({
    chart: {
        type: 'area',
        height: '100%',
        redrawOnWindowResize: true,
        redrawOnParentResize: true,
        animations: { enabled: true }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: .7,
            opacityFrom: 0.4,
            opacityTo: 0.4,
            stops: [0, 90, 100]
        }
    },
    tooltip: {
        x: { format: 'dd/MM/yy HH:mm' },
    },
    colors: props.entries.map(e => e.color),
    xaxis: {
        type: 'datetime',
        categories: allDates.value
    }
}))

onMounted(() => {
    setTimeout(() => {
        chart.value?.chart?.windowResizeHandler()
    }, 100)
})
</script>

<template>
<div 
    id="inenesums" 
    :class="s.container"
>
    <div :class="s.header">
        <label :class="s.label" for="inenesums">
            Iensesums
        </label>
    </div>
    <hr :style="{
        minHeight: '1px',
        border: 'none',
        background: 'rgba(0,0,0,.2)',
        margin: 0
    }">
    <div :class="s.body">
        <ApexChart 
            ref="chart"
            :class="s.graph" 
            :series="series" 
            :options="chartOptions" 
            type="area" 
            height="100%"/>
    </div>
</div>
</template>

<style module lang='sass'>
 
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
        min-height: 2.5rem
        max-height: 2.5rem
        height: 2.5rem
        box-sizing: border-box
        border-radius: var(--border-radius-small)

        .label
            font-size: var(--font-size-medium)
            line-height: 1rem
            font-weight: 500
            letter-spacing: .02em
            padding-left: .5rem

    .body
        height: 100%
        flex: 1
        box-sizing: border-box

        .graph
            box-sizing: border-box

        
</style>