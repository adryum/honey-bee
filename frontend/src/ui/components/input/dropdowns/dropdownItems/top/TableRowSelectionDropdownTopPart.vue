<script setup lang="ts">
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { DropdownModel } from "@/core/models/Models";
import Icon from "@/ui/components/Icon.vue";
import { useCssModule } from "vue";

const s = useCssModule()
const props = defineProps<{
    dropdown:      DropdownModel
    showIcon:      boolean
    allowToggling: boolean
    selectedValue: string
}>()
</script>

<template>
<div 
    :class="s.container"
    @click="allowToggling && (dropdown.isShown.value = !dropdown.isShown.value)"
>
    <p>
        {{ selectedValue }}
    </p>
    <Icon
        v-if="showIcon"
        :class="[
            s.icon,
            dropdown.isShown.value && s.opened
        ]"
        :svg="SVG.DropdownArrow"
        :type="IconType.SMALL"
    />
</div>
</template>

<style module lang='sass'>
.icon
    // position: absolute
    margin-right: .5rem
    transition: .1s
    transform: rotateZ(0deg)
    &.opened
        transform: rotateZ(180deg)
.container
    // position: relative
    display: flex
    align-items: center
    justify-content: space-between
    height: 100%
</style>