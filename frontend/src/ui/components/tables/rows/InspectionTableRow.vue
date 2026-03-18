<script setup lang="ts">
import { Role } from "@/core/DatabaseEnums";
import type { InspectionTableEntryModel, WhitelistEntryModelDB } from "@/core/stores/Models";
import { reactive, ref, useCssModule } from "vue";
import ModularDropdown from "../../input/dropdowns/ModularDropdown.vue";
import TextDropdownBottomPart from "../../input/dropdowns/dropdownItems/bottom/TextDropdownBottomPart.vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import TableRowSelectionDropdownTopPart from "../../input/dropdowns/dropdownItems/top/TableRowSelectionDropdownTopPart.vue";
import { useAdminStore } from "@/core/stores/AdminStore";
import { formatDateWithOrdinal } from "@/core/utils/Utils";
import IconTextButton from "../../input/buttons/IconTextButton.vue";
import { useInspectionStore } from "@/core/stores/InspectionStore";

const s = useCssModule()
const props = defineProps<{
    entry:       InspectionTableEntryModel
    orderNumber: number
}>()
const isEditingRow = ref(false)
const inspectionStore = useInspectionStore()
</script>

<template>
<tr 
    :class="[
        s.row,
        isEditingRow && s.edited
    ]"
    :style="(orderNumber + 1) % 2 === 0 && { filter: 'brightness(98%)' }"
    :key="entry.id"
>
    <td 
        :class="s.nr"
    >
        <p :class="s.columnText">{{ orderNumber + 1 }}</p>
    </td>
    <td 
        :class="s.email"
    >
        <p 
            :style="{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }"
        >
            #{{ entry.apiaryId + " " + entry.apiaryName }} 
        </p>
    </td>
    <td 
        :class="s.creator"
    >
        <p 
            :style="{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }"
        >
            {{ entry.username }} 
        </p>
    </td>
    <td 
        :class="s.creationDate"
    >
        <p 
            :style="{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }"
        >
            {{ formatDateWithOrdinal(entry.creationDate) }} 
        </p>
    </td>
    <td 
        :class="s.actions"
    >
        <IconTextButton
            :svg="SVG.Logout"
            :type="IconType.SMALL"
            text="Open"
            @click="inspectionStore.openInspection(entry.id)"
        />
        <IconTextButton
            :svg="SVG.Cog"
            :type="IconType.SMALL"
            text="Settings"
        />
    </td>
</tr>
</template>

<style module lang='sass'>
.edited
    background: var(--gray) !important
.input
    all: unset
    width: 100%
    height: 100%
    box-sizing: border-box
    font-size: var(--font-size-medium)

.row
    display: flex
    align-items: center
    box-sizing: border-box
    background: var(--white)
    gap: .5rem
    min-height: 3rem
    height: 3rem
    max-height: 3rem
    font-weight: 300
    opacity: .8


td
    padding: 0
    height: 100%

.nr
    display: flex
    align-items: center
    justify-content: center
    min-width: 3rem

.email
    width: 100%

.creator
    min-width: 20rem

.creationDate
    min-width: 20rem

.actions
    display: flex
    align-items: center
    gap: .5rem
    width: 100%
</style>