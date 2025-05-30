<script setup>
import {ref} from "vue";
import InputField from "@/components/input_fields/Field.vue";
import CheckboxWithText from "@/components/buttons/CheckboxWithText.vue";
import LockableButton from "@/components/buttons/LockableButton.vue";
import { signUp } from "@/core/repositories/registrationRepository";
import { watch } from "vue";
import { user } from "../../core/repositories/homeRepository.js";
import { isEmpty } from "../../utils/checks.js";

const rName = ref("")
const rSurename = ref("")
const rEmail = ref("")
const rPassword = ref("")
const rRepeatPassword = ref("")
const rProfilePicture = ref("")
const rAgreedToTerms = ref(false)
const rAgreedToSpam = ref(false)

const requiredFields = [
  {
    "title": "Name",
    "placeHolder" : "...",
    "type" : "text",
    "rValue": rName
  },
  {
    "title": "Surename",
    "placeHolder" : "...",
    "type" : "text",
    "rValue": rSurename
  },
  {
    "title": "E-mail",
    "placeHolder" : "...",
    "type" : "email",
    "rValue": rEmail
  },
  {
    "title": "Password",
    "placeHolder" : "...",
    "type" : "password",
    "rValue": rPassword
  },
  {
    "title": "Confirm Password",
    "placeHolder" : "...",
    "type" : "password",
    "rValue": rRepeatPassword
  }
]

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
</script>

<template>
    <form @submit.prevent="signUp(rName, rSurename, rProfilePicture, rEmail, rPassword)" class="center">
        <div class="container">
            <h1 class="login-title"><strong>Sign Up</strong></h1>
            <InputField class="input-field" v-for="(field, i) in requiredFields" :key="i"
                        :title="field['title']"
                        :place-holder="field['placeHolder']"
                        :type="field['type']"
                        v-model="field.rValue.value"
            />
            <CheckboxWithText class="checkbox" text="Agree to terms and services" v-model="rAgreedToTerms"/>
            <CheckboxWithText class="checkbox" text="Receive spam and other things" v-model="rAgreedToSpam"/>
            <LockableButton class="submit-button" :is-unlocked="true" type="submit" text="Sign Up"/>
            <RouterLink to="/login">Log in</RouterLink>
        </div>
    </form>
</template>

<style scoped lang="sass">
.center
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    min-height: 100vh
.container 
    display: flex
    flex-direction: column
    width: 30rem

    

    background: rgba(255,255,255,0.8)
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, .5)
    border-radius: 20px

.container > * 
    margin: 10px 20px 10px

.login-title 
    align-self: center
    font-size: 3rem

.checkbox 
    font-size: 1em

.submit-button 
    align-self: center
    font-size: 2.5rem
    width: calc(100% - 40px)
    height: 2em

.options 
    align-self: center
    justify-self: center
    margin-top: auto

</style>
