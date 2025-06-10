<script setup>
import { useCssModule, ref, watch, onMounted } from 'vue';
import Widget from '@/components/Widget.vue';
import TagContentBox from '@/components/TagContentBox.vue';
import { getImageRes } from '@/core/imageHandler';

const props = defineProps({
    image: {
        type: String,
    }
})
const img = ref('')
const s = useCssModule()
onMounted(async () => {
    img.value = await getImageRes(props.image)
    console.log(img.value);
})

// watch(() => props.image, async (newImg) => {
//     console.log("newImg: " + newImg);
//     img.value = await getImageRes(newImg)
// },
// {
//     immediate: true
// })
</script>

<template>
    <div :class="s.container"><img :class="s.image" :src="img"></div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    width: 100%

    .image
        aspect-ratio: 1
        object-fit: cover
        border-radius: 4px
        height: 100%
        width: 100%
        box-shadow: 0 0 5px rgba(0, 0, 0, .2)

</style>