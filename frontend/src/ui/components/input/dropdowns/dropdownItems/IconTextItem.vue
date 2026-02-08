<script setup lang="ts">
import { IconType } from "@/assets/svgs/SVGLoader";
import type { IconTextDropdownItemModel } from "@/core/models/Models";
import Icon from "@/ui/components/Icon.vue";
import { useCssModule } from "vue";

const s = useCssModule()
const props = defineProps<{
    options: IconTextDropdownItemModel
}>()
</script>

<template>
<li 
    :class="s.item"
    @click="options.onClick"
>
    <Icon
        :svg="options.svg"
        :type="IconType.SMALL"
    />
    <p :class="s.text">
        {{ options.text }}
    </p>
</li>
</template>

<style module lang='sass'>
.item
    display: flex
    align-items: center
    gap: .5rem
    margin: 0
    padding: 0
    text-decoration: none
    min-height: 2rem
    max-height: 2rem
    height: 2rem
    padding: 0 .75rem
    cursor: pointer

    transition: .1s

    border-radius: var(--border-radius-tiny)

    .text
        font-size: var(--font-size-small)

    &:hover
        background: var(--gray)
</style>