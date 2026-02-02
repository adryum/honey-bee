<script setup lang="ts">
import { useCssModule } from 'vue';
import CubeDropdown from '../input/dropdowns/CubeDropdown.vue';
import { useHive } from '@/core/composables/hive/useHive';
import type { DropdownItem } from '@/core/Interfaces';
import { createComponentInstance } from '@/core/utils/components';
import AssignToApiaryPopup from '../popups/AssignToApiaryPopup.vue';
import type { HiveModel } from '@/core/models/HiveModels';
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import Icon from '../Icon.vue';

const s = useCssModule()
const props = withDefaults(defineProps<{
    hive: HiveModel,
    showApiary?: boolean
}>(), {
    showApiary: false
})
const { isDeletingHive, deleteHive, updateHives } = useHive()
const moreOptions: DropdownItem[] = [
    {
        text: 'Delete',
        svg: SVG.Confirm,
        color: 'var(--red)',
        onClick: async () => {
            await deleteHive({
                hiveId: props.hive.id,
                hiveName: props.hive.name,
                onSuccess(hiveName) {
                    
                },
                onFailure(error) {
                    
                },
            })
        },
    },
    // {
    //     text: 'Move',
    //     svg: new SVGImage(SVGRes.ArrowHead),
    //     onClick: async () => {
    //         createComponentInstance(AssignToApiaryPopup, {
    //             hiveId: props.hive.id,
    //             onAssign: () => {
    //                 updateHives({ apiaryId: props.hive.apiaryId!, options: {} })
    //             } 
    //         }, true)
    //     },
    // }
]
</script>

<template>
   <div :class="s.container">
        <div :class="s.body">
            <div 
                v-if="hive.type" 
                :class="s.type"
            >
                <Icon 
                    :class="s.icon" 
                    :type="IconType.MEDIUM" 
                    :svg="SVG.HoneyHive" 
                />
            </div>
            <img 
                v-if="hive.imagePath" 
                :class="s.hiveImage" 
                :src="hive.imagePath" 
                alt="hive image"
            >
            <Icon 
                v-else
                :class="s.icon" 
                :type="IconType.BIG" 
                :svg="SVG.HoneyHive" 
            />
        </div>
        <div :class="s.footer">
            <div :class="s.title">
                <p :class="s.name">{{ hive.name }}</p>
                <p v-if="showApiary" :class="s.apiaryName">{{ hive.apiaryName }}</p>
            </div>
            <CubeDropdown  
                :svg="SVG.MoreDots" 
                :class="s.options"
                :dropdownItems="moreOptions"/>
        </div>
   </div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    height: 25rem

    box-shadow: 0 0 1px 0 var(--faint-border)
    font-family: var(--font-family)
    background: var(--light-gray)
    overflow: hidden
    border-radius: var(--border-radius-medium)
    transition: .2s

    &:hover
        transform: translateY(-2px)

    .footer
        display: flex
        align-items: center
        height: 3rem
        max-height: 3rem
        width: 100%

        box-sizing: border-box
        padding: .5rem 
        // box-shadow: inset 0 0 0 1px var(--faint-border)

        .options 
            margin-left: auto


        .title
            display: flex
            flex-direction: column
            padding-left: .5rem
            .name
                all: unset
                font-size: var(--font-size-medium)
                font-weight: 600
                letter-spacing: .02em
                line-height: 2rem

    .body
        position: relative
        min-height: 0
        flex: 1
        box-sizing: border-box
        // padding: .5rem
        padding-bottom: 0 
        cursor: pointer


        .type
            position: absolute
            display: flex
            align-items: center
            justify-content: center

            width: 2rem
            height: 2rem
            margin: .5rem
            background: var(--yellow)
            border-radius: var(--border-radius-big)
            box-shadow: 0 1px 0 0 var(--faint-border)

        .hiveImage
            display: flex
            min-height: 0
            min-width: 0
            width: 100%
            height: 100%
            max-height: 100%
            object-fit: cover
            box-sizing: border-box
            // border-radius: var(--border-radius-small)
            background: var(--yellow)
            box-shadow: inset 0 0 1px 0 var(--faint-border)

</style>