<script setup lang="ts">
import { useCssModule } from "vue";
import InspectionTableRow from "./rows/InspectionTableRow.vue";

import type { InspectionTableEntryModel } from "@/core/stores/Models";

const s = useCssModule()
const props = defineProps<{
    entries: InspectionTableEntryModel[]
}>()

</script>

<template>
<table
    :class="s.table"
>
    <thead 
        :class="s.header"
    >
        <tr 
            :class="s.row"
        >
            <td 
                :class="s.nr"
            >
                <p :class="s.columnText">Nr.</p>
            </td>
            <td 
                :class="s.email"
            >
                <p :class="s.columnText">Apiary</p>
            </td>
            <td 
                :class="s.creator"
            >
                <p :class="s.columnText">Creator</p>
            </td>
            <td 
                :class="s.creationDate"
            >
                <p :class="s.columnText">Creation date</p>
            </td>
            <td 
                :class="s.actions"
            >
                <p :class="s.columnText">Actions</p>
            </td>
        </tr>
    </thead>


    <tbody
        :class="s.body"
    >
        <InspectionTableRow
            v-for="(entry, i) in entries" 
            :key="entry.id" 
            :entry="entry"
            :order-number="i"
        />
    </tbody>


    <tfoot
        :class="s.footer"
    >
        <tr 
            :class="s.row"
        >
            <slot>
                
            </slot>
        </tr>
    </tfoot>
</table>
</template>

<style module lang='sass'>
.table
    all:            unset
    display:        flex
    flex-direction: column
    gap:            .1rem

    font-family: var(--font-family)
    font-size:   var(--font-size-medium)

    border-radius: var(--border-radius-small)
    overflow:      hidden
    // background:    var(--white)


.row
    display:     flex
    align-items: center
    box-sizing:  border-box
    background:  var(--white)
    gap:         .5rem


.header
    all:    unset
    width:  100%
    height: 3rem

    .row
        height: 100%

        td
            height: auto

.body
    all: unset

    

.footer
    all:    unset
    width:  100%
    height: 2rem

    .row
        height:     100%

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

.creator
    min-width: 20rem

.creationDate
    min-width: 20rem

.actions
    width: 100%

</style>