<script setup>
import { useCssModule } from 'vue';

let model = defineModel()
defineProps({
    isDisabled: Boolean
})

const s = useCssModule()
</script>

<template>
    <div :class="s.container">
        <div :class="s['decor-line']"></div>
        <input :class="s.input" v-model="model" :disabled="isDisabled"/>
    </div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as *
.container
    position: relative
    display: flex
    flex-direction: column
    background: rgba(0, 0, 0, 0)

.input 
    all: unset
    position: relative
    width: 100%
    font-size: 40px
    text-align: center
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden

.decor-line
    position: absolute
    bottom: .2rem
    width: 100%
    height: 4px
    border-radius: 10px
    background: $underline-dark
</style>