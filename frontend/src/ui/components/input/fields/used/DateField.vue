<script setup lang="ts">
import { computed, onMounted, ref, useCssModule } from "vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import { getRandomId } from "@/core/utils/Utils";
import Icon from "@/ui/components/Icon.vue";
import type { FieldValidee } from "@/core/composables/useFormValidator";

const s = useCssModule()
const props = withDefaults(defineProps<{
    label:      string,
    modelValue: string | undefined
    validee?:   FieldValidee
}>(), {
    label: "NO_LABEL"
})

type DateFieldEvents = {
    set: (value: string) => void
}

const inputRef = ref<HTMLInputElement>()
defineExpose<DateFieldEvents>({
    // reset: () => {
    //     display.value = ''
    //     emit('update:modelValue', null)
    // },
    // focus: () => inputRef.value?.focus(),
    set: (val: string) => {
        const [yyyy, mm, dd] = val.split('-')
        display.value = `${dd} / ${mm} / ${yyyy}`
    }
})

const display = ref('')

const emit = defineEmits<{ (e: 'update:modelValue', val: string | null): void }>()

function onInput(e: Event) {
    const input = e.target as HTMLInputElement
    let val = input.value.replace(/\D/g, '')

    let formatted = ''

    if (val.length >= 1) {
        const dd = val.substring(0, 2)
        if (dd.length === 2) {
            formatted = String(Math.min(Math.max(parseInt(dd), 1), 31)).padStart(2, '0')
        } else {
            formatted = dd
        }
    }

    if (val.length >= 3) {
        const mm = val.substring(2, 4)
        if (mm.length === 2) {
            formatted += ' / ' + String(Math.min(Math.max(parseInt(mm), 1), 12)).padStart(2, '0')
        } else {
            formatted += ' / ' + mm
        }
    }

    if (val.length >= 5) {
        formatted += ' / ' + val.substring(4, 8)
    }

    display.value = formatted
    input.value = formatted

    onBlur()
}

function onBlur() {
    const parts = display.value.split(' / ')
    if (parts.length !== 3) return emit('update:modelValue', null)

    const [dd, mm, yyyy] = parts.map(Number)
    const date = new Date(yyyy, mm - 1, dd)

    const valid =
        date.getFullYear() === yyyy &&
        date.getMonth() === mm - 1 &&
        date.getDate() === dd

    emit('update:modelValue', valid ? `${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}` : null)
}

const hasBeenFocussed      = ref(false)
const showIncorrectBorders = computed(() => hasBeenFocussed.value && !props.validee?.isValid())

onMounted(() => {
    if (!props.validee) return

    props.validee.showThatIsRequired.on(() => {
        hasBeenFocussed.value = true
    })
    props.validee.clear.on(() => {
        display.value = ""
    })
})
</script>

<template> 
<div 
    :class="[
        s.header
    ]"
    @click="inputRef?.focus()"
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
            ref="inputRef"
            :class="s.input"
            :value="display"
            placeholder="dd / mm / yyyy"
            maxlength="14"
            @input="onInput"
            @blur="onBlur"
        />
    </div>
    <Icon
        :class="s.icon"
        :icon="SVG.Calendar"
    />
</div>
</template>

<style module lang='sass'>
.input
    all: unset
    
.header
    display: flex
    min-height: 3rem

    box-shadow: inset 0 0 0 1px var(--secondary)

    border-radius: var(--border-radius-tiny)
    font-family: var(--font-family)

    cursor: pointer
    transition: .1s

    padding: .25rem 1rem .25rem 1rem
    box-sizing: border-box
    // box-shadow: inset 0 0 0 1px  var(--red) !important

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