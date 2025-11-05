<script setup lang="ts">
import { useCssModule } from 'vue';
import CubeDropdown from '../input/dropdowns/CubeDropdown.vue';
import { SVGImage, SVGRes } from '@/core/SVGLoader';
import { useHive } from '@/core/composables/hive/useHive';
import type { DropdownItem } from '@/core/Interfaces';
import { createComponentInstance } from '@/core/utils/components';
import AssignToApiaryPopup from '../popups/AssignToApiaryPopup.vue';
import type { HiveModel } from '@/core/models/HiveModels';

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
        svg: new SVGImage(SVGRes.Trashcan),
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
    {
        text: 'Move',
        svg: new SVGImage(SVGRes.ArrowHead),
        onClick: async () => {
            createComponentInstance(AssignToApiaryPopup, {
                hiveId: props.hive.id,
                onAssign: () => {
                    updateHives({ apiaryId: props.hive.apiaryId!, options: {} })
                } 
            }, true)
        },
    }
]
</script>

<template>
   <div :class="s.container">
        <div :class="s.header">
            <div :class="s.title">
                <p :class="s.name">{{ hive.name }}</p>
                <p v-if="showApiary" :class="s.apiaryName">{{ hive.apiaryName }}</p>
            </div>
            <CubeDropdown  
                :svg="new SVGImage(SVGRes.MoreDots, 'black')" 
                :class="s.options"
                :dropdownItems="moreOptions"/>
        </div>

        <div :class="s.body">
            
            <div :class="s.queen">
                <div :class="s.image"></div>
                <p :class="s.queenbeeSpecies">Bigususus Bitususus</p>
            </div>
            <div v-if="hive.type" :class="s.type">{{ hive.type }}</div>
            <hr :class="s.imgShadow">
            <img :class="s.hiveImage" :src="hive.imagePath" alt="hive image">
        </div>
   </div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    @include main.font
    display: flex
    flex-direction: column
    align-items: center
    aspect-ratio: 1 / .75

    .header
        display: flex
        position: relative
        z-index: 1
        align-items: center
        height: 4rem
        width: 100%

        box-sizing: border-box
        padding: 0 .5rem 
        background: var(--light)

        .options 
            margin-left: auto

        .title
            display: flex
            flex-direction: column
            .name
                all: unset
                @include main.f-size-small
                font-weight: 700

            .apiaryName
                @include main.f-size-very-small
                font-weight: 400
                letter-spacing: .5px

    .body
        position: relative
        background: var(--accent)
        width: 95%
        height: calc(100% - 4.1rem)
        border: 1px solid rgba(0, 0, 0, .2)
        border-top: none

        .type
            @include main.f-size-very-small
            font-weight: 400
            letter-spacing: .5px
            position: absolute
            top: 0
            right: 0
            background: var(--dark)
            color: white
            border-radius: 100vh
            padding: .25rem .5rem
            margin: .5rem

        .queen
            position: absolute
            bottom: 0
            left: 0
            right: 0

            display: flex
            align-items: center
            gap: 1rem
            padding: .5rem
            background: linear-gradient(to top, rgba(255, 255, 255, .4) 0%, rgba(255, 255, 255, 0) 100%);

            .image
                width: 4rem
                height: 4rem
                background: rgba(0,0,0,.5)
            .queenbeeSpecies
                @include main.f-size-small
                font-weight: 500
                
        .imgShadow
            margin: 0
            border: none
            position: absolute
            top: 0
            width: 100%
            height: 5px
            background: linear-gradient(to bottom, rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, 0) 100%);

        .hiveImage
            width: 100%
            height: 100%
            display: block
            object-fit: cover
            box-sizing: border-box
            


.wood
    width: 100%
    height: 100%
    object-fit: cover
</style>