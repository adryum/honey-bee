<script setup>
import {BackgroundType} from "@/main.js";
import BackgroundWidget from "@/components/BackgroundWidget.vue";
import { isAuthenticated, login } from "../core/repositories/registration.js";
import { watch } from "vue";
import router from '../router';

import {ref} from "vue";
import InputField from "@/components/InputField.vue";
import LockableButton from "@/components/buttons/LockableButton.vue";
import { authenticate } from "@/core/repositories/registration.js";



defineProps({
  email: String,
  password: String
})

let email = ref('')
let password = ref('') 

const requiredFields = [
  {
    "title": "E-mail",
    "placeHolder" : "...",
    "type" : "email",
    'value' : email
  },
  {
    "title": "Password",
    "placeHolder" : "...",
    "type" : "password",
    'value' : password
  }
]

watch(isAuthenticated, (newValue) => {
    if (newValue) {
        console.log('Sent to main');
        
        router.push('/')
    }
},
{
    immediate: true
})
</script>

<template>
    <BackgroundWidget :type="BackgroundType.DimmedAndBlurred" src="/src/assets/images/honeyCombWall.jpg" alt="honey-comb-wall"/>
    <main class="container">
        <h1 class="login-title"><strong>Login</strong></h1>
        <InputField class="input-field" v-for="(field, i) in requiredFields" :key="i"
                    :title="field['title']"
                    :place-holder="field['placeHolder']"
                    :type="field['type']"
                    @onEdit="inputValue => field.value.value = inputValue"
        />
        <LockableButton class="submit-button" :is-unlocked="false" type="submit" text="Log in" @click="login(email, password)"/>
        <RouterLink to="/signup">Sign up</RouterLink>
        <RouterLink to="/accountRecovery">Forgot your password?</RouterLink>
    </main>
</template>

<style scoped lang="sass">
.container 
    display: flex
    flex-direction: column
    width: 30rem
    max-height: 40rem

    background: rgba(255,255,255,0.8)
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, .5)
    border-radius: 20px

    * 
        margin: 10px 20px 10px
    

.login-title 
    align-self: center
    font-size: 3rem

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