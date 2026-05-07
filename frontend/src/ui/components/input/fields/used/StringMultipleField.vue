<script setup lang="ts">
import type { SVG } from "@/assets/svgs/SVGLoader";
import type { FieldValidee } from "@/core/composables/useFormValidator";
import Icon from "@/ui/components/Icon.vue";
import { computed, onMounted, ref, useCssModule } from "vue";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label :     string
    placeholder?: string
    selection?: string
    validee?:   FieldValidee
    rightIcon?: SVG
    readonly?: boolean
}>(), {
    selection: '',
    placeholder: "..."
})
const input = ref()
const isFocused = ref(false)
const allowInteraction = computed(() => !props.readonly)

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
        s.container,
        isFocused && s.open,
        allowInteraction && s.interactive
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
        <textarea
            ref="input"
            :class="s.input"
            type="text"
            :placeholder="placeholder" 
            :value="selection"
            :readonly="readonly"
            @input="handleInput"
            @focus="isFocused = true"
            @blur="isFocused = false"
        ></textarea>
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
    height: 100%

.container
    display: flex
    font-family: var(--font-family)
    height: 100%
    box-shadow: inset 0 0 0 1px var(--secondary)
    // background: var(--secondary)

    border-radius: var(--border-radius-tiny)

    cursor: pointer
    transition: .1s

    padding: .5rem 1rem .5rem 1rem
    box-sizing: border-box

    .column
        display: flex
        flex-direction: column
        width: 100%

    &.interactive
        &:hover
            background: var(--secondary)

        &.open
            background: var(--secondary)

    .label
        display: flex
        align-items: center
        justify-content: space-between
        min-height: 1rem

        font-size: var(--font-size-tiny)
        font-weight: 700
        letter-spacing: .02em

    .icon
        align-self: center


</style>