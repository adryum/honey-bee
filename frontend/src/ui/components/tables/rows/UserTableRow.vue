<script setup lang="ts">
import { Role } from "@/core/DatabaseEnums";
import type { UserEntryModelDB, WhitelistEntryModelDB } from "@/core/stores/Models";
import { reactive, ref, useCssModule } from "vue";
import ModularDropdown from "../../input/dropdowns/ModularDropdown.vue";
import TextDropdownBottomPart from "../../input/dropdowns/dropdownItems/bottom/TextDropdownBottomPart.vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import TableRowSelectionDropdownTopPart from "../../input/dropdowns/dropdownItems/top/TableRowSelectionDropdownTopPart.vue";
import { useAdminMutations } from "@/core/composables/useAdmin";
import { useRouter } from "vue-router";
import { ProfileTab } from "@/core/ViewTabEnums";

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    entry:       UserEntryModelDB
    orderNumber: number
}>()
const isEditingRow = ref(false)

const editableEntry = reactive<UserEntryModelDB>({ ...props.entry })
const { updateRegisteredUserEntry } = useAdminMutations()

async function openProfile(userId: number) {
    router.push(`/profile/${userId}/${ProfileTab.GENERAL}`)
}

function save() {
    updateRegisteredUserEntry({
        id:            props.entry.id,
        email:         editableEntry.email,
        role:          editableEntry.role,
        isWhitelisted: editableEntry.isWhitelisted
    },
    {
        onSuccess: () => isEditingRow.value = false
    })
}

function cancel() {
    isEditingRow.value          = false
    editableEntry.email         = props.entry.email
    editableEntry.role          = props.entry.role
    editableEntry.isWhitelisted = props.entry.isWhitelisted
}
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
            v-if="!isEditingRow"
            :class="s.text"
            :style="{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }"
        >
            {{ editableEntry.email }}
        </p>
        <input 
            v-else
            type="text"
            :class="[s.input, s.text]"
            v-model="editableEntry.email"
        >
    </td>
    <td 
        :class="s.role"
    >
        <ModularDropdown
            :style="{
                height: '100%'
            }"
            color="var(--gray)"
        >
            <template #head="{dropdown}">
                <TableRowSelectionDropdownTopPart
            :class="s.text"
                    :dropdown="dropdown"
                    :selectedValue="editableEntry.role"
                    :showIcon="isEditingRow"
                    :allowToggling="isEditingRow"
                />
            </template>
            <template #list="{dropdown}">
                <TextDropdownBottomPart
                    v-for="role in Object.values(Role).filter(role => role !== Role.NOT_A_ROLE)"
                    :dropdown="dropdown" 
                    :text="role"
                    @click="editableEntry.role = role"
                />
            </template>
        </ModularDropdown>
    </td>
    <td 
        :class="s.status"
    >
        <ModularDropdown
            :style="{
                height: '100%'
            }"
            color="var(--gray)"
        >
            <template #head="{dropdown}">
                <TableRowSelectionDropdownTopPart
                    :class="s.text"
                    :dropdown="dropdown"
                    :selectedValue="editableEntry.isWhitelisted ? 'Yes' : 'No'"
                    :showIcon="isEditingRow"
                    :allowToggling="isEditingRow"
                />
            </template>
            <template #list="{dropdown}">
                <TextDropdownBottomPart
                    :class="s.text"
                    :dropdown="dropdown" 
                    text="Allowed"
                    @click="editableEntry.isWhitelisted = true"
                />
                <TextDropdownBottomPart 
                    :class="s.text"
                    :dropdown="dropdown" 
                    text="Denied"
                    @click="editableEntry.isWhitelisted = false"
                />
            </template>
        </ModularDropdown>
    </td>
    <td 
        :class="s.actions"
    >
        <IconCubeButton 
            v-if="!isEditingRow"
            :icon="SVG.Pencil"
            @click="isEditingRow = !isEditingRow"
        />
        <IconCubeButton 
            v-if="isEditingRow"
            :icon="SVG.Save"
            @click="save"
        />
        <IconCubeButton 
            v-if="isEditingRow"
            :icon="SVG.Cross"
            @click="cancel"
        />
        <IconCubeButton 
            v-if="!isEditingRow"
            :icon="SVG.Profile"
            @click="openProfile(entry.id)"
        />
    </td>
</tr>
</template>

<style module lang='sass'>
.text
    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    letter-spacing: .02em
    font-weight: 400
    color: #444

.edited
    background: var(--gray) !important
.input
    background: transparent
    border: none
    margin: 0
    padding: 0
    width:      100%
    height:     100%
    box-sizing: border-box

.row
    display:     flex
    align-items: center
    box-sizing:  border-box
    background:  var(--white)
    gap:         .5rem
    min-height:  2.5rem
    height:      2.5rem
    max-height:  2.5rem

td
    padding: 0
    height:  100%

.nr
    display:         flex
    align-items:     center
    justify-content: center
    min-width:       3rem

.email
    width: 100%

.role
    min-width: 20rem

.status
    min-width: 10rem

.actions
    display:     flex
    align-items: center
    gap:         .5rem
    width:       100%


</style>