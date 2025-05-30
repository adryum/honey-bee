<script setup>
import { ref, useCssModule } from 'vue';
import IconCubeButton from '../buttons/IconCubeButton.vue';
import Icon from '../Icon.vue';
import TextTitle from '../input_fields/TextTitle.vue';
import PopupPlate from './PopupPlate.vue';
import Field from '../input_fields/Field.vue';
import FieldVertical from '../input_fields/FieldVertical.vue';
import ImageField from '../input_fields/ImageField.vue';
import Button from '../buttons/Button.vue';
import { removePopup } from '@/core/popups';
import { createApiary, user } from '@/core/repositories/homeRepository';

const props = defineProps({
    id: Number,
    currentFilter: String,
    refreshApiaries: Function
})
const s = useCssModule()
const rName = ref('')
const rLocation = ref('')
const rDescription = ref('')

async function onCreate(accCode, currentFilter, name, location, description) {
    const result = await createApiary(accCode, currentFilter, name, location, description)
 
    if (result === 201) {
        // only on successful result 
        props.refreshApiaries()
        removePopup(props.id)
    } else {
        // err handling

    }
}
</script>

<template>
<PopupPlate>
    <div :class="s.container">
        <div :class="s.header">
            <Icon :id="s.icon" res="fa-solid fa-bug"/>
            <TextTitle :shrink-width-to-text="true" :is-disabled="true" 
                :class="s.title" text="Create Apiary "/>
            <div :class="s['vertical-split']"></div>
            <IconCubeButton :id="s.other"/>
            <IconCubeButton @click="removePopup(id)" :id="s.close"/>
        </div>
        <div :class="s.separator"></div>

        <form @submit.prevent="onCreate(user.account_code, currentFilter, rName, rLocation, rDescription)" :class="s.grid">
            <Field 
                :id="s.name"  
                :class="s.line"
                title="Name" v-model="rName"/>
            <Field :id="s.location" :class="s.line"
                title="Location" v-model="rLocation"/>
            <ImageField :id="s.image" title="Image"/>
            <FieldVertical :id="s.description" title="Description" v-model="rDescription"/>
            <Button :id="s.submit" type="submit" title="Create Apiary" />
        </form>

    </div>
</PopupPlate>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as *
.container
    display: flex
    flex-direction: column
        
    border-radius: 2px
    overflow: hidden
    box-shadow: 0 0 30px rgba(0, 0, 0, .5)

    width: 50vw

    background: $popup-base

    .header
        display: flex
        align-items: center

        box-sizing: border-box
        padding: .6rem
        gap: .6rem

        height: 5rem
        border-radius: 0 0 2px 2px
        background: $dark
        .vertical-split
            margin-left: auto 
            border-radius: 20px
            height: 100%
            width: 4px
            background: $underline-dark

        #icon
            aspect-ratio: 1
            height: 100%
        #close
            background: $button-special
        #other
            background: $button-common
    
    .separator
        align-self: center
        border-radius: 20px
        width: 90%
        margin-top: .5rem 
        min-height: 6px
        background: $dark

    .grid
        flex: 1
        padding: 1rem 2rem
        gap: 1rem
        box-sizing: border-box

        display: grid
        grid-template-areas: 'name name' 'locat locat' 'cube1 cube2' 'but but'
        grid-template-columns: 1fr 1fr
        grid-template-rows: repeat(2, 4.5rem) 20rem 4.5rem

        #name
            grid-area: name
        #location
            grid-area: locat
        #image
            grid-area: cube1
        #description
            grid-area: cube2
        #submit
            grid-area: but
</style>