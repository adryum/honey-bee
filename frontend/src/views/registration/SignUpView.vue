<script setup>
import {onMounted, reactive, ref, useCssModule} from "vue";
import RegistrationInputField from "@/components/input/fields/RegistrationInputField.vue";
import CheckboxWText from "@/components/input/fields/CheckboxWText.vue";
import { signUp } from "@/core/repositories/registrationRepository";
import { watch } from "vue";
import { rUser } from "../../core/repositories/homeRepository.js";
import { isEmpty } from "../../utils/checks.js";
import router from '../../router/index.js';
import RegistrationButton from "@/components/input/buttons/RegistrationButton.vue";
import FaintButton from "@/components/input/buttons/FaintButton.vue";

const rUsername = ref("")
const rName = ref("")
const rSurname = ref("")
const rEmail = ref("")
const rPassword = ref("")
const rRepeatPassword = ref("")
const rProfilePicture = ref("")
const rAgreedToTerms = ref(false)
const rAgreedToSpam = ref(false)

const isValid = reactive({
    username: false,
    name: false,
    surname: false,
    email: false,
    password: false,
})

function isEverythingValid() {
    // check if validation is true
    for (let key in isValid) {
        if (!isValid[key]) return false
    }

    // if passwords dont match
    if (rPassword.value != rRepeatPassword.value) return false

    return true
}

watch(rUser, (newValue) => {
    if (!isEmpty(newValue)) {
        console.log('Sent to main');
        
        router.push('/')
    }
},
{
    immediate: true
})
onMounted(() => {
    isEverythingValid()
})
const s = useCssModule()
</script>

<template>
<div :class="s.view">
    <form @submit.prevent="isEverythingValid() ? signUp(rUsername, rName, rSurname, rProfilePicture, rEmail, rPassword) : () => {}" :class="s.container">
        <img :class="s.logo" src="@/assets/images/BeeLogo.png" alt="logo">
        <h1 :class="s.title">HoneyBee</h1>
        <RegistrationInputField
            v-model="rUsername" v-model:isValid="isValid.username"
            hint="Username" type="text" :is-required="true"/>
        <RegistrationInputField :no-numbers="true" :at-least-one-uppercase="true" v-model="rName" v-model:isValid="isValid.name"
            hint="Name" type="text" :is-required="true"/>
        <RegistrationInputField :no-numbers="true" :at-least-one-uppercase="true" v-model="rSurname" v-model:isValid="isValid.surname"
            hint="Surname" type="text" :is-required="true"/>
        <RegistrationInputField v-model="rEmail" v-model:isValid="isValid.email"
            hint="E-mail" type="email" :is-required="true"/>
        <RegistrationInputField :at-least-one-uppercase="true" :min-length="6" v-model="rPassword" v-model:isValid="isValid.password"
            hint="Password" type="password" :is-required="true"/>
        <RegistrationInputField v-model="rRepeatPassword" hint="Repeat Password" type="password" :is-required="true"/>
        <CheckboxWText v-model="rAgreedToSpam" text="Agree to receive spam" :isRequired="true"/>
        <CheckboxWText v-model="rAgreedToTerms" text="Agree to Terms of Service" :isRequired="true"/>
        <CheckboxWText text="Remember me!"/>
        <div :class='s.container_bottom'>
            <RegistrationButton :is-enabled="isEverythingValid()" type="submit" :class="s.submit" text="Sign up"/>
            <FaintButton @click="$router.push('/recovery')" :class="s.left" text="Forgot Password!"/>
            <FaintButton @click="$router.push('/login')" :class="s.right" text="Log in"/>
        </div>
    </form>
</div>
</template>

<style module lang="sass">
.container_bottom
    display: grid
    grid-template-areas: 'button button' 'left right'
    grid-template-rows: 1fr 1.5rem
    grid-auto-columns: 1fr 1fr
    gap: .6rem

    .submit
        grid-area: button
    .left
        grid-area: left
    .right
        grid-area: right
.logo
    position: absolute
    top: -6.5rem
    left: -7rem
    rotate: -2deg
    height: 18rem

.title
    all: unset
    font-size: 45px
    letter-spacing: 1px
    margin: 0 0 .5rem 0
    align-self: center
    color: #2D1E02
    
.view
    display: flex
    width: 100%
    height: 100vh
    align-items: center
    justify-content: center

.container
    width: 27rem

    position: relative
    display: flex
    flex-direction: column
    gap: 1rem

    box-sizing: border-box
    border-bottom: 2px solid #B9A554
    padding: 1rem 2.5rem
    border-radius: 8px
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)

    background: white

@media (max-width: 600px) 
    .container
        padding: 1rem 1rem
        margin: 0 2rem

    .logo
        display: none
               
</style>