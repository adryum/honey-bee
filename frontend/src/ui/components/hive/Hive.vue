<script setup lang="ts">
import { useCssModule } from 'vue';
import type { HiveModelDB } from '@/core/stores/Models';
import Icon from '../Icon.vue';
import { IconType, SVG } from '@/assets/svgs/SVGLoader';

const s = useCssModule()
const props = withDefaults(defineProps<{
    hive: HiveModelDB,
    showApiary?: boolean
    showShadow?: boolean
    isDimmed?: boolean
}>(), {
    showApiary: false
})
</script>

<template>
<div 
    :class="[
        s.container,
        showShadow && s.shadow
    ]"
>
    <div 
        :class="[
            s.body,
            isDimmed && s.dimmedOut,
            // hive.image && s.vignette
        ]"
    >
        <!-- <div 
            v-if="hive.type" 
            :class="s.type"
        >
            <Icon 
                :class="s.icon" 
                :type="IconType.MEDIUM" 
                :icon="SVG.HoneyHive" 
            />
        </div> -->
        <icon
            v-if="!hive.imageUrl"
            :class="s.icon" 
            :type="IconType.GIGANTIC"
            :icon="SVG.BeeHive"
        />
        <img 
            v-if="hive.imageUrl"
            :class="s.hiveImage" 
            :src="hive.imageUrl || 'src/assets/images/hive1.jpg'" 
            alt="hive image"
        >
    </div>
    <div :class="s.footer">
        <div :class="s.title">
            <p :class="s.name">#{{ hive.id }} {{ hive.name }}</p>
            <p 
                v-if="showApiary" 
                :class="s.apiaryName"
            >
                <!-- {{ hive.apiaryName }} -->
            </p>
        </div>
        <slot name="footer">

        </slot>
    </div>
</div>
</template>

<style module lang='sass'>
.icon
    margin: auto
    color:  #71797E

.dimmedOut
    opacity: .5
    filter: brightness(.6)
.shadow
    box-shadow: 0 0 1px 1px var(--faint-border) !important
.container
    position: relative
    display: flex
    flex-direction: column
    height: 25rem

    box-shadow: 0 0 1px 0 var(--faint-border)
    font-family: var(--font-family)
    background: var(--secondary)
    overflow: hidden
    border-radius: var(--border-radius-medium)
    transition: .2s

    &:hover
        transform: translateY(-2px)

    .footer


        display: flex
        align-items: center
        max-height: 3.5rem
        min-height: 3.5rem
        width: 100%

        box-sizing: border-box
        padding: .5rem 

        border-radius: 0 
        background: rgba(255, 255, 255, 1)


        .options 
            margin-left: auto


        .title
            display: flex
            flex-direction: column
            padding-left: .5rem
            padding-right: .5rem
            .name
                all: unset
                font-size: var(--font-size-medium)
                font-weight: 600
                letter-spacing: .02em
                line-height: 2rem

    .body
        position: relative
        display: flex
        min-height: 0
        flex: 1
        box-sizing: border-box
        // padding: .5rem
        padding-bottom: 0 
        cursor: pointer

        &.vignette
            box-shadow: inset 0 0 100px 0 black

        // &::after 
        //     content: ''
        //     position: absolute
        //     inset: 0
        //     box-shadow: inset 0 0 20px 5px rgba(0,0,0,.3)
            

        .type
            position: absolute
            display: flex
            align-items: center
            justify-content: center

            width: 2rem
            height: 2rem
            margin: .5rem
            background: var(--orange)
            border-radius: var(--border-radius-big)
            box-shadow: 0 1px 0 0 var(--faint-border)

        .hiveImage
            display: flex
            min-height: 0
            min-width: 0
            width: 100%
            height: 100%
            max-height: 100%
            object-fit: cover
            box-sizing: border-box

</style>