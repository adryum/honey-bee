<script setup>
import { onMounted, useCssModule, ref, watch } from 'vue';
import RegistrationInputField from '../input_fields/RegistrationInputField.vue';
import RegistrationButton from '../buttons/RegistrationButton.vue';
import { updateUserData, rUser } from '@/core/repositories/homeRepository';
import HorizontalTextArea from '../hive/widgets/stimulant/HorizontalTextArea.vue';
import CircleImage from '../CircleImage.vue';

const rUsername = ref("")
const rName = ref("")
const rSurname = ref("")
const rEmail = ref("")
const rPassword = ref("")
const rProfilePicture = ref("")

const isUsernameValid = ref(false)
const isNameValid = ref(false)
const isSurnameValid = ref(false)
const isEmailValid = ref(false)
const isPasswordValid = ref(false)

function areValid() {
    return isUsernameValid.value 
    && isNameValid.value
    && isSurnameValid.value
    && isEmailValid.value
    && isPasswordValid.value
}

function areThereAnyChanges() {
    return (rUsername.value != rUser.value.username) 
    || (rName.value != rUser.value.name) 
    || (rSurname.value != rUser.value.surname)
    // || (rProfilePicture.value != rUser.value.profile_picture)
    || (rEmail.value != rUser.value['e_mail']) 
    || (rPassword.value != rUser.value.password)
}

function compressToUser() {
    return {
        account_code: "#2",
        username: (rUsername.value != rUser.value.username) ? rUsername.value : undefined,
        name: (rName.value != rUser.value.name) ? rName.value : undefined,
        surname: (rSurname.value != rUser.value.surname) ? rSurname.value : undefined,
        profile_picture: (rProfilePicture.value != rUser.value.profile_picture) ? rProfilePicture.value : undefined,
        e_mail: (rEmail.value != rUser.value.e_mail) ? rEmail.value : undefined,
        password: (rPassword.value != rUser.value.password) ? rPassword.value : undefined,
    }
}
function updateValues() {
    console.log('updated');
    console.log(rUser.value.username);
    
    rUsername.value = rUser.value.username
    rName.value = rUser.value.name
    rSurname.value = rUser.value.surname
    rEmail.value = rUser.value['e_mail']
    rPassword.value = rUser.value.password
}
const s = useCssModule()
watch(() => rUser.value, (nValue) => {
    console.log('new');
    
    console.log(nValue.value);
    updateValues()
})
onMounted(() => {
    updateValues()
})
</script>

<template>
<div :class='s.container'>
    <h1>User Profile</h1>
    <form @submit.prevent="(areValid() && areThereAnyChanges()) ? updateUserData(compressToUser()) : () => {}" :class="s.content">
        <div :class="s.left">
            <CircleImage :class="s.icon" :res="rProfilePicture"/>
            <HorizontalTextArea :class="s.role" title="Role" :content="rUser.role"/>
        </div>
        <div :class="s.right">
            <RegistrationInputField v-model:isValid="isUsernameValid" v-model="rUsername" hint="Username" type="text" :is-required="true"/>
            <RegistrationInputField v-model:isValid="isNameValid" :no-numbers="true" :at-least-one-uppercase="true" v-model="rName" hint="Name" type="text" :is-required="true"/>
            <RegistrationInputField v-model:isValid="isSurnameValid":no-numbers="true" :at-least-one-uppercase="true" v-model="rSurname" hint="Surname" type="text" :is-required="true"/>
            <RegistrationInputField v-model:isValid="isEmailValid"v-model="rEmail" hint="E-mail" type="email" :is-required="true"/>
            <RegistrationInputField v-model:isValid="isPasswordValid":min-length="6" v-model="rPassword" hint="Password" type="password" :is-required="true"/>
            <RegistrationButton :is-enabled="areValid() && areThereAnyChanges()" text="Save changes"/>
        </div>
    </form>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    align-items: center

    width: 40rem

    background: white
    border-radius: 4px
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)

    .content
        display: flex
        gap: 1rem
        width: 100%

        box-sizing: border-box
        padding: 1rem
        .left
            flex: 1
            display: flex
            flex-direction: column
            gap: 1rem

            .icon
                flex: 1

            .role
                height: 3rem
           
        .right
            display: flex
            flex-direction: column
            gap: 1rem
            flex: 1


</style>