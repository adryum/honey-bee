<script setup lang="ts">
import { useCssModule } from "vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import StringSearchDropdown from "../input/dropdowns/StringSearchDropdown.vue";
import NoteCreatePopup from "../popups/NoteCreatePopup.vue";
import { usePopupCreator } from "@/core/utils/PopupHiarchy";

const s = useCssModule()
const { create } = usePopupCreator({
    popupComponent: NoteCreatePopup,
    maxCount: 1
})
</script>

<template>
<div :class="s.container">
    <IconTextButton
        text="Create note" 
        :class="s.create"
        :svg="SVG.Pencil"
        @click="create"
    />
    <StringSearchDropdown
        :class="s.search"
        :options="{
            placeholder: 'Search by anything...',
            showIcon: true,
            onHoverEffects: true
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