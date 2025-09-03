<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import PopupFrame from '../PopupFrame.vue';
import { AnimatePresence, motion } from 'motion-v';
import CreateHiveBody from './CreateHiveBody.vue';
import SelectHiveBody from './SelectHiveBody.vue';

const s = useCssModule()
const props = defineProps<{
    unmount?: () => {},
    focusHandler?: (el: HTMLElement) => {}
}>()
const tabs = ['Create New', 'Move Existing']
const selectedTab = ref(tabs[0])

function switchTab(tab: string) {
    selectedTab.value = tab
}
</script>

<template>
<PopupFrame title="Add hive" :unmount="unmount" :focus-handler="focusHandler">
    <template #body>
        <div :class="s.body">
            <div :class="s.addMode">
                <motion.button v-for="tab in tabs" :key="tab"
                :class="s.addType"
                @click="() => switchTab(tab)"
                >
                    <p :class="s.text">{{ tab }}</p>
                    <motion.div
                        v-if="selectedTab === tab"
                        :class="s.selected"
                        layoutId="Selected_add_hive_tab"
                        :transition="{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], type: 'spring' }"
                    />
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                <component :is="selectedTab === tabs[0] ? CreateHiveBody : SelectHiveBody" :key="selectedTab" />
            </AnimatePresence>
        </div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.body
    display: flex
    flex-direction: column
    gap: 1rem


    .addMode
        display: flex
        height: 2rem
        border-bottom: 2px solid rgba(0, 0, 0, .4)

        .addType
            all: unset
            position: relative
            flex: 1
            cursor: pointer
            z-index: 2

            box-sizing: border-box
            padding: 0 .5rem
            background: var(--accent)
            backdrop-filter: brightness(95%)

            .text
                z-index: 2
                @include main.font
                position: relative


            .selected
                z-index: 1
                position: absolute
                right: 0
                top: 0
                width: 100%
                height: 100%
                background: var(--light)
</style>