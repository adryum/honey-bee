<script setup lang="ts">
import { useFloatingUI } from "@/core/composables/field/useFloatingUI";
import type { DropdownModel } from "@/core/models/Models";
import { ref, useCssModule } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label?: string
    zIndex?: number
}>(), {
    label: '',
    zIndex: 0
})
const anchor = ref()
const list = ref()

const model: DropdownModel = {
    isShown: ref(false)
}
const { floaterStyle } = useFloatingUI({
    anchorElement: anchor,
    floatingElement: list,
    isShown: model.isShown,
    floaterOffset: 4,
    zIndex: props.zIndex,
    takeWidthFromAnchor: true
})
</script>

<template>
<div
    id="dropdown"
    ref="anchor" 
    :class="s.container"
>
    <label 
        v-if="label !== ''"
        for="dropdown"
        :class="s.label"
        @click="model.isShown.value = !model.isShown.value"
    >
        {{ label }}
    </label>
    <slot 
        name="head" 
        :dropdown="model"
    >
        Head filler
    </slot>
    <Teleport to="body">
        <div 
            v-show="model.isShown.value"
            ref="list"
            :class="$style.list"
            :style="floaterStyle"
        >
            <slot 
                name="list"
                :dropdown="model"
            >
                Body filler
            </slot>
        </div>
    </Teleport>
</div>
</template>

<style module lang='sass'>
.label
    opacity: .8
    font-weight: 600
    letter-spacing: .04em
    font-size: var(--font-size-small)
    font-family: var(--font-family)
    color: var(--black)
    margin-bottom: .5rem

.list
    display: flex
    flex-direction: column
    background: white
    box-shadow: inset 0 0 0 1px var(--yellow)
    border-radius: var(--border-radius-small)
    box-sizing: border-box
    padding: 4px
    overflow: hidden

.container
    display: flex
    flex-direction: column

</style>