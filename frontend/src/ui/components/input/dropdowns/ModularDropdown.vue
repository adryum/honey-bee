<script setup lang="ts">
import { useFloatingUI } from "@/core/composables/field/useFloatingUI";
import type { DropdownModel } from "@/core/models/Models";
import { useElementExists } from "@/core/utils/Hooks";
import { computed, isRef, ref, useCssModule, watch, type Ref } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    teleportTargetId?: string | Ref<string>
    label?:            string
    zIndex?:           number
    color?:            string
    floaterOffset?:    number
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

const tpTargetId = computed(() => isRef(props.teleportTargetId) 
    ? props.teleportTargetId.value 
    : props.teleportTargetId
)
const teleportTargetExists = computed(() => !!tpTargetId.value)
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
    <Teleport 
        v-if="teleportTargetId ? teleportTargetExists : true"
        :key="tpTargetId"
        :to="teleportTargetId ? `#${teleportTargetId}` : 'body'"  
    >
        <div 
            v-if="model.isShown.value"
            ref="list"
            :class="$style.list"
            :style="{ 
                ...floaterStyle, 
                boxShadow: `0 0 5px 0 ${props.color || 'var(--dark)'}`,
                width: `calc(${floaterStyle.width} )`,
                left: `calc(${floaterStyle.left})`
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

.container
    display:        flex
    flex-direction: column

</style>