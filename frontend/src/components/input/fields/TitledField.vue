<script setup lang="ts">
import { useCssModule } from "vue";
import Field from "./Field.vue";

const s = useCssModule()
const text = defineModel<string>()

const props = withDefaults(defineProps<{
    title?: string
    hint?: string
}>(),
{
    title: '{ TITLE }',
    hint: '...',
})

</script>

<template>
<div :class="s.container">
    <h1 :class="s.title">{{ title }}</h1>
    <Field :class="s.field" :hint="hint" v-model="text"/>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    gap: .2rem

    .title
        all: unset
        @include main.font
        @include main.f-size-very-small
        font-weight: 500

    .field
        height: 2rem

</style>