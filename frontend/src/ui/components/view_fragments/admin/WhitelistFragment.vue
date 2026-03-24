<script setup lang="ts">
import { ref, useCssModule } from "vue";
import WhitelistTable from "../../tables/WhitelistTable.vue";
import IconTextButton from "../../input/buttons/IconTextButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import CreateWhitelistEntryModal from "../../modals/CreateWhitelistEntryModal.vue";
import type { ModalBaseModel } from "@/core/composables/useModalBase";

const s = useCssModule()
const createWhitelistEntry = ref<ModalBaseModel | undefined>()
</script>

<template>
<div :class="s.container">
    <div
        :class="s.toolbar"
    >
        <IconTextButton
            text="Add entry"
            :svg="SVG.Plus"
            @click="createWhitelistEntry?.open()"
        />
    </div>
    <WhitelistTable
    
    />
    <CreateWhitelistEntryModal
        ref="createWhitelistEntry"
    />
</div>
</template>

<style module lang="sass">
.toolbar
    display:       flex
    align-items:   center
    height:        3.5rem
    background:    var(--white)
    padding:       0 .5rem
    border-radius: 0 var(--border-radius-small) var(--border-radius-small) var(--border-radius-small)

.container
    display:        flex
    flex-direction: column
    gap:            1rem
</style>