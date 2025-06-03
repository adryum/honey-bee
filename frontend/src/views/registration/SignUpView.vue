<script setup>
import {ref, useCssModule} from "vue";
import RegistrationInputField from "@/components/input_fields/RegistrationInputField.vue";
import CheckboxWText from "@/components/buttons/CheckboxWText.vue";
import RegistrationSubmitButtons from "@/components/combinations/RegistrationSubmitButtons.vue";
import { signUp } from "@/core/repositories/registrationRepository";
import { watch } from "vue";
import { user } from "../../core/repositories/homeRepository.js";
import { isEmpty } from "../../utils/checks.js";
import router from '../../router/index.js';

const rUsername = ref("")
const rName = ref("")
const rSurename = ref("")
const rEmail = ref("")
const rPassword = ref("")
const rRepeatPassword = ref("")
const rProfilePicture = ref("")
const rAgreedToTerms = ref(false)
const rAgreedToSpam = ref(false)

watch(user, (newValue) => {
    if (!isEmpty(newValue)) {
        console.log('Sent to main');
        
        router.push('/')
    }
    },
    {
        immediate: true
    }
)
const s = useCssModule()
</script>

<template>
<div :class="s.view">
    <form @submit.prevent="signUp(rName, rSurename, rProfilePicture, rEmail, rPassword)" :class="s.container">
        <img :class="s.logo" src="@/assets/images/BeeLogo.png" alt="logo">
        <h1 :class="s.title">HoneyBee</h1>
        <RegistrationInputField v-model="rUsername" hint="Username" type="text"/>
        <RegistrationInputField v-model="rName" hint="Name" type="text"/>
        <RegistrationInputField v-model="rSurename" hint="Surname" type="text"/>
        <RegistrationInputField v-model="rEmail" hint="E-mail" type="email"/>
        <RegistrationInputField v-model="rPassword" hint="Password" type="password"/>
        <RegistrationInputField v-model="rRepeatPassword" hint="Repeat Password" type="password"/>
        <CheckboxWText v-model="rAgreedToSpam" text="Agree to receive spam"/>
        <CheckboxWText v-model="rAgreedToTerms" text="Agree to Terms of Service"/>
        <CheckboxWText text="Remember me!"/>
        <RegistrationSubmitButtons 
            submit-text="Sign up"
            leftText="Forgot Password!"
            left-link="/recovery"
            right-text="Log in"
            right-link="/login"
        />
    </form>
</div>
</template>

<style module lang="sass">
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
</style>