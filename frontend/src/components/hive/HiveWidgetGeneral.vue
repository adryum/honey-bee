<script setup>
import { useCssModule } from 'vue';
import Widget from '../Widget.vue';
import WidgetParagraph from '../WidgetParagraph.vue';

const props = defineProps({
    location: {
        type: String,
        default: 'NO LOCATION'
    },
    description: {
        type: String,
        default: 'NO Description'
    } 
})

const s = useCssModule()
</script>

<template>
<Widget>
    <template #header>
        <h1>General information</h1>
    </template>

    <template #body>
        <div :class="s.grid">
            <img :class="s.img" src="@/assets/images/Hive1.jpg">
            <WidgetParagraph title="Type" content="Pārnēsājamais"/>
            <WidgetParagraph title="Location" content="LV-0123 Sarkandaugava 92-124"/>
            <WidgetParagraph :class="s.description" title="Description" content="LV-0123 Sarkandaugava 92-124"/>
        </div>
    </template>
</Widget>
</template>

<style module lang='sass'>
.grid
    width: 100%
    height: 100%
    display: grid
    grid-template-areas: "img type" "img location" "img desc" "img desc" "img desc"
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