<script setup>
import { useCssModule } from 'vue';
import RegistrationButton from '../buttons/RegistrationButton.vue';
import FaintButton from '../buttons/FaintButton.vue';

defineProps({
    submitText: {
        type: String,
        defaut: 'button'
    },
    leftText: {
        type: String,
        defaut: 'L button'
    },
    rightText: {
        type: String,
        defaut: 'R button'
    },
    leftLink: {
        type: String,
        defaut: '/'
    },
    rightLink: {
        type: String,
        defaut: '/'
    }
})
const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <RegistrationButton type="submit" :class="s.submit" :text="submitText"/>
    <FaintButton @click="$router.push(leftLink)" :class="s.left" :text="leftText"/>
    <FaintButton @click="$router.push(rightLink)" :class="s.right" :text="rightText"/>
</div>
</template>

<style module lang='sass'>
.container
    display: grid
    grid-template-areas: 'button button' 'left right'
    grid-template-rows: 1fr 1.5rem
    grid-auto-columns: 1fr 1fr
    gap: .6rem

    .submit
        grid-area: button
    .left
        grid-area: left
    .right
        grid-area: right
</style>