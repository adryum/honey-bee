<script setup lang="ts">
import { useCssModule, ref, onMounted, watch, toRef } from 'vue';
import type { HiveModel } from '../../core/models/Models';

const s = useCssModule()
const props = withDefaults(defineProps<{
    hive: HiveModel,
    showApiary?: boolean
}>(), {
    showApiary: false
})
</script>

<template>
<div :class="s.container">
    <div v-if="showApiary" :class="s.location">
        <img :class="s.wood" :src="hive.apiaryImagePath">
        <p>{{ hive.apiaryName }}</p>
   </div>

   <div :class="s.hive">
        <div :class="s.header">
            <p :class="s.name">{{ hive.name }}</p>
        </div>

        <div :class="s.body">
            <img :class="s.hiveImage" :src="hive.imagePath" alt="hive image">
        </div>
   </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    flex-direction: column

    .hive
        display: flex
        flex-direction: column

        .header
            display: flex
            align-items: center
            height: 3rem

            box-sizing: border-box
            padding-left: .5rem 
            background: var(--light)
            .name
                all: unset
                @include main.f-size-small
                font-weight: 700

        .body
            height: 20rem
            background: var(--accent)

            .hiveImage
                width: 100%
                height: 100%
                display: block
                object-fit: cover

.wood
    width: 100%
    height: 100%
    object-fit: cover
</style>