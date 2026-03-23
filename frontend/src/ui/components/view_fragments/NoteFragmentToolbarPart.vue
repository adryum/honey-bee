<script setup lang="ts">
import { ref, useCssModule } from "vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import StringSearchDropdown from "../input/dropdowns/StringSearchDropdown.vue";
import CreateNoteModal from "../modals/CreateNoteModal.vue";

const s = useCssModule()
const props = defineProps<{
    hiveId: number
}>()
const searchText = defineModel('searchText', { default: '' })
const createNoteModal = ref<InstanceType<typeof CreateNoteModal>>()

</script>

<template>
<div :class="s.container">
    <IconTextButton
        text="Create note" 
        :class="s.create"
        :svg="SVG.Pencil"
        @click="createNoteModal?.open()"
    />
    <StringSearchDropdown
        :class="s.search"
        :options="{
            placeholder: 'Search by anything...',
            showIcon: true,
            onHoverEffects: true,
            onInputChange(value) {
                searchText = value
            }
        }"
    />
    <CreateNoteModal
        ref="createNoteModal"
        :hive-id="hiveId"
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