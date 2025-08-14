<script setup lang="ts">
import { computed, reactive, ref, useCssModule } from 'vue';
import IconCubeButton from '../buttons/IconCubeButton.vue';
import { createApiary, rUser } from '@/core/repositories/homeRepository';
import RegistrationInputField from '../input_fields/RegistrationInputField.vue';
import RegistrationButton from '../buttons/RegistrationButton.vue';
import PathTitle from '../PathTitle.vue';
import { useDraggable } from '@vueuse/core';

const s = useCssModule()
const props = defineProps<{
    unmount?: () => {}
}>()
const container = ref()
const handle = ref()
const dragable = useDraggable(container, 
    {
        handle: handle,
        initialValue: { x:0, y:0 }
    }
)

const rName = ref('')
const rLocation = ref('')
const rDescription = ref('')

async function onCreate(name: string, location: string, description: string): Promise<void> {
    // const result = await createApiary(props.currentFilter, name, location, description)
 
    // if (result === 201) {
    //     // only on successful result 
    //     props.refreshApiaries()
    //     removePopup(props.id)
    // } else {
    //     // err handling

    // }
}


const isValid = computed(() => {
    return rName.value && rLocation.value
})
</script>

<template>
<div ref="container" :class="s.container">
    <div ref="handle" :class="s.header">
        <PathTitle title="Create Apiary"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton @click="unmount" :class="s['button-special']" res="fa-solid fa-xmark"/>
    </div>

    <div :class="s.grid">
        <!-- <img :class="s.image" :src="img" alt="hive img"> -->
        <RegistrationInputField :class="s.name"
            :is-required="true" hint="Name" 
            v-model="rName" v-model:isValid="rName"/>
        <RegistrationInputField :class="s.location"
            :is-required="true" hint="Location" 
            v-model="rLocation" v-model:isValid="rLocation"/>
        <RegistrationInputField :class="s.description"
            hint="Description" v-model="rDescription"/>
        <RegistrationButton :class="s.button"
            @click="isValid ? onCreate(rName, rLocation, rDescription) : {}" 
            :is-enabled="isValid" text="Create"/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as colors
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
        grid-template-areas: 'img name' 'img location' 'img description' 'img button' 
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
    background: colors.$button-special

@media (max-width: 600px) 
    .grid
        display: flex !important
        flex-direction: column
</style>