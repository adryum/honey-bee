<script setup lang="ts">
import { computed, onMounted, ref, toRef, useCssModule } from 'vue';
import { ApiaryTab } from '@/core/ViewTabEnums';
import { useRouter } from 'vue-router';
import { RouterViewPaths } from '@/core/router';
import ToolBar from '../components/ToolBar.vue';
import ApiaryGeneralFragment from '../components/apiary/view_fragments/general/ApiaryGeneralFragment.vue';
import { useApiaryQuery } from '@/core/composables/useApiary';
import ApiaryHivesFragment from '../components/apiary/view_fragments/ApiaryHivesFragment.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import type { ModalBaseModel } from '@/core/composables/useModalBase';
import StringSearchDropdown from '../components/input/dropdowns/StringSearchDropdown.vue';
import IconTextButton from '../components/input/buttons/IconTextButton.vue';
import CreateHiveModal from '../components/modals/CreateHiveModal.vue';

const s = useCssModule()
const router = useRouter()
const props = defineProps<{
    id:  number,
    tab: ApiaryTab
}>()

const createHiveModal = ref<ModalBaseModel>()
const searchWord = ref<string>('')
const selectedDate = ref(new Date().nextMonth().previousMonth())

const { apiary, hives }   = useApiaryQuery({ 
    id:      toRef(() => props.id),
})

const filteredHives = computed(() => {
    return hives.value?.filter(hive => 
        hive.name.toLowerCase().includes(searchWord.value.toLowerCase())
    ) ?? []
})

const currentTab = computed<ApiaryTab>(() => props.tab)
const fragmentHeight = computed((): string => {
    switch (currentTab.value) {
        case ApiaryTab.General: return `calc(100% -  4rem)`
        case ApiaryTab.Hives:   return `calc(100% -  4rem)`
        default:               return ""
    }
})

function changeTab(tab: string) {
    router.replace({
        name: RouterViewPaths.ApiaryOverview,
        params: { 
            id:  props.id, 
            tab: tab 
        }
    })
}

function startInspection(apiaryId: number) {
    router.push(`/inspection/conduct/apiary/${apiaryId}`)
}

onMounted(() => console.log(props.tab))
</script>

<template>
    <section
        v-if="apiary"
        :class="s.container"
    >
        <ToolBar 
            :class="s.navbar"
            :label="apiary.name"
            :show-back-button="true"
            :tabs="Object.values(ApiaryTab)" 
            :selectedTab="currentTab" 
            @changeTab="changeTab"
            @back="router.back()"
        >
            <template #header>
                <IconTextButton
                    v-if="apiary"
                    text="Add inspection"
                    :icon="SVG.Plus"
                    :class="s.button"
                    @click="startInspection(apiary.id)"
                />
                
                <IconTextButton
                    text="Add hive"
                    :icon="SVG.Plus"
                    :class="s.button"
                    @click="createHiveModal?.open"
                />
                <StringSearchDropdown
                    v-if="currentTab === ApiaryTab.Hives"
                    :options="{
                        initialValue: '',
                        placeholder: 'Search by name...',
                        showIcon: true,
                        onHoverEffects: true,
                        onInputChange(value: string) {
                            searchWord = value
                        }
                    }"   
                    :style="{
                        minWidth: '15rem'
                    }"
                />
            </template>
        </ToolBar>
        
        <ApiaryGeneralFragment
            v-if="currentTab === ApiaryTab.General"
            :class="s.fragment"
            :style="{ maxHeight: fragmentHeight }" 
            :apiary="apiary"
        />

        <ApiaryHivesFragment
            v-if="currentTab === ApiaryTab.Hives"
            :class="s.fragment"
            :style="{ maxHeight: fragmentHeight }" 
            :apiary="apiary"
            :hives="filteredHives"
        />
        
        <CreateHiveModal
            ref="createHiveModal"
            :apiary-id="apiary?.id"
        />
    </section>
</template>

<style module lang='sass'>

.navbar
    margin: 1rem
    margin-bottom: 0
    // box-sizing: border-box
.container 
    flex: 1
    box-sizing: border-box
    min-height: 0
    max-height: calc(100vh - var(--header-height))

.fragment
    flex: 1
    padding: 1rem
    box-sizing: border-box

</style>