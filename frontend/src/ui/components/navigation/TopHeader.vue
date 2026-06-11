<script setup lang="ts">
import { useCssModule } from 'vue';
import ProfileWidget from '@/ui/components/profile/ProfileWidget.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { changeLang, Language } from '@/core/locales/i18n';
import { useI18n } from 'vue-i18n';
import Icon from '../Icon.vue';
import { IconType, SVG } from '@/assets/svgs/SVGLoader.ts';
import { useTheme } from '@/core/Themes.ts';

const s = useCssModule()
const { locale, t } = useI18n()
const { cycleTheme } = useTheme();

</script>

<template>
<div :class='s.container'>
    <div
        :class="s.rightAligner"
    ></div>

    <button
        :class="[
            s.langButton
        ]"
        @click="cycleTheme()"
    >
        <Icon
            :icon="SVG.Light"
            :type="IconType.MEDIUM"
        />
    </button>
    <button
        :class="[
            locale === Language.Lv && s.selected,
            s.langButton
        ]"
        @click="changeLang(Language.Lv)"
    >{{ t('language.lv') }}</button>
    <button
        :class="[
            locale === Language.En && s.selected,
            s.langButton
        ]"
        @click="changeLang(Language.En)"
    >{{ t('language.en') }}</button>
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