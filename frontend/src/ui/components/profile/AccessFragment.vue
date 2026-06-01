<script setup lang="ts">
import { computed, onMounted, ref, useCssModule, watch } from "vue";
import Apiary from "../apiary/Apiary.vue";
import { isValidValue, useFlexibleGrid } from "@/core/utils/others";
import type { ApiaryModelDB, HiveModelDB } from "@/core/stores/Models";
import { useProfileQuery } from "@/core/composables/useProfile";
import { useAdminMutations } from "@/core/composables/useAdmin";
import { useApiariesQuery, useApiaryQuery } from "@/core/composables/useApiary";
import Hive from "../hive/Hive.vue";
import ToolBar from "../ToolBar.vue";
import Checkbox from "../input/fields/Checkbox.vue";
import { useHivesQuery } from "@/core/composables/hive/useHive";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    userId: number
}>()

const openedApiary = ref<ApiaryModelDB | undefined>(undefined)
const { user, isLoading, isError } = useProfileQuery(props.userId)
const { 
    grantApiaryAccess,
    grantHiveAccess,
    revokeApiaryAccess,
    revokeHiveAccess,
    getApiaryAccess,
    getHiveAccess
} = useAdminMutations()
const { apiaries } = useApiariesQuery()
const { hives } = useHivesQuery({
    apiaryIds: computed(() => isValidValue(openedApiary.value?.id) ? [openedApiary.value!.id] : undefined)
})

const apiaryAccess = ref<number[]>([])
const hiveAccess   = ref<number[]>([])

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

function openApiary(apiary: ApiaryModelDB) {
    openedApiary.value = apiary
}

function closeApiary() {
    openedApiary.value = undefined
}

async function toggleApiaryAccess(apiary: ApiaryModelDB) {
    const userId = user.value?.id
    if (!isValidValue(userId)) return

    if (apiaryAccess.value.includes(apiary.id)) {
        // revoke
        revokeApiaryAccess({
            userId:   userId,
            apiaryId: apiary.id
        }, {
            onSuccess: () => {
                apiaryAccess.value = apiaryAccess.value.filter(id => id !== apiary.id)
            }
        })
    } else {
        // grant
        grantApiaryAccess({
            userId:   userId,
            apiaryId: apiary.id
        }, {
            onSuccess: () => {
                apiaryAccess.value = [...apiaryAccess.value, apiary.id]
            }
        })
    }
}

async function toggleHiveAccess(hive: HiveModelDB) {
    const userId = user.value?.id
    if (!isValidValue(userId)) return
    
    if (hiveAccess.value.includes(hive.id)) {
        // revoke
        revokeHiveAccess({
            userId: userId,
            hiveId: hive.id
        }, {
            onSuccess: () => {
                hiveAccess.value = hiveAccess.value.filter(id => id !== hive.id)
            }
        })
    } else {
        // grant
        grantHiveAccess({
            userId: userId,
            hiveId: hive.id
        }, {
            onSuccess: () => {
                hiveAccess.value = [...hiveAccess.value, hive.id]
            }
        })
    }
}

function hasApiaryAccessTo(apiary: ApiaryModelDB) {
    return apiaryAccess.value.includes(apiary.id)
}

function hasHiveAccessTo(hive: HiveModelDB) {
    return hiveAccess.value.includes(hive.id)
}

watch(() => props.userId, newVal => {
    if (!isValidValue(newVal)) return 

    getApiaryAccess(props.userId, {
        onSuccess(access) {
            console.log("apiary:", access);
            apiaryAccess.value = access
        }
    })
    getHiveAccess(props.userId, {
        onSuccess(access) {
            console.log("hive:", access);
            
            hiveAccess.value = access
        }
    })
}, { immediate: true })
</script>

<template>
<div :class="s.container">
    <ToolBar
        :label="openedApiary === undefined ? t('apiaries') : `${openedApiary.name} ${t('hives')}`"
        :show-back-button="isValidValue(openedApiary)"
        :tabs="[]"
        @back="closeApiary"
    ></ToolBar>
    
    <div 
        v-show="openedApiary === undefined"
        ref="grid1"
        :style="gridStyle1"
        :class="s.grid"
    >
        <Apiary
            v-for="apiary in apiaries"
            :key="apiary.id"
            :apiary="apiary"
            :is-dimmed="!hasApiaryAccessTo(apiary)"
            :class="s.item"
            @click="openApiary(apiary)"
        >
            <Checkbox
                :class="s.checkbox"
                :value="hasApiaryAccessTo(apiary)"
                @click="toggleApiaryAccess(apiary)"
            />
        </Apiary>
    </div>

    <div 
        v-show="openedApiary !== undefined"
        ref="grid2"
        :style="gridStyle2"
        :class="s.grid"
    >
        <Hive
            v-for="hive in hives"
            :key="hive.id"
            :hive="hive"
            :is-dimmed="!hasHiveAccessTo(hive)"
            :class="s.item"
        >
            <template #footer>
                <Checkbox
                    :style="{ marginLeft: 'auto' }"
                    :value="hasHiveAccessTo(hive)"
                    @click="toggleHiveAccess(hive)"
                />
            </template>
        </Hive>
    </div>
</div>
</template>

<style module lang="sass">
.checkbox
    margin: .5rem

.label
    
    display: flex
    margin: 1rem 0 

.grid
    .item
        height: 15rem

.container
    display: flex
    flex-direction: column
    height: 100%
    gap: 1rem
</style>