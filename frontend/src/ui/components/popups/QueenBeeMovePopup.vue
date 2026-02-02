<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';
import Button from '../input/buttons/Button.vue';
import PopupFrame from './PopupFrame.vue'
import SelectionDropdown from '../input/dropdowns/SelectionDropdown.vue';
import type { DropdownItem } from '@/core/Interfaces';
import type { CallbackModel } from '@/core/models/SupperModels';
import type { FieldOptions, FieldValidator } from '@/core/composables/field/useField';
import { useQueenBeeMove } from '@/core/composables/hive/useQueenBeeMove';
import type { PopupFunctions, PopupInfo } from '@/core/utils/PopupHiarchy';

export type QueenBeeMovePopupProps = {
    queenBeeId: number
}

export type QueenBeeMoveRequestModel = {
    queenBeeId: number
    hiveId: number
}

const s = useCssModule()
const props = defineProps<{
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
    queenBeeMoveProps: QueenBeeMovePopupProps
    onCreate?: () => {}
}>()
const closeFunction = ref<(() => void) | null>(null)
const { isQueenBeeLoading, moveQueenBee, hives } = useQueenBeeMove();
const hiveId = ref<number>(-1)
const hiveNameDropdownItems = computed<DropdownItem[]>(() =>
    hives.value.map(hive => ({
        text: hive.name,
        onClick: () => {
            console.log("Hive id: ");
            console.log(hive.id);
            
            hiveId.value = hive.id
        }
    }))
)

// validators
const hiveDropdownValidator = ref<FieldValidator>()
const isEverythingValid = computed(() => {
    return hiveDropdownValidator.value?.isValid
    && hiveId.value > -1
})

function closePopup() {
    if (closeFunction.value) closeFunction.value();
}

async function move() {
    if (!isEverythingValid.value) return

    const createQueenBeeModel: QueenBeeMoveRequestModel = {
        queenBeeId: props.queenBeeMoveProps.queenBeeId,
        hiveId: hiveId.value
    }

    const callbackModel: CallbackModel = {
        onSuccess() {
            props.onCreate?.()
            closePopup()
        },
        onFailure(error) {
            
        },
    }

    await moveQueenBee(createQueenBeeModel, callbackModel)
}
</script>

<template>
<PopupFrame 
    title="Add Queen" 
    :popup-functions="popupFunctions" 
    :popup-info="popupInfo" 
    @on-close="(fun: (() => void) | null) => closeFunction = fun"
>
    <template #body>
        <div :class="s.grid">
            <SelectionDropdown 
                title="Move to" 
                :class="s.dropdown" 
                :dropdownItems="hiveNameDropdownItems"
                :is-requiried="true"
                :z-index="popupInfo.zIndex.value"
                v-on:validator="validator => hiveDropdownValidator = validator"
            />
            <div :class="s.buttons">
                <Button 
                    text="cancel" 
                    :class="s.cancel"
                    :is-important="false"
                    @click="closePopup" 
                />
                <Button 
                    text="Move" 
                    :class="s.create"
                    :is-disabled="!isEverythingValid" 
                    @click="move" 
                />
            </div>
        </div>
    </template>
</PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
@use '@/assets/main.sass' as main
        
.grid
    display: flex
    flex-direction: column
    width: 30rem
    gap: 1rem

    .firstRow
        display: flex
        gap: 1rem

        .dropdown
            flex: 1

        .title
            flex: 5

    .buttons
        display: flex
        gap: 1rem

        & > *
            flex: 1
    
</style>