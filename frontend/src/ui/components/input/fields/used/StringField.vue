<script setup lang="ts">
import type { SVG } from "@/assets/svgs/SVGLoader";
import type { FieldValidee } from "@/core/composables/useFormValidator";
import Icon from "@/ui/components/Icon.vue";
import { onMounted, ref, useCssModule } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label :     string
    placeholder?: string
    selection?: string
    validee?:   FieldValidee
    rightIcon?: SVG
}>(), {
    selection: '',
    placeholder: "..."
})
const input = ref()
const isFocused = ref(false)

const emit = defineEmits<{ 
    input: [value: string]
}>()

function handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value
    
    emit('input', value)
}

onMounted(() => {
    if (!props.validee) return

    props.validee.showThatIsRequired.on(() => {
        // hasBeenFocussed.value = true
    })
    props.validee.clear.on(() => {
        emit('input', "")
    })
})
</script>

<template>
<div 
    :class="[
        s.header,
        isFocused && s.open
    ]"
    @click="input.focus"
>
    <div
        :class="s.column"
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
            ref="input"
            :class="s.input"
            :placeholder="placeholder" 
            type="text"
            :value="selection"
            @input="handleInput"
            @focus="isFocused = true"
            @blur="isFocused = false"
        >
    </div>
    <Icon
        v-if="rightIcon"
        :class="s.icon"
        :icon="rightIcon"
    />
</div>
</template>

<style module lang="sass">
.input
    all: unset

.header
    display: flex
    min-height: 3rem
    // background: var(--secondary)
    font-family: var(--font-family)

    border-radius: var(--border-radius-tiny)

    cursor: pointer
    transition: .1s
    box-shadow: inset 0 0 0 1px var(--secondary)

    padding: .25rem 1rem .25rem 1rem
    box-sizing: border-box

    .column
        display: flex
        flex-direction: column
        width: 100%


    &.open
        background: var(--secondary)
        
    &:hover
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


</style>