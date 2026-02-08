<script setup lang="ts">
import { useFloatingUI } from "@/core/composables/field/useFloatingUI";
import { ref, useCssModule, type Ref } from "vue";

const s = useCssModule()
const anchor = ref()
const list = ref()
type DropdownModel = {
    isShown: Ref<boolean>
}
const model: DropdownModel = {
    isShown: ref(false)
}
const { floaterStyle } = useFloatingUI({
    anchorElement: anchor,
    floatingElement: list,
    isShown: model.isShown,
    floaterOffset: 2
})

</script>

<template>
<div :class="s.container">
    <slot 
        name="head" 
        :dropdown="model"
    >
        DropdownModel
    </slot>
    <Teleport to="body">
        <div 
            v-if="model.isShown"
            :class="$style.list"
            :style="floaterStyle"
        >
            <slot 
                name="list"
                :dropdown="model"
            >
                DropdownModel
            </slot>
        </div>
    </Teleport>
</div>
</template>

<style module lang='sass'>
.list
    background: white

.container

</style>