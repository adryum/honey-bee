<script setup lang="ts">
import { useFloatingUI } from "@/core/composables/field/useFloatingUI";
import type { DropdownModel } from "@/core/models/Models";
import { ref, useCssModule } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label?:         string
    zIndex?:        number
    color?:         string
    floaterOffset?: number
}>(), {
    label:         '',
    zIndex:        0,
    floaterOffset: 4
})
const anchor = ref()
const list   = ref()

const model: DropdownModel = {
    isShown: ref(false)
}
const { floaterStyle } = useFloatingUI({
    anchorElement:       anchor,
    floatingElement:     list,
    isShown:             model.isShown,
    floaterOffset:       props.floaterOffset,
    zIndex:              props.zIndex,
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
            :style="{ 
                ...floaterStyle, 
                boxShadow: `0 0 2px 1px ${props.color || 'var(--yellow)'}`,
                width: `calc(${floaterStyle.width} - 2px)`,
                left: `calc(${floaterStyle.left} - 1px)`
            }"
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
    opacity:        .8
    font-weight:    600
    letter-spacing: .04em
    font-size:      var(--font-size-small)
    font-family:    var(--font-family)
    color:          var(--black)
    margin-bottom:  .5rem

.list
    display:        flex
    flex-direction: column
    background:     var(--white)
    border-radius:  var(--border-radius-small)
    box-sizing:     border-box
    gap:            .1rem
    overflow:       hidden
    padding:        .25rem


.container
    display:        flex
    flex-direction: column

</style>