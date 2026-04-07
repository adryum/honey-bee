<script setup lang="ts">
import { useCssModule } from "vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import Icon from "../../Icon.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    svg?:              SVG
    text?:             string
    disabled?:         boolean
    isLoading?:        boolean
    isSubmit?:         boolean
    swapIconPosition?: boolean
    isAlignedCenter?:  boolean
    hideIcon?:         boolean
}>(), {
    svg:      SVG.Dollar,
    text:     'BUTTON',
    disabled: false
})
</script>

<template>
<button 
    :type="isSubmit ? 'submit' : 'button'" 
    :class="[
        s.container, 
        isSubmit && s.submit,
        isAlignedCenter && s.alignedCenter,
        disabled || isLoading ? s.disabled : s.enabled,
    ]"
    :disabled="disabled || isLoading"
>
    <Icon 
        v-if="!swapIconPosition && !hideIcon"
        :class="[
            s.icon,
            isLoading && s.rotate
        ]" 
        :type="IconType.SMALL" 
        :svg="isLoading ? SVG.Restart : svg"
    />
    <p :class="[isSubmit ? s.submitText : s.text]">{{ text }}</p>
    <Icon 
        v-if="swapIconPosition && !hideIcon"
        :class="[
            s.icon,
            isLoading && s.rotate
        ]" 
        :type="IconType.SMALL" 
        :svg="isLoading ? SVG.Restart : svg"
    />
</button>
</template>

<style module lang='sass'>
.alignedCenter
    justify-content: center

.submitText
    color: white
    font-size: var(--font-size-medium)
    letter-spacing: .04em
    font-weight: 500

@keyframes rotate-clockwise 
    0%
        transform: rotateZ(0deg)
    100% 
        transform: rotateZ(360deg)


.rotate
    animation:                 rotate-clockwise
    animation-duration:        1s
    animation-timing-function: linear
    animation-iteration-count: infinite

.disabled
    pointer-events: none
    & > *
        opacity: .4

.container
    border: none
    background: none
    display:    inline-flex

    align-items: center

    gap:        .5rem
    height:     2rem
    min-height: 2.5rem
    max-height: 2rem

    font-family: var(--font-family)
    font-size:   var(--font-size-small)

    box-sizing:    border-box
    padding: 0 1rem
    border-radius: var(--border-radius-small)

    transition: .1s

    &:hover
        // filter: brightness(95%)
        background: var(--gray)

    &.submit
        height:     2.5rem
        min-height: 2.5rem
        max-height: 2.5rem
        background: var(--black)
        color: white

        &:hover
            filter: brightness(95%) !important

    &.enabled
        cursor: pointer

       

.icon
    align-self: center
    max-height: 1rem
    max-width:  1rem

.text
    align-self:  center
    margin:      0
    font-weight: 500
    line-height: 1.5rem
    color:       var(--black)
    white-space: nowrap
</style>