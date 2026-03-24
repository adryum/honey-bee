<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import Apiary from "../../apiary/Apiary.vue";
import { isValidValue, useFlexibleGrid } from "@/core/utils/others";
import type { ApiaryModelDB } from "@/core/stores/Models";
import { useProfileQuery } from "@/core/composables/useProfile";
import { useAdminMutations } from "@/core/composables/useAdmin";

const s = useCssModule()
const props = defineProps<{
    userId: number
}>()

const { user, isLoading, isError } = useProfileQuery(props.userId)
const {} = useAdminMutations()

const userApiaryAccess = ref<number[]>([])
const userHiveAccess   = ref<number[]>([])

type ApiaryAccessModel = {
    apiary:           ApiaryModelDB
    hasAccess:        boolean,
    isChangingAccess: boolean
}

const showedApiariesUI = computed<ApiaryAccessModel[]>(() => {
    return apiaries.value.map(item => ({
        apiary:           item,
        hasAccess:        Boolean(apiaryAccess.value.find(accessItem => accessItem === item.id)),
        isChangingAccess: changingAccess[item.id] ?? false
    }))
})

const openedApiaryId = ref<number | null>(null)

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