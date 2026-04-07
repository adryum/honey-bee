<script setup lang="ts">
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import type { DropdownModel } from "@/core/models/Models";
import { computed, onMounted, ref, useCssModule } from "vue";
import type { FieldValidee } from "@/core/composables/useFormValidator";
import IconCubeButton from "../../../buttons/IconCubeButton.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    selection?: string
    validee?:   FieldValidee
    dropdown :  DropdownModel
}>(), {
    selection: ''
})

const hasBeenFocussed      = ref(false)
const showIncorrectBorders = computed(() => hasBeenFocussed.value && !props.validee?.isValid())

onMounted(() => {
    if (!props.validee) return

    props.validee.showThatIsRequired.on(() => {
        hasBeenFocussed.value = true
    })
})
</script>

<template>
    <div 
        :class="[
            s.head,
            dropdown.isShown.value && s.focused,
            showIncorrectBorders && s.incorrect
        ]"
        @click="dropdown.isShown.value = !dropdown.isShown.value; hasBeenFocussed = true"
    >
        <p 
            :class="[
                s.text,
                selection === '' && s.placeholder
            ]"
        > {{ selection || "selection" }}</p>
        <IconCubeButton
            :class="s.button"
            :style="dropdown.isShown.value ? { transform: 'rotateZ(180deg)' } : {}"
            :svg="SVG.DropdownArrow"
            :type="IconType.MEDIUM"
            :transparent="true"
        />
    </div>
</template>

<style module lang='sass'>
.incorrect
    box-shadow: inset 0 0 0 1px var(--red) !important

.placeholder
    opacity: .5

.head
    position:    relative
    display:     flex
    align-items: center
    height:      2.5rem
    padding:     .75rem .9rem

    font-family: var(--font-family)
    font-size:   var(--font-size-medium)
    font-weight: 500

    background:    white
    box-sizing:    border-box
    box-shadow:    inset 0 0 0 1px #E0E0E0
    border-radius: var(--border-radius-small)
    outline-color: transparent

    &.focused
        box-shadow: inset 0 0 0 1px var(--orange)
        outline:    2px solid color-mix(in srgb, var(--orange) 20%, transparent)

    .text
        line-height: 1rem
        color:       var(--black)

    .button
        position: absolute
        right:    .5rem
        height:   2rem
        width:    2rem

        
</style>