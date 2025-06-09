<script setup>
import { useCssModule } from 'vue';

const props = defineProps({
    isNewUser: Boolean,
    event: {
        type: Array,
        default: () => []
    }
})

const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <div v-for="event in events" >
        <div v-if="isNewUser" :class="s.header">
            <div :class="s.date">{{ event.date }}</div>
            <div :class="s.user">{{ event.user }}</div>
        </div>
        
        <div :class="s.entry">
            <div :class="s.time">{{ event.time }}</div>
            <div :class="s.event">{{ event.content }}</div>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
.container

    .header
        display: grid
        grid-template-areas: 'date user'
        grid-template-columns: 10rem 1fr

        color: black

        .date
            grid-area: date
        .user
            grid-area: user

    .entry
        display: grid
        grid-template-areas: 'time event'
        grid-template-columns: 10rem 1fr

        color: #A8A8A8

        .time
            grid-area: time
        .event
            grid-area: event
</style>