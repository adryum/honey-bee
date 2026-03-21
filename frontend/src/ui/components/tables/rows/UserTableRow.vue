<script setup lang="ts">
import { Role } from "@/core/DatabaseEnums";
import type { UserEntryModelDB, WhitelistEntryModelDB } from "@/core/stores/Models";
import { reactive, ref, useCssModule } from "vue";
import ModularDropdown from "../../input/dropdowns/ModularDropdown.vue";
import TextDropdownBottomPart from "../../input/dropdowns/dropdownItems/bottom/TextDropdownBottomPart.vue";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import TableRowSelectionDropdownTopPart from "../../input/dropdowns/dropdownItems/top/TableRowSelectionDropdownTopPart.vue";
import { useAdminMutation } from "@/core/composables/useAdmin";

const s = useCssModule()
const props = defineProps<{
    entry:       UserEntryModelDB
    orderNumber: number
}>()
const isEditingRow = ref(false)

const editableEntry = reactive<UserEntryModelDB>({ ...props.entry })
const { updateRegisteredUserEntry } = useAdminMutation()

async function openProfile(userId: number) {

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
            :class="s.input"
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
                    :dropdown="dropdown"
                    :selectedValue="editableEntry.isWhitelisted ? 'Yes' : 'No'"
                    :showIcon="isEditingRow"
                    :allowToggling="isEditingRow"
                />
            </template>
            <template #list="{dropdown}">
                <TextDropdownBottomPart
                    :dropdown="dropdown" 
                    text="Allowed"
                    @click="editableEntry.isWhitelisted = true"
                />
                <TextDropdownBottomPart 
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
            :svg="SVG.Pencil"
            @click="isEditingRow = !isEditingRow"
        >
            <!-- <p>Edit</p> -->
        </IconCubeButton>
        <IconCubeButton 
            v-if="isEditingRow"
            :svg="SVG.Save"
            @click="save"
        >
            <!-- <p>Save</p> -->
        </IconCubeButton>
        <IconCubeButton 
            v-if="isEditingRow"
            :svg="SVG.Cross"
            @click="cancel"
        >
            <!-- <p>Cancel</p> -->
        </IconCubeButton>
        <IconCubeButton 
            v-if="!isEditingRow"
            :svg="SVG.Profile"
            @click="openProfile"
        />
    </td>
</tr>
</template>

<style module lang='sass'>
.edited
    background: var(--gray) !important
.input
    all:        unset
    width:      100%
    height:     100%
    box-sizing: border-box
    font-size:  var(--font-size-medium)

.row
    display:     flex
    align-items: center
    box-sizing:  border-box
    background:  var(--white)
    gap:         .5rem
    min-height:  2.5rem
    height:      2.5rem
    max-height:  2.5rem
    font-weight: 300
    opacity:     .8


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