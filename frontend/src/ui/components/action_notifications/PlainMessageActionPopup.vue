<script setup lang="ts">
import { computed, useCssModule, watch } from "vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import { useActionsStore, type ActionUIModel } from "@/core/stores/ActionStore";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import Icon from "../Icon.vue";

const s = useCssModule()
const props = defineProps<{
    action: ActionUIModel
}>()

const { hideAnimation, showAnimation } = useActionsStore()

function onSlideComplete(event: AnimationEvent, action: ActionUIModel) {
    console.log("Slide animation finished!", event)

    if (event.animationName.includes("slide-in")) {
        action.entering.value = false
        action.entered.value = true
    }

    if (event.animationName.includes("slide-away")) {
        action.exiting.value = false
        action.exited.value = true
    }
}
</script>

<template>
<div 
    :class="[
        s.container, 
        action.entering.value && s.slideIn,
        action.exiting.value && s.slideAway
    ]"
    @animationend="e => onSlideComplete(e, action)"
>
    <div
        :class="s.body"
    >
        <div
            :class="s.iconWrapper"
        >
            <Icon
                :svg="SVG.Cog"
                :type="IconType.MEDIUM"
            />
        </div>

        <p 
            :class="s.message"
        >
            {{ action.message }}
        </p>
        <button
            v-if="action.action" 
            :class="s.button"
            @click="action.action.action"    
        >
            {{ action.action.buttonText }}
        </button>
        <IconCubeButton 
            :svg="SVG.Cross"
            :transparent="true"
            :is-important="false"
            @click="hideAnimation(action)"
        />
    </div>
    <div 
        :class="s.progressBar"
        :style="{
            background: `linear-gradient(90deg,${action.type} ${action.progress.value}%, var(--dark) ${action.progress.value}%)`
        }"
    ></div>
</div>
</template>

<style module lang='sass'>
@keyframes slide-in 
    0% 
        transform: translateX(calc(100% + 1rem))

    100% 
        transform: translateX(0rem)

@keyframes slide-away 
    0% 
        transform: translateX(0rem)

    100% 
        transform: translateX(calc(100% + 5rem))
.slideIn
    animation: slide-in
    animation-duration: 0.2s   // set duration you want
    animation-fill-mode: forwards // keep final state
    animation-timing-function: ease-in-out

.slideAway
    animation: slide-away
    animation-duration: 0.5s   // set duration you want
    animation-fill-mode: forwards // keep final state
    animation-timing-function: ease-in-out

.progressBar
    height: .5rem
    min-height: .5rem

.iconWrapper
    width: 2rem
    height: 2rem
    background: var(--gray)
    border-radius: var(--border-radius-tiny)

    display: flex
    align-items: center
    justify-content: center

.container
    display: flex
    flex-direction: column
    border-radius: var(--border-radius-tiny)
    background: var(--white)
    box-shadow: 0 0 5px -1px var(--faint-border)
    overflow: hidden

    .body
        position: relative
        display: flex
        gap: 1rem
        box-sizing: border-box
        padding: .5rem
        align-items: center
        min-height: 3rem
        font-family: var(--font-family)
        font-weight: 500
        color: var(--black)
        box-shadow: inset 0 -2.5px 2px -2px var(--faint-border)


        .message
            margin: 0
            margin-right: auto
            font-size: var(--font-size-medium)
            font-weight: 500
            letter-spacing: .02em

        .button
            border: none
            margin: none
            background: transparent

            color: teal
            align-self: stretch
            padding: .5rem
            box-sizing: border-box
            font-family: var(--font-family)
            font-size: var(--font-size-small)
            border-radius: var(--border-radius-tiny)
            letter-spacing: .02em



            cursor: pointer


            &:hover
                background: var(--blue)



</style>