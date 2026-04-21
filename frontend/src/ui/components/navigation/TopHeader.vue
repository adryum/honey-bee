<script setup lang="ts">
import { useCssModule } from 'vue';
import ProfileWidget from '../settings/ProfileWidget.vue';


const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <ProfileWidget
        :class="s.profile"
    />
</div>
</template>

<style module lang='sass'>
 
@use '@/assets/_colors.sass' as colors
.container
    display: flex
    align-items: center
    width: 100%
    min-height: 3.5rem
    box-sizing: border-box
    padding: 0 .5rem
    
    background: var(--white)
    // background: var(--black)
    font-family: var(--font-family)

    .profile
        margin-left: auto
</style>