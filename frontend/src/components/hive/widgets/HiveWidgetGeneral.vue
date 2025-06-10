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
    img.value = await getImageRes(props.hive.image)
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
    display: grid
    grid-template-areas: "img type" "img location" "img desc" "img desc" "img desc"
    grid-template-columns: 1fr 1fr
    grid-template-rows: repeat(5, 1fr)
    gap: 1rem

    box-sizing: border-box
    padding: 1rem

    width: 100%

    .img
        grid-area: img
        height: 100%
        width: 100%
        box-shadow: 0 0 10px rgba(0, 0, 0, .2)
        border-radius: 4px
        object-fit: cover
        overflow: hidden

    .location
        grid-area: location

    .description
        grid-area: desc

</style>