<script setup lang="ts">
import { useCssModule } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <h1 :class="s.title">Do that thing!</h1>
    <p :class="s.content">Yadayadadaadad a a  s s ss jk kgkgfd k kd dthis and that!!! sdfdsf df sdf  sddfsjk jk jkb hjbkb hjk bjh bjk bkbjkh jhbb jkbkjbkj kjbkb b kjb </p>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    gap: .5rem
    padding: .5rem
    border-radius: 0 0 6px 6px

    box-sizing: border-box
    background: white
    border-top: 6px solid var(--accent)

    .title
        @include main.f-size-very-small
        font-weight: 900

    .content
        @include main.f-size-very-small
</style>