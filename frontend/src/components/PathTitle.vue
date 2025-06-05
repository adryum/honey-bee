<script setup>
import { useCssModule } from 'vue';

defineProps({
    title: {
        type: String,
        default: 'NO TITLE'
    },
    path: {
        type: String,
        default: 'NO PATH'
    },
    
})

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.path">{{ path }}</div>
    <h1 :class="s.title">{{ title }}</h1>
</div>
</template>

<style module lang='sass'>
.container
    display: flex
    flex-direction: column

    .path
        all: unset
        font-size: 18px

    .title
        all: unset
        font-size: 40px
</style>