<script setup lang="ts">
import { onMounted, ref, useCssModule } from "vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import Icon from "../../Icon.vue";

const s = useCssModule()
const randomRotation = ref(0)

onMounted(() => {
  // Generate a random rotation between -15 and +15 degrees, for example
  randomRotation.value = Math.floor(Math.random() * 10) - 5
})
</script>

<template>
<div :class="s.container">
    <div :Class="s.header">
        <div :class="s.iconWrapper">
            <Icon 
                :type="IconType.SMALL"
                :svg="SVG.InfoCircle"
            />
        </div>
        <p :class="s.date">22th Sep, 2046</p>
        <IconCubeButton 
            :class="s.button" 
            :svg="SVG.MoreDots" 
        />
    </div>
    
    <div :class="s.body">
        <label 
            for=""
            :class="s.label"
        >
            Bees to reees
        </label>
        <p 
            :class="s.content"
        >
            One day i stumbled accross this beehive and hit it with my ball. Not safe to say that everything is not okey. After that masive hit all hive inhabitants started attacking ME!!! Didnt know that they're were going to be so pissed tf??!! Like chill out dude its not that serious.
        </p>
        <div :class="s.footer">
            <!-- <p>Andrea Biggie</p>
            <p :class="s.information">Information</p> -->
        </div>
    </div>

</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.button
    margin-left: auto
.container
    display: flex
    flex-direction: column

    font-family: var(--font-family)

    box-sizing: border-box
    padding: 1rem
    background: var(--light-gray)
    border-radius: var(--border-radius-small)
    box-shadow: 0 0 1px 0 var(--faint-border)

    .header
        display: flex
        align-items: center
        gap: .5rem

        .iconWrapper
            display: flex
            align-items: center
            justify-content: center
            height: 2rem
            width: 2rem

            background: var(--yellow)
            border-radius: var(--border-radius-small)
            box-shadow: 0 1px 1px 0 var(--faint-border)


        .date
            color: #66656c
            font-weight: 300
            letter-spacing: .02em
            line-height: 2rem
            font-size: var(--font-size-small)

    .body
        display: flex
        flex-direction: column
        .label
            color: var(--black)
            font-size: var(--font-size-big)
            letter-spacing: .02em
            margin-top: .7rem
            margin-bottom: .6rem
            font-weight: 500
            line-height: 2rem

        .content
            color: #6a6b76
            font-weight: 300
            letter-spacing: .02em
            line-height: 1.5rem
            font-size: var(--font-size-medium)

    .footer

</style>