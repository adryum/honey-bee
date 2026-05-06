<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import type { FieldValidee } from "@/core/composables/useFormValidator";
import { computed, onMounted, ref, useCssModule, watch } from "vue";
import IconCubeButton from "../../buttons/IconCubeButton.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label :     string
    placeholder?: string
    selection?: number
    validee?:   FieldValidee
    readonly?:    boolean
}>(), {
    selection: 0,
    placeholder: "..."
})
const inputRef = ref<HTMLInputElement | undefined>()
const displayValue = ref("")
const isFocused = ref(false)
const allowInteraction = computed(() => !props.readonly)

const emit = defineEmits<{ 
    input: [value: number]
}>()

function handleInput(e: Event) {
    const input = e.target as HTMLInputElement
    let val = input.value

    const isValid = /^-?\d*\.?\d*$/.test(val)

    if (!isValid) {
        // revert
        val = displayValue.value 
    }

    displayValue.value = val
    input.value = val

    emit('input', val === '' || val === '-' ? 0 : Number(val))
}

function updateValue(value: number) {
    if (!inputRef.value) return

    displayValue.value = value.toString()
    inputRef.value.value = value.toString()
    emit('input', value)
}

watch(() => props.selection, (newVal) => {
    if (newVal === 0) return
    // changes display value to match selection value
    displayValue.value = newVal.toString()
}, { immediate: true })

onMounted(() => {
    if (!props.validee) return

    props.validee.showThatIsRequired.on(() => {
        // hasBeenFocussed.value = true
    })
    props.validee.clear.on(() => {
        updateValue(0)
    })
})
</script>

<template>
<div 
    :class="[
        s.container,
    ]"
>
    <div
        :class="[
            s.column,
            isFocused && s.open,
            allowInteraction && s.interactive
        ]"
        @click="inputRef?.focus()"
    >
        <div
            :class="s.label"
        >
            <p
            >
                {{ label }}
            </p>
        </div>
        <input
            ref="inputRef"
            :class="s.input"
            :placeholder="placeholder" 
            type="text"
            :value="displayValue"
            :readonly="readonly"
            @input="handleInput"
            @focus="isFocused = true"
            @blur="isFocused = false"
        >
    </div>
    <IconCubeButton
        v-if="!readonly"
        :class="s.icon"
        :icon="SVG.Minus"
        @click="updateValue(Number(displayValue) - 1)"
    />
    <IconCubeButton
        v-if="!readonly"
        :class="s.icon"
        :icon="SVG.Plus"
        @click="updateValue(Number(displayValue) + 1)"
    />
</div>
</template>

<style module lang="sass">
.input
    all: unset
    flex: 1

.container
    display: flex
    min-height: 3.5rem
    font-family: var(--font-family)

    border-radius: var(--border-radius-tiny)

    cursor: pointer
    transition: .1s
    box-shadow: inset 0 0 0 1px var(--secondary)

    box-sizing: border-box
    overflow: hidden

    .column
        display: flex
        flex-direction: column
        width: 100%
        padding: .5rem 1rem .5rem 1rem
        box-sizing: border-box

        &.interactive
            &:hover
                background: var(--secondary)

            &.open
                background: var(--secondary)
        
    .label
        display: flex
        align-items: center
        justify-content: space-between
        height: 1rem

        font-size: var(--font-size-tiny)
        font-weight: 700
        letter-spacing: .02em

    .icon
        align-self: center
        min-width: 3.5rem
        min-height: 3.5rem
        border-radius: 0
</style>