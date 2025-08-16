<script setup>
import { onMounted, ref, useCssModule } from 'vue';
import IconCubeButton from '../buttons/IconCubeButton.vue';
import Icon from '../Icon.vue';
import TextTitle from '../input_fields/TextTitle.vue';
import PopupPlate from './PopupPlate.vue';
import Field from '../input_fields/Field.vue';
import FieldVertical from '../input_fields/FieldVertical.vue';
import ImageField from '../input_fields/ImageField.vue';
import Button from '../buttons/Button.vue';
import { removePopup } from '@/core/popups';
import { assignHiveToApiary, getHives, rUser } from '@/core/repositories/homeRepository';
import Hive from '../hive/Hive.vue';
import PathTitle from '../PathTitle.vue';
import RegistrationButton from '../buttons/RegistrationButton.vue';

const props = defineProps({
    id: String,
    apiaryId: Number,
    title: String,
    description: String,
    onYes: Function,
    onAsyncYes: Function
})

async function onYesClick() {
    if (props.onYes) props.onYes()
    if (props.onAsyncYes) await props.onAsyncYes()

    removePopup(props.id)
}

const s = useCssModule()
</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <PathTitle :title="title"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton @click="removePopup(id)" :class="s['button-special']" res="fa-solid fa-xmark"/>
    </div>
    <div :class="s.body">
        <p :class="s.description">{{ description }}</p>
        
        <RegistrationButton :class="s.yes" text="Yes" @click="onYesClick()"/>
        <RegistrationButton :class="s.no" text="No" @click="removePopup(id)"/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as main
.container 
    display: flex
    flex-direction: column

    box-sizing: border-box
    margin: 6px


    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #FFECC8

    .body
        display: grid
        grid-template-areas: 'desk desk' 'yes no'
        grid-template-columns: 1fr 1fr
        grid-template-rows: 1fr 1fr
        column-gap: 1rem

        box-sizing: border-box
        padding: .6rem

        .description
            grid-area: desk
            font-size: 20px
        .yes
            grid-area: yes
        .no
            grid-area: no
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
@media (max-width: 600px) 
    .container
        width: 100%
</style>