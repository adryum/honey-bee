<script setup lang="ts">
import { ref, useCssModule } from "vue";
import { useFloatingUI } from "@/core/composables/field/useFloatingUI";
import IconCubeButton from "../buttons/IconCubeButton.vue";
import type { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
const props = withDefaults(defineProps<{
    icon: SVG
    transparent?: boolean
    noBorderRadius?: boolean
}>(), {
    transparent: false,
    noBorderRadius: false
})
const anchor = ref()
const list = ref()
const isShown = ref(false)
const { floaterStyle } = useFloatingUI({
    anchorElement: anchor, 
    floatingElement: list,
    isShown: isShown,
    floaterOffset: 1
})
</script>

<template>
<div 
    :class="s.container"

>   
    <IconCubeButton
        ref="anchor"
        :class="s.icon"
        :icon="icon"
        :transparent="transparent"
        :no-border-radius="noBorderRadius"
        @click.stop="isShown = !isShown"
    />
    <Teleport to="body">
        <ol 
            v-show="isShown"
            ref="list"
            :class="$style.floater"
            :style="floaterStyle"
            @click="isShown = !isShown"
        >
            <slot>

            </slot>
        </ol>
    </Teleport>
</div>
</template>

<style module lang='sass'>
.container
    .icon
        position: relative

.floater
    display: flex
    flex-direction: column
    margin: 0
    padding: 0
    background: var(--white)
    padding: .2rem
    box-sizing: border-box
    text-decoration: none

    font-family: var(--font-family)

    box-shadow:  0px 0px 1px 0px var(--faint-border)
    border-radius: var(--border-radius-tiny)
</style>