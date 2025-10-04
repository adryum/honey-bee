<script setup lang="ts">
import { useCssModule } from 'vue';

const s = useCssModule()
const props = withDefaults(defineProps<{
    title?: string,
    content?: string
}>(),
{
    title: "TITLE",
    content: "Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla "
})
</script>

<template>
<div :class="s.container">
    <h1 :class="s.title">{{ title }}</h1>
    <p :class="s.content">{{ content }}</p>
</div>
</template>
<style module lang="sass">
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    flex-direction: column
    gap: .5rem

    .title
        @include main.f-size-very-small
        font-weight: 700
        letter-spacing: 0.02em

    .content
        @include main.f-size-very-small
        letter-spacing: 0.02em

</style>