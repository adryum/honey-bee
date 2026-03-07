<script setup lang="ts">
import { useApiaryStore } from "@/core/stores/ApiaryStore";
import { storeToRefs } from "pinia";
import { computed, reactive, ref, useCssModule } from "vue";
import Apiary from "../../apiary/Apiary.vue";
import { isValidValue, useFlexibleGrid } from "@/core/utils/others";
import { useProfileStore } from "@/core/stores/ProfileStore";
import type { ApiaryModelDB } from "@/core/stores/Models";
import { useAdminStore } from "@/core/stores/AdminStore";

const s = useCssModule()
const adminStore       = useAdminStore()
const apiaryStore      = useApiaryStore()
const profileStore     = useProfileStore()
const { apiaries }     = storeToRefs(apiaryStore)
const { apiaryAccess } = storeToRefs(profileStore)

type ApiaryAccessModel = {
    apiary:           ApiaryModelDB
    hasAccess:        boolean,
    isChangingAccess: boolean
}

const changingAccess = reactive<Record<number, boolean>>({})
const showedApiariesUI = computed<ApiaryAccessModel[]>(() => {
    return apiaries.value.map(item => ({
        apiary:           item,
        hasAccess:        Boolean(apiaryAccess.value.find(accessItem => accessItem === item.id)),
        isChangingAccess: changingAccess[item.id] ?? false
    }))
})

const grid = ref()
const { style: gridStyle } = useFlexibleGrid({ 
    gridRef:        grid,
    itemMinWidthPx: 300,
    gapPx:          10
})

async function toggleApiaryAccess(model: ApiaryAccessModel) {
    const userId = profileStore.openedUser?.id
    if (!isValidValue(userId) || changingAccess[model.apiary.id]) return

    changingAccess[model.apiary.id] = true

    try {
        const { apiary, hasAccess } = model

        const result = await adminStore.updateAccessToApiary({
            userId:     userId!,
            apiaryId:   apiary.id,
            giveAccess: !hasAccess
        })

        if (result) {
            console.log("SUCCESS");
            
            if (result.hasAccess) {
                // add access
                profileStore.apiaryAccess.push(result.apiaryId) 
            } else {
                // remove access
                profileStore.apiaryAccess = profileStore.apiaryAccess.filter(id => id !== result.apiaryId)
            }
        } else {
            console.log("FAILS");
        }

    } catch (error) {
        
    } finally {
        changingAccess[model.apiary.id] = false
    }
}
</script>

<template>
<div :class="s.container">
    <p
        :class="s.label"
    >
        Apiaries
    </p>
    <div 
        ref="grid"
        :style="gridStyle"
        :class="s.grid"
    >
        <Apiary
            v-for="showedApiary in showedApiariesUI"
            :key="showedApiary.apiary.id"
            :apiary="showedApiary.apiary"
            :is-dimmed="!showedApiary.hasAccess"
            :class="s.item"
        >
            <button 
                :class="[
                    s.checkbox,
                    showedApiary.hasAccess ? s.hasAccess : s.noAccess
                ]"
                @click="toggleApiaryAccess(showedApiary)"
            ></button>
        </Apiary>
    </div>
</div>
</template>

<style module lang="sass">
.checkbox
    all: unset
    aspect-ratio: 1
    margin: .5rem
    width: 2rem

    border-radius: var(--border-radius-tiny)
    box-shadow: inset 0 0 0 1px var(--dark)
    cursor: pointer

    &.hasAccess
        background: var(--white)

    &.noAccess
        background: var(--gray)

.label
    +bulletLabel
    display: flex
    margin: 1rem 0 

.grid

    .item
        height: 15rem

.container
    height: 100%

    background: var(--white)
    padding: 0 1rem 1rem 1rem 
</style>