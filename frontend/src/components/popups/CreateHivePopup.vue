<script setup>
import { onMounted, ref, useCssModule } from 'vue';
import IconCubeButton from '../buttons/IconCubeButton.vue';
import { removePopup } from '@/core/popups';
import { assignHiveToApiary, createHive, getHives, rUser } from '@/core/repositories/homeRepository';
import Hive from '../hive/Hive.vue';
import PathTitle from '../PathTitle.vue';
import HorizontalHr from '../HorizontalHr.vue';
import RegistrationInputField from '../input_fields/RegistrationInputField.vue';
import RegistrationButton from '../buttons/RegistrationButton.vue';
import { useReactiveImage } from '@/core/imageHandler';

const props = defineProps({
    id: String,
    refreshHives: Function
})

const rName = ref('')
const rLocation = ref('')
const rDescription = ref('')
const rType = ref('')
const rImage = ref('')
const { img } = useReactiveImage(rImage, (obj) => obj)

const isNameValid = ref(false)
const isTypeValid = ref(false)

function isEverythingValid() {
    return isNameValid.value && isTypeValid.value
}

async function onCreate(name, location, description, image, type) {
    const result = await createHive(name, location, description, image, type)
 
    if (result === 201) {
        // only on successful result 
        await props.refreshHives()
        removePopup(props.id)
    } else {
        // err handling

    }
}

const s = useCssModule()
</script>


<template>
<div :class="s.container">
    <div :class="s.header">
        <PathTitle title="Create Hive"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton @click="removePopup(id)" :class="s['button-special']" res="fa-solid fa-xmark"/>
    </div>

    <Suspense>
    <div :class="s.grid">
        <img :class="s.image" :src="img" alt="hive img">
        <RegistrationInputField :class="s.name"
        :is-required="true" hint="Name" 
        v-model="rName" v-model:isValid="isNameValid"/>
        <RegistrationInputField  :class="s.location"
        hint="Location" v-model="rLocation"/>
        <RegistrationInputField :class="s.description"
        hint="Description" v-model="rDescription"/>
        <RegistrationInputField :class="s.tag"
        :is-required="true" hint="Type" 
        v-model="rType" v-model:isValid="isTypeValid"/>
        <RegistrationButton :class="s.button"
        @click="(isEverythingValid()) ? onCreate(rName, rLocation, rDescription, rImage, rType) : {}" 
        :is-enabled="isEverythingValid()" text="Create"/>
    </div>
    </Suspense>
</div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as main
.container 
    display: flex
    flex-direction: column

    box-sizing: border-box
    margin: 6px

    width: 40rem

    border-radius: 4px
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.21)
    background: #EDEDED

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

    .grid
        display: grid
        grid-template-areas: 'img name' 'img location' 'img description' 'type button' 
        grid-template-columns: 1fr 1.5fr
        grid-template-rows: repeat(2, 1fr) 2fr 1fr
        gap: 1rem
        
        padding: 1rem

        .image
            grid-area: img
            width: 100%
            height: 100%
            object-fit: cover
            border-radius: 8px
            box-shadow: 0 0 10px rgba(0, 0, 0, .2)
        .name
            grid-area: name
        .location
            grid-area: location
        .description
            grid-area: description
        .type
            grid-area: type
        .button
            grid-area: button

.button-special
    background: main.$button-special

</style>