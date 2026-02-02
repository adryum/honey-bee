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
    display: flex
    flex-direction: column
    gap: .5rem
    font-family: var(--font-family)

    .title
        font-size: var(--font-size-small)
        font-weight: 700
        letter-spacing: 0.02em

    .content
        font-size: var(--font-size-small)
        font-weight: 500
        letter-spacing: 0.02em
        opacity: .8

</style>