<script setup lang="ts">
import { useCssModule } from "vue";
import Button from "../input/buttons/Button.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import StringSearchDropdown from "../input/dropdowns/StringSearchDropdown.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <IconTextButton 
        text="Create note" 
        :class="s.create"
        :svg="SVG.Pencil"
    />
    <StringSearchDropdown
        :class="s.search"
        :options="{
            placeholder: 'Search by anything...'
        }"
    />
</div>
</template>

<style module lang='sass'>
.container
    display: flex
    gap: .5rem
    width: 100%

    .search
        margin-left: auto
        width: 15rem
</style>