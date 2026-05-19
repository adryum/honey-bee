<script setup lang="ts">
import { useCssModule } from 'vue';
import ProfileWidget from '@/ui/components/profile/ProfileWidget.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { changeLang, Language } from '@/core/locales/i18n';
import { useI18n } from 'vue-i18n';

const s = useCssModule()
const { locale } = useI18n()

</script>

<template>
<div :class='s.container'>
    <div
        :class="s.rightAligner"
    ></div>
    <button
        :class="[
            locale === Language.Lv && s.selected,
            s.langButton
        ]"
        @click="changeLang(Language.Lv)"
    >Lv</button>
    <button
        :class="[
            locale === Language.En && s.selected,
            s.langButton
        ]"
        @click="changeLang(Language.En)"
    >En</button>
    <ProfileWidget
        :class="s.profile"
    />
</div>
</template>

<style module lang='sass'>
.langButton
    border: none
    background: none
    display:    inline-flex

    font-weight: 500

    align-items: center

    gap:        .5rem
    height:     AUTO

    font-family: var(--font-family)
    font-size:   var(--font-size-small)

    box-sizing:    border-box
    padding: 0 1rem

    transition: .1s
    cursor: pointer

    &:hover
        background: var(--secondary)

    &.selected
        color: var(--black)
        font-weight: 900

   
.container
    display: flex
    width: 100%
    min-height: var(--header-height)
    box-sizing: border-box
    
    background: var(--white)
    font-family: var(--font-family)

.rightAligner
    margin-left: auto
</style>