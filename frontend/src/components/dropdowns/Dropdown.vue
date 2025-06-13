<script setup>
import { useCssModule, useTemplateRef, ref, onMounted, watch } from 'vue';
import Icon from '../Icon.vue';

const props = defineProps({
    hint: {
        type: String,
        default: 'Field'
    },
    choices: {
        type: Array,
        default: ['Tower', 'Stationary', 'doggy']
    },
    isRequired: Boolean,
})
const rIsExtended = ref(false)

function checkIfValid() {
    let reqired = false

    if (props.isRequired) {
        if (model.value?.length != 0) {
            reqired = true
        }
    }

    isValid.value = props.isRequired === reqired
}

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
<div @click="rIsExtended = !rIsExtended; console.log(rIsExtended)" :class="[s.container, rIsExtended && s.extended_container, !isValid && s.invalid]">
    <Icon :class="[s.icon, rIsExtended && s.icon_flipped]" res="fa-solid fa-chevron-down"/>
    <div :class="s.content">
        <div :class="[model && s['not-empty'], s.hint]"><p>{{ hint }}</p></div>
        <input readonly type="text" :class="s.input" v-model="model">
    </div>
    <div :class="s.overflow">
        <ul :class="[s.list, !isValid && s.invalid]">
            <li v-for="(item, i) in choices" :key="i"
                :class="[s.item, i + 1 === choices.length && s.last_item]"
                @click="model = item">
                {{ item }}
            </li>
        </ul>
    </div>
</div>
</template>

<style module lang='sass'>
.container
    position: relative
    display: flex

    height: 3rem

    border-radius: 8px
    box-sizing: border-box
    padding: .2rem 0 0 .3rem
    border-bottom: 3px solid #FFD426
    
    box-shadow: 0 0 4px rgba(0, 0, 0, .2)

    transition: .2s
    background: white

    .icon_flipped
        transform: rotateX(180deg)

    .hint
        font-size: 12px
        
    .input
        font-size: 16px

    .input
        all: unset
        width: 100%

        transition: .1s

    .overflow
        position: absolute
        display: flex
        justify-content: center
        top: 3rem
        left: -2px
        width: calc(100% + 4px)

        overflow: hidden
        padding-bottom: calc(((2rem + 1px) * v-bind('choices.length')) + 3px)

    .list
        all: unset
        position: absolute
        width: calc(100% - 4px)
        top: 0
        
        border-radius: 0 0 8px 8px
        border-bottom: 1px solid #FFD426
        background: white
        transform: translateY(calc(-100% - 3rem))
        transition: .3s
        box-shadow: 0 0 4px rgba(0, 0, 0, .2)

        .item
            all: unset
            display: flex
            align-items: center
            justify-content: center

            height: 2rem
            border-bottom: 1px solid #C9C9C9

            cursor: pointer

            &:hover
                backdrop-filter: brightness(90%)
        
        .last_item
            border: none

.extended_container
    border-radius: 8px 8px 0 0

    .list
        transform: translateY(0)

.invalid
    border-color: red
</style>