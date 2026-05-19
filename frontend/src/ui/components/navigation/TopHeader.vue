<script setup lang="ts">
import { useCssModule } from 'vue';
import ProfileWidget from '@/ui/components/profile/ProfileWidget.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { changeLang, Language } from '@/core/locales/i18n';

const s = useCssModule()

</script>

<template>
<div :class='s.container'>
    <div
        :class="s.rightAligner"
    ></div>
    <IconTextButton
        text="Lv"
        :hide-icon="true"
        @click="changeLang(Language.Lv)"
    />
    <IconTextButton
        text="En"
        :hide-icon="true"
        @click="changeLang(Language.En)"
    />
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
    min-height: var(--header-height)
    padding: 0 .5rem
    box-sizing: border-box
    
    background: var(--white)
    // background: var(--black)
    font-family: var(--font-family)

.rightAligner
    margin-left: auto
</style>