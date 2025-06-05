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
import PathTitle from '../PathTitle.vue';
import HorizontalHr from '../HorizontalHr.vue';

const props = defineProps({
    id: String,
    apiaryId: String,
    currentFilter: String,
    refreshHives: Function
})

const hives = ref([])
const assignedHives = ref([])
const unassignedHives = ref([])

function onAssignment() {
    props.refreshHives()
    refreshPopup()
}

async function refreshPopup() {
    hives.value = await getHives(user.value['account_code'])

    assignedHives.value = hives.value.filter((item) => item['apiary_id'] && item['apiary_id'] != props.apiaryId)
    unassignedHives.value = hives.value.filter((item) => !item['apiary_id'])
}

const s = useCssModule()
onMounted(async () => refreshPopup())
</script>


<template>
    <div :class="s.container">
    <div :class="s.header">
        <PathTitle title="Hives"/>
        <div :class="s['vt-linebreak']"></div>
        <IconCubeButton @click="removePopup(id)" :class="s['button-special']" res="fa-solid fa-xmark"/>
    </div>

    <div :class="s.grid">
        <Hive v-for="(hive, i) in assignedHives" :key="i"
            @click="assignHiveToApiary(user.account_code, hive.id, apiaryId, onAssignment)"
            :apiary="hive.apiary"
            :name="hive.name"
            :weight="hive.weight"
            :frames="hive.frames"
            :type="hive.type"
        />
        <HorizontalHr v-if="unassignedHives.length > 0" text="Unassigned hives"/>
        <Hive v-for="(hive, i) in unassignedHives" :key="i"
            @click="assignHiveToApiary(user.account_code, hive.id, apiaryId, onAssignment)"
            :apiary="hive.apiary"
            :name="hive.name"
            :weight="hive.weight"
            :frames="hive.frames"
            :type="hive.type"
        />
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/_colors.sass' as main
.container 
    display: flex
    flex-direction: column
    width: 80vw
    height: 80vh

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

    overflow-y: scroll

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