<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import WhitelistFragment from "@/ui/components/admin/WhitelistFragment.vue";
import UserlistFragment from "../components/admin/UserlistFragment.vue";
import { AdminTab } from "@/core/ViewTabEnums";
import { SVG } from "@/assets/svgs/SVGLoader";
import WhitelistEntryCreateModal from "../components/modals/WhitelistEntryCreateModal.vue";
import type { ModalBaseModel } from "@/core/composables/useModalBase";
import ToolBar from "../components/ToolBar.vue";
import { useRouter } from "vue-router";
import { RouterViewPaths } from "@/core/router";
import IconTextButton from "../components/input/buttons/IconTextButton.vue";
import { useI18n } from "vue-i18n";
import { useEnumTranslation } from "@/core/locales/i18n.ts";

const s = useCssModule()
const { t } = useI18n()
const { tEnum } = useEnumTranslation()

const translatedTabs = computed(() =>
    Object.values(AdminTab).map(tab => ({
        value: tab,
        label: tEnum('adminTab', tab)
    }))
)
const props = defineProps<{
    tab: AdminTab
}>()
const router = useRouter()
const createWhitelistEntry = ref<ModalBaseModel | undefined>()

function changeTab(tab: AdminTab) {
    console.log("change", tab);
    
    router.replace({
        name: RouterViewPaths.Admin,
        params: { 
            tab: tab 
        }
    })
}
</script>

<template>
<div :class="s.container">
    <ToolBar 
        :label="t('admin.page_title')"
        :tabs="translatedTabs" 
        :selectedTab="tab" 
        @changeTab="changeTab"
    >
        <template #header>
            <IconTextButton
                v-if="tab === AdminTab.Whitelist"
                :text="t('admin.button_add_entry')"
                :icon="SVG.Plus"
                @click="createWhitelistEntry?.open()"
            />
        </template>
    </ToolBar>

    <WhitelistFragment
        v-if="tab === AdminTab.Whitelist"
    />

    <UserlistFragment
        v-if="tab === AdminTab.Users"
    />


    <WhitelistEntryCreateModal
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