<script setup>
import { useCssModule } from 'vue';
import Widget from '@/components/Widget.vue';
import TagContentBox from '@/components/TagContentBox.vue';

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
        <h1>Queen</h1>
    </template>

    <template #body>
        <div :class="s.grid">
            <img :class="s.img" src="@/assets/images/Hive1.jpg">
            <h1 :class="s.name">{{ queen.name }}</h1>
            <div :class="s.tags">
                <TagContentBox :class="s.tag" label="Age" content="2m 14d"/>
                <TagContentBox :class="s.tag" label="Here Since" :content="queen.assignDate"/>
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
        font-size: main.$font-size-huge
        grid-area: name

    .tags
        display: flex
        gap: 1rem

        .tag
            flex: 1
            grid-area: tags

</style>