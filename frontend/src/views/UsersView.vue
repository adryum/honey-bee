<script setup>
import { ref, useCssModule } from "vue";

import { onMounted } from 'vue';
import IconCubeButton from '@/components/buttons/IconCubeButton.vue';
import PathTitle from '@/components/PathTitle.vue';
import UserProfile from "@/components/settings/UserProfile.vue";
import UserTable from "@/components/UserTable.vue";

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <PathTitle title="Admin powers"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton :class="s['button-special']" res="fa-solid fa-left-long"/>
    </div>

    <div :class="s.content">
        <UserTable />
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container 
    display: flex
    flex-direction: column
    width: 100%
    height: calc( 100vh - 12px )
    overflow: hidden

    box-sizing: border-box
    margin: 6px

    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #FFECC8

.header
    display: flex
    align-items: center
    gap: .4rem

    height: 5rem

    box-sizing: border-box
    padding: .4rem
    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #EDEDED

    .vt-linebreak
        width: 6px
        height: 100%
        border-radius: 4px
        background: #D9D9D9
        margin-left: auto 

.button-special
    background: main.$button-special

.content
    flex: 1
    display: flex
    align-items: center
    justify-content: center
    
</style>