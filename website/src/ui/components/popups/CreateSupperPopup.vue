<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';
import TitledField from '../input/fields/TitledField.vue';
import Button from '../input/buttons/Button.vue';
import PopupFrame from './PopupFrame.vue'
import { useCreateSupper } from '@/core/composables/hive/useCreateSupper';
import SelectionDropdown from '../input/dropdowns/SelectionDropdown.vue';
import type { DropdownOptions } from '@/core/Interfaces';
import type { PopupFunctions, PopupInfo } from '@/core/utils/components';

const s = useCssModule()
const props = defineProps<{
    onCreate?: () => {}, 
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
}>()

const { isSupperLoading, createSupper } = useCreateSupper();
const closeFunction = ref<(() => void) | null>(null)
const type = ref('')
const frameCount = ref(0)
const dropdownOptions = [
    { text: "deep" },
    { text: "medium" },
    { text: "small" },
] as DropdownOptions[]

const isValid = computed(() => {
    return Boolean(type.value)
})

function closePopup() {
    if (closeFunction.value) closeFunction.value();
}

async function create() {
    if (!isValid.value) return

    await createSupper(
        {
            type: type.value,
            frames: frameCount.value
        },
        {
            onSuccess() {
                props.onCreate?.()
                closePopup()
            },
            onFailure(error) {
                
            },
        }
    )
}
</script>

<template>
<PopupFrame title="Create supper" :popup-functions="popupFunctions" :popup-info="popupInfo" v-on:close="(fun) => closeFunction = fun">
    <template #body>
        <div :class="s.grid">
            <SelectionDropdown :class="s.dropdown" title="Type" :options="dropdownOptions" />
            <TitledField 
                :class="s.frames" 
                :is-required="true" 
                title="Frames"
                v-model="frameCount"/>
            <Button 
                :class="s.create" 
                @click="create" 
                text="Create" />
            <Button 
                :class="s.cancel" 
                @click="closePopup" 
                text="cancel" />
        </div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
        
.grid
    display: grid
    grid-template-areas: 'drop frames' 'cancel create' 
    grid-template-columns: repeat(2, 10rem)
    
    gap: 1rem

    .dropdown
        grid-area: drop

    .fields
        grid-area: fields

    .cancel
        grid-area: cancel

    .create
        grid-area: create
</style>