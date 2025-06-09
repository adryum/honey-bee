<script setup>
import { useCssModule } from 'vue';
import Widget from '@/components/Widget.vue';
import TagContentBox from '@/components/TagContentBox.vue';
import HorizontalTextArea from './HorizontalTextArea.vue';
import VerticalTextArea from './VerticalTextArea.vue';

const props = defineProps({
    queen: {
        type: Object,
        default: {}
    }
})

const s = useCssModule()
</script>

<template>
<Widget>
    <template #header>
        <h1>Stimulants</h1>
    </template>

    <template #body>
        <div :class="s.grid">
            <img :class="s.img" src="@/assets/images/Hive1.jpg">
            <HorizontalTextArea :class="s.given"/>
            <HorizontalTextArea :class="s.next"/>
            <VerticalTextArea :class="s.reason"/>
        </div>
    </template>
</Widget>
</template>

<style module lang='sass'>
.grid
    width: 100%
    height: 100%
    display: grid
    grid-template-areas: "img given" "img next" "img reason"
    grid-template-columns: 1fr 1.8fr
    grid-template-rows: 1fr 1fr 2fr
    gap: .5rem

    box-sizing: border-box
    padding: 1rem

    .img
        grid-area: img
        object-fit: cover
        width: 100%
        height: 100%
        box-shadow: 0 0 10px rgba(0, 0, 0, .2)
        border-radius: 4px

    .given
        grid-area: given
    .next
        grid-area: next
    .reason
        grid-area: reason


</style>