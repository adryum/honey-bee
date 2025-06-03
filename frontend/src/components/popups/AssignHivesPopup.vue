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
import { assignHiveToApiary, getHives, user } from '@/core/repositories/homeRepository';
import Hive from '../hive/Hive.vue';

const props = defineProps({
    id: Number,
    apiaryId: Number,
    currentFilter: String,
    refreshHives: Function
})

const hives = ref([])

onMounted(async () => {
    hives.value = await getHives(user.value['account_code'])
})

const s = useCssModule()
</script>


<template>
    <div :class="s.container">
    <div :class="s.header">
        <div>
            <div>Path</div>
            Hives 
        </div>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton @click="removePopup(id)" :class="s['button-special']" res="fa-solid fa-xmark"/>
    </div>

    <div :class="s.grid">
        <slot>
            <Hive v-for="(hive, i) in hives" :key="i"
            @click="assignHiveToApiary(user.account_code, hive.id, apiaryId, refreshHives)"
            :name="hive.name"
            :weight="hive.weight"
            :frames="hive.frames"
            :type="hive.type"
            ></Hive>
        </slot>
    </div>
</div>

    <!-- <div :class="s.container">
        <div :class="s.header">
            <Icon :id="s.icon" res="fa-solid fa-bug"/>
            <TextTitle :shrink-width-to-text="true" :is-disabled="true" 
                :class="s.title" text="Create Apiary "/>
            <div :class="s['vertical-split']"></div>
            <IconCubeButton :id="s.other"/>
            <IconCubeButton @click="removePopup(id)" :id="s.close"/>
        </div> -->

        <!-- <form @submit.prevent="onCreate(user.account_code, currentFilter, rName, rLocation, rDescription)" :class="s.grid">
            
        </form> -->

    <!-- </div> -->

</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as main
.container 
    display: flex
    flex-direction: column
    width: 80vw

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

.grid
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: flex-start
    gap: 3rem
    justify-items: center
    padding: 1rem

.button-special
    background: main.$button-special


// .container
//     display: flex
//     flex-direction: column
        
//     border-radius: 2px
//     overflow: hidden
//     box-shadow: 0 0 30px rgba(0, 0, 0, .5)

//     width: 50vw

//     background: main.$popup-base

//     .header
//         display: flex
//         align-items: center

//         box-sizing: border-box
//         padding: .6rem
//         gap: .6rem

//         height: 5rem
//         border-radius: 0 0 2px 2px
//         background: $dark
//         .vertical-split
//             margin-left: auto 
//             border-radius: 20px
//             height: 100%
//             width: 4px
//             background: $underline-dark

//         #icon
//             aspect-ratio: 1
//             height: 100%
//         #close
//             background: $button-special
//         #other
//             background: $button-common
    
//     .separator
//         align-self: center
//         border-radius: 20px
//         width: 90%
//         margin-top: .5rem 
//         min-height: 6px
//         background: $dark

//     .grid
//         flex: 1
//         padding: 1rem 2rem
//         gap: 1rem
//         box-sizing: border-box

//         display: grid
//         grid-template-areas: 'name name' 'locat locat' 'cube1 cube2' 'but but'
//         grid-template-columns: 1fr 1fr
//         grid-template-rows: repeat(2, 4.5rem) 20rem 4.5rem

//         #name
//             grid-area: name
//         #location
//             grid-area: locat
//         #image
//             grid-area: cube1
//         #description
//             grid-area: cube2
//         #submit
//             grid-area: but
</style>