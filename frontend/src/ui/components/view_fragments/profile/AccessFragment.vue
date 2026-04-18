<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from "vue";
import Apiary from "../../apiary/Apiary.vue";
import { isValidValue, useFlexibleGrid } from "@/core/utils/others";
import type { ApiaryModelDB, HiveModelDB } from "@/core/stores/Models";
import { useProfileQuery } from "@/core/composables/useProfile";
import { useAdminMutations } from "@/core/composables/useAdmin";
import { useApiariesQuery, useApiaryQuery } from "@/core/composables/useApiary";
import Hive from "../../hive/Hive.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import IconCubeButton from "../../input/buttons/IconCubeButton.vue";

const s = useCssModule()
const props = defineProps<{
    userId: number
}>()
const openedApiaryId = ref<number | undefined>(undefined)

const { user, isLoading, isError } = useProfileQuery(props.userId)
const { getApiaryAccess, getHiveAccess, updateAccessToApiary, updateAccessToHive } = useAdminMutations()
const { apiaries } = useApiariesQuery()
const { hives } = useApiaryQuery({
    id: openedApiaryId,
    getApiaryHives: true,
})

const apiaryAccess = ref<number[]>([])
const hiveAccess   = ref<number[]>([])

const changingApiaryAccess: Record<number, boolean> = ({})
const changingHiveAccess:   Record<number, boolean> = ({})

type ApiaryAccessModel = {
    apiary:           ApiaryModelDB
    hasAccess:        boolean,
    isChangingAccess: boolean
}

type HiveAccessModel = {
    hive:             HiveModelDB
    hasAccess:        boolean,
    isChangingAccess: boolean
}

const showedApiariesModelUI = computed<ApiaryAccessModel[]>(() => {
    return apiaries.value?.map(apiary => ({
        apiary:           apiary,
        hasAccess:        !!apiaryAccess.value.includes(apiary.id),
        isChangingAccess: changingApiaryAccess[apiary.id] ?? false
    })) ?? []
})
const showedHivesModelUI = computed<HiveAccessModel[]>(() => {
    return hives.value?.map(hive => ({
        hive:             hive,
        hasAccess:        !!hiveAccess.value.includes(hive.id),
        isChangingAccess: changingHiveAccess[hive.id] ?? false
    })) ?? []
})

const grid1 = ref()
const { style: gridStyle1} = useFlexibleGrid({ 
    gridRef:        grid1,
    itemMinWidthPx: 300,
    gapPx:          10
})
const grid2 = ref()
const { style: gridStyle2 } = useFlexibleGrid({ 
    gridRef:        grid2,
    itemMinWidthPx: 300,
    gapPx:          10
})

function openApiary(apiaryId: number ) {
    openedApiaryId.value = apiaryId
}

function closeApiary() {
    openedApiaryId.value = undefined
}

async function toggleApiaryAccess(model: ApiaryAccessModel) {
    const userId = user.value?.id
    if (!isValidValue(userId) || changingApiaryAccess[model.apiary.id]) return

    const { apiary, hasAccess } = model
    changingApiaryAccess[apiary.id] = true

    updateAccessToApiary({
        userId:     userId!,
        apiaryId:   apiary.id,
        giveAccess: !hasAccess
    }, {
        onSuccess: () => {
            if (!hasAccess) apiaryAccess.value.push(model.apiary.id)
            else apiaryAccess.value = apiaryAccess.value.filter(id => id !== model.apiary.id)
        },
        onSettled: () => {
            changingApiaryAccess[model.apiary.id] = false
        }
    })
}

async function toggleHiveAccess(model: HiveAccessModel) {
    const userId = user.value?.id
    if (!isValidValue(userId) || changingHiveAccess[model.hive.id]) return
    
    const { hive, hasAccess } = model
    changingHiveAccess[hive.id] = true

    updateAccessToHive({
        userId:     userId!,
        hiveId:     hive.id,
        giveAccess: !hasAccess
    }, {
        onSuccess: () => {
            if (!hasAccess) hiveAccess.value.push(model.hive.id)
            else hiveAccess.value = hiveAccess.value.filter(id => id !== model.hive.id)
        },
        onSettled: () => {
            changingHiveAccess[hive.id] = false
        }
    })
}

onMounted(() => {
    getApiaryAccess(props.userId, {
        onSuccess(access) {
            apiaryAccess.value = access
        }
    })
    getHiveAccess(props.userId, {
        onSuccess(access) {
            hiveAccess.value = access
        }
    })
})
</script>

<template>
<div :class="s.container">
    <div
        :class="s.top"
    >
        <IconCubeButton
            v-if="openedApiaryId !== undefined"
            :svg="SVG.ArrowLeftSmall"
            @click="closeApiary"
        />
        <p
            :class="s.label"
        >
            {{ openedApiaryId === undefined ? 'Apiaries' : 'Hives' }}
        </p>
    </div>
    <div 
        v-show="openedApiaryId === undefined"
        ref="grid1"
        :style="gridStyle1"
        :class="s.grid"
    >
        <Apiary
            v-for="showedApiary in showedApiariesModelUI"
            :key="showedApiary.apiary.id"
            :apiary="showedApiary.apiary"
            :is-dimmed="!showedApiary.hasAccess"
            :class="s.item"
            @click="openApiary(showedApiary.apiary.id)"
        >
            <button 
                :class="[
                    s.checkbox,
                    showedApiary.hasAccess ? s.hasAccess : s.noAccess
                ]"
                @click.prevent="toggleApiaryAccess(showedApiary)"
            ></button>
        </Apiary>
    </div>

    <div 
        v-show="openedApiaryId !== undefined"
        ref="grid2"
        :style="gridStyle2"
        :class="s.grid"
    >
        <Hive
            v-for="showedHive in showedHivesModelUI"
            :key="showedHive.hive.id"
            :hive="showedHive.hive"
            :is-dimmed="!showedHive.hasAccess"
            :class="s.item"
        >
            <template #footer>
                <button 
                    :class="[
                        s.checkbox,
                        showedHive.hasAccess ? s.hasAccess : s.noAccess
                    ]"
                    @click="toggleHiveAccess(showedHive)"
                ></button>
            </template>
        </Hive>
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
    
    display: flex
    margin: 1rem 0 

.grid

    .item
        height: 15rem

.container
    height: 100%

    background: var(--white)
    padding: 0 1rem 1rem 1rem 

.top
    display: flex
    align-items: center
    gap: 1rem
</style>