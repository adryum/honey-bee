<script setup>
import { useCssModule, useTemplateRef, ref, onMounted, watch } from 'vue';

const props = defineProps({
    hint: {
        type: String,
        default: 'Field'
    },
    type: {
        type: String,
        default: 'text'
    },
    isRequired: Boolean,
    minLength: Number,
    noNumbers: Boolean,
    atLeastOneUppercase: Boolean
})
const errMessage = ref('')

function checkIfValid() {
    let validLength = false
    let validNumbers = false
    let validUppercases = false
    let reqired = false

    // if no model is provided then fail
    if (!model.value) {
        isValid.value = false
        return
    }

    if (props.minLength) {
        if (model.value.length >= props.minLength) {
            // on true
            validLength = true
        } else {
            errMessage.value = ` - Must be ${props.minLength} simbols long!`
        }
    } 
    if (props.noNumbers) {
        if(/^([^0-9]*)$/.test(model.value)) {
            // on true
            validNumbers = true
        } else {
            errMessage.value = ` - Must NOT contain numbers!`
        }
    }
    if (props.atLeastOneUppercase) {
        if (/[A-Z]/.test(model.value)) {
            // on true
            validUppercases = true
        } else {
            errMessage.value = ` - Must contain an Uppercase!`
        }
    }
    if (props.isRequired) {
        if (model.value.length != 0) {
            reqired = true
        }
    }

    isValid.value = 
        (props.isRequired === reqired)
        && ((props.minLength != undefined && props.minLength != null) === validLength)
        && (props.noNumbers === validNumbers) 
        && (props.atLeastOneUppercase === validUppercases)
}

const input = useTemplateRef('input')
const model = defineModel()
const isValid = defineModel('isValid')
const s = useCssModule()

watch(model, () => {
    checkIfValid()
},{
    immediate: true
})
</script>

<template>
<div @click="input.focus()" :class="[!isValid && s['input-empty'], s.container]">
    <div :class="[model && s['not-empty'], s.hint]">
        <p>{{ hint }}</p>
        <p :class="s.warning" v-if="!isValid">{{ errMessage }}</p>
    </div>
    <input @input="checkIfValid()" ref="input" :type="type" :class="[model && s['not-empty-input'], s.input]" v-model="model">
</div>
</template>

<style module lang='sass'>
.container
    height: 3rem
    overflow: hidden

    display: flex
    flex-direction: column
    position: relative

    box-sizing: border-box
    padding: .2rem 0 0 .3rem
    border-bottom: 3px solid #FFD426
    border-radius: 8px
    box-shadow: 0 0 4px rgba(0, 0, 0, .2)
    cursor: text

    transition: .2s
    background: white

    &:focus-within
        .hint
            font-size: 12px
            
        .input
            font-size: 16px

.input-empty
    border-bottom: 3px solid rgba(255, 61, 61, .7)

.warning
    color: red

.hint
    opacity: .7
    font-size: 14px
    transition: .1s

.not-empty
    font-size: 12px

.input
    all: unset
    width: 100%
    height: 100%
    font-size: 14px
    background: white
    transition: .1s

.not-empty-input
    font-size: 16px
</style>