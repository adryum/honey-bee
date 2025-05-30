<script setup>
import { onMounted, toRef, useCssModule, useTemplateRef } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: undefined
  },
  shrinkWidthToText: Boolean,
  isDisabled: {
    type: Boolean,
    default: false
  }
})

let model = defineModel()
const s = useCssModule()
const rInput = useTemplateRef('input')

function adjustSize() {
    if (!props.shrinkWidthToText) return

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = '40px Alata'
    let width = context.measureText(rInput.value.value).width;
    rInput.value.style.width = width + "px"
}

onMounted(() => {
    adjustSize()
    console.log(model);
})
</script>

<template>
    <div :class="s.container">
        <div :class="s['decor-line']"></div>
        <input ref="input" v-if="!text"
            @input="adjustSize()"
            :class="s.input" 
            v-model="model"
            :disabled="isDisabled"
            :style="{shrinkWidthToText : 'text-align: start'}"/>

        <input ref="input" v-if="text"
            :class="s.input" 
            :value="text" 
            disabled
            :style="{shrinkWidthToText : 'text-align: start'}"/>
    </div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    position: relative
    display: flex
    height: 3.4rem
    flex-direction: column
    background: rgba(0, 0, 0, 0)

.input 
    @include main.input-base
    all: unset
    position: relative
    width: 100%
    font-size: 40px
    text-align: center
    

.decor-line
    position: absolute
    bottom: 0
    width: 100%
    min-height: 6px
    border-radius: 10px
    background: main.$underline-dark
</style>