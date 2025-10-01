<script setup lang="ts">
import { useCssModule } from "vue";
import TitledField from "../input/fields/TitledField.vue";
import TitledText from "../paragrafs/TitledText.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">Info</div>
    <div :class="s.body">
        <div :class="s.imageSide">
            <img src="@/assets/images/apiary.jpg" alt="">
        </div>
        <div :class="s.dataSide">
            <TitledText title="Name" content="Hive name"/>
            <TitledText title="Type" content="Movable"/>
            <TitledText title="Location" content="D'arciems"/>
            <TitledText title="Description" content="Big yellow, has a lot of bees. Quite comfy and warm. Has a lot of honney :)))))"/>
        </div>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    background: var(--surface)

    .header
        @include main.button-font
        position: relative
        display: flex
        align-items: center
        width: 100%
        min-height: 2.5rem
        max-height: 2.5rem
        padding: .25rem 0.5rem
        box-sizing: border-box
        background: var(--surface)
        border-top: 4px solid var(--light)
        // border-bottom: 1px solid rgba(0, 0, 0, .1)
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1)

        .navigator
            margin-left: auto
            display: flex
            align-items: center
            gap: .2rem
            height: 100%

            .iconButton
                height: 100%

                &.left
                    rotate: 180deg 0 0 1
    .body
        flex: 1
        display: grid
        grid-template-areas: "image data"
        grid-template-columns: repeat(2, 1fr)

        padding: 1rem
        gap: 1rem
        box-sizing: border-box

        .imageSide
            grid-area: image
            overflow: hidden
            background: rgba(0, 0, 0, .3)

            img
                border-radius: 3px
                width: 100%
                height: 100%
                object-fit: cover

        .dataSide
            grid-area: data
            display: flex
            flex-direction: column

            gap: 1rem
            box-sizing: border-box
</style>