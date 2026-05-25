<script setup lang="ts">
import { useCssModule, computed } from "vue"
import { motion } from "motion-v"
import type { DropdownItem } from "../../../core/Interfaces";
import CubeDropdown from "../input/dropdowns/CubeDropdown.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { ApiaryModelDB } from "@/core/stores/Models";
import Icon from "../Icon.vue";
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    apiary:    ApiaryModelDB,
    isDimmed?: boolean
}>()

const MotionIconCubeDropdown = motion.create(CubeDropdown)
const dropdownActions = computed(() => [
    {
        text: t('action.overview'),
        svg: SVG.Info,
        onClick: () => { },
        color: ""
    },
    {
        text: t('apiary.menu_delete'),
        svg: SVG.Cross,
        onClick: () => { },
        color: "#963B28"
    },
] as DropdownItem[])

</script>
<template>
<div 
    :class="s.container" 
>
    <div
        :class="[
            s.left,
            isDimmed && s.dimmedOut
        ]"
    >
        <icon
            v-if="!apiary.imageUrl"
            :class="s.icon" 
            :type="IconType.GIGANTIC"
            :icon="SVG.Apiary"
        />
        <img 
            v-if="apiary.imageUrl"
            :class="s.image" 
            :src="apiary.imageUrl || 'src/assets/images/apiary1.jpg'" 
            alt="apiary image"
        >

        <hr 
            :class="s.linearDim"
        >
        <h1 
            :class="s.label"
        >
            {{ apiary!.name }}
        </h1>
        <ul 
            :class="s.info"
        >
            <div :class="s.entry">
                <p :class="s.value">{{ apiary.hiveCount }}</p>
                <hr :class="s.HRhorizontal">
                <p :class="s.title">Hives</p>
            </div>
        </ul>
    </div>
    <div
        :class="s.buttons"
        @click.stop=""
    >
        <slot>

        </slot>
    </div>
</div>
</template>

<style module lang="sass">
.icon
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    color:  #71797E

.dimmedOut
    opacity: .5
    filter: brightness(.6)

.label
    font-size:      var(--font-size-large)
    font-weight:    800
    letter-spacing: .02em
    margin:         0
    z-index:        0
    padding:        0 2rem
    color:          white

.left
    position:        relative
    display:         flex
    flex-direction:  column
    justify-content: flex-end
    cursor:          pointer
    flex:            1
    overflow:        hidden

.image
    position:   absolute
    display:    block
    height:     100%
    width:      100%
    object-fit: cover
    transition: .5s
    outline:    6px solid rgba(255, 255, 255, .2)

.buttons
    position:      absolute
    right:         0
    display:       inline-flex
    background:    white
    border-radius: 0 0 0 var(--border-radius-small)

.container
    position: relative
    display: flex

    font-family:   var(--font-family)
    border-radius: var(--border-radius-small)
    background: var(--secondary)
    overflow: hidden

    &:hover .image
        transform: scale(1.01)

.info
    all:     unset
    z-index: 0

    display:         flex
    justify-content: flex-end
    gap:             1em
    padding:         1em

    .entry
        display:         flex
        flex-direction:  column
        justify-content: space-between
        align-items:     center

        .value
            color:       white
            font-size:   var(--font-size-medium)
            font-weight: 700

        .title
            color:          white
            font-size:      var(--font-size-medium)
            font-weight:    400
            letter-spacing: .8px

        .HRhorizontal
            height:     2px
            width:      100%
            background: var(--white)
            border:     none

.linearDim
    all:      unset
    position: absolute
    bottom:   0
    height:   60%
    width:    100%

    background: linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .15) 100%)
</style>
        
