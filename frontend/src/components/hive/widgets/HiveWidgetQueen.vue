<script setup>
import { useCssModule, ref, watch, onMounted } from 'vue';
import Widget from '@/components/Widget.vue';
import TagContentBox from '@/components/TagContentBox.vue';
import { getImageRes } from '@/core/imageHandler';

const props = defineProps({
    queen: {
        type: Object,
    }
})
const img = ref('')
const s = useCssModule()
onMounted(async () => {
    img.value = await getImageRes(props.queen.image)
})

watch(() => (props.queen) ? props.queen.image : props.queen, async (newImg) => {
    console.log("newImg: " + newImg);

    img.value = await getImageRes(newImg)
})
</script>

<template>
<Widget>
    <template #header>
        <h1>Queen</h1>
    </template>

    <template #body>
        <div v-if="queen" :class="s.grid">
            <img :class="s.img" :src="img">
            <h1 :class="s.name">{{ queen.name }}</h1>
            <div :class="s.tags">
                <TagContentBox :class="s.tag" label="Age" content="2asd"/>
                <TagContentBox :class="s.tag" label="Here Since" content="qweqwe"/>
            </div>
        </div>
    </template>
</Widget>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.grid
    width: 100%
    height: 100%
    display: grid
    grid-template-areas: "img name" "img tags"
    grid-template-columns: 1fr 1.5fr
    grid-template-rows: 1.5fr 1fr
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
        
    .name
        all: unset
        display: flex
        align-items: center
        justify-content: center
        font-size: main.$font-size-huge
        grid-area: name

    .tags
        display: flex
        align-items: center
        justify-content: center
        gap: 1rem
        grid-area: tags


</style>