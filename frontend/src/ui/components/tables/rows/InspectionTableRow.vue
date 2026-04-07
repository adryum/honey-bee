<script setup lang="ts">
import type { InspectionTableEntryModel } from "@/core/stores/Models";
import { ref, useCssModule } from "vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import { formatDateWithOrdinal } from "@/core/utils/Utils";
import IconTextButton from "../../input/buttons/IconTextButton.vue";
import { useRouter } from "vue-router";
import type { ModalBaseModel } from "@/core/composables/useModalBase";
import ProcessInspectionModal from "../../modals/ProcessInspectionModal.vue";

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    entry:       InspectionTableEntryModel
    orderNumber: number
}>()
const isEditingRow = ref(false)
const processInspectionModal = ref<ModalBaseModel>()

function openInspection(id: number) {
    router.push(`/inspection/${id}`)
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
        :class="s.inspectedHiveCount"
    >
    <p 
            :style="{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }"
        >
            {{ entry.formCount }} 
        </p>
    </td>
    <td 
        :class="s.hasBeenProcessed"
    >
        <p 
            :style="{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }"
        >
            {{ entry.processed }} 
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
            {{ formatDateWithOrdinal(entry.creationDate, true) }} 
        </p>
    </td>
    <td 
        :class="s.actions"
    >
        <IconTextButton
            :svg="SVG.Logout"
            :type="IconType.SMALL"
            text="Open"
            @click="openInspection(entry.id)"
        />
        <IconTextButton
            :svg="SVG.Cog"
            :type="IconType.SMALL"
            text="Process"
            @click="processInspectionModal?.open()"
        />
    </td>
    <ProcessInspectionModal
        ref="processInspectionModal"
        :inspection-id="entry.id"
    />
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

.hasBeenProcessed
    min-width: 15rem
.inspectedHiveCount
    min-width: 10rem
.email
    width: 100%

.creator
    min-width: 15rem

.creationDate
    min-width: 15rem

.actions
    display: flex
    align-items: center
    gap: .5rem
    width: 100%
</style>