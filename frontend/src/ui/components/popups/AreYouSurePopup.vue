<script setup lang="ts">
import { onMounted, ref, useCssModule } from 'vue';

import PopupFrame from './PopupFrame.vue';
import Button from '../input/buttons/Button.vue';
import type { PopupFunctions, PopupInfo } from '@/core/utils/PopupHiarchy';

export type AreYouSurePopupProps = {
    title: string
    description: string
    onYes?: () => void
    onNo?: () => void
}

const s = useCssModule()
const props = defineProps<{
    popupFunctions: PopupFunctions
    popupInfo: PopupInfo
    areYouSurePopupProps: AreYouSurePopupProps
}>()
const closeFun = ref<(() => void) | null>(null)

async function onYesClick() {
    const fun = props.areYouSurePopupProps.onYes
    if (fun) await fun()

    closeFun.value?.()
}

function onNoClick() {
    const fun = props.areYouSurePopupProps.onNo
    if (fun) fun()

    closeFun.value?.()
}
</script>

<template>
    <PopupFrame 
        :title="areYouSurePopupProps.title"
        :popup-functions="popupFunctions"
        :popup-info="popupInfo"
        @on-close="(fun: (() => void) | null) => closeFun = fun"
    >
        <template #body>
            <div :class="s.body">
                <p :class="s.description">{{ areYouSurePopupProps.description }}</p>
                <Button
                    text="No" 
                    :class="s.no"
                    :is-important="false"
                    @click="onNoClick"
                />
                <Button 
                    text="Yes" 
                    :class="s.yes" 
                    @click="onYesClick"
                />
            </div>  
        </template>
    </PopupFrame>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.body
    @include main.font
    display: grid
    grid-template-areas: 'description description' 'no yes'
    grid-template-columns: repeat(2, 10rem)
    grid-template-rows: minmax(2rem, 1fr) 2rem
    gap: 1rem

    .description
        @include main.f-size-small
        grid-area: description
        display: flex
        justify-content: center
        align-items: center
        text-align: center
    .yes
        grid-area: yes
    .no
        grid-area: no
</style>