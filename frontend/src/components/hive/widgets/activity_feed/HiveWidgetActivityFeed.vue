<script setup>
import { ref, useCssModule } from 'vue';
import Widget from '@/components/Widget.vue';
import ActivityEntry from './ActivityEntry.vue';

const props = defineProps({
    events: {
        type: Array,
        default: () => []
    }
})
const rPreviousUser = ref('')

function changeUser(name) {
    // show new user header
    if (name != rPreviousUser.value) {
        rPreviousUser.value = name

        return true
    } else {
        return false
    }
}
const s = useCssModule()
</script>

<template>
<Widget>
    <template #header>
        <h1>Activity Feed</h1>
    </template>

    <template #body>
        <ActivityEntry v-for="event in events" 
            :event="event"
            :isNewUser="changeUser(event.name)"/>
    </template>
</Widget>
</template>

<style module lang='sass'>
.grid
    width: 100%
    height: 100%
    display: grid
    grid-template-areas: "date user" "time"
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr
    gap: 1rem

    box-sizing: border-box
    padding: 1rem

    .img
        grid-area: img
        object-fit: cover
        width: 100%
        height: 100%
        box-shadow: 0 0 10px rgba(0, 0, 0, .2)
        border-radius: 4px

    .location
        grid-area: location

    .description
        grid-area: desc

</style>