<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import type { FieldValidee } from "@/core/composables/useFormValidator";
import { onMounted, ref, useCssModule } from "vue";
import IconCubeButton from "../../buttons/IconCubeButton.vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label :     string
    placeholder?: string
    selection?: number
    validee?:   FieldValidee

}>(), {
    selection: 0,
    placeholder: "..."
})
const inputRef = ref<HTMLInputElement | undefined>()
const displayValue = ref("")
const isFocused = ref(false)

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
            isFocused && s.open
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
            @input="handleInput"
            @focus="isFocused = true"
            @blur="isFocused = false"
        >
    </div>
    <IconCubeButton
        :class="s.icon"
        :icon="SVG.Minus"
        @click="updateValue(Number(displayValue) - 1)"
    />
    <IconCubeButton
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
    // background: var(--secondary)
    font-family: var(--font-family)

    border-radius: var(--border-radius-tiny)

    cursor: pointer
    transition: .1s
    box-shadow: inset 0 0 0 1px var(--secondary)

    box-sizing: border-box

    .column
        display: flex
        flex-direction: column
        width: 100%
        padding: .5rem 1rem .5rem 1rem
        box-sizing: border-box

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


</style>