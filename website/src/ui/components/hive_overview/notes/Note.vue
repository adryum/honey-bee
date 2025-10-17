<script setup lang="ts">
import { onMounted, ref, useCssModule } from "vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { SVGImage, SVGRes } from "@/core/SVGLoader";

const s = useCssModule()
const randomRotation = ref(0)

onMounted(() => {
  // Generate a random rotation between -15 and +15 degrees, for example
  randomRotation.value = Math.floor(Math.random() * 10) - 5
})
</script>

<template>
<div :class="s.container">
    <div :class="s.body">
        <div :Class="s.tags">
            <p :class="s.information">Information</p>
            <IconCubeButton :class="s.button" :svg="new SVGImage(SVGRes.MoreDots)"/>
        </div>

        <div :class="s.innerbody">
            <h1 :class="s.title">
                <p>Beeweere Bees!!!</p>
            </h1>
            <p :class="s.content">One day i stumbled accross this beehive and hit it with my ball. Not safe to say that everything is not okey. After that masive hit all hive inhabitants started attacking ME!!! Didnt know that they're were going to be so pissed tf??!! Like chill out dude its not that serious.</p>
            <div :class="s.footer">
                <p>Andrea Biggie</p>
                <p>22 sep. 2046.</p>
            </div>
        </div>
    </div>

</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.button
    margin-left: auto
    height: 28px
.container
    @include main.font
    position: relative
    display: flex
    flex-direction: column
    background: white
    border-radius: 3px
    // border-;: 4px solid var(--accent)

    .body
        display: flex
        flex-direction: column
        box-sizing: border-box

        .tags
            display: flex
            // background: 
            padding: .5rem .5rem .25rem 1rem 
            // border-radius: 3px
            
            align-items: center
            .information
                // @include main.mono-font
                @include main.f-size-tiny
                font-weight: 700
                // text-transform: uppercase
                letter-spacing: 0.02em
                display: inline-flex
                align-items: center
                max-width: max-content
                border-radius: 30px
                color: var(--accent)

        .innerbody
            padding: 0 1rem 1rem 1rem

            .footer
                display: flex
                justify-content: space-between
                margin-top: .5rem

                @include main.f-size-tiny


            .title
                display: flex
                align-items: center
                justify-content: space-between
                @include main.f-size-small
                font-weight: 700
                letter-spacing: .02em
                margin-bottom: .2rem

                

            .content
                @include main.f-size-very-small
</style>