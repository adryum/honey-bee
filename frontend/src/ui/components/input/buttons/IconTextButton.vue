<script setup lang="ts">
import { useCssModule } from "vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import Icon from "../../Icon.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    svg?:       SVG
    text?:      string
    disabled?:  boolean
    isLoading?: boolean
}>(), {
    svg:      SVG.Dollar,
    text:     'BUTTON',
    disabled: false
})
</script>

<template>
<button 
    type="button" 
    :class="[
        s.container, 
        disabled || isLoading ? s.disabled : s.enabled,
    ]"
    :disabled="disabled || isLoading"
>
    <Icon 
        :class="[
            s.icon,
            isLoading && s.rotate
        ]" 
        :type="IconType.SMALL" 
        :svg="isLoading ? SVG.Restart : svg"
    />
    <p :class="s.text">{{ text }}</p>
</button>
</template>

<style module lang='sass'>
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
    display:    inline-flex
    gap:        .5rem
    height:     2rem
    min-height: 2rem
    max-height: 2rem

    font-family: var(--font-family)
    font-size:   var(--font-size-small)

    padding: 0 .5rem

    background:    white
    border:        1px solid var(--blue)
    border-radius: var(--border-radius-small)
    box-sizing:    border-box
    transition:    .1s
    outline-color: var(--blue)

    &.enabled
        cursor: pointer

        &:hover
            filter: brightness(95%)
              // outline: 1px solid var(--blue)

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