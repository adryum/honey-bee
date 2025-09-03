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
        <div :class="s.header">
            <div :class="s.title">
                <p :class="s.name">{{ hive.name }}</p>
                <p v-if="showApiary" :class="s.apiaryName">{{ hive.apiaryName }} Darziemalania s 1235667</p>
            </div>
        </div>

        <div :class="s.body">
            
            <div :class="s.queen">
                <div :class="s.image"></div>
                <p :class="s.queenbeeSpecies">Bigususus Bitususus</p>
            </div>
            <img :class="s.hiveImage" :src="hive.imagePath" alt="hive image">
        </div>
   </div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    flex-direction: column
    align-items: center

    .header
        display: flex
        align-items: center
        height: 4rem
        width: 100%

        box-sizing: border-box
        padding-left: .5rem 
        background: var(--light)

        .title
            display: flex
            flex-direction: column
            .name
                all: unset
                @include main.f-size-small
                font-weight: 700

    .body
        position: relative
        height: 15rem
        background: var(--accent)
        width: 95%

        .apiaryName
            @include main.f-size-very-small
            font-weight: 300
            letter-spacing: .5px

            position: absolute
            top: 0
            right: 0
            padding: 1rem

        .queen
            position: absolute
            bottom: 0
            left: 0
            right: 0

            display: flex
            align-items: center
            gap: 1rem
            padding: 1rem
            background: rgba(0, 0, 0, .2)

            .image
                width: 4rem
                height: 4rem
                background: rgba(0,0,0,.5)
            .queenbeeSpecies
                @include main.f-size-small
                font-weight: 500
                
                

        .hiveImage
            width: 100%
            height: 100%
            display: block
            object-fit: cover
            box-sizing: border-box


.wood
    width: 100%
    height: 100%
    object-fit: cover
</style>