<script setup lang="ts">
import { ref, useCssModule } from "vue";
import WhitelistFragment from "../components/view_fragments/admin/WhitelistFragment.vue";
import UserlistFragment from "../components/view_fragments/admin/UserlistFragment.vue";
import Navbar from "../components/Navbar.vue";
import { AdminTab } from "@/core/ViewTabEnums";
import { SVG } from "@/assets/svgs/SVGLoader";
import CreateWhitelistEntryModal from "../components/modals/CreateWhitelistEntryModal.vue";
import type { ModalBaseModel } from "@/core/composables/useModalBase";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";

const s = useCssModule()
const seletedTab = ref<AdminTab>(AdminTab.Whitelist)
const createWhitelistEntry = ref<ModalBaseModel | undefined>()

</script>

<template>
<div :class="s.container">
    <Navbar 
        :tabs="Object.values(AdminTab)" 
        :selectedTab="seletedTab" 
        @changeTab="(e) => seletedTab = e"
    >
        <IconTextButton
            v-if="seletedTab === AdminTab.Whitelist"
            text="Add entry"
            :icon="SVG.Plus"
            @click="createWhitelistEntry?.open()"
        />
    </Navbar>

    <WhitelistFragment
        v-if="seletedTab === AdminTab.Whitelist"
    />

    <UserlistFragment
        v-if="seletedTab === AdminTab.Users"
    />


    <CreateWhitelistEntryModal
        ref="createWhitelistEntry"
    />
</div>
</template>

<style module lang='sass'>

.selected
    background: var(--white) !important
    & > *
        opacity: 1 !important

.button
    margin:         0
    border:         none
    background:     var(--black)
    padding:        0 1rem
    height:         2rem
    letter-spacing: .02em
    font-family:    var(--font-family)
    font-size:      var(--font-size-small)
    border-radius:  var(--border-radius-small) var(--border-radius-small) 0 0
    cursor:         pointer
    transition:     0.1s

    & > *
        opacity: 0.7

    &:hover
        filter: brightness(1.05)

        & > *
            opacity: 1

.container 
    display:        flex
    flex-direction: column
    height:         calc( 100vh - var(--header-height))
    width:          100%
    padding:        1rem
    box-sizing:     border-box
    gap: 1rem
</style>