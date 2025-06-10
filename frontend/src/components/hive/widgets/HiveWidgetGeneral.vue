<script setup>
import { useCssModule, ref, onMounted, watch } from 'vue';
import Widget from '@/components/Widget.vue';
import WidgetParagraph from '@/components/WidgetParagraph.vue';
import { getImageRes } from '@/core/imageHandler';

const props = defineProps({
    hive: Object
})
const img = ref('')

const s = useCssModule()
onMounted(async () => {
    if (props.hive.image) img.value = await getImageRes(newImg)
})

watch(() => props.hive.image, async (newImg) => {
    console.log("newImg: " + newImg);

    img.value = await getImageRes(newImg)
})
</script>

<template>
<Widget>
    <template #header>
        <h1>General information</h1>
    </template>

    <template #body>
        <div :class="s.grid">
            <img :class="s.img" :src="img">
            <WidgetParagraph title="Type" :content="hive.type"/>
            <WidgetParagraph title="Location" :content="hive.location"/>
            <WidgetParagraph :class="s.description" title="Description" :content="hive.description"/>
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

    overflow-y: scroll

    .img
        grid-area: img
        object-fit: cover
        width: 100%
        height: 100%
        box-shadow: 0 0 10px rgba(0, 0, 0, .2)
        border-radius: 4px
        overflow: hidden

    .location
        grid-area: location

    .description
        grid-area: desc

</style>