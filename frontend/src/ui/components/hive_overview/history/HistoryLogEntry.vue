<script setup lang="ts">
import { useCssModule } from "vue";
import Icon from "../../Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { HiveHistoryEntryDB } from "@/core/stores/Models";

const s = useCssModule()
const props = defineProps<{
    entry: HiveHistoryEntryDB
}>()
</script>

<template>
<div :class="s.container">
    <div
        :class="s.decorationPoint"
    >
        <Icon
            :svg="SVG.Cross"
            :type="IconType.SMALL"
        />
    </div>

    <div :class="s.header">
        <h2 :class="s.time">{{ entry.creationDate }}</h2>
        <div :class="s.userInfo">
            <img
                alt="user image"
                :class="s.image" 
                :src="entry.userImage" 
            >
            <h1 :class="s.name">{{ entry.username }}</h1>
        </div>
    </div>
    <p :class="s.content">{{ entry.text }}</p>
</div>
</template>

<style module lang='sass'>

.userInfo
    display: flex 
    align-items: center
    gap: .5rem

.image
    width: 1.5rem 
    height: 1.5rem 
    border-radius: 50px
    object-fit: cover
.decorationPoint
    position: absolute
    display: flex
    justify-content: center
    align-items: center

    top: .2rem
    left: 1rem
    // align-self: center
    min-width: 2rem
    min-height: 2rem
    max-width: 2rem
    max-height: 2rem
    height: 2rem
    width: 2rem
    border-radius: 50px
    background: var(--orange)

.header
    display: flex
    // flex-direction: column
    gap: 1rem
    
    // justify-content: center
    padding-top: .2rem

    margin-left: 4rem

    height: 1.5rem
    align-items: center

    // min-width: 20%
    // max-width: 20% 
    border-radius: 4px 0 0 4px

    // background: var(--orange)
    font-size: var(--font-size-small)

    .time
        font-weight: 400
        letter-spacing: 0.02em
        

    .name
        font-weight: 600
        letter-spacing: 0.02em

.container
    position: relative
    display: inline-flex
    flex-direction: column
    padding: .25rem
    box-sizing: border-box
    border-radius: 50px

    gap: .5rem
    // overflow: hidden


   
    .content
        flex: 1
        // background: var(--gray)
        // border-left: 2px solid var(--faint-border)
        // padding: .5rem
        margin-left: 4rem
        box-sizing: border-box
        line-height: 1.5rem
        font-size: var(--font-size-small)
</style>